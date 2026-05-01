#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
  node scripts/build-print.mjs [lang] [source.md|manifest.yml] [--out name]

Examples:
  node scripts/build-print.mjs en test/test1.md
  node scripts/build-print.mjs en manifests/en.yaml --out linear-model-notes-en
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
const sourceArg = args[1] ?? "test/test1.md";

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

function trimQuotes(value) {
  return value.trim().replace(/^["']|["']$/g, "");
}

function parseManifest(manifestPath) {
  const raw = readFileSync(manifestPath, "utf8");
  const manifest = { chapters: [] };
  let inChapters = false;
  let currentChapter = null;

  for (const line of raw.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const topMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (topMatch) {
      const [, key, value] = topMatch;
      inChapters = key === "chapters";
      if (!inChapters) manifest[key] = trimQuotes(value);
      continue;
    }

    if (!inChapters) continue;

    const chapterPathMatch = line.match(/^\s*-\s*path:\s*(.+)$/);
    if (chapterPathMatch) {
      currentChapter = { path: trimQuotes(chapterPathMatch[1]) };
      manifest.chapters.push(currentChapter);
      continue;
    }

    const chapterKeyMatch = line.match(/^\s+([A-Za-z0-9_-]+):\s*(.+)$/);
    if (chapterKeyMatch && currentChapter) {
      currentChapter[chapterKeyMatch[1]] = trimQuotes(chapterKeyMatch[2]);
    }
  }

  return manifest;
}

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function escapeLatexText(text) {
  return text.replace(/([#$%&_{}])/g, "\\$1");
}

function boxForAdmonition(kind) {
  if (["warning", "danger", "failure", "bug"].includes(kind)) return "caveatbox";
  if (["example"].includes(kind)) return "workedexamplebox";
  if (["tip", "success", "info", "note"].includes(kind)) return "notebox";
  return "notebox";
}

function titleForAdmonition(kind, title) {
  if (title) return title;
  if (kind === "warning") return "Warning";
  if (kind === "info") return "Note";
  return kind ? kind[0].toUpperCase() + kind.slice(1) : "Note";
}

function sectionTitleForDisclosure(title) {
  return title
    .replace(/^Click to (?:expand|see|view)\s+(?:the\s+)?/i, "")
    .replace(/^点击(?:展开|查看)/, "")
    .replace(/^([A-Za-z])/, (_match, first) => first.toUpperCase());
}

function collectIndentedBlock(lines, startIndex) {
  const block = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];
    if (line.trim() === "") {
      block.push("");
      index += 1;
      continue;
    }

    const match = line.match(/^( {4}|\t)(.*)$/);
    if (!match) break;

    block.push(match[2]);
    index += 1;
  }

  return { block: block.join("\n"), nextIndex: index };
}

function normalizeAdmonitions(markdown, warnings) {
  const lines = markdown.split(/\r?\n/);
  const output = [];

  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    const match = line.match(/^(\?\?\?|!!!)\s+([A-Za-z0-9_-]+)(?:\s+"([^"]+)")?\s*$/);

    if (!match) {
      output.push(line);
      index += 1;
      continue;
    }

    const [, marker, kind, title] = match;
    const { block, nextIndex } = collectIndentedBlock(lines, index + 1);
    const boxTitle = titleForAdmonition(kind, title);

    if (marker === "???") {
      warnings.push(`normalized ${marker} ${kind} block as ordinary section`);
      output.push(`#### ${sectionTitleForDisclosure(boxTitle)}`);
      output.push("");
      output.push(normalizeSource(block, dirname(currentSourcePath), warnings));
      index = nextIndex;
      continue;
    }

    const environment = boxForAdmonition(kind);

    warnings.push(`normalized ${marker} ${kind} block as ${environment}`);
    output.push(`\\begin{${environment}}{${escapeLatexText(boxTitle)}}`);
    output.push(normalizeSource(block, dirname(currentSourcePath), warnings, { inRawLatexBox: true }));
    output.push(`\\end{${environment}}`);
    index = nextIndex;
  }

  return output.join("\n");
}

function removeHtmlTables(markdown, warnings) {
  return markdown.replace(/<table[\s\S]*?<\/table>/gi, (match, offset) => {
    const before = markdown.slice(0, offset);
    const line = before.split(/\r?\n/).length;
    warnings.push(`ignored raw HTML table in ${relative(repoRoot, currentSourcePath)}:${line}`);
    return "";
  });
}

function normalizeFencedDivs(markdown, warnings) {
  return markdown.replace(/^:::\s*\{?\.web-only[^}]*\}?\s*$[\s\S]*?^:::\s*$/gm, () => {
    warnings.push("removed web-only block");
    return "";
  }).replace(/^:::\s*\{?\.print-only[^}]*\}?\s*$\n([\s\S]*?)^:::\s*$/gm, (_match, body) => {
    warnings.push("kept print-only block body");
    return body.trim();
  });
}

function normalizeImages(markdown, sourceDir, warnings) {
  return markdown.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (_match, alt, target) => {
    if (/^https?:\/\//i.test(target)) {
      warnings.push(`converted remote image to print note: ${target}`);
      return `\\begin{notebox}{Figure source}\n${escapeLatexText(alt || "Remote figure")}: \\url{${target}}\n\\end{notebox}`;
    }

    const resolved = resolve(sourceDir, target);
    const extension = extname(resolved).toLowerCase();
    if (extension === ".svg") {
      warnings.push(`converted SVG image to print note: ${target}`);
      return `\\begin{notebox}{Figure source}\n${escapeLatexText(alt || "SVG figure")}: \\texttt{${escapeLatexText(relative(repoRoot, resolved))}}\n\\end{notebox}`;
    }

    return `![${alt}](${relative(repoRoot, resolved)})`;
  });
}

