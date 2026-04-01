const SITES = [
  { name: "幻觉翻译", url: (id) => `https://hjfy.top/arxiv/${id}` },
  { name: "KIMI 解读", url: (id) => `https://papers.cool/arxiv/${id}` },
  { name: "alphaxiv 解读", url: (id) => `https://www.alphaxiv.org/overview/${id}` },
];

function extractArxivId(url) {
  // 支持完整 URL 或纯 ID（如 2603.16666）
  const match = url.match(/arxiv\.org\/(?:abs|pdf|html)\/([\d.]+)/) ||
                url.match(/^([\d]{4}\.[\d]{4,5})$/);
  return match ? match[1] : null;
}

async function openTabs(id, arxivTabId = null) {
  const arxivUrl = `https://arxiv.org/abs/${id}`;

  // 若没有当前 arxiv 标签，先创建一个
  const arxivTab = arxivTabId
    ? { id: arxivTabId }
    : await chrome.tabs.create({ url: arxivUrl, active: false });

  const newTabIds = await Promise.all(
    SITES.map(({ url }) => chrome.tabs.create({ url: url(id), active: false }).then(t => t.id))
  );

  const groupId = await chrome.tabs.group({
    tabIds: [arxivTab.id, ...newTabIds],
  });

  await chrome.tabGroups.update(groupId, { title: id, color: "red" });
  chrome.tabs.update(newTabIds[newTabIds.length - 1], { active: true });
  window.close();
}

const statusEl = document.getElementById("status");
const manualEl = document.getElementById("manual");
const urlInput = document.getElementById("urlInput");
const btn = document.getElementById("btn");

document.getElementById("donateLink").addEventListener("click", (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: chrome.runtime.getURL("donate.html") });
  window.close();
});

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  const id = extractArxivId(tab.url);
  if (id) {
    statusEl.textContent = `论文 ID：${id}`;
    btn.disabled = false;
    btn.onclick = () => openTabs(id, tab.id);
  } else {
    statusEl.textContent = "未检测到 arxiv 论文，请手动输入：";
    manualEl.style.display = "block";
    urlInput.focus();

    urlInput.addEventListener("input", () => {
      const inputId = extractArxivId(urlInput.value.trim());
      urlInput.classList.toggle("invalid", urlInput.value.length > 0 && !inputId);
      btn.disabled = !inputId;
    });

    urlInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !btn.disabled) btn.click();
    });

    btn.onclick = () => {
      const inputId = extractArxivId(urlInput.value.trim());
      if (inputId) openTabs(inputId);
    };
  }
});
