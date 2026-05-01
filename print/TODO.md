# Print Template Todo 

## Phase 0: Lock Current Foundation

- [x] **T00** Fork/copy Eisvogel into project-local template.
  - Keep it repo-local, not global Pandoc user template.
- [x] **T01** Rename main template to project name.
  - Current target: `linear-model-notes.latex`, not `eisvogel.latex`.
- [x] **T02** Finish title page customization.
- [x] **T03** Finish font setup.
- [x] **T04** Confirm plain Markdown compiles to PDF.
  - Use one simple chapter without MkDocs callouts first.

## Phase 1: Core Document Style

- [x] **T10** Define page geometry.
  - Margins, text width, line length. Avoid too-wide math pages unless needed.
- [x] **T11** Define paragraph spacing.
  - Decide between indented paragraphs and block spacing. For notes, slight paragraph spacing may be friendlier.
- [x] **T12** Define heading style.
  - Chapter, section, subsection. Keep quiet and monograph-like.
- [x] **T13** Define header/footer style.
  - Page number, chapter/section marks, maybe no decorative rule.
- [x] **T14** Define TOC style.
  - Check spacing, depth, page breaks.
- [x] **T15** Define hyperlink style.
  - Probably restrained: black internal links, muted URL color.

## Phase 2: Table and Figure Infrastructure

- [x] **T20** Set table packages.
  - `booktabs`, `longtable`, `array`, maybe `threeparttable`.
- [x] **T21** Tune Pandoc table appearance.
  - Especially ANOVA tables and hand-calculation tables.
- [x] **T22** Decide policy for wide tables.
  - Options: smaller font, landscape page, manual LaTeX table, or source simplification.
- [x] **T23** Define caption style.
  - Small, sober, possibly left-aligned.
- [x] **T24** Define figure placement defaults.
  - Avoid float chaos. Since these are notes, stable placement matters more than academic convention.

## Phase 3: Math Style and Equation Behavior

- [x] **T30** Check display math spacing.
  - Make sure dense derivations breathe enough.
- [x] **T31** Check equation overflow behavior.
  - Especially long likelihood expressions and ANOVA decompositions.
- [x] **T32** Add math helper packages.
  - `mathtools`, `amssymb`, maybe `bm`.
- [x] **T33** Define notation macros.
  - Examples: `\SSE`, `\SSA`, `\SSB`, `\MS`, `\df`.
- [x] **T34** Decide whether to number equations.
  - For notes, mostly unnumbered is fine unless cross-referencing is planned.

Potential macro layer:

```latex
\newcommand{\SST}{\mathrm{SS_T}}
\newcommand{\SSA}{\mathrm{SS_A}}
\newcommand{\SSB}{\mathrm{SS_B}}
\newcommand{\SSE}{\mathrm{SS_E}}
\newcommand{\MS}{\mathrm{MS}}
\newcommand{\df}{\mathrm{df}}
```

## Phase 4: Semantic Box Grammar

This is the most important design layer before Lua filters.

- [x] **T40** Create `partials/boxes.latex`.
  - Keep boxes outside the main template.
- [x] **T41** Define `notebox`.
  - General explanatory notes.
- [x] **T42** Define `assumptionbox`.
  - For normality, independence, equal variance, etc.
- [x] **T43** Define `derivationbox`.
  - For optional dense math.
- [x] **T44** Define `workedexamplebox`.
  - For hand calculations and numerical ANOVA examples.
- [x] **T45** Define `caveatbox`.
  - For warnings and limitations.
- [x] **T46** Define `interpretationbox`.
  - For "what this means experimentally."
- [x] **T47** Test all boxes manually in a Markdown file using raw LaTeX.
  - Do this before writing Lua filters.

Use reader-function names:

- `assumptionbox`
- `derivationbox`
- `workedexamplebox`
- `interpretationbox`
- `caveatbox`
- `notebox`

Avoid theorem-style names such as `definition`, `theorem`, `proof`, and `lemma`; the semantic box names better match the writing voice.

## Phase 5: Build Script and Generated-Output Policy

- [x] **T50** Create `.print-build/` output directory.
  - Generated files only. Gitignored.
- [x] **T51** Add `.print-build/` to `.gitignore`.
  - Do not commit generated `.tex` by default.
- [x] **T52** Create `print/scripts/build-print.*`.
  - Node or Python; use whichever fits the site repo better.
