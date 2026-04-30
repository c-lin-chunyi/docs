import { constants } from "node:fs";
import { access, cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import readline from "node:readline";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(repoRoot, "dist");
const sharedAssetsRoot = path.join(distRoot, "assets");
const assetDirs = ["fonts", "vendor"];
const headersContent = `/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com; script-src-elem 'self' 'unsafe-inline' https://static.cloudflareinsights.com; worker-src 'self' blob:; connect-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'
`;
const locales = [
  { name: "English", sourceRoot: "en", outputRoot: "en", config: "en/zensical.toml" },
  { name: "Chinese", sourceRoot: "cn", outputRoot: "zh", config: "cn/zensical.toml" },
];

async function resolveZensicalCommand() {
  if (process.env.ZENSICAL_BIN) {
    return { command: process.env.ZENSICAL_BIN, argsPrefix: [] };
  }

  const localPython = process.platform === "win32"
    ? path.join(repoRoot, ".venv/Scripts/python.exe")
    : path.join(repoRoot, ".venv/bin/python");

  try {
    await access(localPython, constants.X_OK);
    return { command: localPython, argsPrefix: ["-m", "zensical"] };
  } catch {
    return { command: "zensical", argsPrefix: [] };
  }
}

function pipeWithPrefix(stream, prefix, output) {
  const lines = readline.createInterface({ input: stream });

  lines.on("line", (line) => {
    output.write(`[${prefix}] ${line}\n`);
  });
}

function runBuild(zensicalCommand, locale) {
  const child = spawn(
    zensicalCommand.command,
    [...zensicalCommand.argsPrefix, "build", "-f", locale.config],
    { cwd: repoRoot },
  );

  pipeWithPrefix(child.stdout, locale.outputRoot, process.stdout);
  pipeWithPrefix(child.stderr, locale.outputRoot, process.stderr);

  return new Promise((resolve, reject) => {
    child.on("error", (error) => {
      reject(new Error(
        `Failed to start Zensical (${zensicalCommand.command}). Install requirements.txt or set ZENSICAL_BIN. ${error.message}`,
      ));
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${locale.name} build failed with exit code ${code}`));
    });
  });
}

function shouldCopy(source) {
  return path.basename(source) !== ".DS_Store";
}

async function copySharedAssets() {
  await Promise.all(
    assetDirs.map(async (assetDir) => {
      const source = path.join(repoRoot, "shared", "assets", assetDir);
      const destination = path.join(sharedAssetsRoot, assetDir);

      await mkdir(path.dirname(destination), { recursive: true });
      await rm(destination, { recursive: true, force: true });
      await cp(source, destination, { recursive: true, filter: shouldCopy });
    }),
  );
}

async function copySite(locale) {
  const source = path.join(repoRoot, locale.sourceRoot, "site");
  const destination = path.join(distRoot, locale.outputRoot);

  await rm(destination, { recursive: true, force: true });
  await cp(source, destination, { recursive: true, filter: shouldCopy });
}

async function writeHeaders() {
  await writeFile(path.join(distRoot, "_headers"), headersContent, "utf8");
}

await rm(distRoot, { recursive: true, force: true });
await mkdir(distRoot, { recursive: true });
await Promise.all(
  locales.map((locale) =>
    rm(path.join(repoRoot, locale.sourceRoot, "site"), { recursive: true, force: true }),
  ),
);

const zensicalCommand = await resolveZensicalCommand();
await Promise.all(locales.map((locale) => runBuild(zensicalCommand, locale)));
await Promise.all([writeHeaders(), copySharedAssets(), ...locales.map(copySite)]);

console.log("Built English to dist/en, Chinese to dist/zh, shared assets to dist/assets, and headers to dist/_headers.");
