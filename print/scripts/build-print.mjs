#!/usr/bin/env node

import { existsSync, mkdirSync } from "node:fs";
import { basename, dirname, extname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "../..");
const printRoot = join(repoRoot, "print");
const buildRoot = join(printRoot, ".print-build");
const cwd = process.cwd();

const args = process.argv.slice(2);

function usage() {
  console.error(`Usage:
  node print/scripts/build-print.mjs [lang] [source.md] [--out name]

Examples:
  node scripts/build-print.mjs en test/test1.md
  node scripts/build-print.mjs cn test/test0.md --out smoke-cn
`);
}

function takeOption(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    usage();
    process.exit(2);
  }
  args.splice(index, 2);
  return value;
}

const outName = takeOption("--out");
const lang = args[0] ?? "en";
const sourceArg = args[1] ?? "print/test/test1.md";

if (args.length > 2 || lang.startsWith("--") || sourceArg.startsWith("--")) {
  usage();
  process.exit(2);
}

function resolveInputPath(inputPath) {
  if (isAbsolute(inputPath)) return inputPath;

  const cwdPath = resolve(cwd, inputPath);
  if (existsSync(cwdPath)) return cwdPath;

  return resolve(repoRoot, inputPath);
}

const sourcePath = resolveInputPath(sourceArg);
const metadataPath = join(printRoot, "metadata", `${lang}.yaml`);
const templatePath = join(printRoot, "templates", "linear-model-notes.latex");
const outputBase = outName ?? basename(sourcePath, extname(sourcePath));
const texPath = join(buildRoot, `${outputBase}.tex`);
const pdfPath = join(buildRoot, `${outputBase}.pdf`);
const texmfVar = join(buildRoot, "texmf-var");

mkdirSync(buildRoot, { recursive: true });
mkdirSync(texmfVar, { recursive: true });

function run(command, commandArgs) {
  const result = spawnSync(command, commandArgs, {
    cwd: repoRoot,
    env: {
      ...process.env,
      TEXMFVAR: process.env.TEXMFVAR ?? texmfVar,
    },
    stdio: "inherit",
  });

  if (result.error) {
    console.error(`Failed to start ${command}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("pandoc", [
  sourcePath,
  "--from",
  "markdown+raw_tex",
  "--template",
  templatePath,
  "--metadata-file",
  metadataPath,
  "-s",
  "-t",
  "latex",
  "-o",
  texPath,
]);

for (let pass = 0; pass < 2; pass += 1) {
  run("lualatex", [
    "-interaction=nonstopmode",
    "-halt-on-error",
    "-output-directory",
    buildRoot,
    texPath,
  ]);
}

console.log(`Wrote ${relative(repoRoot, texPath)}`);
console.log(`Wrote ${relative(repoRoot, pdfPath)}`);
