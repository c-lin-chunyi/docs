const ROOT_FILES = new Set([
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.json",
]);

function parseAcceptLanguage(header) {
  if (!header) return [];

  return header
    .split(",")
    .map((part) => {
      const [tagPart, ...params] = part.trim().split(";");
      const tag = tagPart.trim().toLowerCase();

      let q = 1;
      for (const param of params) {
        const match = param.trim().match(/^q=([0-9.]+)$/);
        if (match) q = Number(match[1]);
      }

      return { tag, q };
    })
    .filter((x) => x.tag && Number.isFinite(x.q) && x.q > 0)
    .sort((a, b) => b.q - a.q);
}

function prefersSimplifiedChinese(request) {
  const header = request.headers.get("Accept-Language");
  const langs = parseAcceptLanguage(header);

  for (const { tag } of langs) {
    // Explicit Simplified Chinese script
    if (tag === "zh-hans" || tag.startsWith("zh-hans-")) {
      return true;
    }

    // Common region fallbacks where Simplified Chinese is normally expected
    if (
      tag === "zh-cn" ||
      tag.startsWith("zh-cn-") ||
      tag === "zh-sg" ||
      tag.startsWith("zh-sg-") ||
      tag === "zh-my" ||
      tag.startsWith("zh-my-")
    ) {
      return true;
    }

    // Explicit Traditional Chinese should NOT go to /zh under your rule
    if (
      tag === "zh-hant" ||
      tag.startsWith("zh-hant-") ||
      tag === "zh-tw" ||
      tag.startsWith("zh-tw-") ||
      tag === "zh-hk" ||
      tag.startsWith("zh-hk-") ||
      tag === "zh-mo" ||
      tag.startsWith("zh-mo-")
    ) {
      return false;
    }

    // Bare "zh" is ambiguous, so do not treat it as Simplified
    if (tag === "zh") {
      return false;
    }
  }

  return false;
}

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Already localized — pass through.
  if (
    pathname === "/en" ||
    pathname === "/zh" ||
    pathname.startsWith("/en/") ||
    pathname.startsWith("/zh/")
  ) {
    return next();
  }

  // Static assets and root-level files served as-is.
  if (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/.well-known/") ||
    ROOT_FILES.has(pathname)
  ) {
    return next();
  }

  const prefix = prefersSimplifiedChinese(request) ? "/zh" : "/en";
  const targetPath = pathname === "/" ? `${prefix}/` : `${prefix}${pathname}`;

  const target = new URL(targetPath, url.origin);
  target.search = url.search;

  return Response.redirect(target.toString(), 302);
}