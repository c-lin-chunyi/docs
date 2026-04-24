import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localeRoots = ["en", "cn"];
const assetDirs = ["fonts", "vendor"];

const requestedLocales = process.argv.slice(2);
const targets = requestedLocales.length > 0 ? requestedLocales : localeRoots;
const invalidTargets = targets.filter((target) => !localeRoots.includes(target));

if (invalidTargets.length > 0) {
  throw new Error(`Unknown locale root: ${invalidTargets.join(", ")}`);
}

await Promise.all(
  targets.flatMap((localeRoot) =>
    assetDirs.map(async (assetDir) => {
      const source = path.join(repoRoot, "shared", "assets", assetDir);
      const destination = path.join(repoRoot, localeRoot, "site", "assets", assetDir);

      await mkdir(path.dirname(destination), { recursive: true });
      await rm(destination, { recursive: true, force: true });
      await cp(source, destination, { recursive: true });
    }),
  ),
);
