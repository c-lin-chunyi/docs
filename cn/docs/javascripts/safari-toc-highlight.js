(function () {
  const userAgent = navigator.userAgent;
  const isSafari =
    /^Apple/.test(navigator.vendor || "") &&
    /Safari/.test(userAgent) &&
    !/(Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPiOS)/.test(userAgent);

  if (!isSafari) {
    return;
  }

  const ACTIVE_CLASS = "md-nav__link--active";
  const PASSED_CLASS = "md-nav__link--passed";
  const TOC_SELECTOR = '[data-md-component="toc"]';
  const TOC_LINK_SELECTOR = ".md-nav__link";
  const HEADER_SELECTOR = '[data-md-component="header"]';
  const SWITCH_OFFSET = 24;

  let frame = 0;

  function getHash(link) {
    try {
      return decodeURIComponent(link.hash.slice(1));
    } catch (_error) {
      return link.hash.slice(1);
    }
  }

  function getHeading(link) {
    const hash = getHash(link);
    const heading = hash ? document.getElementById(hash) : null;

    return heading && /^H[1-6]$/.test(heading.tagName) ? heading : null;
  }

  function getReferenceLine() {
    const header = document.querySelector(HEADER_SELECTOR);
    const bottom = header ? header.getBoundingClientRect().bottom : 0;
    return Math.max(0, bottom) + SWITCH_OFFSET;
  }

  function getActiveIndex(links) {
    const referenceLine = getReferenceLine();
    let activeIndex = -1;

    links.forEach(function (link, index) {
      const heading = getHeading(link);

      if (heading && heading.getBoundingClientRect().top <= referenceLine) {
        activeIndex = index;
      }
    });

    if (activeIndex === -1 && links.length > 0) {
      activeIndex = 0;
    }

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      activeIndex = links.length - 1;
    }

    return activeIndex;
  }

  function updateToc(toc) {
    const links = Array.from(toc.querySelectorAll(TOC_LINK_SELECTOR)).filter(function (link) {
      return Boolean(link.hash);
    });
    const activeIndex = getActiveIndex(links);

    links.forEach(function (link, index) {
      const isActive = index === activeIndex;
      const isPassed = activeIndex !== -1 && index <= activeIndex;

      link.classList.toggle(ACTIVE_CLASS, isActive);
      link.classList.toggle(PASSED_CLASS, isPassed);
    });
  }

  function updateAllTocs() {
    frame = 0;
    document.querySelectorAll(TOC_SELECTOR).forEach(updateToc);
  }

  function scheduleUpdate() {
    if (frame) {
      return;
    }

    frame = window.requestAnimationFrame(updateAllTocs);
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate);

  if (typeof document$ !== "undefined") {
    document$.subscribe(scheduleUpdate);
  } else {
    document.addEventListener("DOMContentLoaded", scheduleUpdate);
  }
})();
