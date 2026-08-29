# frontmatter 備料（發布階段用，blog-metadata 時合併）

> FAQ 走站上慣例：frontmatter `faq:` 結構（比照 openclaw-deploy-cost-guide.md），不放正文。
> 2026-08-29 從 v4 正文移出，答案已改為純文字（frontmatter 不吃 markdown 連結）。

```yaml
faq:
  - question: "CCA-F 跟 CCAR-F 是同一張證照嗎？"
    answer: "是。這張證照 2026 年 3 月首發時通稱 CCA-F（也有人寫 CCAF），7 月上 Pearson VUE 時正式考試代碼定為 CCAR-F。舊稱和新代碼指的都是 Claude Certified Architect – Foundations，不是兩張證照。"
  - question: "個人可以報名 CCAR-F 嗎？"
    answer: "目前不行。報名資格限 Claude Partner Network 組織的成員，要用組織的 email 報名，個人 email 過不了驗證。想考的話，得透過已經在 Partner Network 裡的組織。"
  - question: "CCAR-F 考試是英文還是中文？"
    answer: "只有英文：考題、監考、客服全程英文，線上場次還禁止使用瀏覽器翻譯。英文閱讀速度要當成一個獨立的準備項目來練。"
  - question: "CCAR-F 沒有考古題要怎麼準備？"
    answer: "官方素材只有 Exam Guide（含 12 題樣題和 4 組練習）。可行的做法是照官方 domain 配分用 Claude 生仿真題自己練、錯題逐題檢討機制，再用第三方模考站驗程度。"
  - question: "Anthropic Academy 的免費課程證書跟 CCAR-F 有什麼不同？"
    answer: "免費課程給的是線上課結業證書，不用監考；CCAR-F 是 Pearson VUE 監考的正式認證，兩者是不同層級的東西。四張監考認證的分工和報名細節，見站內的 Anthropic Claude 證照總整理一文。"
  - question: "CCAR-F 考幾題、考多久、幾分及格？"
    answer: "60 題單選、120 分鐘，滿分 1,000 分、720 分及格。"
```

## 其他 frontmatter 欄位（blog-metadata 階段決定）

- title / description / pubDate / category / tags / lang / heroImage / translationKey / focusKeyphrase / relatedPosts（欄位集比照母文 anthropic-claude-certifications.md）
- focusKeyphrase 候選（SEO 輪結論）：主「ccaf 考試」家族；避開母文的「claude 證照」
- relatedPosts：anthropic-claude-certifications（母文，雙向內鏈之一）
- 正文 H1 發布時移除（title 由 frontmatter 扛）
