(function () {
  function mermaidThemeVariables() {
    var styles = getComputedStyle(document.body);
    var background = resolveCssColor("backgroundColor", "var(--md-default-bg-color)", "#ffffff");
    var edge = resolveCssColor("color", "var(--md-mermaid-edge-color)", "#000000");
    var labelBackground = resolveCssColor("backgroundColor", "var(--md-mermaid-label-bg-color)", "#ffffff");
    var labelForeground = resolveCssColor("color", "var(--md-mermaid-label-fg-color)", "#000000");
    var nodeBackground = resolveCssColor("backgroundColor", "var(--md-mermaid-node-bg-color)", "#f9f9f9");
    var nodeForeground = resolveCssColor("color", "var(--md-mermaid-node-fg-color)", "#000000");

    return {
      background: background,
      primaryColor: nodeBackground,
      primaryTextColor: nodeForeground,
      primaryBorderColor: edge,
      lineColor: edge,
      edgeLabelBackground: labelBackground,
      tertiaryColor: labelBackground,
      tertiaryTextColor: labelForeground,
      fontFamily:
        styles.getPropertyValue("--md-text-font").trim() ||
        styles.fontFamily ||
        "Arial, sans-serif"
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
    document.querySelectorAll("pre.mermaid").forEach(function (pre) {
      var code = pre.querySelector("code");
      var source = (code || pre).textContent.trim();
      var block = document.createElement("div");

      block.className = pre.className;
      block.textContent = source;
      block.dataset.mermaidSource = source;
      pre.replaceWith(block);
    });
  }

  function prepareMermaidBlocks(force) {
    var blocks = [];

    document.querySelectorAll(".mermaid").forEach(function (block) {
      var source = block.dataset.mermaidSource || block.textContent.trim();

      if (!source) {
        return;
      }

      block.dataset.mermaidSource = source;

      if (force || block.dataset.processed) {
        block.removeAttribute("data-processed");
        block.textContent = source;
      }

      if (!block.dataset.processed) {
        blocks.push(block);
      }
    });

    return blocks;
  }

  function renderMermaid(force) {
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

    window.mermaid.run({ nodes: blocks }).catch(function (error) {
      console.warn("Mermaid render failed", error);
    });
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