function normalizeLinks(markdown, warnings) {
  return markdown.replace(/(?<!!)\[([^\]]+)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (_match, label, target) => {
    if (/^https?:\/\//i.test(target) || /^mailto:/i.test(target)) return `[${label}](${target})`;
    if (target.startsWith("#")) return label;

    warnings.push(`converted internal link to text: ${target}`);
    return label;
  });
}

function normalizeChineseEmphasis(markdown, warnings) {
  let normalized = markdown.replace(/(?<!\*)\*([^*\n]*[\u3400-\u9fff\uf900-\ufaff][^*\n]*)\*(?!\*)/gu, (_match, content) => content);
  normalized = normalized.replace(/\\emph\{([^{}]*[\u3400-\u9fff\uf900-\ufaff][^{}]*)\}/gu, (_match, content) => content);

  if (normalized !== markdown) {
    warnings.push("removed emphasis markup from Chinese text");
  }

  return normalized;
}

function normalizeMath(markdown, warnings, options = {}) {
  let normalized = markdown;

  if (normalized.includes("\\boldsymbol")) {
    warnings.push("rewrote \\boldsymbol to unicode-math \\symbf");
    normalized = normalized.replace(/\\boldsymbol\b/g, "\\symbf");
  }

  const beforeDisplayEnvironmentFix = normalized;
  normalized = normalized.replace(
    /\$\$\s*\n(\\begin\{(?:align\*?|equation\*?|gather\*?|multline\*?)\}[\s\S]*?\\end\{(?:align\*?|equation\*?|gather\*?|multline\*?)\})\s*\n\$\$/g,
    "$1"
  );
  if (options.inRawLatexBox) {
    normalized = normalized.replace(
      /\$\$\s*\n(\\begin\{aligned\}[\s\S]*?\\end\{aligned\})\s*\n\$\$/g,
      "\\[\n$1\n\\]"
    );
  }

  if (normalized !== beforeDisplayEnvironmentFix) {
    warnings.push("removed redundant $$ around LaTeX display environments");
  }

  return normalized;
}

let currentSourcePath = "";

function normalizeSource(markdown, sourceDir, warnings, options = {}) {
  let normalized = markdown;
  if (options.stripFrontmatter) normalized = stripFrontmatter(normalized);
  normalized = normalizeFencedDivs(normalized, warnings);
  normalized = removeHtmlTables(normalized, warnings);
  normalized = normalizeImages(normalized, sourceDir, warnings);
  normalized = normalizeLinks(normalized, warnings);
  normalized = normalizeChineseEmphasis(normalized, warnings);
  normalized = normalizeMath(normalized, warnings, options);
  normalized = normalizeAdmonitions(normalized, warnings);
  return normalized.trim();
}

function normalizeMarkdownFile(sourcePath, warnings, options = {}) {
  currentSourcePath = sourcePath;
  const markdown = readFileSync(sourcePath, "utf8");
  return normalizeSource(markdown, dirname(sourcePath), warnings, options);
}

function buildFromManifest(manifestPath, warnings) {
  const manifest = parseManifest(manifestPath);
  const sourceRoot = resolve(repoRoot, manifest.source_root ?? ".");
  const parts = [];

  parts.push("---");
  if (manifest.title) parts.push(`title: ${manifest.title}`);
  if (manifest.subtitle) parts.push(`subtitle: ${manifest.subtitle}`);
  if (manifest.author) parts.push(`author: ${manifest.author}`);
  parts.push("toc: true");
  parts.push("titlepage: true");
  parts.push("---");
  parts.push("");

  for (const chapter of manifest.chapters) {
    const chapterPath = resolve(sourceRoot, chapter.path);
    if (!existsSync(chapterPath)) {
      console.error(`Manifest chapter not found: ${relative(repoRoot, chapterPath)}`);
      process.exit(1);
    }
    parts.push(normalizeMarkdownFile(chapterPath, warnings, { stripFrontmatter: true }));
    parts.push("");
    parts.push("\\clearpage");
    parts.push("");
  }

  return parts.join("\n");
}

const sourcePath = resolveInputPath(sourceArg);
const isManifest = [".yaml", ".yml"].includes(extname(sourcePath).toLowerCase());
const metadataPath = join(printRoot, "metadata", `${lang}.yaml`);
const templatePath = join(printRoot, "templates", "linear-model-notes.latex");
const outputBase = outName ?? basename(sourcePath, extname(sourcePath));
const normalizedPath = join(buildRoot, `${outputBase}.normalized.md`);
const texPath = join(buildRoot, `${outputBase}.tex`);
const pdfPath = join(buildRoot, `${outputBase}.pdf`);
const texmfVar = join(buildRoot, "texmf-var");
const warnings = [];

mkdirSync(buildRoot, { recursive: true });
mkdirSync(texmfVar, { recursive: true });

const normalizedMarkdown = isManifest
  ? buildFromManifest(sourcePath, warnings)
  : normalizeMarkdownFile(sourcePath, warnings);

writeFileSync(normalizedPath, `${normalizedMarkdown}\n`);

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
  normalizedPath,
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

for (const warning of warnings) {
  console.warn(`print normalize: ${warning}`);
}

console.log(`Wrote ${relative(repoRoot, normalizedPath)}`);
console.log(`Wrote ${relative(repoRoot, texPath)}`);
console.log(`Wrote ${relative(repoRoot, pdfPath)}`);
