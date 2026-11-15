---
title: "Claude 證照是什麼？Anthropic 四張官方認證怎麼考、和免費證書差在哪"
description: "Claude 證照目前有四張：CCAO-F、CCDV-F、CCAR-F、CCAR-P，$99 到 $175、Pearson VUE 監考。照四份官方考試指南整理每張的配分和建議經驗，一張流程圖幫你選該考哪一張，再走一遍現行的報名流程。"
pubDate: 2026-07-20
updatedDate: 2026-11-15
category: building-products
topics: ["ai-practice"]
tags: ["Anthropic 認證", "Claude 證照", "CCAR-F", "CCAO-F", "AI 證照", "iPAS", "企業 AI"]
lang: zh-TW
featured: false
heroImage: /images/blog/anthropic-claude-certifications.webp
translationKey: anthropic-claude-certifications
relatedPosts: ["ccar-f-exam-experience.md", "claude-code-tutorial.md", "enterprise-ai-adoption-bottleneck.md"]
focusKeyphrase: "Claude 證照"
faq:
  - question: "個人能考 Claude 證照嗎？"
    answer: "能考，但要透過 Anthropic 的夥伴組織報名，個人 email 報不了。官方只開放 Claude Partner Network（Anthropic 給服務商的夥伴計畫）成員報名。四張都從 Anthropic 的夥伴學習平台 Partner Academy 報名，在 Pearson VUE 排考時付款。公司不是夥伴的話，實務上要取得夥伴組織的帳號。卡在這一關，本站的 CCAR-F 考試心得文章後段有協助管道。"
  - question: "Claude 證照要多少錢、考多久？"
    answer: "四張的報名費是 $99 到 $175 美元，每張都考 120 分鐘。CCAO-F $99，CCDV-F 和 CCAR-F 各 $125，CCAR-P $175。題數依證照不同，從 53 到 63 題，都是單選和複選混著出的選擇題。過線分數統一是 720/1000，由 Pearson VUE 監考，線上或考場都能考。"
  - question: "四張 Claude 證照要照順序考嗎？"
    answer: "不用，四張都沒有先修條件，可以直接報任何一張。要選哪一張，可以拿自己的工作對照官方考試指南寫的建議經驗，例如工作上常用 Claude、不寫程式的人對應 CCAO-F，有 3 年以上系統架構經驗、加上半年以上 Claude 上線經驗的對應 CCAR-P。重考次數也按張計算，一張沒過不影響報別張。"
  - question: "Claude 證照和 Anthropic 免費課程證書有什麼不同？"
    answer: "免費證書是線上課程的修畢紀錄，四張 Claude 證照是有監考的標準化考試。免費課程放在 Anthropic 官方學習平台上，有二十多門，修完就發結業證書，沒有監考、沒有統一過線標準，也沒有 Credly 徽章。四張證照由 Pearson VUE 第三方監考，有全球統一的計分系統，通過後發 Credly 數位徽章。看到「Anthropic 證書」的標題，先確認講的是哪一種。"
---

Claude 證照是 Claude 開發商 Anthropic 推出的官方職業認證：Pearson VUE 第三方監考、Credly 數位徽章、效期 12 個月，2026 年 3 月推出第一張、7 月擴成四張，$99 到 $175。四張都有官方考試指南（Exam Guide），寫明考試分成哪幾個領域、各佔幾成題目。Claude 證照和社群上瘋傳的「免費 Claude 證書」不是同一回事。這篇把該考哪一張、每張考什麼、跟免費證書差在哪，一次講清楚。

## 一張兩萬人搶考的 AI 證照

