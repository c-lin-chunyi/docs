# Radix Palette

This site now uses a custom Radix-based color system for both light and dark mode.
The palette mapping follows the same design direction as `quarto-ref/`, with Radix
scales defining semantic surfaces, text, accents, and code colors.

## Preview

Light mode uses neutral gray surfaces with a blue primary accent. Dark mode keeps
the same hue relationships, but remaps surfaces and text to the Radix dark scales
instead of simply inverting the light palette.

> Links, code, tables, admonitions, and surface backgrounds are all driven by the
> same Radix token layer.

### Example code

```css
[data-md-color-scheme="radix-light"] {
  --md-primary-fg-color: var(--rx-blue-9);
  --md-default-bg-color: var(--rx-gray-1);
  --md-code-bg-color: var(--theme-control-bg);
}
```

### Example table

| Token | Light | Dark |
| --- | --- | --- |
| Surface | `gray-2` | `gray-3` |
| Control | `gray-1` | `gray-2` |
| Primary | `blue-9` | `blue-9` |
| Link text | `blue-11` | `blue-11` |

### Example admonition

!!! note
    This page is intentionally simple. The goal here is to establish the palette
    system first so the rest of the site can inherit it cleanly.
