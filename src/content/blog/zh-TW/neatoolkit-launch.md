---
title: "我受不了了，所以自己做了一個免費工具站"
description: "受不了廣告蓋板和浮水印？我做了 NeatToolkit——免費線上工具站，不用註冊，打開就用。"
pubDate: 2026-02-12
category: building-products
tags: ["一人公司", "Side Project", "免費工具", "neatoolkit"]
lang: zh-TW
translationKey: neatoolkit-launch
draft: false
featured: true
heroImage: /images/blog/neatoolkit-launch.webp
keywords: ["免費工具", "線上工具", "neatoolkit", "NeatToolkit", "去背", "圖片壓縮", "影片壓縮", "YouTube 字幕下載", "一人公司", "Side Project"]
relatedPosts: ["nocode-to-ai-coding", "ai-coding-arbitrage"]
---

國外有很多很棒的 AI 應用影片，問題是——全部都是英文，而且動不動就十幾二十分鐘。

我不可能每支都坐下來看完。但又不想錯過好內容。

早就想把這段流程自動化——下載 YouTube 字幕，丟給 AI 做摘要，看起來有價值的再翻成中文快速掃一遍，真正有料的就做成知識卡片丟進 Obsidian。理想狀態，整個流程 5 分鐘內搞定。

但第一步就卡住了。

## 找不到順手的工具

下載 YouTube 字幕——這麼基本的需求，我竟然找不到一個順手的工具。

Google 搜「YouTube 字幕下載」，跳出來一堆工具站。

點進去，不是英文就是簡體中文。廣告蓋住半個畫面。好不容易找到功能，跳出一堆選項——SRT、VTT、SBV——我只是想要純文字而已，這些是什麼？有的還要註冊才能用。

我在想，這真的是 2026 年嗎？

不只字幕工具，台灣大部分的免費線上工具網站都是這樣。想用個簡單功能，得先跟廣告和註冊頁面搏鬥。體驗差到讓人懷疑人生。

## 乾脆自己做

反正我自己就是開發者，乾脆自己做。

字幕下載搞定之後，我想——既然字幕都拿到了，不如順手加個 AI 翻譯？再加個 AI 摘要？這樣整個學習流程就一條龍串起來了。

原本只是想解決一個小痛點，結果一口氣做了三個 YouTube 工具：字幕下載、AI 字幕翻譯、AI 影片摘要。

## 日常的痛點

不只 YouTube 工具，日常也有類似的痛點。

Facebook 貼文排版就是一個。我習慣用 Markdown 寫東西（和 AI 一起），寫完直接貼到 FB。然後發現——FB 不吃 Markdown。貼出去就會看到 `#`、`**`、`-` 這些符號，排版亂掉。

所以我做了一個 FB 貼文排版工具。英文可以用 Unicode 轉成粗體斜體，中文的話就幫你移除 Markdown 符號，標出哪裡本來有格式。至少貼出去是乾淨的。

還有特殊字體產生器。有時候想在社群貼文裡加點變化，用不同字體讓標題更醒目。結果一樣——現有工具不是廣告多就是功能陽春。

這幾個工具的起點都一樣：自己需要，現有的不滿意，就自己做。

除了自己的需求，也做了一些台灣用戶常用的工具——圖片去背、圖片壓縮、影片壓縮、影片轉 GIF。這些工具的問題都差不多：免費版不是畫質差就是加浮水印，要不然就是廣告蓋板。

## 做這些工具的原則

做這些工具的時候，我給自己定了幾個原則。

**免費，而且沒有浮水印。** 不用註冊，打開就用。（想用機器人刷的就別想了——有 Cloudflare 驗證和頻率限制。）

**隱私。** 大部分工具直接在瀏覽器裡完成，資料不會上傳。少數需要 AI 處理的功能，像翻譯和去背，用完即刪，不留資料。

**乾淨。** 沒有蓋板廣告，沒有彈窗，沒有「升級 Pro 解鎖完整功能」。

所以取名叫 NeatToolkit——Neat 就是乾淨、俐落。沒什麼崇高理念，純粹是我自己最討厭這些廣告、註冊、浮水印，做的時候就不放。

## 目前的工具

目前有 9 個工具，分成四個類別：

- **圖片工具**：[AI 去背](https://neatoolkit.com/zh-TW/image/remove-background)、[圖片壓縮](https://neatoolkit.com/zh-TW/image/compress)
- **影片工具**：[影片壓縮](https://neatoolkit.com/zh-TW/video/compress)、[影片轉 GIF](https://neatoolkit.com/zh-TW/video/to-gif)
- **YouTube 工具**：[字幕下載](https://neatoolkit.com/zh-TW/youtube/subtitle)、[字幕翻譯](https://neatoolkit.com/zh-TW/youtube/translate)、[AI 摘要](https://neatoolkit.com/zh-TW/youtube/summary)
- **文字工具**：[特殊字體產生器](https://neatoolkit.com/zh-TW/text/font-generator)、[FB 貼文排版](https://neatoolkit.com/zh-TW/text/fb-post-formatter)

還在持續加新的。

如果你也受不了那些廣告蓋板的工具站，歡迎試試看：[neatoolkit.com](https://neatoolkit.com)

用了之後覺得還缺什麼工具，也歡迎跟我說。搞不好下一個做的就是你要的。

---

*我相信在 AI 時代，一個人就能打造一間公司。我正在用自己的經歷證明這件事——從產品開發到行銷成長到生活管理，全部一個人。每一步怎麼做到的，我都寫進電子報裡。[訂閱](/zh-TW/)，一起見證。*

