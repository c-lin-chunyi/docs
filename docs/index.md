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

### Example text

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin tortor purus platea sit eu id nisi litora libero. Neque vulputate consequat ac amet augue blandit maximus aliquet congue. Pharetra vestibulum posuere ornare faucibus fusce dictumst orci aenean eu facilisis ut volutpat commodo senectus purus himenaeos fames primis convallis nisi.

 Phasellus fermentum malesuada phasellus netus dictum aenean placerat egestas amet. Ornare taciti semper dolor tristique morbi. Sem leo tincidunt aliquet semper eu lectus scelerisque quis. Sagittis vivamus mollis nisi mollis enim fermentum laoreet.

 Curabitur semper venenatis lectus viverra ex dictumst nulla maximus. Primis iaculis elementum conubia feugiat venenatis dolor augue ac blandit nullam ac phasellus turpis feugiat mollis. Duis lectus porta mattis imperdiet vivamus augue litora lectus arcu. Justo torquent pharetra volutpat ad blandit bibendum accumsan nec elit cras luctus primis ipsum gravida class congue.
 
 Vehicula etiam elementum finibus enim duis feugiat commodo adipiscing tortor tempor elit. Et mollis consectetur habitant turpis tortor consectetur adipiscing vulputate dolor lectus iaculis convallis adipiscing. Nam hendrerit dignissim condimentum ullamcorper diam morbi eget consectetur odio in sagittis.