2026 年 7 月，經濟部產業發展署[公布](https://wp.taronews.tw/2026/07/04/1202748/)一個數字：2025 年才首度開辦的 [iPAS「AI 應用規劃師」](https://www.ipas.org.tw/AIAP)，累計已有約 2.1 萬人報考、8,464 人通過。初級報名費每科 NT$400（2026–27 年度優惠價）。

「會用 AI」這件事，正在從履歷上的自述，變成有監考、有及格線、有效期的憑證。

---

## 台灣的 AI 證照地圖，多了一格

目前在台灣考得到的 AI 證照，大致落在三層：

| 類型 | 代表 | 發證方 | 費用 |
|---|---|---|---|
| 政府鑑定 | iPAS AI 應用規劃師（初/中級） | 經濟部產業發展署 | 每科 NT$400–500（2026–27 優惠價） |
| 民間檢定 | [TQC 生成式 AI 應用與技術](https://www.tqc.org.tw/TQCNet/CertificateDetail.aspx?CODE=D58axVVGrZzEkHFRcoZY+w%3D%3D) | 電腦技能基金會 | NT$1,200/科 |
| 國際雲端大廠 | Microsoft Azure AI 認證、[Google Generative AI Leader](https://cloud.google.com/learn/certification/generative-ai-leader)、[AWS AI Practitioner](https://aws.amazon.com/certification/certified-ai-practitioner/) | 各雲端平台 | $99–200 美元 |

2026 年，這張地圖多了第四格：**模型原廠自己發證**。而三大模型陣營在這一格的進度，差距很大：

<figure class="fg fg-cols">
<div class="c is-em"><b>Anthropic</b><strong>夥伴組織可報</strong><span>Claude 的四張監考認證，透過 Claude Partner Network 的夥伴組織報名，Pearson VUE 考場或線上，$99–175。</span><em>CCAO-F、CCDV-F、CCAR-F、CCAR-P</em></div>
<div class="c"><b>OpenAI</b><strong>只限受邀企業</strong><span>正式認證只開放給受邀的 ChatGPT Enterprise、Edu 工作區。</span><em>一般人拿得到的：Academy 免費課程證書，沒有監考</em></div>
<div class="c"><b>Google</b><strong>不是原廠名義</strong><span>監考認證都掛在 Google Cloud 名下，例如 Generative AI Leader（$99）。</span><em>Gemini 教育認證免費，官方沒寫有監考</em></div>
</figure>

兩個值得注意的差別：一般人目前從 OpenAI 拿得到的，是[「上完課」的證明](https://openai.com/index/openai-certificate-courses/)，不是「考過試」的證明。Google 有[監考認證](https://cloud.google.com/learn/certification/generative-ai-leader)、但發證的是雲端部門，考的是「在 Google Cloud 上用 AI」，不是 Gemini 模型生態本身。

把「模型原廠親自出題、第三方監考」整套跑起來、又有正式管道報名的，目前只有 Claude 的開發商、以企業客戶為主力的 Anthropic。

2026 年 3 月，Anthropic 隨 Claude Partner Network 發布第一張認證：Claude Certified Architect - Foundations。當時[新聞稿](https://www.anthropic.com/news/claude-partner-network)裡有一句很多人沒注意到的預告：「*Later this year, we'll introduce additional certifications for sellers, architects, and developers.*」四個月後，那個「later」先落地了一部分：一張，變四張。

---

## 四張 Claude 證照是什麼

Anthropic 認證體系目前共四張。根據 Anthropic 夥伴學習平台 Partner Academy 的 [FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications)、[Pearson VUE 頁面](https://www.pearsonvue.com/us/en/anthropic.html)和四份官方考試指南：

| 證照 | 題數 | 建議經驗 | 價格 | 考試指南 |
|---|---|---|---|---|
| [Associate - Foundations](https://anthropic-partners.skilljar.com/claude-certified-associate-foundations-certification)（CCAO-F） | 60 | 工作上常用 Claude，不用寫程式 | $99 | [PDF](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542847%2FClaude+Certified+Associate+%E2%80%93+Foundations+Exam+Guide.pdf) |
| [Developer - Foundations](https://anthropic-partners.skilljar.com/claude-certified-developer-foundations-certification)（CCDV-F） | 53 | 1–5 年開發＋半年 Claude | $125 | [PDF](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542875%2FClaude+Certified+Developer+%E2%80%93+Foundations+Exam+Guide.pdf) |
| [Architect - Foundations](https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification)（CCAR-F） | 60 | 半年 Claude 實作（API、SDK、MCP） | $125 | [PDF](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf) |
| [Architect - Professional](https://anthropic-partners.skilljar.com/claude-certified-architect-professional-certification)（CCAR-P） | 63 | 3 年架構＋半年 Claude 上線 | $175 | [PDF](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542810%2FClaude+Certified+Architect+%E2%80%93+Professional+Exam+Guide.pdf) |

表中的題數和建議經驗出自現行的考試指南（v1.0，2026 年 7 月版）。

其中三張年底會換內容：CCAO-F、CCDV-F、CCAR-P 從 12 月 7 日起換新版考試（[Pearson VUE 公告](https://www.pearsonvue.com/us/en/anthropic.html)）。12 月 6 日前考的人照現行版準備就好，後面「官方考試指南怎麼讀」有整理怎麼挑版本。

---

## 該考哪一張？照官方建議經驗選

選哪一張，最可靠的依據是四份指南裡寫的建議經驗：官方預設剛好能考過的人，平常在做什麼、做了多久。拿自己的工作去對這段，比看證照名稱準。

<style>.ar .ar-body .cert-flow { margin: var(--space-7) 0; }.ar .ar-body .cert-flow svg { display: block; width: 100%; height: auto; overflow: visible; }.ar .ar-body .cert-flow .narrow { display: none; }@media (max-width: 700px) { .ar .ar-body .cert-flow .wide { display: none; } .ar .ar-body .cert-flow .narrow { display: block; } }.ar .ar-body .cert-flow .dm { fill: var(--paper); stroke: var(--ink); stroke-width: 1.5; }.ar .ar-body .cert-flow .bx { fill: var(--paper); stroke: var(--ink); stroke-width: 1.5; }.ar .ar-body .cert-flow a:hover .bx { stroke: var(--terra); }.ar .ar-body .cert-flow .cn { fill: none; stroke: var(--muted); stroke-width: 1.5; }.ar .ar-body .cert-flow .mh { fill: var(--muted); }.ar .ar-body .cert-flow .mk { fill: var(--paper); }.ar .ar-body .cert-flow text { font-family: var(--ar-text, 'Noto Serif TC', serif); fill: var(--ink); }.ar .ar-body .cert-flow .dq, .ar .ar-body .cert-flow .bn { font-weight: 700; }.ar .ar-body .cert-flow .bc { font-family: 'JetBrains Mono', ui-monospace, monospace; fill: var(--terra-deep); letter-spacing: 0.1em; }.ar .ar-body .cert-flow .bd { fill: var(--muted); }.ar .ar-body .cert-flow .lb { fill: var(--terra-deep); }.ar .ar-body .cert-flow .wide .dq { font-size: 24px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .wide .bn { font-size: 26px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .wide .bc { font-size: 16px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .wide .bd, .ar .ar-body .cert-flow .wide .lb { font-size: 20px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .narrow .dq { font-size: 26px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .narrow .bn { font-size: 22px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .narrow .bc { font-size: 17px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .narrow .bd { font-size: 21px; } .ar .ar-body .cert-flow .narrow .lb { font-size: 20px; } /* ds-local: svg user units */</style>
<figure class="fg cert-flow"><p class="fg-h">該考哪一張 Claude 證照</p><div role="img" aria-label="決策流程：平常不會用 Claude 動手做系統，考 CCAO-F。會做系統、有 3 年以上系統架構經驗，考 CCAR-P。會做系統、沒有 3 年架構經驗：主要寫程式把 Claude 串進應用的考 CCDV-F，主要設計整套架構的考 CCAR-F。"><svg class="wide" viewBox="0 0 1034 810" aria-hidden="true"><defs><marker id="fa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mh" d="M0,1 L10,5 L0,9 z"/></marker></defs><path class="cn" d="M330,100 H576" marker-end="url(#fa)"/><path class="cn" d="M330,330 H576" marker-end="url(#fa)"/><path class="cn" d="M330,560 H576" marker-end="url(#fa)"/><path class="cn" d="M180,176 V250" marker-end="url(#fa)"/><path class="cn" d="M180,406 V480" marker-end="url(#fa)"/><path class="cn" d="M180,636 V724 Q180,732 188,732 H576" marker-end="url(#fa)"/><rect class="mk" x="427" y="66" width="56" height="28"/><text class="lb" x="455" y="88" text-anchor="middle">不會</text><rect class="mk" x="437" y="296" width="36" height="28"/><text class="lb" x="455" y="318" text-anchor="middle">有</text><rect class="mk" x="387" y="526" width="136" height="28"/><text class="lb" x="455" y="548" text-anchor="middle">寫程式串應用</text><rect class="mk" x="188" y="199" width="36" height="28"/><text class="lb" x="196" y="221" text-anchor="start">會</text><rect class="mk" x="188" y="429" width="56" height="28"/><text class="lb" x="196" y="451" text-anchor="start">沒有</text><rect class="mk" x="332" y="698" width="136" height="28"/><text class="lb" x="400" y="720" text-anchor="middle">設計整套架構</text><polygon class="dm" points="180,24 330,100 180,176 30,100"/><text class="dq" x="180" y="93" text-anchor="middle">會用 Claude</text><text class="dq" x="180" y="123" text-anchor="middle">做系統嗎？</text><polygon class="dm" points="180,254 330,330 180,406 30,330"/><text class="dq" x="180" y="323" text-anchor="middle">有 3 年以上</text><text class="dq" x="180" y="353" text-anchor="middle">架構經驗嗎？</text><polygon class="dm" points="180,484 330,560 180,636 30,560"/><text class="dq" x="180" y="553" text-anchor="middle">主要在</text><text class="dq" x="180" y="583" text-anchor="middle">做什麼？</text><a href="#ccao-f最看重判斷輸出對不對"><rect class="bx" x="580" y="30" width="424" height="140" rx="4"/><text class="bc" x="604" y="66">CCAO-F</text><text class="bn" x="604" y="100">Associate</text><text class="bd" x="604" y="132">工作上常用 Claude，</text><text class="bd" x="604" y="158">不需要開發或 API 經驗</text></a><a href="#ccar-p多考治理和溝通也考-rag"><rect class="bx" x="580" y="260" width="424" height="140" rx="4"/><text class="bc" x="604" y="296">CCAR-P</text><text class="bn" x="604" y="330">Architect – Professional</text><text class="bd" x="604" y="362">3 年以上系統架構或平台工程，</text><text class="bd" x="604" y="388">半年以上 Claude 上線經驗</text></a><a href="#ccdv-f三分之一的題目在應用與整合"><rect class="bx" x="580" y="490" width="424" height="140" rx="4"/><text class="bc" x="604" y="526">CCDV-F</text><text class="bn" x="604" y="560">Developer</text><text class="bd" x="604" y="592">1–5 年軟體開發、半年以上 Claude 實作，</text><text class="bd" x="604" y="618">會 Python 或 TypeScript</text></a><a href="#ccar-fagent-架構佔最多題目都包在情境裡"><rect class="bx" x="580" y="662" width="424" height="140" rx="4"/><text class="bc" x="604" y="698">CCAR-F</text><text class="bn" x="604" y="732">Architect – Foundations</text><text class="bd" x="604" y="764">半年以上用 Claude API、Agent SDK、</text><text class="bd" x="604" y="790">Claude Code、MCP 做東西</text></a></svg><svg class="narrow" viewBox="0 0 600 1132" aria-hidden="true"><defs><marker id="fn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mh" d="M0,1 L10,5 L0,9 z"/></marker></defs><path class="cn" d="M260,86 H428 Q436,86 436,94 V136" marker-end="url(#fn)"/><path class="cn" d="M260,380 H428 Q436,380 436,388 V430" marker-end="url(#fn)"/><path class="cn" d="M260,674 H428 Q436,674 436,682 V724" marker-end="url(#fn)"/><path class="cn" d="M135,156 V306" marker-end="url(#fn)"/><path class="cn" d="M135,450 V600" marker-end="url(#fn)"/><path class="cn" d="M135,744 V1024 Q135,1032 143,1032 H272" marker-end="url(#fn)"/><rect class="mk" x="320" y="52" width="56" height="28"/><text class="lb" x="348" y="74" text-anchor="middle">不會</text><rect class="mk" x="330" y="346" width="36" height="28"/><text class="lb" x="348" y="368" text-anchor="middle">有</text><rect class="mk" x="280" y="640" width="136" height="28"/><text class="lb" x="348" y="662" text-anchor="middle">寫程式串應用</text><rect class="mk" x="143" y="219" width="36" height="28"/><text class="lb" x="151" y="241" text-anchor="start">會</text><rect class="mk" x="143" y="513" width="56" height="28"/><text class="lb" x="151" y="535" text-anchor="start">沒有</text><rect class="mk" x="149" y="1000" width="124" height="26"/><text class="lb" x="211" y="1020" text-anchor="middle">設計整套架構</text><polygon class="dm" points="135,16 260,86 135,156 10,86"/><text class="dq" x="135" y="78" text-anchor="middle">會用 Claude</text><text class="dq" x="135" y="113" text-anchor="middle">做系統嗎？</text><polygon class="dm" points="135,310 260,380 135,450 10,380"/><text class="dq" x="135" y="372" text-anchor="middle">有 3 年以上</text><text class="dq" x="135" y="407" text-anchor="middle">架構經驗嗎？</text><polygon class="dm" points="135,604 260,674 135,744 10,674"/><text class="dq" x="135" y="666" text-anchor="middle">主要在</text><text class="dq" x="135" y="701" text-anchor="middle">做什麼？</text><a href="#ccao-f最看重判斷輸出對不對"><rect class="bx" x="276" y="140" width="320" height="184" rx="4"/><text class="bc" x="294" y="174">CCAO-F</text><text class="bn" x="294" y="206">Associate</text><text class="bd" x="294" y="240">工作上常用 Claude，</text><text class="bd" x="294" y="269">不需要開發或</text><text class="bd" x="294" y="298">API 經驗</text></a><a href="#ccar-p多考治理和溝通也考-rag"><rect class="bx" x="276" y="434" width="320" height="184" rx="4"/><text class="bc" x="294" y="468">CCAR-P</text><text class="bn" x="294" y="500">Architect – Professional</text><text class="bd" x="294" y="534">3 年以上系統架構或</text><text class="bd" x="294" y="563">平台工程，</text><text class="bd" x="294" y="592">半年以上 Claude 上線經驗</text></a><a href="#ccdv-f三分之一的題目在應用與整合"><rect class="bx" x="276" y="728" width="320" height="184" rx="4"/><text class="bc" x="294" y="762">CCDV-F</text><text class="bn" x="294" y="794">Developer</text><text class="bd" x="294" y="828">1–5 年軟體開發、</text><text class="bd" x="294" y="857">半年以上 Claude 實作，</text><text class="bd" x="294" y="886">會 Python 或 TypeScript</text></a><a href="#ccar-fagent-架構佔最多題目都包在情境裡"><rect class="bx" x="276" y="940" width="320" height="184" rx="4"/><text class="bc" x="294" y="974">CCAR-F</text><text class="bn" x="294" y="1006">Architect – Foundations</text><text class="bd" x="294" y="1040">半年以上用 Claude API、</text><text class="bd" x="294" y="1069">Agent SDK、</text><text class="bd" x="294" y="1098">Claude Code、MCP 做東西</text></a></svg></div><p class="fg-note">照四份考試指南的「建議經驗」簡化，不是報考門檻。四張都沒有先修條件，可以直接報任何一張。點方框跳到那張的考試範圍。</p></figure>

最難分的是 CCDV-F 和 CCAR-F，兩張都考 agent 和工具。CCDV-F 考的是把 Claude 寫進程式的功夫：指南建議要會 Python 或 TypeScript，三分之一的題目在「應用與整合」，其中也包括 REST API、版本控制這類軟體工程基本功。CCAR-F 考的是架構上的判斷和取捨，指南明寫不考特定程式語言或框架的實作細節（設定工具和 schema 用得到的除外），配分最重的是 agent 架構，[Claude Code](/zh-TW/blog/claude-code-tutorial/) 的設定也單獨佔兩成。

選好之後要注意一件事：報名要透過 Anthropic 的夥伴組織，個人帳號報不了名。公司不是夥伴怎麼辦，文末有整理。

---

## 「免費 Claude 證書」和四張付費證照差在哪？

先處理一個你很可能已經遇過的混淆。

在社群上廣泛流傳的「免費拿 Claude 證書」，指的是 [Anthropic 官方學習平台](https://anthropic.skilljar.com/)上的免費課程結業證書。平台上的課有二十多門，從 Claude Code in Action、Introduction to Model Context Protocol、Building with the Claude API，到給非技術職的 AI Fluency 系列，免費修、修完發課程結業證書。

這些課程結業證書，跟本文介紹的四張 Claude 證照（CCAO-F / CCDV-F / CCAR-F / CCAR-P），完全不是同一件事。

前者是線上課程的修畢紀錄，沒有監考、沒有統一過線標準、沒有 Credly 徽章。後者是 Pearson VUE 第三方監考的標準化測驗，有全球統一的計分系統。

社群上常把兩者混為一談。讀者在看到「Anthropic 證書」的標題時，值得先確認講的是哪一種。

---

## CCAF、CCA-F、CCAR-F 是同一張證照嗎？

如果你查過 Architect - Foundations 這張的資料，大概已經被縮寫搞混過。沿革是這樣：

2026 年 3 月首發時，Anthropic 新聞稿只用全名，沒給正式縮寫。官方 email 和[短網址](https://clau.de/CCAF)用的是 **CCAF**，台灣媒體和社群多半寫 **CCA-F**。7 月證照擴成四張、考試搬上 Pearson VUE 之後，Architect Foundations 才有了正式考試代碼 **CCAR-F**。多出來的 R，看起來是為了跟同時推出的 Associate（CCAO-F）區分。

三種寫法指的是同一張證照，只是不同時期的稱呼。之後對外標注（例如 LinkedIn），用現行官方代碼 CCAR-F 最精確。

---

## 為什麼一次出四張

四張證照是照職位切的：不寫程式的人一張、開發者一張、架構師兩張（初階和資深）。Anthropic 7 月發布時，[官方公告](https://claude.com/blog/four-role-based-claude-certifications)就直接把它們叫做「依職位設計的認證」（role-based certifications）。

最值得注意的是給非技術職的 CCAO-F（Associate）。負責評估輸出品質的 PM、做流程改善的營運、規劃內訓的 HR，Anthropic 也為他們設了一張考試，等於把這些人算進 [AI 導入](/zh-TW/blog/enterprise-ai-adoption-bottleneck/)要訓練的對象。

這套分工寫在官方文件裡。[CCAO-F 的考試指南](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542847%2FClaude+Certified+Associate+%E2%80%93+Foundations+Exam+Guide.pdf)把「看得出極限」列為 Associate 該有的能力：遇到比較複雜或技術性的工作，要轉給 Claude Architect 和 Developer。設計企業級架構、做系統整合，指南也明寫不在這張的範圍，屬於另外兩種證照。

Anthropic 在 3 月的[新聞稿](https://www.anthropic.com/news/claude-partner-network)預告過，年內會推出給 sellers 的認證。到 11 月中，官方列出的仍是這四張。

AI 服務市場的專業分工，開始有了書面形式。

---

## 共通規則：幾個制度細節

四張認證共用一套制度框架，根據 [Anthropic Partner Academy FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications)（官方一手來源）和四份考試指南：

<figure class="fg fg-steps">
<p class="fg-h">從報名到拿證</p>
<div class="s"><strong>下載考試指南</strong><span>四份都公開，不用登入就能下載。先看考什麼、自己的經驗對不對得上。</span></div>
<div class="s"><strong>在 Partner Academy 點 Register</strong><span>用夥伴組織的帳號登入 Partner Academy，從要考的那張認證頁點 Register。</span></div>
<div class="s"><strong>確認姓名</strong><span>報名的姓名要跟政府核發的證件完全一致。台灣身分證沒有英文姓名，實務上用護照的英文拼音。</span></div>
<div class="s"><strong>到 Pearson VUE 排考</strong><span>選考試，再選線上監考（OnVUE）或考場、同意考試政策、選語言和時段。考前 48 小時都還能改期或取消，超過時限報名費不退。</span></div>
<div class="s"><strong>在 Pearson 結帳</strong><span>定價 $99 到 $175。Pearson 的確認信要留著，線上考試的開考連結在信裡。</span></div>
<div class="s"><strong>考完拿成績單</strong><span>寫通過與否和分數。</span></div>
<div class="s"><strong>拿 Credly 徽章</strong><span>通過後發數位徽章，效期 12 個月。</span></div>
<div class="s"><strong>到期前免費續證</strong><span>在 Partner Academy 做一份不用監考的線上評量，逾期要全額重考。</span></div>
</figure>

全部由 Pearson VUE 監考（線上或考場），過線分數統一 720/1000，通過後發 Credly 數位徽章。

**考過之後：續證。** 證照效期 12 個月。到期前在 Partner Academy 做一份不用監考的線上評量，就能免費續證，不用再去 Pearson VUE 考一次。過期沒續，就要付全額重考整張考試。有一個例外，四份指南都寫了：考試內容大改時，Anthropic 可以要求持證者重考整張考試，不能用續證的線上評量代替。

**沒考過：等一段時間才能再考。** 第一次沒過要等 14 天，第二次 30 天，第三次 90 天。同一張考試 12 個月內最多考 4 次，每次都要重付報名費。次數按張計算，一張沒過不影響報別張。

另外幾條規則，關係到進不進得了考場、報名費退不退。考試當天要出示政府核發、附照片、還在效期內的證件，姓名跟報名資料對不上，當天就不能考，報名費也不退。報名的姓名要改，在 Partner Academy 的個人資料點 Update Exam Profile 自己改。一年只能改一次，確認資料後就鎖定，自助額度用完才找 Anthropic 認證客服。排好的考試沒到場，報名費不退。

---

## 官方考試指南怎麼讀

有心備考的人，四份官方考試指南比任何第三方攻略都值得優先讀。PDF 不用登入就能下載，直連在上面的表格裡，[Partner Academy 認證總覽頁](https://anthropic-partners.skilljar.com/page/partner-certifications)也找得到。

四份指南有幾個共同的部分。四張都是 120 分鐘的選擇題，單選和複選混著出，每題會寫要選幾個。先看這三塊：

- 領域配分：每個領域佔幾成題目。
- 範例題：附答案和理由，看得出出題的樣子和難度。
- 成績單的說明：除了通過與否和分數，還會列每個領域的答對率，沒過的人看得出要補哪一塊。

讀哪一版，看考試日期：

<div class="fg fg-key">
<p class="fg-h">照考試日期，讀哪一版指南</p>
<div class="k">CCAO-F、CCDV-F、CCAR-P 在 2026-12-06 以前考：讀現行的 v1.0。</div>
<div class="k">同樣這三張，2026-12-07 以後考：讀 11 月 17 日起上架的新版指南。</div>
<div class="k">CCAR-F 不在這次的換版名單上，照讀現行的 v1.0。</div>
</div>

---

## 四張各考什麼

四張的領域數不一樣：CCAO-F 7 個領域、CCDV-F 8 個、CCAR-F 5 個、CCAR-P 7 個。下面每張的長條都以 35% 為滿格，四張可以直接互相比。

### CCAO-F：最看重判斷輸出對不對

[CCAO-F](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542847%2FClaude+Certified+Associate+%E2%80%93+Foundations+Exam+Guide.pdf) 60 題、7 個領域，配分最重的是「評估與驗證輸出」（Output Evaluation and Validation），21%，比下指令的 14% 還多。給非技術職的這張，最看重判斷 Claude 的輸出對不對：抓出幻覺、前後矛盾和偏誤，也要知道什麼時候該交給人複核。

<figure class="fg fg-bars">
<p class="fg-h">CCAO-F 各領域配分（60 題）</p>
<div class="row"><span class="l">下指令與執行任務</span><span class="bar" style="--v:40"></span><span class="n">14<small>%</small></span></div>
<div class="row is-em"><span class="l">評估與驗證輸出</span><span class="bar" style="--v:60"></span><span class="n">21<small>%</small></span></div>
<div class="row"><span class="l">選產品與模型</span><span class="bar" style="--v:34"></span><span class="n">12<small>%</small></span></div>
<div class="row"><span class="l">流程整合與方案設計</span><span class="bar" style="--v:46"></span><span class="n">16<small>%</small></span></div>
<div class="row"><span class="l">設定與知識管理</span><span class="bar" style="--v:34"></span><span class="n">12<small>%</small></span></div>
<div class="row"><span class="l">治理、風險與負責任使用</span><span class="bar" style="--v:43"></span><span class="n">15<small>%</small></span></div>
<div class="row"><span class="l">排錯與優化</span><span class="bar" style="--v:29"></span><span class="n">10<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，四張證照用同一個滿格。英文原名依序是 Prompting and Task Execution／Output Evaluation and Validation／Product and Model Selection／Workflow Integration and Solution Design／Configuration and Knowledge Management／Governance, Risk, and Responsible Use／Troubleshooting and Optimization。</p>
</figure>

指南建議的準備方式之一，是自己建一個 Project，放進指示和知識來源，再檢查產出有沒有錯、有沒有偏誤。

### CCDV-F：三分之一的題目在應用與整合

[CCDV-F](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542875%2FClaude+Certified+Developer+%E2%80%93+Foundations+Exam+Guide.pdf) 是四張裡題數最少的，53 題、8 個領域。「應用與整合」（Applications and Integration）一個領域就佔 33.1%，底下最重的三個子項是 Claude 應用的設計（8.6%）、一般的軟體工程基本功（7.4%），和 Claude API 本身怎麼運作（6.8%）。

<figure class="fg fg-bars">
<p class="fg-h">CCDV-F 各領域配分（53 題）</p>
<div class="row"><span class="l">Agent 與工作流程</span><span class="bar" style="--v:42"></span><span class="n">14.7<small>%</small></span></div>
<div class="row is-em"><span class="l">應用與整合</span><span class="bar" style="--v:95"></span><span class="n">33.1<small>%</small></span></div>
<div class="row"><span class="l">Claude Code</span><span class="bar" style="--v:9"></span><span class="n">3.1<small>%</small></span></div>
<div class="row"><span class="l">評估、測試與除錯</span><span class="bar" style="--v:7"></span><span class="n">2.6<small>%</small></span></div>
<div class="row"><span class="l">選模型與優化</span><span class="bar" style="--v:48"></span><span class="n">16.8<small>%</small></span></div>
<div class="row"><span class="l">Prompt 與 context 設計</span><span class="bar" style="--v:31"></span><span class="n">11.0<small>%</small></span></div>
<div class="row"><span class="l">資安與安全</span><span class="bar" style="--v:23"></span><span class="n">8.1<small>%</small></span></div>
<div class="row"><span class="l">工具與 MCP</span><span class="bar" style="--v:30"></span><span class="n">10.6<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，四張證照用同一個滿格。英文原名依序是 Agents and Workflows／Applications and Integration／Claude Code／Eval, Testing, and Debugging／Model Selection and Optimization／Prompt and Context Engineering／Security and Safety／Tools and MCPs。</p>
</figure>

反過來，Claude Code 只佔 3.1%，評估與除錯 2.6%。這張考的重心是把 Claude 做進一個正常的軟體專案。指南建議至少做出並維運一個 Claude 應用，用到 API、串接工具，也做過基本的資安和評估。

### CCAR-F：agent 架構佔最多，題目都包在情境裡

[CCAR-F](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf) 是最早推出的一張，60 題，出題邏輯分兩層。**5 個領域**管「考什麼」，最重的是「Agent 架構與協調」（Agentic Architecture & Orchestration），27%。每個領域底下還拆出一條條能力描述，寫考生要會做什麼，指南裡全文列出。

<figure class="fg fg-bars">
<p class="fg-h">CCAR-F 各領域配分（60 題）</p>
<div class="row is-em"><span class="l">Agent 架構與協調</span><span class="bar" style="--v:77"></span><span class="n">27<small>%</small></span></div>
<div class="row"><span class="l">工具設計與 MCP 整合</span><span class="bar" style="--v:51"></span><span class="n">18<small>%</small></span></div>
<div class="row"><span class="l">Claude Code 設定與工作流程</span><span class="bar" style="--v:57"></span><span class="n">20<small>%</small></span></div>
<div class="row"><span class="l">Prompt 設計與結構化輸出</span><span class="bar" style="--v:57"></span><span class="n">20<small>%</small></span></div>
<div class="row"><span class="l">Context 管理與可靠性</span><span class="bar" style="--v:43"></span><span class="n">15<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，四張證照用同一個滿格。英文原名依序是 Agentic Architecture & Orchestration／Tool Design & MCP Integration／Claude Code Configuration & Workflows／Prompt Engineering & Structured Output／Context Management & Reliability。</p>
</figure>

**6 個情境**管「怎麼考」。題目不直接問名詞，而是把考生丟進一個真實專案裡出題：客服 agent、程式碼生成、多 agent 研究、開發者生產力、CI/CD、結構化資料抽取，每場考試從中隨機抽 4 個。

兩層怎麼咬合？舉個例子：抽到「客服 agent」情境，題目的設定是用 Claude 蓋一個客服系統，agent 手上有查客戶、查訂單、退款、轉真人四個工具。然後問：退款這種不能出錯的動作，該用程式硬性攔截，還是靠 prompt 提醒就好？這題穿的是客服的外衣，考的是「Agent 架構與協調」領域裡「用程式強制執行流程」那類能力。

指南也列了不考的東西：微調或訓練模型、embedding 模型和向量資料庫的實作細節、computer use（操作瀏覽器和桌面）、串流 API 的實作。準備時這幾塊可以先放下。

CCAR-F 的指南也特別厚，39 頁，多了 4 個動手練習和 12 題範例題，另外三份各只有 3 題範例題。CCAR-F 我自己考過了，882 分，第一手的備考方法、考點地圖與考場實況，寫在 [CCAR-F 考試心得](/zh-TW/blog/ccar-f-exam-experience/)。

### CCAR-P：多考治理和溝通，也考 RAG

[CCAR-P](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542810%2FClaude+Certified+Architect+%E2%80%93+Professional+Exam+Guide.pdf) 63 題、7 個領域，四張裡只有它每個領域都不到 20%，最重的「整合」（Integration）是 19%。

<figure class="fg fg-bars">
<p class="fg-h">CCAR-P 各領域配分（63 題）</p>
<div class="row"><span class="l">方案設計與架構</span><span class="bar" style="--v:49"></span><span class="n">17<small>%</small></span></div>
<div class="row"><span class="l">模型、prompt 與 context 設計</span><span class="bar" style="--v:37"></span><span class="n">13<small>%</small></span></div>
<div class="row is-em"><span class="l">整合</span><span class="bar" style="--v:54"></span><span class="n">19<small>%</small></span></div>
<div class="row"><span class="l">評估、測試與優化</span><span class="bar" style="--v:46"></span><span class="n">16<small>%</small></span></div>
<div class="row"><span class="l">治理、安全與風險管理</span><span class="bar" style="--v:40"></span><span class="n">14<small>%</small></span></div>
<div class="row"><span class="l">利害關係人溝通與生命週期管理</span><span class="bar" style="--v:40"></span><span class="n">14<small>%</small></span></div>
<div class="row"><span class="l">開發生產力與營運支援</span><span class="bar" style="--v:20"></span><span class="n">7<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，四張證照用同一個滿格。英文原名依序是 Solution Design & Architecture／Claude Models, Prompting & Context Engineering／Integration／Evaluation, Testing & Optimization／Governance, Safety & Risk Management／Stakeholder Communication & Lifecycle Management／Developer Productivity & Operational Enablement。</p>
</figure>

跟同樣叫 Architect 的 CCAR-F 放在一起看，差別最清楚：

<figure class="fg fg-cols">
<div class="c"><b>CCAR-F</b><strong>Claude Code 一個領域佔 20%</strong><span>重心在 agent 架構（27%）。</span><em>5 個領域・60 題・$125</em></div>
<div class="c is-em"><b>CCAR-P</b><strong>治理、利害關係人溝通合計 28%</strong><span>多了這兩個 CCAR-F 沒有的領域，也要會設計 RAG 流程。Claude Code 只出現在佔 7% 的開發生產力領域。</span><em>7 個領域・63 題・$175</em></div>
</figure>

多出來的兩個領域是「治理、安全與風險管理」（Governance, Safety & Risk Management）和「利害關係人溝通與生命週期管理」（Stakeholder Communication & Lifecycle Management），考的是護欄和法規遵循、跟利害關係人做需求訪談、說明架構上的取捨。RAG 在「整合」領域，要會決定文件怎麼切塊、怎麼建索引。CCAR-P 考的比較像帶專案的架構師：系統怎麼蓋之外，還要管需求、溝通和上線後的風險。

指南建議至少親手做過、維運過一個完整的 Claude 方案，裡面要有 RAG、評估和監控。

---

## 公司不是 Anthropic 夥伴，能考嗎？

**能考，但要透過夥伴組織報名。** 四張證照都從 Partner Academy 報名、在 Pearson VUE 排考時付款。官方只開放 Claude Partner Network（Anthropic 給服務商的夥伴計畫）成員報名，個人 email 報不了。公司不是夥伴的話，實務上要取得夥伴組織的帳號。卡在這一關，[CCAR-F 考試心得](/zh-TW/blog/ccar-f-exam-experience/)的文章後段有我提供的協助管道。

**值不值得考，看你的客戶或你想去的公司用不用 Claude。** 證照的鑑別性，最終來自它背後有沒有真實的產品和市場。這正是模型原廠這一格值得盯著的原因：它才剛剛打開。

---

## 資料來源

- Anthropic：[Claude Partner Network 發布新聞稿（2026-03-12）](https://www.anthropic.com/news/claude-partner-network)
- Anthropic Partner Academy：[認證 FAQ：報名流程、價格、改期、效期、重考規則](https://anthropic-partners.skilljar.com/page/faq-certifications)
- Anthropic Partner Academy：[認證總覽頁（含四張官方考試指南下載）](https://anthropic-partners.skilljar.com/page/partner-certifications)
- Anthropic：[Claude Certified Associate – Foundations 考試指南（PDF，v1.0，2026 年 7 月）](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542847%2FClaude+Certified+Associate+%E2%80%93+Foundations+Exam+Guide.pdf)
- Anthropic：[Claude Certified Developer – Foundations 考試指南（PDF，v1.0，2026 年 7 月）](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542875%2FClaude+Certified+Developer+%E2%80%93+Foundations+Exam+Guide.pdf)
- Anthropic：[Claude Certified Architect – Foundations 考試指南（PDF，v1.0，2026 年 7 月）](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542750%2FClaude+Certified+Architect+%E2%80%93+Foundations+Exam+Guide.pdf)
- Anthropic：[Claude Certified Architect – Professional 考試指南（PDF，v1.0，2026 年 7 月）](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F6nizmqk8tpzpfjvt6qmmav7rh%2Fpublic%2F1783542810%2FClaude+Certified+Architect+%E2%80%93+Professional+Exam+Guide.pdf)
- Pearson VUE：[Claude Certification Program](https://www.pearsonvue.com/us/en/anthropic.html)
- Anthropic：[官方免費課程目錄（Skilljar）](https://anthropic.skilljar.com/)
- iPAS：[AI 應用規劃師官方頁](https://www.ipas.org.tw/AIAP)、[能力鑑定運用說明（企業採認）](https://aoc-ipas.org.tw/web/institutional/institutional.jsp)
- 太報：[iPAS 報考人數（產發署公布，2026-07-04）](https://wp.taronews.tw/2026/07/04/1202748/)
- TQC：[生成式 AI 應用與技術認證頁](https://www.tqc.org.tw/TQCNet/CertificateDetail.aspx?CODE=D58axVVGrZzEkHFRcoZY+w%3D%3D)
- OpenAI：[Certificate Courses](https://openai.com/index/openai-certificate-courses/)
- Google Cloud：[Generative AI Leader 認證](https://cloud.google.com/learn/certification/generative-ai-leader)
- AWS：[Certified AI Practitioner](https://aws.amazon.com/certification/certified-ai-practitioner/)

---

*想考這幾張證照、卡在沒有報名管道或不知道從哪開始？→ [留下聯絡方式](https://ccarf-contact.pages.dev/)，我會親自回覆。*
