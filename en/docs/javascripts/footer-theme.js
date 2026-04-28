(function () {
  const root = document.querySelector("[data-footer-theme-switcher]");
  if (!root) {
    return;
  }

  const trigger = root.querySelector("[data-footer-theme-trigger]");
  const menu = root.querySelector("[data-footer-theme-menu]");
  const icon = root.querySelector("[data-footer-theme-icon]");
  const label = root.querySelector("[data-footer-theme-label]");
  const options = Array.from(root.querySelectorAll("[data-footer-theme-value]"));
  const paletteInputs = Array.from(
    document.querySelectorAll('[data-md-component="palette"] input[name="__palette"]')
  );

  if (!trigger || !menu || !label || paletteInputs.length === 0) {
    return;
  }

  const modeLabels = {
    light: "Light",
    dark: "Dark",
    system: "System",
  };
  const modeIcons = {
    light: "fa-sun",
    dark: "fa-moon",
    system: "fa-desktop",
  };
  const mediaByMode = {
    light: "(prefers-color-scheme: light)",
    dark: "(prefers-color-scheme: dark)",
    system: "(prefers-color-scheme)",
  };
  const themeReloadKey = "footer-theme-reload-top";
  const themeReloadParam = "_themeReload";

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  function resetScrollAfterReload() {
    let shouldReset = false;

    try {
      shouldReset = window.sessionStorage.getItem(themeReloadKey) === "1";
      if (shouldReset) {
        window.sessionStorage.removeItem(themeReloadKey);
      }
    } catch (_error) {
      // Ignore storage errors (e.g. private browsing restrictions).
    }

    if (!shouldReset) {
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    scrollToTop();

    window.addEventListener("pageshow", scrollToTop, { once: true });
    window.addEventListener(
      "load",
      function () {
        window.requestAnimationFrame(function () {
          scrollToTop();
          window.setTimeout(function () {
            scrollToTop();
            if ("scrollRestoration" in window.history) {
              window.history.scrollRestoration = "auto";
            }
          }, 100);
        });
      },
      { once: true }
    );

    const url = new URL(window.location.href);
    if (url.searchParams.has(themeReloadParam)) {
      url.searchParams.delete(themeReloadParam);
      window.history.replaceState(window.history.state, "", url.toString());
    }
  }

  function forceReloadToTop() {
    try {
      window.sessionStorage.setItem(themeReloadKey, "1");
    } catch (_error) {
      // Ignore storage errors (e.g. private browsing restrictions).
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const url = new URL(window.location.href);
    url.searchParams.set(themeReloadParam, String(Date.now()));
    window.location.replace(url.toString());
  }

  resetScrollAfterReload();

  function getModeFromMedia(media) {
    return Object.keys(mediaByMode).find((mode) => mediaByMode[mode] === media) || "system";
  }

  function getInputForMode(mode) {
    return paletteInputs.find((input) => input.dataset.mdColorMedia === mediaByMode[mode]);
  }

  function getStoredMode() {
    if (typeof window.__md_get !== "function") {
      return null;
    }

    const palette = window.__md_get("__palette");
    const media = palette && palette.color && palette.color.media;
    return media ? getModeFromMedia(media) : null;
  }

  function getCurrentMode() {
    const checked = paletteInputs.find((input) => input.checked);
    return getStoredMode() || (checked ? getModeFromMedia(checked.dataset.mdColorMedia) : "system");
  }

  function applyMode(mode) {
    const input = modeLabels[mode] ? getInputForMode(mode) : null;

    if (!input) {
      return false;
    }

    const color = {
      media: input.dataset.mdColorMedia,
      scheme: input.dataset.mdColorScheme,
      primary: input.dataset.mdColorPrimary,
      accent: input.dataset.mdColorAccent,
    };

    paletteInputs.forEach((candidate) => {
      candidate.checked = candidate === input;
    });

    if (typeof window.__md_set === "function") {
      try {
        window.__md_set("__palette", { color: color });
      } catch (_error) {
        // Ignore storage errors (e.g. private browsing restrictions).
      }
    }

    Object.entries(color).forEach(([key, value]) => {
      document.body.setAttribute("data-md-color-" + key, value);
    });

    return true;
  }

  function updateUi(mode) {
    label.textContent = modeLabels[mode];

    if (icon) {
      icon.classList.remove("fa-sun", "fa-moon", "fa-desktop");
      icon.classList.add(modeIcons[mode]);
    }

    options.forEach((option) => {
      const isActive = option.dataset.footerThemeValue === mode;
      option.classList.toggle("is-active", isActive);
      option.classList.toggle("active", isActive);
    });
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
      const mode = option.dataset.footerThemeValue;
      if (!applyMode(mode)) {
        return;
      }

      updateUi(mode);
      closeMenu();
      forceReloadToTop();
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
      updateUi(getModeFromMedia(input.dataset.mdColorMedia));
    });
  });

  updateUi(getCurrentMode());
})();
