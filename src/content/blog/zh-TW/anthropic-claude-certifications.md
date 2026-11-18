---
title: "Claude 證照是什麼？Anthropic 五張官方認證怎麼考、和免費證書差在哪"
description: "Claude 證照目前有五張：CCAO-F、CCDV-F、CCDV-P、CCAR-F、CCAR-P，$99 到 $175、Pearson VUE 監考，其中三張 12 月 7 日換新版。照官方考試指南整理每張的配分和建議經驗，一張流程圖幫你選該考哪一張，再走一遍現行的報名流程。"
pubDate: 2026-07-20
updatedDate: 2026-11-18
category: building-products
topics: ["ai-practice"]
tags: ["Anthropic 認證", "Claude 證照", "CCAR-F", "CCAO-F", "CCDV-P", "AI 證照", "iPAS", "企業 AI"]
lang: zh-TW
featured: false
heroImage: /images/blog/anthropic-claude-certifications.webp
translationKey: anthropic-claude-certifications
relatedPosts: ["ccar-f-exam-experience.md", "claude-code-tutorial.md", "enterprise-ai-adoption-bottleneck.md"]
focusKeyphrase: "Claude 證照"
faq:
  - question: "個人能考 Claude 證照嗎？"
    answer: "能考，但要透過 Anthropic 的夥伴組織報名，個人 email 報不了。官方只開放 Claude Partner Network（Anthropic 給服務商的夥伴計畫）成員報名。五張都從 Anthropic 的夥伴學習平台 Partner Academy 報名，在 Pearson VUE 排考時付款。公司不是夥伴的話，實務上要取得夥伴組織的帳號。卡在這一關，可以寄信到 cert@yu-wenhao.com 問我，五張證照都可以。"
  - question: "Claude 證照要多少錢、考多久？"
    answer: "五張的報名費是 $99 到 $175 美元，每張都考 120 分鐘。CCAO-F $99，CCDV-F 和 CCAR-F 各 $125，CCDV-P 和 CCAR-P 各 $175。題數看證照和考試日期：CCDV-P 70 題（60 題計分），CCAR-F 60 題。CCAO-F、CCDV-F、CCAR-P 12 月 7 日起是 70 題（60 題計分），12 月 6 日前考照舊版，分別是 60、53、63 題。都是選擇題，每題會寫要選幾個答案。過線分數統一是 720/1000，由 Pearson VUE 監考，線上或考場都能考。"
  - question: "五張 Claude 證照要照順序考嗎？"
    answer: "不用，五張都沒有先修條件，可以直接報任何一張。兩張 Professional 建議先有同一系列 Foundations 的程度：CCDV-P 的指南寫明 CCDV-F 的範圍是預設知識，CCAR-P 的新版指南對 CCAR-F 也這樣寫，但都不強制。要選哪一張，可以拿自己的工作對照官方考試指南寫的建議經驗。例如工作上常用 Claude、不寫程式的人，對應 CCAO-F。有 3 年以上系統架構或平台工程經驗，加上半年以上在正式環境用 Claude 的人，對應 CCAR-P。重考次數也按張計算，一張沒過不影響報別張。"
  - question: "Claude 證照和 Anthropic 免費課程證書有什麼不同？"
    answer: "免費證書是線上課程的修畢紀錄，五張 Claude 證照是有監考的標準化考試。免費課程放在 Anthropic 官方學習平台上，有二十多門，修完就發結業證書，沒有監考、沒有統一過線標準，也沒有 Credly 徽章。五張證照由 Pearson VUE 第三方監考，有全球統一的計分系統，通過後發 Credly 數位徽章。看到「Anthropic 證書」的標題，先確認講的是哪一種。"
---

Claude 證照是 Claude 開發商 Anthropic 推出的官方職業認證，$99 到 $175。考試由 Pearson VUE 第三方監考，通過後發 Credly 數位徽章，效期 12 個月。2026 年 3 月推出第一張，7 月擴成四張，11 月再多一張開發者的資深級，其中三張 12 月 7 日換新版。五張都有官方考試指南（Exam Guide），寫明考試分成哪幾個領域、各佔幾成題目。Claude 證照和社群上瘋傳的「免費 Claude 證書」不是同一回事。這篇把該考哪一張、每張考什麼、跟免費證書差在哪，一次講清楚。

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
<div class="c is-em"><b>Anthropic</b><strong>夥伴組織可報</strong><span>Claude 的五張監考認證，透過 Claude Partner Network 的夥伴組織報名，Pearson VUE 考場或線上，$99–175。</span><em>CCAO-F、CCDV-F、CCDV-P、CCAR-F、CCAR-P</em></div>
<div class="c"><b>OpenAI</b><strong>只限受邀企業</strong><span>正式認證只開放給受邀的 ChatGPT Enterprise、Edu 工作區。</span><em>一般人拿得到的：Academy 免費課程證書，沒有監考</em></div>
<div class="c"><b>Google</b><strong>不是原廠名義</strong><span>監考認證都掛在 Google Cloud 名下，例如 Generative AI Leader（$99）。</span><em>Gemini 教育認證免費，官方沒寫有監考</em></div>
</figure>

