# ArxivPilot

[English](README.md) | [中文](README_CN.md)

一个 Chrome 浏览器插件，在 arXiv 论文页面一键打开多个辅助阅读工具，并自动将所有标签页归为同一组。

[![Chrome Web Store](https://img.shields.io/badge/Chrome%20应用商店-立即安装-blue?logo=googlechrome)](https://chromewebstore.google.com/detail/arxivpilot/nfnhldkeooijgilacfepgbnegboploee)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-green)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

## 演示

![基础用法](videos/basic_usage.gif)

| 右键菜单支持 | 手动输入模式 |
|---|---|
| ![右键](images/right_click.png) | ![手动输入](images/basic_usage.png) |

| 幻觉翻译 (HJFY) | KIMI 解读 | AlphaXiv |
|---|---|---|
| ![HJFY](images/hjfy.png) | ![KIMI](images/papers_cool.png) | ![AlphaXiv](images/alphaxiv.png) |

## 功能

- **一键打开**：自动为当前 arXiv 论文打开 3 个辅助阅读标签页
- **标签分组**：arXiv 原文与辅助页面自动归入同一标签组，以论文 ID 命名
- **手动输入**：不在 arXiv 页面时，可在弹窗中粘贴链接或论文 ID 触发
- **多格式支持**：兼容 `arxiv.org/abs/`、`arxiv.org/pdf/`、`arxiv.org/html/` 三种 URL 格式

## 内置工具

| 工具 | 地址 |
|------|------|
| 幻觉翻译 | `hjfy.top/arxiv/{id}` |
| KIMI 解读 | `papers.cool/arxiv/{id}` |
| alphaxiv 解读 | `alphaxiv.org/overview/{id}` |

## 安装

### Chrome 应用商店（推荐）

**[➜ 前往 Chrome 应用商店安装 ArxivPilot](https://chromewebstore.google.com/detail/arxivpilot/nfnhldkeooijgilacfepgbnegboploee)**

一键安装，无需开启开发者模式。

### 开发者模式（本地加载）

1. 克隆本仓库：
   ```bash
   git clone https://github.com/weidafeng/ArxivPilot.git
   ```
2. 打开 Chrome，地址栏输入 `chrome://extensions/`
3. 右上角开启**开发者模式**
4. 点击**加载已解压的扩展程序**，选择克隆的目录

## 使用方法

1. 在 Chrome 中打开任意 arXiv 论文页面（如 `https://arxiv.org/abs/2603.16666`）
2. 点击工具栏中的 **ArXiv Reader** 图标
3. 点击**打开辅助阅读页面**，所有标签页自动打开并归组

若当前不在 arXiv 页面，在弹窗输入框中粘贴链接或论文 ID，按 **Enter** 或点击按钮即可。

## 项目结构

```
ArxivPilot/
├── manifest.json   # Chrome 插件配置（Manifest V3）
├── popup.html      # 弹窗界面
├── popup.js        # 核心逻辑
└── icons/          # 插件图标（16、48、128px）
```

## 贡献

欢迎提交 Pull Request。如有重大改动，请先开 Issue 讨论。

## 支持这个项目

ArxivPilot 完全免费开源，最好的支持方式不花一分钱：

- ⭐ **[去 Chrome 应用商店打个五星好评](https://chromewebstore.google.com/detail/arxivpilot/nfnhldkeooijgilacfepgbnegboploee/reviews)** —— 这能帮助更多研究者发现这个工具
- ⭐ **[给 GitHub 仓库点个 Star](https://github.com/weidafeng/ArxivPilot)**
- 🐛 **[提交 Bug 或功能建议](https://github.com/weidafeng/ArxivPilot/issues)**

## License

[MIT](LICENSE)
