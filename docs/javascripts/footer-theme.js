(function () {
  const root = document.querySelector("[data-footer-theme-switcher]");
  if (!root || typeof window.__md_get !== "function" || typeof window.__md_set !== "function") {
    return;
  }

  const trigger = root.querySelector("[data-footer-theme-trigger]");
  const menu = root.querySelector("[data-footer-theme-menu]");
  const label = root.querySelector("[data-footer-theme-label]");
  const options = Array.from(root.querySelectorAll("[data-footer-theme-value]"));
  const paletteInputs = Array.from(
    document.querySelectorAll('[data-md-component="palette"] input[name="__palette"]')
  );
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const modeLabels = {
    light: "Light",
    dark: "Dark",
    system: "System",
  };

  const paletteByMode = {
    light: paletteInputs.find((input) => input.dataset.mdColorMedia === "(prefers-color-scheme: light)"),
    dark: paletteInputs.find((input) => input.dataset.mdColorMedia === "(prefers-color-scheme: dark)"),
  };

  function getStoredMode() {
    const palette = window.__md_get("__palette");
    const media = palette && palette.color && palette.color.media;
    if (media === "(prefers-color-scheme: light)") {
      return "light";
    }
    if (media === "(prefers-color-scheme: dark)") {
      return "dark";
    }
    if (media === "(prefers-color-scheme)") {
      return "system";
    }
    return "system";
  }

  function getPaletteData(mode) {
    const source =
      mode === "system"
        ? darkQuery.matches
          ? paletteByMode.dark
          : paletteByMode.light
        : paletteByMode[mode];

    if (!source) {
      return null;
    }

    return {
      media: mode === "system" ? "(prefers-color-scheme)" : source.dataset.mdColorMedia,
      scheme: source.dataset.mdColorScheme,
      primary: source.dataset.mdColorPrimary,
      accent: source.dataset.mdColorAccent,
    };
  }

  function syncHeaderPalette(mode) {
    const source =
      mode === "system"
        ? darkQuery.matches
          ? paletteByMode.dark
          : paletteByMode.light
        : paletteByMode[mode];

    if (source) {
      source.checked = true;
    }
  }

  function updateUi(mode) {
    label.textContent = modeLabels[mode];
    options.forEach((option) => {
      option.classList.toggle("is-active", option.dataset.footerThemeValue === mode);
    });
  }

  function applyMode(mode, persist) {
    const palette = getPaletteData(mode);
    if (!palette) {
      return;
    }

    Object.entries(palette).forEach(([key, value]) => {
      document.body.setAttribute(`data-md-color-${key}`, value);
    });

    if (persist) {
      window.__md_set("__palette", { color: palette });
    }

    syncHeaderPalette(mode);
    updateUi(mode);
  }

  function closeMenu() {
    menu.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    trigger.setAttribute("aria-expanded", String(!isOpen));
  }

  trigger.addEventListener("click", function () {
    toggleMenu();
  });

  options.forEach((option) => {
    option.addEventListener("click", function () {
      applyMode(option.dataset.footerThemeValue, true);
      closeMenu();
    });
  });

  document.addEventListener("click", function (event) {
    if (!root.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  paletteInputs.forEach((input) => {
    input.addEventListener("change", function () {
      applyMode(input.dataset.mdColorMedia.includes("dark") ? "dark" : "light", false);
    });
  });

  darkQuery.addEventListener("change", function () {
    if (getStoredMode() === "system") {
      applyMode("system", false);
    }
  });

  applyMode(getStoredMode(), false);
})();
