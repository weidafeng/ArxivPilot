// Shared helper: derive a short, human-readable title for the tab group
// from a paper's title on its arXiv abs page.

const FETCH_TIMEOUT_MS = 6000;
const MAX_ATTEMPTS = 2;

// Fetch with a hard timeout so a stalled request can never hang the rename.
function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(timer));
}

// Fetch the abs-page HTML, retrying once on transient failures. Slow/blocked
// access to arxiv.org is common and used to silently downgrade the group title
// back to the raw arXiv id.
async function fetchAbsHtml(id) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetchWithTimeout(`https://arxiv.org/abs/${id}`, FETCH_TIMEOUT_MS);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      lastErr = e;
      if (attempt < MAX_ATTEMPTS) await new Promise((r) => setTimeout(r, 400 * attempt));
    }
  }
  throw lastErr;
}

function decodeEntities(str) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return str.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return named[e.toLowerCase()] ?? m;
  });
}

// Strip the "Title:" descriptor span and any remaining tags, decode entities,
// and collapse whitespace.
function stripTitleHtml(raw) {
  return decodeEntities(
    raw.replace(/<span class="descriptor">[\s\S]*?<\/span>/i, "").replace(/<[^>]+>/g, "")
  )
    .replace(/\s+/g, " ")
    .trim();
}

// Prefer the stable citation_title meta (already clean plain text), then
// <h1 class="title">, then the <title> tag ("[id] Paper Title").
function extractTitle(html) {
  const metaTag = html.match(/<meta[^>]+citation_title[^>]*>/i);
  if (metaTag) {
    const content = metaTag[0].match(/content=["']([^"']*)["']/i);
    if (content && content[1].trim()) {
      return decodeEntities(content[1]).replace(/\s+/g, " ").trim();
    }
  }

  const h1 = html.match(/<h1 class="title[^"]*">([\s\S]*?)<\/h1>/i);
  if (h1) {
    const t = stripTitleHtml(h1[1]);
    if (t) return t;
  }

  const docTitle = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (docTitle) {
    const t = decodeEntities(docTitle[1]).replace(/^\s*\[[^\]]*\]\s*/, "").trim();
    if (t) return t;
  }
  return "";
}

// Turn inline math into plain text, e.g. "$τ_0$-VLA" -> "τ0-VLA".
function stripLatex(str) {
  return str.replace(/\$([^$]*)\$/g, (_, inner) =>
    inner.replace(/\\[a-zA-Z]+/g, "").replace(/[{}_]/g, "")
  );
}

// Abbreviation rule: use the text before the first colon when it is short
// enough to be a name (e.g. "τ0-VLA", "LaWAM"); otherwise use the first 8 chars.
function deriveShortName(title) {
  const cleaned = stripLatex(title).trim();
  const colon = cleaned.match(/^([^:：]+)\s*[:：]/);
  const prefix = colon ? colon[1].trim() : "";
  if (prefix && prefix.length <= 25) return prefix;
  return cleaned.slice(0, 8).trim() || title.slice(0, 8).trim();
}

// Best-effort group title for a paper id; falls back to the id only after
// retry + full title parsing have been exhausted.
async function getGroupTitle(id) {
  try {
    const html = await fetchAbsHtml(id);
    const title = extractTitle(html);
    return (title && deriveShortName(title)) || id;
  } catch (e) {
    return id;
  }
}
