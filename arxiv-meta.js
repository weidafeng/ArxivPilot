// Shared helper: derive a short, human-readable title for the tab group
// from the paper's title on its arXiv abs page.

// Fetch the paper title from the abs page and return a cleaned title.
async function fetchPaperTitle(id) {
  const res = await fetch(`https://arxiv.org/abs/${id}`);
  const html = await res.text();
  const match = html.match(/<h1 class="title[^"]*">([\s\S]*?)<\/h1>/i);
  return match ? cleanTitle(match[1]) : "";
}

// Strip the "Title:" descriptor span and all remaining tags, decode entities,
// and collapse whitespace.
function cleanTitle(raw) {
  return decodeEntities(
    raw
      .replace(/<span class="descriptor">[\s\S]*?<\/span>/i, "")
      .replace(/<[^>]+>/g, "")
  )
    .replace(/\s+/g, " ")
    .trim();
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

// Best-effort group title for a paper id; falls back to the id on any failure.
async function getGroupTitle(id) {
  try {
    const title = await fetchPaperTitle(id);
    if (!title) return id;
    return deriveShortName(title) || id;
  } catch (e) {
    return id;
  }
}
