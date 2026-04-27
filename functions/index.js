// functions/index.js

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

export function onRequest({ request }) {
  const url = new URL(request.url);

  // This function is already only for "/", but keep this guard for safety.
  if (url.pathname !== "/") {
    return fetch(request);
  }

  const targetPath = prefersSimplifiedChinese(request) ? "/zh/" : "/en/";
  const target = new URL(targetPath, url.origin);

  // Preserve query string, e.g. /?x=1 -> /zh/?x=1
  target.search = url.search;

  return Response.redirect(target.toString(), 302);
}