- [x] **T53** Add a package script or Makefile target.
  - Added `print/package.json` scripts: `npm run print:test`, `npm run print:en`, and `npm run print:cn`.
- [x] **T54** Generate intermediate `.tex` for inspection.
  - Useful for debugging, but untracked.
- [x] **T55** Decide release artifact policy.
  - Policy: keep `.print-build/` untracked; attach release PDFs externally when needed, but do not commit generated `.tex` or `.pdf` artifacts by default.

Package scripts from `print/`:

```json
{
  "scripts": {
    "print:test": "node scripts/build-print.mjs en test/test1.md",
    "print:en": "node scripts/build-print.mjs en manifests/en.yaml --out linear-model-notes-en",
    "print:cn": "node scripts/build-print.mjs cn manifests/cn.yaml --out linear-model-notes-cn"
  }
}
```

## Phase 6: Source Normalization Before Lua Filters

- [x] **T60** Decide how to combine pages.
  -  Maintain a print manifest. Two types of build artifacts: whole book and per section(per md file).
- [x] **T61** Create print manifest.
  -  More controllable than blindly using all web pages.
- [x] **T62** Normalize internal links.
  - Web links like `/method/anova/...` may need PDF-safe handling.
- [x] **T63** Normalize image paths.
  - Relative paths often break after combining.
- [x] **T64** Normalize admonition syntax.
  - `!!!` and `???` should become fenced divs or be handled before Pandoc.
- [x] **T65** Detect raw HTML tables.
  - Ignore raw HTML tables with a file/line warning; replace them with print-friendly Markdown or LaTeX tables before release.
- [x] **T66** Handle web-only / print-only blocks.
  - Needed for complex tables or interactive web content.

A print manifest is probably cleaner than nav scraping:

```yaml
title: Linear Models for Experimental Design
language: en
source_root: site/en
chapters:
  - path: method/anova/01-introduction.md
  - path: method/anova/02-ss-decomposition.md
  - path: method/anova/03-significance.md
```

## Phase 7: Lua Filters

Only start this after the template boxes look good.

- [ ] **T70** Create `callouts.lua`.
  - Map semantic divs to LaTeX boxes.
- [ ] **T71** Create `latex-only.lua`.
  - Keep `.latex-only`, remove `.web-only` for print.
- [ ] **T72** Create `headers.lua`.
  - Optional. Adjust heading levels if combining pages creates awkward hierarchy.
- [ ] **T73** Create `links.lua`.
  - Optional. Convert internal links to text or cross-references.
- [ ] **T74** Create `tables.lua`.
  - Optional. Only if Pandoc table output needs systematic patching.
- [ ] **T75** Create `math.lua`.
  - Optional. Only if macro rewriting or equation cleanup is needed.

Target mapping:

| Source class | Print box |
| --- | --- |
| `.warning`, `.danger` | `caveatbox` or `assumptionbox` |
| `.info`, `.note` | `notebox` |
| `.derivation` | `derivationbox` |
| `.example` | `workedexamplebox` |
| `.interpretation` | `interpretationbox` |

## Phase 8: Quality Gates

- [ ] **T80** Compile one short chapter.
  - Plain Markdown first.
- [ ] **T81** Compile one math-heavy chapter.
  - The ANOVA significance chapter is a good stress test.
- [ ] **T82** Compile with tables.
  - Check ANOVA table and hand-calculation table.
- [ ] **T83** Compile with callouts/details.
  - After filters exist.
- [ ] **T84** Compile English full note subset.
  - Not necessarily the whole site.
- [ ] **T85** Compile Chinese subset.
  - Later. CJK line breaking and fonts may need separate tuning.
- [ ] **T86** Add CI smoke test.
  - Later. Build one small PDF or at least generate `.tex`.

## Near-Term Order

1. T10-T15: geometry, paragraph, headings, headers/footers, TOC, links.
2. T20-T24: tables, captions, figure basics.
3. T30-T34: math spacing, macros, equation behavior.
4. T40-T47: semantic boxes, manually tested.
5. T50-T55: build output policy and script.
6. T60-T66: source combining and normalization.
7. T70-T75: Lua filters.

## Next Milestone

A single math-heavy Markdown chapter compiles through the template with:

- correct title/fonts
- acceptable headings
- acceptable equations
- acceptable tables
- manually inserted semantic boxes

Once that PDF feels right, the Lua filters are translation glue.