兩個值得注意的差別：一般人目前從 OpenAI 拿得到的，是[「上完課」的證明](https://openai.com/index/openai-certificate-courses/)，不是「考過試」的證明。Google 有[監考認證](https://cloud.google.com/learn/certification/generative-ai-leader)、但發證的是雲端部門，考的是「在 Google Cloud 上用 AI」，不是 Gemini 模型生態本身。

把「模型原廠親自出題、第三方監考」整套跑起來、又有正式管道報名的，目前只有 Claude 的開發商、以企業客戶為主力的 Anthropic。

2026 年 3 月，Anthropic 隨 Claude Partner Network 發布第一張認證：Claude Certified Architect - Foundations。當時[新聞稿](https://www.anthropic.com/news/claude-partner-network)裡有一句很多人沒注意到的預告：「*Later this year, we'll introduce additional certifications for sellers, architects, and developers.*」四個月後，那個「later」先落地了一部分：一張，變四張。到了 11 月，又多了第五張。

---

## 五張 Claude 證照是什麼

Anthropic 認證體系目前共五張。根據 Anthropic 夥伴學習平台 Partner Academy 的 [FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications) 和[認證總覽頁](https://anthropic-partners.skilljar.com/page/partner-certifications)，以及各張的官方考試指南：

| 證照 | 題數 | 建議經驗 | 價格 | 考試指南 |
|---|---|---|---|---|
| [Associate - Foundations](https://anthropic-partners.skilljar.com/claude-certified-associate-foundations-certification)（CCAO-F） | 70（60 計分），12/6 前 60 題 | 工作上常用 Claude，不用寫程式 | $99 | [12/6 前](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946524/Claude_Certified_Associate_-_Foundations_Exam_Guide.pdf)・[12/7 起](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946609/Claude_Certified_Associate_-_Foundations_Exam_Guide_Updated_Dec_7.pdf) |
| [Developer - Foundations](https://anthropic-partners.skilljar.com/claude-certified-developer-foundations-certification)（CCDV-F） | 70（60 計分），12/6 前 53 題 | 1–5 年軟體工程＋半年 Claude 實作 | $125 | [12/6 前](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946716/Claude_Certified_Developer_-_Foundations_Exam_Guide.pdf)・[12/7 起](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946771/Claude_Certified_Developer_-_Foundations_Exam_Guide_Updated_Dec_7.pdf) |
| [Developer - Professional](https://anthropic-partners.skilljar.com/claude-certified-developer-professional-certification)（CCDV-P） | 70（60 計分） | 在正式環境部署過會用工具的 agent（沒寫年資） | $175 | [PDF](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794947325/Claude_Certified_Developer-Professional_Exam_Guide.pdf) |
| [Architect - Foundations](https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification)（CCAR-F） | 60 | 半年 Claude 實作（API、SDK、MCP） | $125 | [PDF](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946250/Claude_Certified_Architect_-_Foundations_Exam_Guide.pdf) |
| [Architect - Professional](https://anthropic-partners.skilljar.com/claude-certified-architect-professional-certification)（CCAR-P） | 70（60 計分），12/6 前 63 題 | 3 年架構或平台工程＋半年在正式環境用 Claude | $175 | [12/6 前](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946331/Claude_Certified_Architect_-_Professional_Exam_Guide.pdf)・[12/7 起](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946420/Claude_Certified_Architect_-_Professional_Exam_Guide_Updated_Dec_7.pdf) |

CCAO-F、CCDV-F、CCAR-P 從 12 月 7 日起換新版考試（[Pearson VUE 公告](https://www.pearsonvue.com/us/en/anthropic.html)），表中這三張的題數和建議經驗照新版指南寫，題數格後半是 12 月 6 日前的舊版題數。CCAR-F、CCDV-P 只有一版。70 題的考試裡有 10 題不計分，混在其他題目裡，不會標出是哪幾題。12 月 6 日前考的人照舊版準備，後面「五張各考什麼」開頭有整理怎麼挑指南，舊版配分收在每張那一節的折疊裡。

---

## 該考哪一張？照官方建議經驗選

選哪一張，最可靠的依據是各張指南裡寫的建議經驗：官方預設剛好能考過的人，平常在做什麼、做了多久。拿自己的工作去對這段，比看證照名稱準。

<style>.ar .ar-body .cert-flow { margin: var(--space-7) 0; }.ar .ar-body .cert-flow svg { display: block; width: 100%; height: auto; overflow: visible; }.ar .ar-body .cert-flow .narrow { display: none; }@media (max-width: 700px) { .ar .ar-body .cert-flow .wide { display: none; } .ar .ar-body .cert-flow .narrow { display: block; } }.ar .ar-body .cert-flow .dm { fill: var(--paper); stroke: var(--ink); stroke-width: 1.5; }.ar .ar-body .cert-flow .bx { fill: var(--paper); stroke: var(--ink); stroke-width: 1.5; }.ar .ar-body .cert-flow a:hover .bx { stroke: var(--terra); }.ar .ar-body .cert-flow .cn { fill: none; stroke: var(--muted); stroke-width: 1.5; }.ar .ar-body .cert-flow .mh { fill: var(--muted); }.ar .ar-body .cert-flow .mk { fill: var(--paper); }.ar .ar-body .cert-flow text { font-family: var(--ar-text, 'Noto Serif TC', serif); fill: var(--ink); }.ar .ar-body .cert-flow .dq, .ar .ar-body .cert-flow .bn { font-weight: 700; }.ar .ar-body .cert-flow .bc { font-family: 'JetBrains Mono', ui-monospace, monospace; fill: var(--terra-deep); letter-spacing: 0.1em; }.ar .ar-body .cert-flow .bd { fill: var(--muted); }.ar .ar-body .cert-flow .lb { fill: var(--terra-deep); }.ar .ar-body .cert-flow .wide .dq { font-size: 24px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .wide .bn { font-size: 26px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .wide .bc { font-size: 16px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .wide .bd, .ar .ar-body .cert-flow .wide .lb { font-size: 20px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .narrow .dq { font-size: 26px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .narrow .bn { font-size: 22px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .narrow .bc { font-size: 17px; } /* ds-local: svg user units */.ar .ar-body .cert-flow .narrow .bd { font-size: 21px; } .ar .ar-body .cert-flow .narrow .lb { font-size: 20px; } /* ds-local: svg user units */</style>
<figure class="fg cert-flow"><p class="fg-h">該考哪一張 Claude 證照</p><div role="img" aria-label="決策流程：平常不會用 Claude 動手做系統，考 CCAO-F。會做系統、有 3 年以上系統架構或平台工程經驗，考 CCAR-P。會做系統、沒有這類經驗：主要設計整套架構的考 CCAR-F；主要寫程式把 Claude 串進應用的，有負責上線後維運的考 CCDV-P，沒有的考 CCDV-F。"><svg class="wide" viewBox="0 0 1034 1084" aria-hidden="true"><defs><marker id="fa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mh" d="M0,1 L10,5 L0,9 z"/></marker></defs><path class="cn" d="M330,100 H576" marker-end="url(#fa)"/><path class="cn" d="M330,330 H576" marker-end="url(#fa)"/><path class="cn" d="M330,560 H576" marker-end="url(#fa)"/><path class="cn" d="M330,790 H576" marker-end="url(#fa)"/><path class="cn" d="M180,176 V250" marker-end="url(#fa)"/><path class="cn" d="M180,406 V480" marker-end="url(#fa)"/><path class="cn" d="M180,636 V710" marker-end="url(#fa)"/><path class="cn" d="M180,866 V984 Q180,992 188,992 H576" marker-end="url(#fa)"/><rect class="mk" x="427" y="66" width="56" height="28"/><text class="lb" x="455" y="88" text-anchor="middle">不會</text><rect class="mk" x="437" y="296" width="36" height="28"/><text class="lb" x="455" y="318" text-anchor="middle">有</text><rect class="mk" x="387" y="526" width="136" height="28"/><text class="lb" x="455" y="548" text-anchor="middle">設計整套架構</text><rect class="mk" x="437" y="756" width="36" height="28"/><text class="lb" x="455" y="778" text-anchor="middle">有</text><rect class="mk" x="188" y="199" width="36" height="28"/><text class="lb" x="196" y="221" text-anchor="start">會</text><rect class="mk" x="188" y="429" width="56" height="28"/><text class="lb" x="196" y="451" text-anchor="start">沒有</text><rect class="mk" x="188" y="659" width="136" height="28"/><text class="lb" x="196" y="681" text-anchor="start">寫程式串應用</text><rect class="mk" x="372" y="958" width="56" height="28"/><text class="lb" x="400" y="980" text-anchor="middle">沒有</text><polygon class="dm" points="180,24 330,100 180,176 30,100"/><text class="dq" x="180" y="93" text-anchor="middle">會用 Claude</text><text class="dq" x="180" y="123" text-anchor="middle">做系統嗎？</text><polygon class="dm" points="180,254 330,330 180,406 30,330"/><text class="dq" x="180" y="323" text-anchor="middle">有 3 年以上</text><text class="dq" x="180" y="353" text-anchor="middle">架構經驗嗎？</text><polygon class="dm" points="180,484 330,560 180,636 30,560"/><text class="dq" x="180" y="553" text-anchor="middle">主要在</text><text class="dq" x="180" y="583" text-anchor="middle">做什麼？</text><polygon class="dm" points="180,714 330,790 180,866 30,790"/><text class="dq" x="180" y="783" text-anchor="middle">有負責上線後</text><text class="dq" x="180" y="813" text-anchor="middle">的維運嗎？</text><a href="#ccao-f最看重判斷輸出對不對"><rect class="bx" x="580" y="16" width="424" height="168" rx="4"/><text class="bc" x="604" y="61">CCAO-F</text><text class="bn" x="604" y="95">Associate</text><text class="bd" x="604" y="127">工作上經常</text><text class="bd" x="604" y="153">實際動手用 Claude</text></a><a href="#ccar-p整合最重也考治理和部署平台"><rect class="bx" x="580" y="246" width="424" height="168" rx="4"/><text class="bc" x="604" y="291">CCAR-P</text><text class="bn" x="604" y="325">Architect – Professional</text><text class="bd" x="604" y="357">3 年以上系統架構或平台工程，</text><text class="bd" x="604" y="383">半年以上在正式環境用 Claude</text></a><a href="#ccar-fagent-架構佔最多題目都包在情境裡"><rect class="bx" x="580" y="476" width="424" height="168" rx="4"/><text class="bc" x="604" y="521">CCAR-F</text><text class="bn" x="604" y="555">Architect – Foundations</text><text class="bd" x="604" y="587">半年以上用 Claude API、Agent SDK、</text><text class="bd" x="604" y="613">Claude Code、MCP 做東西</text></a><a href="#ccdv-p考的是上線之後的維運"><rect class="bx" x="580" y="706" width="424" height="168" rx="4"/><text class="bc" x="604" y="751">CCDV-P</text><text class="bn" x="604" y="785">Developer – Professional</text><text class="bd" x="604" y="817">在正式環境維運過會用工具的 agent，</text><text class="bd" x="604" y="843">對可靠性、品質、成本、安全負責</text></a><a href="#ccdv-f應用與整合降到兩成評估題變多"><rect class="bx" x="580" y="908" width="424" height="168" rx="4"/><text class="bc" x="604" y="953">CCDV-F</text><text class="bn" x="604" y="987">Developer – Foundations</text><text class="bd" x="604" y="1019">1–5 年軟體開發、半年以上 Claude 實作，</text><text class="bd" x="604" y="1045">會 Python 或 TypeScript</text></a></svg><svg class="narrow" viewBox="0 0 600 1606" aria-hidden="true"><defs><marker id="fn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mh" d="M0,1 L10,5 L0,9 z"/></marker></defs><path class="cn" d="M260,86 H428 Q436,86 436,94 V136" marker-end="url(#fn)"/><path class="cn" d="M260,420 H428 Q436,420 436,428 V470" marker-end="url(#fn)"/><path class="cn" d="M260,754 H428 Q436,754 436,762 V804" marker-end="url(#fn)"/><path class="cn" d="M260,1088 H428 Q436,1088 436,1096 V1138" marker-end="url(#fn)"/><path class="cn" d="M135,156 V346" marker-end="url(#fn)"/><path class="cn" d="M135,490 V680" marker-end="url(#fn)"/><path class="cn" d="M135,824 V1014" marker-end="url(#fn)"/><path class="cn" d="M135,1158 V1480 Q135,1488 143,1488 H272" marker-end="url(#fn)"/><rect class="mk" x="320" y="52" width="56" height="28"/><text class="lb" x="348" y="74" text-anchor="middle">不會</text><rect class="mk" x="330" y="386" width="36" height="28"/><text class="lb" x="348" y="408" text-anchor="middle">有</text><rect class="mk" x="280" y="720" width="136" height="28"/><text class="lb" x="348" y="742" text-anchor="middle">設計整套架構</text><rect class="mk" x="330" y="1054" width="36" height="28"/><text class="lb" x="348" y="1076" text-anchor="middle">有</text><rect class="mk" x="143" y="239" width="36" height="28"/><text class="lb" x="151" y="261" text-anchor="start">會</text><rect class="mk" x="143" y="573" width="56" height="28"/><text class="lb" x="151" y="595" text-anchor="start">沒有</text><rect class="mk" x="73" y="909" width="124" height="26"/><text class="lb" x="135" y="929" text-anchor="middle">寫程式串應用</text><rect class="mk" x="185" y="1456" width="52" height="26"/><text class="lb" x="211" y="1476" text-anchor="middle">沒有</text><polygon class="dm" points="135,16 260,86 135,156 10,86"/><text class="dq" x="135" y="78" text-anchor="middle">會用 Claude</text><text class="dq" x="135" y="113" text-anchor="middle">做系統嗎？</text><polygon class="dm" points="135,350 260,420 135,490 10,420"/><text class="dq" x="135" y="412" text-anchor="middle">有 3 年以上</text><text class="dq" x="135" y="447" text-anchor="middle">架構經驗嗎？</text><polygon class="dm" points="135,684 260,754 135,824 10,754"/><text class="dq" x="135" y="746" text-anchor="middle">主要在</text><text class="dq" x="135" y="781" text-anchor="middle">做什麼？</text><polygon class="dm" points="135,1018 260,1088 135,1158 10,1088"/><text class="dq" x="135" y="1080" text-anchor="middle">有負責上線後</text><text class="dq" x="135" y="1115" text-anchor="middle">的維運嗎？</text><a href="#ccao-f最看重判斷輸出對不對"><rect class="bx" x="276" y="140" width="320" height="220" rx="4"/><text class="bc" x="294" y="197">CCAO-F</text><text class="bn" x="294" y="229">Associate</text><text class="bd" x="294" y="263">工作上經常</text><text class="bd" x="294" y="292">實際動手用 Claude</text></a><a href="#ccar-p整合最重也考治理和部署平台"><rect class="bx" x="276" y="474" width="320" height="220" rx="4"/><text class="bc" x="294" y="516">CCAR-P</text><text class="bn" x="294" y="548">Architect – Professional</text><text class="bd" x="294" y="582">3 年以上系統架構或</text><text class="bd" x="294" y="611">平台工程，半年以上</text><text class="bd" x="294" y="640">在正式環境用 Claude</text></a><a href="#ccar-fagent-架構佔最多題目都包在情境裡"><rect class="bx" x="276" y="808" width="320" height="220" rx="4"/><text class="bc" x="294" y="850">CCAR-F</text><text class="bn" x="294" y="882">Architect – Foundations</text><text class="bd" x="294" y="916">半年以上用 Claude API、</text><text class="bd" x="294" y="945">Agent SDK、</text><text class="bd" x="294" y="974">Claude Code、MCP 做東西</text></a><a href="#ccdv-p考的是上線之後的維運"><rect class="bx" x="276" y="1142" width="320" height="220" rx="4"/><text class="bc" x="294" y="1170">CCDV-P</text><text class="bn" x="294" y="1202">Developer – Professional</text><text class="bd" x="294" y="1236">在正式環境維運過</text><text class="bd" x="294" y="1265">會用工具的 agent，</text><text class="bd" x="294" y="1294">對可靠性、品質、</text><text class="bd" x="294" y="1323">成本、安全負責</text></a><a href="#ccdv-f應用與整合降到兩成評估題變多"><rect class="bx" x="276" y="1378" width="320" height="220" rx="4"/><text class="bc" x="294" y="1420">CCDV-F</text><text class="bn" x="294" y="1452">Developer – Foundations</text><text class="bd" x="294" y="1486">1–5 年軟體開發、</text><text class="bd" x="294" y="1515">半年以上 Claude 實作，</text><text class="bd" x="294" y="1544">會 Python 或 TypeScript</text></a></svg></div><p class="fg-note">照五份考試指南的「建議經驗」簡化（換版的三張照 12/7 起的新版），不是報考門檻。五張都沒有先修條件，可以直接報任何一張。點方框跳到那張的考試範圍。</p></figure>

最難分的是 CCDV-F 和 CCAR-F，兩張都考 agent 和工具。CCDV-F 考的是把 Claude 寫進程式的功夫：指南建議要會 Python 或 TypeScript，配分最重的是「應用與整合」。CCAR-F 考的是架構上的判斷和取捨，指南明寫不考特定程式語言或框架的實作細節（設定工具和 schema 用得到的除外），配分最重的是 agent 架構，[Claude Code](/zh-TW/blog/claude-code-tutorial/) 的設定也單獨佔兩成。

開發者這條線還有資深級的 CCDV-P。它跟 CCDV-F 的分界在做到哪一步：CCDV-F 考把應用做出來、上線，CCDV-P 考上線之後的維運，指南預設考生至少在正式環境部署過一個會用工具的 agent。

選好之後要注意一件事：報名要透過 Anthropic 的夥伴組織，個人帳號報不了名。公司不是夥伴怎麼辦，文末有整理。

---

## 「免費 Claude 證書」和五張付費證照差在哪？

先處理一個你很可能已經遇過的混淆。

在社群上廣泛流傳的「免費拿 Claude 證書」，指的是 [Anthropic 官方學習平台](https://anthropic.skilljar.com/)上的免費課程結業證書。平台上的課有二十多門，從 Claude Code in Action、Introduction to Model Context Protocol、Building with the Claude API，到給非技術職的 AI Fluency 系列，免費修、修完發課程結業證書。

這些課程結業證書，跟本文介紹的五張 Claude 證照（CCAO-F / CCDV-F / CCDV-P / CCAR-F / CCAR-P），完全不是同一件事。

前者是線上課程的修畢紀錄，沒有監考、沒有統一過線標準、沒有 Credly 徽章。後者是 Pearson VUE 第三方監考的標準化測驗，有全球統一的計分系統。

社群上常把兩者混為一談。讀者在看到「Anthropic 證書」的標題時，值得先確認講的是哪一種。

---

## CCAF、CCA-F、CCAR-F 是同一張證照嗎？

如果你查過 Architect - Foundations 這張的資料，大概已經被縮寫搞混過。沿革是這樣：

2026 年 3 月首發時，Anthropic 新聞稿只用全名，沒給正式縮寫。官方 email 和[短網址](https://clau.de/CCAF)用的是 **CCAF**，台灣媒體和社群多半寫 **CCA-F**。7 月證照擴成四張、考試搬上 Pearson VUE 之後，Architect Foundations 才有了正式考試代碼 **CCAR-F**。多出來的 R，看起來是為了跟同時推出的 Associate（CCAO-F）區分。

三種寫法指的是同一張證照，只是不同時期的稱呼。之後對外標注（例如 LinkedIn），用現行官方代碼 CCAR-F 最精確。

---

## 為什麼分成五張

五張證照是照職位切的：不寫程式的人一張、開發者兩張、架構師兩張，開發者和架構師都分初階（Foundations）和資深（Professional）。Anthropic 7 月發布前四張時，[官方公告](https://claude.com/blog/four-role-based-claude-certifications)就直接把它們叫做「依職位設計的認證」（role-based certifications）。這套分工也寫在官方頁面上：現在的[認證總覽頁](https://anthropic-partners.skilljar.com/page/partner-certifications)把五張分成 Associate、Developer、Architect 三種角色，寫明從 Foundations 開始，有 Professional 的再往上考。

最值得注意的是給非技術職的 CCAO-F（Associate）。負責評估輸出品質的 PM、做流程改善的營運、規劃內訓的 HR，Anthropic 也為他們設了一張考試，等於把這些人算進 [AI 導入](/zh-TW/blog/enterprise-ai-adoption-bottleneck/)要訓練的對象。

Anthropic 在 3 月的[新聞稿](https://www.anthropic.com/news/claude-partner-network)預告過，年內會推出給 sellers、architects、developers 的認證。到 11 月 18 日，認證總覽頁列出的是五張，多出來的是 Developer 的資深級 CCDV-P。同一頁另外把 Associate 寫成給顧問、業務（sellers）和交付負責人的證照，並註明 CCAO-F 不計入 Claude Partner Network 的夥伴等級（tier）。

---

## 共通規則：幾個制度細節

五張認證共用一套制度框架，根據 [Anthropic Partner Academy FAQ](https://anthropic-partners.skilljar.com/page/faq-certifications)（官方一手來源）和各張的考試指南：

<figure class="fg fg-steps">
<p class="fg-h">從報名到拿證</p>
<div class="s"><strong>下載考試指南</strong><span>每張都有公開的指南，不用登入就能下載。換版的三張，挑跟考試日期對得上的那一份。先看考什麼、自己的經驗對不對得上。</span></div>
<div class="s"><strong>在 Partner Academy 點 Register</strong><span>用夥伴組織的帳號登入 Partner Academy，從要考的那張認證頁點 Register。</span></div>
<div class="s"><strong>確認姓名</strong><span>報名的姓名要跟政府核發的證件完全一致。台灣身分證沒有英文姓名，實務上用護照的英文拼音。</span></div>
<div class="s"><strong>到 Pearson VUE 排考</strong><span>選考試，再選線上監考（OnVUE）或考場、同意考試政策、選語言和時段。線上考試在考前 1 小時、考場在考前 48 小時以前都還能改期或取消，超過時限報名費不退。</span></div>
<div class="s"><strong>在 Pearson 結帳</strong><span>定價 $99 到 $175。Pearson 的確認信要留著，線上考試的開考連結在信裡。</span></div>
<div class="s"><strong>考完拿成績單</strong><span>寫通過與否和分數。</span></div>
<div class="s"><strong>拿 Credly 徽章</strong><span>通過後發數位徽章，效期 12 個月。</span></div>
<div class="s"><strong>到期前免費續證</strong><span>在 Partner Academy 做一份不用監考的線上評量，逾期要全額重考。</span></div>
</figure>

全部由 Pearson VUE 監考（線上或考場），過線分數統一 720/1000，通過後發 Credly 數位徽章。

**考過之後：續證。** 證照效期 12 個月。到期前在 Partner Academy 做一份不用監考的線上評量，就能免費續證，不用再去 Pearson VUE 考一次。過期沒續，就要付全額重考整張考試。有一個例外，每份指南都寫了：考試內容大改時，Anthropic 可以要求持證者重考整張考試，不能用續證的線上評量代替。

**沒考過：等一段時間才能再考。** 第一次沒過要等 14 天，第二次 30 天，第三次 90 天。同一張考試 12 個月內最多考 4 次，每次都要重付報名費。次數按張計算，一張沒過不影響報別張。

另外幾條規則，關係到進不進得了考場、報名費退不退。考試當天要出示政府核發、附照片、還在效期內的證件，姓名跟報名資料對不上，當天就不能考，報名費也不退。報名的姓名要改，在 Partner Academy 的個人資料點 Update Exam Profile 自己改，只能改一次，確認資料後就鎖定，之後要再改得找 Anthropic 認證客服。排好的考試沒到場，報名費不退。

---

## 官方考試指南怎麼讀

有心備考的人，官方考試指南比任何第三方攻略都值得優先讀。PDF 不用登入就能下載，直連在上面的表格裡，[Partner Academy 認證總覽頁](https://anthropic-partners.skilljar.com/page/partner-certifications)也找得到。

每份指南有幾個共同的部分。五張都是 120 分鐘的選擇題，每題會寫要選幾個答案。先看這三塊：

- 領域配分：每個領域佔幾成題目。
- 範例題：附答案和理由，看得出出題的樣子和難度。
- 成績單的說明：除了通過與否和分數，還會列每個領域的答對率，沒過的人看得出要補哪一塊。

---

## 五張各考什麼

換版的三張，12 月 6 日前和 12 月 7 日起考的配分不一樣。先照考試日期確認要讀哪一份指南：

<div class="fg fg-key">
<p class="fg-h">照考試日期，讀哪一版指南</p>
<div class="k">CCAO-F、CCDV-F、CCAR-P 在 2026-12-06 以前考：讀封面寫 Effective November 2026 的那份，題數和配分跟 7 月版一樣。</div>
<div class="k">同樣這三張，2026-12-07 以後考：讀封面寫 Effective December 7, 2026 的那份。</div>
<div class="k">CCAR-F、CCDV-P 只有一版，照讀現行的指南。</div>
</div>

五張的領域數不一樣：CCAO-F 6 個領域（舊版 7 個）、CCDV-F 8 個、CCDV-P 8 個、CCAR-F 5 個、CCAR-P 7 個。下面每張的長條都以 35% 為滿格，五張可以直接互相比。換版的三張，長條畫的是 12 月 7 日起的新版配分，舊版收在各節的折疊裡。

### CCAO-F：最看重判斷輸出對不對

[CCAO-F](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946609/Claude_Certified_Associate_-_Foundations_Exam_Guide_Updated_Dec_7.pdf) 12 月 7 日起是 70 題（60 題計分）、6 個領域，配分最重的是「評估輸出與品質控管」（Output Evaluation and Quality Control），20%，比下指令的 15% 還多。給非技術職的這張，最看重判斷 Claude 的輸出對不對：抓出幻覺、捏造的引用、前後矛盾和偏誤，也要知道什麼時候該交給人複核。

<figure class="fg fg-bars">
<p class="fg-h">CCAO-F 各領域配分（12 月 7 日起，70 題）</p>
<div class="row"><span class="l">任務定義與下指令</span><span class="bar" style="--v:43"></span><span class="n">15<small>%</small></span></div>
<div class="row is-em"><span class="l">評估輸出與品質控管</span><span class="bar" style="--v:57"></span><span class="n">20<small>%</small></span></div>
<div class="row"><span class="l">選功能、模型與 context</span><span class="bar" style="--v:43"></span><span class="n">15<small>%</small></span></div>
<div class="row"><span class="l">流程設計與整合</span><span class="bar" style="--v:51"></span><span class="n">18<small>%</small></span></div>
<div class="row"><span class="l">設定與知識管理</span><span class="bar" style="--v:43"></span><span class="n">15<small>%</small></span></div>
<div class="row"><span class="l">負責任使用、資料保護與治理</span><span class="bar" style="--v:49"></span><span class="n">17<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，五張證照用同一個滿格。英文原名依序是 Task Definition and Prompting／Output Evaluation and Quality Control／Capability, Model, and Context Selection／Workflow Design and Integration／Configuration and Knowledge Management／Responsible Use, Data Protection, and Governance。</p>
</figure>

這次改版，領域從 7 個變成 6 個，舊版的「排錯與優化」不再是獨立領域，找原因、改指令這類題目現在分散在下指令和設定兩個領域。新版考點多了 Skills、讓 Claude 跑程式做分析、檢視、刪除記憶和無痕對話，以及 effort 等級（Claude 回答前要想多深）的選擇。指南也寫明，題目考的是情境判斷，不考價格、context 長度、rate limit 這類公布數字。

新版指南把 AI Fluency 框架的四個能力（Delegation、Description、Discernment、Diligence）寫成每個領域的基礎。建議的準備方式，是至少設定一個 Project，放進指示、知識來源和一個處理例行工作的 Skill，再接一個工作用的資料來源，也實際檢視、編輯、刪除 Claude 的記憶。

<details>
<summary>12/6 前考：舊版配分（7 月版）</summary>

12 月 6 日前考 CCAO-F，是 60 題、7 個領域，配分照 7 月版。

<figure class="fg fg-bars">
<p class="fg-h">CCAO-F 各領域配分（60 題）</p>
<div class="row"><span class="l">下指令與執行任務</span><span class="bar" style="--v:40"></span><span class="n">14<small>%</small></span></div>
<div class="row is-em"><span class="l">評估與驗證輸出</span><span class="bar" style="--v:60"></span><span class="n">21<small>%</small></span></div>
<div class="row"><span class="l">選產品與模型</span><span class="bar" style="--v:34"></span><span class="n">12<small>%</small></span></div>
<div class="row"><span class="l">流程整合與方案設計</span><span class="bar" style="--v:46"></span><span class="n">16<small>%</small></span></div>
<div class="row"><span class="l">設定與知識管理</span><span class="bar" style="--v:34"></span><span class="n">12<small>%</small></span></div>
<div class="row"><span class="l">治理、風險與負責任使用</span><span class="bar" style="--v:43"></span><span class="n">15<small>%</small></span></div>
<div class="row"><span class="l">排錯與優化</span><span class="bar" style="--v:29"></span><span class="n">10<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，五張證照用同一個滿格。英文原名依序是 Prompting and Task Execution／Output Evaluation and Validation／Product and Model Selection／Workflow Integration and Solution Design／Configuration and Knowledge Management／Governance, Risk, and Responsible Use／Troubleshooting and Optimization。</p>
</figure>

</details>

### CCDV-F：應用與整合降到兩成，評估題變多

[CCDV-F](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946771/Claude_Certified_Developer_-_Foundations_Exam_Guide_Updated_Dec_7.pdf) 12 月 7 日起同樣是 70 題（60 題計分），仍是 8 個領域，但配分攤平了。「應用與整合」（Applications and Integration）從 33.1% 降到 20%，仍是最重的一個。評估、測試與除錯從 2.6% 升到 10%，Claude Code 從 3.1% 升到 8%。

<figure class="fg fg-bars">
<p class="fg-h">CCDV-F 各領域配分（12 月 7 日起，70 題）</p>
<div class="row"><span class="l">Agent 與工作流程</span><span class="bar" style="--v:49"></span><span class="n">17<small>%</small></span></div>
<div class="row is-em"><span class="l">應用與整合</span><span class="bar" style="--v:57"></span><span class="n">20<small>%</small></span></div>
<div class="row"><span class="l">Claude Code</span><span class="bar" style="--v:23"></span><span class="n">8<small>%</small></span></div>
<div class="row"><span class="l">評估、測試與除錯</span><span class="bar" style="--v:29"></span><span class="n">10<small>%</small></span></div>
<div class="row"><span class="l">選模型與優化</span><span class="bar" style="--v:34"></span><span class="n">12<small>%</small></span></div>
<div class="row"><span class="l">Prompt 與 context 設計</span><span class="bar" style="--v:43"></span><span class="n">15<small>%</small></span></div>
<div class="row"><span class="l">資安與安全</span><span class="bar" style="--v:23"></span><span class="n">8<small>%</small></span></div>
<div class="row"><span class="l">工具與 MCP</span><span class="bar" style="--v:29"></span><span class="n">10<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，五張證照用同一個滿格。英文原名依序是 Agents and Workflows／Applications and Integration／Claude Code／Eval, Testing, and Debugging／Model Selection and Optimization／Prompt and Context Engineering／Security and Safety／Tools and MCP。</p>
</figure>

舊版「應用與整合」底下佔 7.4% 的軟體工程基本功（REST API、JSON 這類），新版拿掉了，舊版提到的 Strands、LangGraph、PydanticAI 這類框架也不再出現。新增的考點包括讓答案以提供的文件為根據、標出處，以及設計評估：用 LLM-as-judge（用另一個模型替答案打分數）時要先對人工標註做校準、建 golden set（一組標好正確答案的測試資料）、跑回歸測試。

建議經驗是 1 到 5 年軟體工程，加上至少半年 Claude 實作。舊版寫的是「Claude 或同類 LLM」，新版只寫 Claude，一樣要會 Python 或 TypeScript。指南建議至少做出並上線一個會用工具的 Claude agent 或工作流程，裡面要有自訂工具或 MCP server（MCP 是讓 Claude 連接外部工具和資料的標準介面）、結構化輸出、prompt caching、對 golden set 跑的評估，以及用程式寫死的護欄。

<details>
<summary>12/6 前考：舊版配分（7 月版）</summary>

12 月 6 日前考 CCDV-F，是 53 題，配分照 7 月版。

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
<p class="fg-note">長條以 35% 為滿格，五張證照用同一個滿格。英文原名依序是 Agents and Workflows／Applications and Integration／Claude Code／Eval, Testing, and Debugging／Model Selection and Optimization／Prompt and Context Engineering／Security and Safety／Tools and MCPs。</p>
</figure>

</details>

### CCDV-P：考的是上線之後的維運

[CCDV-P](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794947325/Claude_Certified_Developer-Professional_Exam_Guide.pdf) 是 11 月新增的第五張，Developer 的資深級：70 題（60 題計分）、8 個領域、$175。CCDV-F 考的是把 Claude 應用做出來、上線（build, integrate, ship），CCDV-P 考的是上線之後的維運（operate）。指南寫的考生，要對正式環境系統的可靠性、品質、成本和安全負責，也愈來愈常指揮一群 coding agent 做工程工作。

<figure class="fg fg-bars">
<p class="fg-h">CCDV-P 各領域配分（70 題）</p>
<div class="row"><span class="l">進階 agent 架構與協調</span><span class="bar" style="--v:49"></span><span class="n">17<small>%</small></span></div>
<div class="row is-em"><span class="l">正式環境整合、可靠性與知識檢索</span><span class="bar" style="--v:57"></span><span class="n">20<small>%</small></span></div>
<div class="row"><span class="l">可觀測性與正式環境監控</span><span class="bar" style="--v:34"></span><span class="n">12<small>%</small></span></div>
<div class="row"><span class="l">進階除錯與事故處理</span><span class="bar" style="--v:29"></span><span class="n">10<small>%</small></span></div>
<div class="row"><span class="l">評估工程與品質保證</span><span class="bar" style="--v:34"></span><span class="n">12<small>%</small></span></div>
<div class="row"><span class="l">大規模的成本與延遲優化</span><span class="bar" style="--v:23"></span><span class="n">8<small>%</small></span></div>
<div class="row"><span class="l">執行期護欄與資安</span><span class="bar" style="--v:31"></span><span class="n">11<small>%</small></span></div>
<div class="row"><span class="l">用一群 agent 做軟體交付</span><span class="bar" style="--v:29"></span><span class="n">10<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，五張證照用同一個滿格。英文原名依序是 Advanced Agent Architecture and Orchestration／Production Integration, Reliability, and Knowledge Grounding／Observability and Production Monitoring／Advanced Debugging and Incident Response／Evaluation Engineering and Quality Assurance／Cost and Latency Optimization at Scale／Runtime Guardrails and Production Security／Agent Fleet Operations for Software Delivery。</p>
</figure>

跟同樣叫 Developer 的 CCDV-F 放在一起看，差別最清楚：

<figure class="fg fg-cols">
<div class="c"><b>CCDV-F</b><strong>「應用與整合」佔最重，20%</strong><span>考把 Claude 寫進應用、做出來上線。Claude Code 單獨佔 8%，評估、測試與除錯佔 10%。</span><em>8 個領域・70 題（60 題計分，12/7 起）・$125</em></div>
<div class="c is-em"><b>CCDV-P</b><strong>可觀測性、事故處理合計 22%</strong><span>可觀測性（12%）和進階除錯與事故處理（10%）各自成一個領域，成本與延遲也獨立出來（8%）。另有一個領域專考用一群 coding agent 做軟體交付（10%）。</span><em>8 個領域・70 題（60 題計分）・$175</em></div>
</figure>

配分最重的是「正式環境整合、可靠性與知識檢索」，20%。各領域列的考點，都是上線後才會碰到的事，例如：

- 呼叫失敗時，fallback（失敗後改走的備援做法）要分得出 rate limit、安全拒答、context 用完這三種停止原因，各自處理。
- 在 CI/CD（程式碼自動測試、部署的流程）裡設擋上線的評估關卡，LLM-as-judge 要先對人工標註校準，換了模型版本後還要確認它打分數的標準沒有跑掉。
- 多個 agent 在各自獨立的 worktree（同一個程式庫分出來的獨立工作目錄）平行工作，AI code review 先用 shadow mode（只記錄、不擋關）跑一段時間。

CCDV-P 的指南沒有寫年資，CCDV-F、CCAR-F、CCAR-P 都寫了經驗要多久。它寫的是對象，包括資深或 staff 工程師、平台工程師和 SRE、負責上線 Claude 應用的 solutions engineer。考生做過的 agent 要會用工具，不是只有 LLM 聊天機器人或摘要工具。

這張沒有先修條件，建議先有 CCDV-F 的程度但不強制，指南寫明 CCDV-F 的範圍是這張的預設知識。準備建議是至少在正式環境維運一個會用工具的 Claude agent。這套系統要能追蹤每一次呼叫和工具使用的完整過程（分散式 tracing）、監控成本，也要訂好服務品質的量測指標和目標（SLI、SLO）。另外還要有擋上線的評估套件、多層護欄，以及事故處理和事後檢討的做法。

### CCAR-F：agent 架構佔最多，題目都包在情境裡

[CCAR-F](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946250/Claude_Certified_Architect_-_Foundations_Exam_Guide.pdf) 是最早推出的一張，60 題，出題邏輯分兩層。**5 個領域**管「考什麼」，最重的是「Agent 架構與協調」（Agentic Architecture & Orchestration），27%。每個領域底下還拆出一條條能力描述，寫考生要會做什麼，指南裡全文列出。

<figure class="fg fg-bars">
<p class="fg-h">CCAR-F 各領域配分（60 題）</p>
<div class="row is-em"><span class="l">Agent 架構與協調</span><span class="bar" style="--v:77"></span><span class="n">27<small>%</small></span></div>
<div class="row"><span class="l">工具設計與 MCP 整合</span><span class="bar" style="--v:51"></span><span class="n">18<small>%</small></span></div>
<div class="row"><span class="l">Claude Code 設定與工作流程</span><span class="bar" style="--v:57"></span><span class="n">20<small>%</small></span></div>
<div class="row"><span class="l">Prompt 設計與結構化輸出</span><span class="bar" style="--v:57"></span><span class="n">20<small>%</small></span></div>
<div class="row"><span class="l">Context 管理與可靠性</span><span class="bar" style="--v:43"></span><span class="n">15<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，五張證照用同一個滿格。英文原名依序是 Agentic Architecture & Orchestration／Tool Design & MCP Integration／Claude Code Configuration & Workflows／Prompt Engineering & Structured Output／Context Management & Reliability。</p>
</figure>

**6 個情境**管「怎麼考」。題目不直接問名詞，而是把考生丟進一個真實專案裡出題：客服 agent、程式碼生成、多 agent 研究、開發者生產力、CI/CD、結構化資料抽取，每場考試從中隨機抽 4 個。

兩層怎麼咬合？舉個例子：抽到「客服 agent」情境，題目的設定是用 Claude 蓋一個客服系統，agent 手上有查客戶、查訂單、退款、轉真人四個工具。然後問：退款這種不能出錯的動作，該用程式硬性攔截，還是靠 prompt 提醒就好？這題穿的是客服的外衣，考的是「Agent 架構與協調」領域裡「用程式強制執行流程」那類能力。

指南也列了不考的東西：微調或訓練模型、embedding 模型和向量資料庫的實作細節、computer use（操作瀏覽器和桌面）、串流 API 的實作。準備時這幾塊可以先放下。

CCAR-F 的指南有 42 頁，12 月 7 日起的三份新指南和 CCDV-P 的指南都是 15 到 17 頁。CCAR-F 的指南多了 4 個動手練習，範例題有 12 題，三份新指南和 CCDV-P 各 3 題。

CCAR-F 我自己考過了，882 分，第一手的備考方法、考點地圖與考場實況，寫在 [CCAR-F 考試心得](/zh-TW/blog/ccar-f-exam-experience/)。

### CCAR-P：整合最重，也考治理和部署平台

[CCAR-P](https://cc.sj-cdn.net/instructor/6nizmqk8tpzpfjvt6qmmav7rh/public/1794946420/Claude_Certified_Architect_-_Professional_Exam_Guide_Updated_Dec_7.pdf) 12 月 7 日起是 70 題（60 題計分）、7 個領域，最重的是「整合」（Integration），21%。

<figure class="fg fg-bars">
<p class="fg-h">CCAR-P 各領域配分（12 月 7 日起，70 題）</p>
<div class="row"><span class="l">方案設計與架構</span><span class="bar" style="--v:51"></span><span class="n">18<small>%</small></span></div>
<div class="row"><span class="l">模型、prompt 與 context 設計</span><span class="bar" style="--v:37"></span><span class="n">13<small>%</small></span></div>
<div class="row is-em"><span class="l">整合</span><span class="bar" style="--v:60"></span><span class="n">21<small>%</small></span></div>
<div class="row"><span class="l">評估、測試與優化</span><span class="bar" style="--v:49"></span><span class="n">17<small>%</small></span></div>
<div class="row"><span class="l">治理、安全與風險管理</span><span class="bar" style="--v:46"></span><span class="n">16<small>%</small></span></div>
<div class="row"><span class="l">利害關係人溝通與生命週期管理</span><span class="bar" style="--v:20"></span><span class="n">7<small>%</small></span></div>
<div class="row"><span class="l">開發生產力與營運支援</span><span class="bar" style="--v:23"></span><span class="n">8<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，五張證照用同一個滿格。英文原名依序是 Solution Design and Architecture／Claude Models, Prompting, and Context Engineering／Integration／Evaluation, Testing, and Optimization／Governance, Safety, and Risk Management／Stakeholder Communication and Lifecycle Management／Developer Productivity and Operational Enablement。</p>
</figure>

這次改版最大的變化，是利害關係人溝通從 14% 降到 7%。整合、治理各多 2 個百分點，方案設計、評估、開發生產力各多 1 個。方案設計領域也多了一個考點：在 Anthropic API、Amazon Bedrock、Google Vertex AI、Microsoft Foundry 之間選部署平台，再在 Messages API 迴圈、自架 Agent SDK 或 headless Claude Code、Claude Managed Agents 之間選 agent 的執行環境。

<details>
<summary>12/6 前考：舊版配分（7 月版）</summary>

12 月 6 日前考 CCAR-P，是 63 題，配分照 7 月版：7 個領域都不到 20%，最重的「整合」是 19%，治理和利害關係人溝通合計 28%。

<figure class="fg fg-bars">
<p class="fg-h">CCAR-P 各領域配分（63 題）</p>
<div class="row"><span class="l">方案設計與架構</span><span class="bar" style="--v:49"></span><span class="n">17<small>%</small></span></div>
<div class="row"><span class="l">模型、prompt 與 context 設計</span><span class="bar" style="--v:37"></span><span class="n">13<small>%</small></span></div>
<div class="row is-em"><span class="l">整合</span><span class="bar" style="--v:54"></span><span class="n">19<small>%</small></span></div>
<div class="row"><span class="l">評估、測試與優化</span><span class="bar" style="--v:46"></span><span class="n">16<small>%</small></span></div>
<div class="row"><span class="l">治理、安全與風險管理</span><span class="bar" style="--v:40"></span><span class="n">14<small>%</small></span></div>
<div class="row"><span class="l">利害關係人溝通與生命週期管理</span><span class="bar" style="--v:40"></span><span class="n">14<small>%</small></span></div>
<div class="row"><span class="l">開發生產力與營運支援</span><span class="bar" style="--v:20"></span><span class="n">7<small>%</small></span></div>
<p class="fg-note">長條以 35% 為滿格，五張證照用同一個滿格。英文原名依序是 Solution Design & Architecture／Claude Models, Prompting & Context Engineering／Integration／Evaluation, Testing & Optimization／Governance, Safety & Risk Management／Stakeholder Communication & Lifecycle Management／Developer Productivity & Operational Enablement。</p>
</figure>

</details>

跟同樣叫 Architect 的 CCAR-F 放在一起看，差別最清楚：

<figure class="fg fg-cols">
<div class="c"><b>CCAR-F</b><strong>Claude Code 一個領域佔 20%</strong><span>重心在 agent 架構（27%）。</span><em>5 個領域・60 題・$125</em></div>
<div class="c is-em"><b>CCAR-P</b><strong>治理、利害關係人溝通合計 23%</strong><span>多了這兩個 CCAR-F 沒有的領域，也要會選檢索架構和部署平台。Claude Code 的設定主要落在佔 8% 的開發生產力領域。</span><em>7 個領域・70 題（60 題計分，12/7 起）・$175</em></div>
</figure>

多出來的兩個領域是「治理、安全與風險管理」（Governance, Safety, and Risk Management）和「利害關係人溝通與生命週期管理」（Stakeholder Communication and Lifecycle Management）。考的是護欄放在哪裡、法規遵循要用哪些架構控制，也要從需求訪談紀錄和 SLA 草稿裡挑出架構做不到的承諾，看架構決策紀錄有沒有把取捨寫清楚。

RAG 在「整合」領域，要會依文件特性、查詢方式、延遲和成本上限，在現成的 RAG 流程、用工具做 agentic search、整份文件放進 context 之間選檢索架構。CCAR-P 考的比較像替整個方案負責的架構師：系統怎麼蓋之外，還要選部署平台、把治理和風險控制放進設計裡。

新版建議經驗是 3 年以上系統架構或平台工程，加上至少半年在正式環境用 Claude，舊版寫的「Claude 或同類 LLM」改成只寫 Claude。這張沒有先修條件，建議先有 CCAR-F 的程度但不強制，指南寫明 CCAR-F 的範圍是這張的預設知識。

指南建議準備時至少設計並交付一個上線的完整 Claude 方案，裡面要有選模型和部署平台、檢索或工具整合、評估、可觀測性（observability）和多層護欄。指南也建議多練習看別人產出的架構圖、設定檔、log 和 trace、評估結果和程式碼，因為考題會直接給這些東西。

---

## 公司不是 Anthropic 夥伴，能考嗎？

**能考，但要透過夥伴組織報名。** 五張證照都從 Partner Academy 報名、在 Pearson VUE 排考時付款。官方只開放 Claude Partner Network（Anthropic 給服務商的夥伴計畫）成員報名，個人 email 報不了。公司不是夥伴的話，實務上要取得夥伴組織的帳號。卡在這一關，[寄信到 cert@yu-wenhao.com](mailto:cert@yu-wenhao.com?subject=Claude%20%E8%AD%89%E7%85%A7%E5%A0%B1%E5%90%8D%E8%B3%87%E6%A0%BC%E8%A9%A2%E5%95%8F&body=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E8%A9%A2%E5%95%8F%20Claude%20%E8%AD%89%E7%85%A7%E7%9A%84%E5%A0%B1%E5%90%8D%E8%B3%87%E6%A0%BC%E3%80%82%0A%0A1.%20%E6%88%91%E6%83%B3%E8%80%83%E5%93%AA%E4%B8%80%E5%BC%B5%E3%80%81%E7%9B%AE%E5%89%8D%E7%9A%84%E6%83%85%E6%B3%81%EF%BC%88%E5%B7%A5%E4%BD%9C%E3%80%81%E7%82%BA%E4%BB%80%E9%BA%BC%E6%83%B3%E8%80%83%EF%BC%89%EF%BC%9A%0A%0A2.%20%E5%AE%98%E6%96%B9%20Exam%20Guide%20%E7%9C%8B%E9%81%8E%E4%BA%86%E5%97%8E%EF%BC%9F%0A%0A3.%20%E9%A0%90%E8%A8%88%E4%BB%80%E9%BA%BC%E6%99%82%E5%80%99%E8%80%83%EF%BC%9F%0A)，五張證照都可以問。信裡有三個問題，回答完寄出，我看完會回信。

**值不值得考，看你的客戶或你想去的公司用不用 Claude。** 證照的鑑別性，最終來自它背後有沒有真實的產品和市場。這正是模型原廠這一格值得盯著的原因：它才剛剛打開。

---

## 資料來源

- Anthropic：[Claude Partner Network 發布新聞稿（2026-03-12）](https://www.anthropic.com/news/claude-partner-network)
- Anthropic Partner Academy：[認證 FAQ：報名流程、價格、改期、效期、重考規則](https://anthropic-partners.skilljar.com/page/faq-certifications)
- Anthropic Partner Academy：[認證總覽頁：五張的官方考試指南都在這裡下載，各份 PDF 直連在「五張 Claude 證照是什麼」的表格裡](https://anthropic-partners.skilljar.com/page/partner-certifications)
- Pearson VUE：[Claude Certification Program](https://www.pearsonvue.com/us/en/anthropic.html)
- 太報：[iPAS 報考人數（產發署公布，2026-07-04）](https://wp.taronews.tw/2026/07/04/1202748/)

---

*想考這幾張證照、卡在沒有報名管道？[寄信到 cert@yu-wenhao.com](mailto:cert@yu-wenhao.com?subject=Claude%20%E8%AD%89%E7%85%A7%E5%A0%B1%E5%90%8D%E8%B3%87%E6%A0%BC%E8%A9%A2%E5%95%8F&body=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E8%A9%A2%E5%95%8F%20Claude%20%E8%AD%89%E7%85%A7%E7%9A%84%E5%A0%B1%E5%90%8D%E8%B3%87%E6%A0%BC%E3%80%82%0A%0A1.%20%E6%88%91%E6%83%B3%E8%80%83%E5%93%AA%E4%B8%80%E5%BC%B5%E3%80%81%E7%9B%AE%E5%89%8D%E7%9A%84%E6%83%85%E6%B3%81%EF%BC%88%E5%B7%A5%E4%BD%9C%E3%80%81%E7%82%BA%E4%BB%80%E9%BA%BC%E6%83%B3%E8%80%83%EF%BC%89%EF%BC%9A%0A%0A2.%20%E5%AE%98%E6%96%B9%20Exam%20Guide%20%E7%9C%8B%E9%81%8E%E4%BA%86%E5%97%8E%EF%BC%9F%0A%0A3.%20%E9%A0%90%E8%A8%88%E4%BB%80%E9%BA%BC%E6%99%82%E5%80%99%E8%80%83%EF%BC%9F%0A)，信裡有三個問題，回答完寄出，我看完會回信。*
