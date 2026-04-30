(function () {
  const root = document.querySelector("[data-footer-language-switcher]");
  if (!root) {
    return;
  }

  const trigger = root.querySelector("[data-footer-language-trigger]");
  const menu = root.querySelector("[data-footer-language-menu]");
  const label = root.querySelector("[data-footer-language-label]");
  const options = Array.from(root.querySelectorAll("[data-footer-language-value]"));
  const languageLabels = {
    en: "English",
    zh: "简体中文",
  };

  if (!trigger || !menu || !label || options.length === 0) {
    return;
  }

  function getPathLanguage() {
    const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
    return languageLabels[firstSegment] ? firstSegment : null;
  }

  function getCurrentLanguage() {
    return getPathLanguage() || root.dataset.footerLanguageCurrent || "en";
  }

  function getLanguageUrl(language) {
    const url = new URL(window.location.href);
    const segments = url.pathname.split("/");

    if (languageLabels[segments[1]]) {
      segments[1] = language;
    } else {
      segments.splice(1, 0, language);
    }

    url.pathname = segments.join("/") || "/";
    return url.toString();
  }

  function updateUi(language) {
    label.textContent = languageLabels[language];

    options.forEach((option) => {
      const isActive = option.dataset.footerLanguageValue === language;
      option.classList.toggle("is-active", isActive);
      option.classList.toggle("active", isActive);
      option.setAttribute("aria-current", isActive ? "true" : "false");
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
      const language = option.dataset.footerLanguageValue;

      if (language === getCurrentLanguage()) {
        closeMenu();
        return;
      }

      window.location.assign(getLanguageUrl(language));
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

  updateUi(getCurrentLanguage());
})();
