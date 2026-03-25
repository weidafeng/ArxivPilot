# 需求文档：ArXiv 多标签一键打开插件

## 问题来源

阅读 arxiv 论文时，需要借助多个工具辅助理解，例如论文 https://arxiv.org/abs/2603.16666：

1. 原文：https://arxiv.org/abs/2603.16666
2. 幻觉翻译：https://hjfy.top/arxiv/2603.16666
3. KIMI 解读：https://papers.cool/arxiv/2603.16666
4. alphaxiv 解读：https://www.alphaxiv.org/overview/2603.16666

需要手动打开多个标签页，操作繁琐。

---

## 目标

开发一个 Chrome 浏览器插件，在已打开 arxiv 论文页面时，点击插件图标，自动打开所有辅助阅读标签页。

---

## 功能需求（V1 免费版）

### 核心功能

- 用户在 arxiv 论文页面点击插件图标
- 插件自动从当前 URL 提取论文 ID（如 `2603.16666`）
- 依次在前台打开以下 3 个标签页：
  - 幻觉翻译：`https://hjfy.top/arxiv/{id}`
  - KIMI 解读：`https://papers.cool/arxiv/{id}`
  - alphaxiv 解读：`https://www.alphaxiv.org/overview/{id}`

### URL 识别规则

支持以下三种 arxiv URL 格式：

| 格式 | 示例 |
|------|------|
| 摘要页 | `https://arxiv.org/abs/2603.16666` |
| PDF 页 | `https://arxiv.org/pdf/2603.16666` |
| html 页 | `https://arxiv.org/html/2603.16666` |

若当前页面不是 arxiv 论文页，点击插件图标后给出提示（如"请先打开一篇 arxiv 论文"）。

### 标签页打开行为

- 依次在前台打开（浏览器自动切换到新标签）
- 最终停留在最后一个打开的标签页

---

## 非功能需求

- 插件体积轻量，无需后端服务
- 支持 Manifest V3（Chrome 当前标准）
- 首发平台：Chrome Web Store

---

## 未来规划（V2+）

- 支持 Firefox、Safari
- 支持自定义辅助网站列表
- 记录已读论文历史
- 付费功能 + 授权验证（服务器：腾讯云轻量，IP 美国）

---

## 技术方案概述

- 纯前端插件，无需服务器（V1）
- 使用 `chrome.tabs.create` API 打开新标签
- 通过正则从 `location.href` 提取 arxiv ID
