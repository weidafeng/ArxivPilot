const SITES = [
  { url: (id) => `https://hjfy.top/arxiv/${id}` },
  { url: (id) => `https://papers.cool/arxiv/${id}` },
  { url: (id) => `https://www.alphaxiv.org/overview/${id}` },
];

function extractArxivId(url) {
  const match = url.match(/arxiv\.org\/(?:abs|pdf|html)\/([\d.]+)/);
  return match ? match[1] : null;
}

async function openTabs(id, arxivTabId) {
  const newTabIds = await Promise.all(
    SITES.map(({ url }) => chrome.tabs.create({ url: url(id), active: false }).then(t => t.id))
  );
  const groupId = await chrome.tabs.group({ tabIds: [arxivTabId, ...newTabIds] });
  await chrome.tabGroups.update(groupId, { title: id, color: "red" });
  chrome.tabs.update(newTabIds[newTabIds.length - 1], { active: true });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "arxivpilot-open",
    title: "用 ArxivPilot 打开辅助阅读",
    contexts: ["page"],
    documentUrlPatterns: [
      "https://arxiv.org/abs/*",
      "https://arxiv.org/pdf/*",
      "https://arxiv.org/html/*",
    ],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "arxivpilot-open") return;
  const id = extractArxivId(tab.url);
  if (id) openTabs(id, tab.id);
});
