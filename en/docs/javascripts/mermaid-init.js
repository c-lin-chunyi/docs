(function () {
  var renderId = 0;

  function mermaidThemeVariables() {
    var styles = getComputedStyle(document.body);
    var background = resolveCssColor("backgroundColor", "var(--md-default-bg-color)", "#ffffff");
    var edge = resolveCssColor("color", "var(--md-mermaid-edge-color)", "#000000");
    var labelBackground = resolveCssColor("backgroundColor", "var(--md-mermaid-label-bg-color)", "#ffffff");
    var labelForeground = resolveCssColor("color", "var(--md-mermaid-label-fg-color)", "#000000");
    var nodeBackground = resolveCssColor("backgroundColor", "var(--md-mermaid-node-bg-color)", "#f9f9f9");
    var nodeAccent = resolveCssColor("color", "var(--md-mermaid-node-fg-color)", "#000000");
    var actorBackground = resolveCssColor("backgroundColor", "var(--md-mermaid-sequence-actor-bg-color)", "#ffffff");
    var actorForeground = resolveCssColor("color", "var(--md-mermaid-sequence-actor-fg-color)", "#000000");
    var actorBorder = resolveCssColor("color", "var(--md-mermaid-sequence-actor-border-color)", "#000000");
    var actorLine = resolveCssColor("color", "var(--md-mermaid-sequence-actor-line-color)", "#000000");
    var boxBackground = resolveCssColor("backgroundColor", "var(--md-mermaid-sequence-box-bg-color)", "#f9f9f9");
    var boxForeground = resolveCssColor("color", "var(--md-mermaid-sequence-box-fg-color)", "#000000");
    var noteBackground = resolveCssColor("backgroundColor", "var(--md-mermaid-sequence-note-bg-color)", "#ffffff");
    var noteBorder = resolveCssColor("color", "var(--md-mermaid-sequence-note-border-color)", "#000000");
    var noteForeground = resolveCssColor("color", "var(--md-mermaid-sequence-note-fg-color)", "#000000");
    var sequenceNumberBackground = resolveCssColor("backgroundColor", "var(--md-mermaid-sequence-number-bg-color)", "#000000");
    var sequenceNumberForeground = resolveCssColor("color", "var(--md-mermaid-sequence-number-fg-color)", "#ffffff");
    var fontFamily =
      styles.getPropertyValue("--md-mermaid-font-family").trim() ||
      styles.getPropertyValue("--md-text-font-family").trim() ||
      styles.getPropertyValue("--md-text-font").trim() ||
      styles.fontFamily ||
      "Arial, sans-serif";

    return {
      background: background,
      mainBkg: nodeBackground,
      nodeBkg: nodeBackground,
      nodeBorder: nodeAccent,
      nodeTextColor: labelForeground,
      primaryColor: nodeBackground,
      primaryTextColor: labelForeground,
      primaryBorderColor: nodeAccent,
      secondaryColor: nodeBackground,
      secondaryTextColor: labelForeground,
      secondaryBorderColor: nodeAccent,
      tertiaryColor: nodeBackground,
      tertiaryTextColor: labelForeground,
      tertiaryBorderColor: nodeAccent,
      clusterBkg: nodeBackground,
      clusterBorder: nodeAccent,
      textColor: labelForeground,
      titleColor: labelForeground,
      lineColor: edge,
      defaultLinkColor: edge,
      edgeLabelBackground: labelBackground,
      actorBkg: actorBackground,
      actorTextColor: actorForeground,
      actorBorder: actorBorder,
      actorLineColor: actorLine,
      labelBoxBkgColor: actorBackground,
      labelTextColor: actorForeground,
      labelBoxBorderColor: actorBorder,
      loopTextColor: boxForeground,
      signalColor: edge,
      signalTextColor: edge,
      noteBkgColor: noteBackground,
      noteBorderColor: noteBorder,
      noteTextColor: noteForeground,
      sequenceNumberColor: sequenceNumberForeground,
      sequenceNumberBackground: sequenceNumberBackground,
      fontFamily: fontFamily
    };
  }

  function resolveCssColor(property, value, fallback) {
    var probe = document.createElement("span");

    probe.style[property] = value;
    probe.style.display = "none";
    document.body.appendChild(probe);

    var resolved = getComputedStyle(probe)[property];
    probe.remove();

    return resolved || fallback;
  }

  function normalizeMermaidBlocks() {
    document.querySelectorAll("pre.mermaid, pre.mermaid-source").forEach(function (pre) {
      var code = pre.querySelector("code");
      var source = (code || pre).textContent.trim();
      var block = document.createElement("div");

      block.className = pre.className.replace(/\bmermaid-source\b/g, "").trim();

      if (!/\bmermaid\b/.test(block.className)) {
        block.className = (block.className + " mermaid").trim();
      }

      block.textContent = source;
      block.dataset.mermaidSource = source;
      block.__mermaidSource = source;
      pre.replaceWith(block);
    });
  }

  function prepareMermaidBlocks(force) {
    var blocks = [];

    document.querySelectorAll(".mermaid").forEach(function (block) {
      var source = block.__mermaidSource || block.dataset.mermaidSource || block.textContent.trim();

      if (!source) {
        return;
      }

      block.dataset.mermaidSource = source;
      block.__mermaidSource = source;

      if (force) {
        block.removeAttribute("data-processed");
        block.textContent = source;
      }

      if (!block.dataset.processed) {
        blocks.push({ block: block, source: source });
      }
    });

    return blocks;
  }

  async function renderMermaid(force) {
    if (!window.mermaid) {
      return;
    }

    normalizeMermaidBlocks();

    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "base",
      themeVariables: mermaidThemeVariables(),
      flowchart: {
        htmlLabels: true
      }
    });

    var blocks = prepareMermaidBlocks(force);

    if (!blocks.length) {
      return;
    }

    for (var i = 0; i < blocks.length; i += 1) {
      var item = blocks[i];

      try {
        renderId += 1;
        var result = await window.mermaid.render(
          "mermaid-" + Date.now() + "-" + renderId,
          item.source
        );

        item.block.innerHTML = result.svg;
        item.block.dataset.processed = "true";

        if (typeof result.bindFunctions === "function") {
          result.bindFunctions(item.block);
        }
      } catch (error) {
        item.block.textContent = item.source;
        console.warn("Mermaid render failed", error);
      }
    }
  }

  function scheduleRender(force) {
    requestAnimationFrame(function () {
      renderMermaid(force);
    });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      scheduleRender(false);
    });
    scheduleRender(false);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      scheduleRender(false);
    });
  }

  new MutationObserver(function (mutations) {
    if (
      mutations.some(function (mutation) {
        return mutation.attributeName === "data-md-color-scheme";
      })
    ) {
      scheduleRender(true);
    }
  }).observe(document.documentElement, { attributes: true });
})();
