# Chrome Web Store 发布准备

## 一、所需素材清单

| 素材 | 规格 | 状态 |
|------|------|------|
| 插件图标 | 128×128 PNG | ✅ `icons/icon128.png` |
| 宣传图（大）| 1280×800 PNG/JPG | ❌ 需制作 |
| 宣传图（小）| 440×280 PNG/JPG | ❌ 需制作（可选） |
| 截图 1–5 张 | 1280×800 或 640×400 | ❌ 需截图 |
| 微信收款码 | — | ✅ `images/wechat_donate.jpg` |

---

## 二、截图拍摄指南

Chrome Web Store 要求截图尺寸 **1280×800** 或 **640×400**，建议至少 3 张。

### 建议截图内容

**截图 1 — 插件弹窗（arxiv 页面上）**
- 打开任意 arxiv 论文页面，如 `https://arxiv.org/abs/2312.00001`
- 点击插件图标，弹出 popup
- 截取包含 popup 的完整浏览器窗口
- 突出显示检测到的论文 ID

**截图 2 — 标签分组效果**
- 点击「打开辅助阅读页面」后
- 截取浏览器标签栏，展示红色标签组及 3 个辅助页面
- 可搭配一个标签页内容（如幻觉翻译页面）

**截图 3 — 手动输入模式**
- 在非 arxiv 页面点击插件
- 展示手动输入 arxiv ID 的界面

**截图 4 — 三个辅助页面对比（可选）**
- 并排展示幻觉翻译 / KIMI / alphaxiv 的页面效果
- 可用浏览器分屏或拼图工具合成

### 截图工具建议
- Chrome 自带截图：F12 → Ctrl+Shift+P → `screenshot`
- 系统截图：Windows `Win+Shift+S`，Mac `Cmd+Shift+4`
- 标注工具：[Canva](https://www.canva.com)、[ScreenToGif](https://www.screentogif.com)

---

## 三、Chrome Web Store 填写内容

### 简短描述（最多 132 字符）
```
One-click open translation, AI summary, and overview tabs for any arXiv paper. Tab grouping included.
```

### 详细描述（英文）
```
ArxivPilot is a lightweight Chrome extension that helps researchers read arXiv papers more efficiently.

With one click on any arXiv paper page, it automatically opens multiple reading-assistance tabs:
- 🌐 Hallucination-free translation (hjfy.top)
- 🤖 KIMI AI paper summary (papers.cool)
- 📖 AlphaXiv overview (alphaxiv.org)

All tabs are neatly grouped together with a red color label and the paper ID as the group title, making it easy to manage multiple papers.

Features:
✅ Auto-detects arXiv paper ID from abs/pdf/html URLs
✅ Manual input mode for non-arXiv pages (paste URL or paper ID)
✅ Tab grouping with one-click organization
✅ Lightweight — no background scripts, no data collection

Perfect for researchers, students, and anyone who reads arXiv papers regularly.
```

### 详细描述（中文，可补充）
```
ArXiv Reader 是一个轻量级 Chrome 插件，帮助研究者更高效地阅读 arxiv 论文。

在任意 arxiv 论文页面点击一下，自动打开多个辅助阅读标签页：
- 🌐 幻觉翻译（hjfy.top）
- 🤖 KIMI AI 论文解读（papers.cool）
- 📖 AlphaXiv 论文概览（alphaxiv.org）

所有标签页自动归入同一标签组，以红色标注、论文 ID 命名，多论文管理一目了然。

功能亮点：
✅ 自动识别 abs/pdf/html 格式的 arxiv URL
✅ 手动输入模式（支持粘贴链接或直接输入论文 ID）
✅ 无后台脚本，不收集任何数据
```

---

## 四、Buy Me a Coffee 主页文案

注册账号后，在个人介绍（About）处粘贴以下内容：

```
Hi! I'm Wei Dafeng, a researcher who spends a lot of time on arXiv 📄

I build small tools to make academic reading easier — starting with ArXiv Reader, a Chrome extension that opens multiple AI-powered reading assistants for any arXiv paper with a single click.

If my tools saved you some time, a coffee would mean a lot! ☕

Follow me:
- GitHub: https://github.com/weidafeng
- WeChat Official Account: 特里斯丹
```

---

## 五、注册/发布 Buy Me a Coffee

1. 前往 [buymeacoffee.com](https://www.buymeacoffee.com) 注册
2. 用户名建议：`weidafeng`（与 GitHub 保持一致）
3. 注册后将实际 URL 替换 `popup.html` 中的占位链接：
   - 当前：`https://www.buymeacoffee.com/weidafeng`
   - 改为你的实际页面 URL
