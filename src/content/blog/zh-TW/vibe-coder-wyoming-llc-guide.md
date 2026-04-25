---
title: "台灣人用 Stripe 收美金：開一家美國公司的 2 年實戰心得"
description: "台灣 vibe coder 想收美金訂閱，Stripe 不支援台灣。這篇用 2 年實戰告訴你：LLC 不是國際化 / 身份 / 夢想，是變現基礎設施。包含浪漫化拆解、報稅實戰、完整成本 + 台灣金流對比、Wyoming LLC 設立 5 步驟。"
pubDate: 2026-04-17
category: building-products
tags: ["vibe-coding", "美國-llc", "wyoming", "stripe", "claude-code", "solo-operator"]
lang: zh-TW
translationKey: vibe-coder-wyoming-llc-guide
featured: false
draft: true
focus_keyphrase: "vibe coder 美國 LLC"
keywords: ["Wyoming LLC", "Stripe 台灣", "Form 5472", "Registered Agent", "台灣人 美國公司", "vibe coder 收美金"]
relatedPosts: ["free-azure-startup-credits.md", "enterprise-ai-data-security.md"]
---

為什麼我要開一家美國公司？

不是為了國際化，不是為了美國身份，不是為了夢想。

只為了一件事：讓 Stripe 幫我代收客戶的錢。

## 先說結論：美國公司是水管，不是夢想

我是 vibe coder。2024 年 5 月用 Bubble（no-code）做 AI Resume Advisor，當時卡在金流選擇 — 能收美金的選項只有 Stripe 和 PayPal，我比較了兩邊：

| | Stripe（走 US LLC）| PayPal（台灣個人戶）|
|---|---|---|
| 費率 | 2.9% + $0.30 | 4.4% + $0.30 + 4% 換匯 ≈ **8%** |
| 開發者體驗 | API + CLI 業界標竿，Claude Code 能自動串 | 舊、踩坑多 |
| 訂閱制 | Stripe Billing 開箱即用 | 有 API 但陽春 |

> Stripe 收 USD 直接進美國帳戶（零換匯），想匯回台灣再用 Wise ~0.5%。PayPal 則是強制 4% 換匯，你沒得選。

PayPal 的好處是**今天就能用**，不用開公司。但費率高一倍、訂閱制陽春、開發者工具停在 2015 年。長期經營付費產品，Stripe 完勝。

選 Stripe 是理性決策。

但 Stripe 不支援台灣。要用 Stripe 只有一條路：開一家美國公司（最常見是 LLC — Limited Liability Company，類似台灣的有限公司）。

2024 年 7 月，我就選了 Wyoming 這州開 LLC — 美國對個人 LLC 最友善的一州，註冊最便宜、隱私最好。

2025 年 6 月 Claude Code release 之後，我把整個產品用 Claude Code 重寫掉 — 從 Bubble no-code 搬到真正的 codebase。但底層金流一行沒動：同一個 LLC、同一個 Stripe 帳號、同一個 Mercury（美國新創友善銀行）戶頭。水管沒變，水龍頭接什麼產品都行。

兩年下來，我所有產品銷售、個人服務要線上支付的，全部走同一個 Stripe 帳號 — USD 收海外、TWD 收台灣，一個 LLC 打兩個市場。

美國公司對我到底是什麼？兩年下來，我能給出比開戶當下更清楚的答案：

> 美國公司（LLC）是把水管接到你家的費用。Stripe 是水龍頭。
>
> 水管一接好，訂閱、諮詢、Course、Newsletter 都能用同一套系統收錢 — 不同用途、不同出水口，但背後同一條水管。
>
> 這就是為什麼 vibe coder 開美國公司 — 為了「所有變現可能性一次解決」。

這篇是我踩過 3 個坑、跑完 2 次報稅、每年付 ~$309 維護費之後，對這件事的完整看法。

---

## 先破除兩個關於開美國公司的浪漫想像

中文圈寫美國 LLC 的文章，很多把這件事包裝成人生升級 — 「走向國際」「美國公司主」「矽谷創業家」，這些詞我都看過。

坦白說，多半是錯覺。

### 美國公司不會讓你的產品國際化

一個海外用戶願意付你錢，中間要跨過三關：**找到你**、**產品真的有人要**（Product-Market Fit）、**付得了**。

美國公司只解決第三關。

前兩關是行銷和產品的事 — 海外用戶找不到你、找到了也不想用，美國公司完全幫不上忙。

### 美國公司不會幫你拿美國身份

這個誤會最嚴重。擁有美國公司跟拿美國簽證、綠卡是三個完全獨立的系統。

| 名目 | 是什麼 | 取得難度 |
|---------|--------|--------------|
| 美國公司（LLC, 有限公司）| 商業實體（收錢工具） | 線上填表 $139、30 天 |
| H-1B / O-1 | 工作簽，要雇主 sponsor | 自己 sponsor 自己幾乎不會過 |
| EB-1A / EB-2 NIW / E-2 | 綠卡路徑 | 律師 $8K-$18K + 1-2 年，另一套遊戲 |

開一家美國公司不會讓 USCIS（美國移民局）多看你一眼。

---

## 稅務結構：台灣人開美國公司，兩邊都不會被重複課稅

最常見的恐懼是「會不會被雙重課稅」「美國公司稅很重吧」。

不會。美國聯邦稅 LLC 不繳。州稅分兩種：「州所得稅」看你選哪州（Wyoming 不課州所得稅），「銷售稅」看你賣什麼、賣給誰。台灣那邊看你賺多少（大部分 vibe coder 免）。

逐項拆：

### 美國聯邦稅：不收你錢

一人持有的 LLC 是**穿透課稅**（pass-through）— LLC 本身不繳稅，收入穿透到 owner 個人。你是台灣人，不是美國稅務居民，所以美國聯邦個人稅也管不到你。

唯一例外是 **ETBUS**（Effectively Connected Business in the US）— 也就是「你實體人在美國營業」（有美國辦公室、員工、長期停留）。絕大多數 solo vibe coder 都不符合，所以不用擔心。

每年 **4/15 前**交的 Form 1120 + 5472 是**資訊揭露**，不是報稅 — 只是告訴 IRS 你這家公司的狀況，沒有繳稅動作。按時交就沒事，漏交才罰。

### 美國州稅：分兩種，規則完全不同

很多人以為「選免稅州」就沒州稅問題，這是誤解。州稅其實分兩塊，邏輯完全不同：

- **州所得稅 + 行政規費** → 看**你註冊在哪州**
- **銷售稅（Sales Tax）** → 看**你的買家在哪州**

選 Wyoming 只解決第一塊。第二塊跟你 LLC 註冊在哪無關。

**州所得稅 + 行政規費**（看註冊州）

對 pass-through LLC 來說，**沒有州所得稅要繳**（收入穿透到 owner，台灣人免）— 真正的成本是**行政規費**。

| 州 | 年度成本 | 備註 |
|---|---------|------|
| **Wyoming** | **$60** | **最適合 vibe coder**（費用最低、隱私好、社群資料最多）|
| Delaware | $300（固定）| 要募資才值得（VC 最愛），LLC 不划算 |
| California | $800+（最低起，>$250K 加收）| 最貴，有 California 連結才考慮 |
| 其他無州稅州（Nevada / South Dakota / New Mexico / Florida / Texas）| $0–$550 | 各有缺點（知名度低、隱私差、要報額外文件），不推 |

**行政規費不是稅** — 是「公司存在」的管理費，不管你有沒有賺錢都要繳。這部分避不掉，**選 Wyoming 就是 $60/年**。

> ⚠️ **常見誤解**：有些中文文章寫「選 Wyoming 因為數位產品免銷售稅」。這句話**誤導** — 銷售稅看買家所在州，不看你註冊州。Wyoming 對買家在 Wyoming 的交易免稅，但 Wyoming 只有 58 萬人口、全美 GDP 佔比不到 0.2%，你的客戶幾乎不會落在這，所以這點對你**沒影響**。選 Wyoming 的真正理由是行政規費便宜 + 隱私好。

**銷售稅（Sales Tax）**（看買家所在州）

銷售稅看的是**買家在哪州、你賣什麼**。門檻：**單州一年 $100K 銷售額**（過去還有「200 筆交易」門檻，但 Wyoming 等多州已取消，各州現在陸續統一為單一金額門檻）。

過門檻後會不會真的被課，看產品類型：

- **實體商品**：全美幾乎所有州都課
- **數位產品**（SaaS、下載軟體、ebook、template、course）：看州 — 約 21 州會課
- **服務類**（諮詢、Tutoring、一對一）：大多數州不課

好消息：你不用自己研究 50 州規則。**Stripe Tax**（$0.5/transaction + 0.5%）會幫你做三件事：

1. **結帳時自動判斷** — 偵測買家地址 → 查該州稅則 → 自動計算稅率加進結帳總額
2. **自動追蹤每州累積銷售額** — 你還沒過門檻時不收稅但持續記錄，快到門檻會 email 警告你
3. **過門檻後自動收稅 + 產生報表** — 你去該州政府註冊 sales tax permit 後，在 Stripe Dashboard 勾選「已註冊」就切換

絕大多數 vibe coder 在起步期 / PMF 驗證期**根本不會觸發銷售稅** — 單州營收要累積到 $100K 很難，除非你的客戶高度集中在加州或德州這種大州。等 Stripe email 警告你接近門檻，再去註冊那州的 permit 就好（10-30 分鐘線上搞定）。

### 台灣稅：看你賺多少

這才是你真正要關心的。

| 年海外所得 | 台灣課稅 |
|-----------|---------|
| < NT$100 萬 | 免申報、免課稅 |
| NT$100-750 萬 | 計入最低稅負制，但有 NT$750 萬免稅額 → 通常仍免稅 |
| > NT$750 萬 | 超出部分課 20% 最低稅負 |

**實例 1（< 750 萬門檻）**：你年海外所得 NT$500 萬 + 台灣綜所淨額 NT$100 萬（扣完免稅額和各項扣除額後）。

- 台灣綜所稅：100 萬 × 12% - 累進差額 4 萬 ≈ **NT$8 萬**（階梯驗算：56 萬 × 5% + 44 萬 × 12% = 2.8 + 5.28 = 8.08 萬）
- 最低稅負（AMT）：基本所得額 = 500 + 100 = NT$600 萬 < 750 萬門檻 → **0**

結論：那 500 萬海外 LLC 收入**不用額外多繳稅**。台灣那 100 萬本來就要繳綜所稅 — 不管你有沒有 LLC 都要繳。


**實例 2（> 750 萬門檻）**：你年海外所得 NT$700 萬 + 綜所淨額 NT$100 萬 = 總 800 萬。

- 台灣綜所稅：**~NT$8 萬**（同上）
- 最低稅負（AMT）：(800 - 750) × 20% = **NT$10 萬**
- 你繳 max(綜所稅, AMT) = max(8, 10) = **NT$10 萬**

  結論：跨過 750 萬門檻 50 萬 → **只多補 2 萬差額**（不是 10 萬）。AMT 是「補差」不是「另外再算一次」。

### 每年州規費總結

| 你選的州 | 每年州規費 |
|---------|----------|
| **Wyoming** | **$60**（Annual Report 規費）|
| Delaware | **$300**（Franchise Tax 固定）|
| California | **$800+**（Franchise Tax 最低起）|

這只是州政府收的「公司存在費」 — 不是所得稅（LLC 是 pass-through，收入穿透到 owner，台灣人免繳美國所得稅）。其他維護項目（Registered Agent、報稅、電話卡等）**下一段展開**。

**對台灣 vibe coder 來說，沒有「繳稅日」這個概念** — 你每年只有兩個 deadline：4/15 交聯邦揭露（不繳錢）、LLC 成立月最後一天交州 Annual Report（繳 $60 規費）。

選 Wyoming 就是 $60。大多數 vibe coder 走這條。

**LLC 不省你稅，也不多收你稅。它是中性的，別當成威脅。**

---

## 維持一家 LLC 的完整成本

前面講完稅和州規費（Wyoming $60/年），接下來看 LLC 還有哪些維護項要錢 — Registered Agent、申報、一些可選的小錢。

> **什麼是 Registered Agent（RA）？** 美國法律規定，每家 LLC 必須有一個在該州的「法定代理人」，負責接收政府文件（IRS 信、法院傳票等）。你可以自己當 RA（需有該州實體地址），或付錢給專業公司（Northwest $125 / Bizee $119 / ZenBusiness $199）。人不在該州就只能付費。

| 項目 | 金額 | 必要性 |
|------|------|--------|
| Wyoming Annual Report 規費 | $60 / ~$160 | ✅ 必要（DIY 上 wyobiz.wyo.gov 10 分鐘搞定 $60 / 加 $100 找代辦處理）|
| Registered Agent | $125 | ✅ 必要（法律要求，但付給私人公司）|
| Form 1120 + 5472 申報 | $0 / ~$100 | ✅ 必要（只是資訊揭露，不是繳稅 — 大部分 vibe coder 一毛稅都不用繳。DIY $0 / 想買心安找 Fiverr CPA ~$100。我連兩年都自己申報，沒用過 CPA）|
| 美國虛擬電話 | $24/年（Zadarma 年付）| ⚠️ 選配（Mercury / Stripe 開戶有時會要求 — 我後來用 Zadarma 年付方案 $2/月）|

**我自己的情況**：每年 **$60 + $100 + $125 + $0 + $24 = $309**（Wyoming 規費 + 代辦費 + RA + DIY 申報 + Zadarma 虛擬電話）。**這兩年 LLC 這筆收入我在美國和台灣都沒繳任何所得稅** — 美國那邊只做資訊申報（Form 1120/5472）、台灣那邊因為台灣所得加海外所得合計沒超過 NT$750 萬最低稅負制免稅額門檻。

---

## 水管一接好，所有水龍頭都能用

$309/年，換什麼？

一件事：**未來你做任何新變現嘗試，都不用再卡在「沒有 Stripe」。**

- **想試付費 SaaS**：某個週末你用 Claude Code 做完一個小工具，發上 Twitter 收到回饋「我願意付錢」— 你週一花一小時接好 Stripe，$9/月訂閱連結當天就能發出去
- **想接諮詢 / Tutoring**：有天讀者 DM 你「能不能約一小時諮詢」，30 秒生成付款連結丟過去（海外客收 USD、台灣客收 TWD，同一個 Stripe），對方刷卡、你收到 email 通知，會議還沒開始錢已經進戶頭
- **想做線上課程**：你把自己擅長的東西錄成 10 小時教學，丟到 Teachable，下個月你會收到一封信 — 某個從沒聽過的國家有人刷卡買了你的課，你人還在睡覺
- **想開分潤計畫**：你發信給 10 個同領域 creator：「幫我推這個 $500 產品，每賣一單你抽 $150」。他們的專屬連結一刷，Stripe 自動把錢拆兩邊，你不用手動對帳

水管接好一次，要加幾個水龍頭都行。

**對 vibe coder 來說更爽**：Stripe 有 CLI，Claude Code 能直接叫它建 webhook、測試、串 API。一小時就能把金流系統整合進新產品（其中 45 分鐘還在想文案和 UI）。

**彩蛋**：開了 LLC 不只解鎖 Stripe — [Microsoft for Startups 還有 Azure 額度可以拿](/zh-TW/blog/free-azure-startup-credits/)，有公司身份能多拿 $4,000 額度。

---

## 如何建立：$139、5 步驟、2-3 週

從決定要開到 Stripe 開始收錢，花費 $139、大約 2-3 週。時程主要看 EIN（美國公司統編）那步你選哪條路。

五步驟是**純串行**的（後面的步驟要前面的產出才能開始），EIN 是最可能卡住的瓶頸：

<div class="llc-gantt not-prose my-10">
<style>
.llc-gantt {
--g-paper: #FAF7F2;
--g-rule: #E6DFD1;
--g-rule-strong: #D6CCB8;
--g-ink: #1F1B16;
--g-ink-2: #4A4339;
--g-muted: #8A8272;
--g-emerald: #2F7D5B;
--g-sky: #3E6FA8;
--g-amber: #B86E1C;
--g-amber-soft: #F2E3CB;
--g-amber-stripe: #E7C794;
--g-bar-h: 28px;
--g-radius: 4px;
background: var(--g-paper);
color: var(--g-ink);
padding: 32px 28px;
border-radius: 8px;
border: 1px solid var(--g-rule);
font-family: "Noto Sans TC", "PingFang TC", "Helvetica Neue", Arial, sans-serif;
line-height: 1.5;
}
.llc-gantt .g-chart {
display: grid;
grid-template-columns: 220px 1fr;
column-gap: 24px;
position: relative;
}
.llc-gantt .g-axis {
position: relative;
height: 24px;
border-bottom: 1px solid var(--g-rule-strong);
}
.llc-gantt .g-tick {
position: absolute;
top: 0;
bottom: 0;
font-family: "JetBrains Mono", ui-monospace, monospace;
font-size: 11px;
color: var(--g-muted);
transform: translateX(-50%);
display: flex;
align-items: flex-end;
padding-bottom: 6px;
letter-spacing: 0.04em;
}
.llc-gantt .g-tick::after {
content: "";
position: absolute;
left: 50%;
bottom: -4px;
width: 1px;
height: 5px;
background: var(--g-rule-strong);
}
.llc-gantt .g-row-label {
padding: 14px 0;
border-top: 1px solid var(--g-rule);
display: flex;
flex-direction: column;
justify-content: center;
min-height: 58px;
}
.llc-gantt .g-idx {
font-family: "JetBrains Mono", ui-monospace, monospace;
font-size: 10px;
color: var(--g-muted);
letter-spacing: 0.1em;
margin-bottom: 4px;
}
.llc-gantt .g-name {
font-weight: 700;
font-size: 15px;
color: var(--g-ink);
display: flex;
align-items: center;
gap: 6px;
}
.llc-gantt .g-dur {
font-size: 12px;
color: var(--g-muted);
margin-top: 2px;
font-family: "JetBrains Mono", ui-monospace, monospace;
}
.llc-gantt .g-warn {
display: inline-flex;
align-items: center;
justify-content: center;
width: 16px;
height: 16px;
background: var(--g-amber);
color: var(--g-paper);
border-radius: 50%;
font-size: 10px;
font-weight: 700;
line-height: 1;
}
.llc-gantt .g-row-bar {
position: relative;
border-top: 1px solid var(--g-rule);
min-height: 58px;
display: flex;
align-items: center;
}
.llc-gantt .g-row-bar.g-last { border-bottom: 1px solid var(--g-rule-strong); }
.llc-gantt .g-gridlines { position: absolute; inset: 0; pointer-events: none; }
.llc-gantt .g-gridline {
position: absolute;
top: 0;
bottom: 0;
width: 1px;
background: var(--g-rule);
}
.llc-gantt .g-gridline.g-strong { background: var(--g-rule-strong); }
.llc-gantt .g-bar {
position: absolute;
height: var(--g-bar-h);
border-radius: var(--g-radius);
display: flex;
align-items: center;
top: 50%;
transform: translateY(-50%);
font-size: 11px;
font-family: "JetBrains Mono", ui-monospace, monospace;
color: var(--g-paper);
padding: 0 10px;
letter-spacing: 0.02em;
white-space: nowrap;
}
.llc-gantt .g-bar.g-emerald { background: var(--g-emerald); }
.llc-gantt .g-bar.g-sky { background: var(--g-sky); }
.llc-gantt .g-bar.g-amber-solid { background: var(--g-amber); }
.llc-gantt .g-bar.g-variance {
background-color: var(--g-amber-soft);
color: var(--g-amber);
background-image: repeating-linear-gradient(-45deg, var(--g-amber-stripe) 0 6px, transparent 6px 12px);
border: 1px solid var(--g-amber);
border-left: none;
border-top-left-radius: 0;
border-bottom-left-radius: 0;
}
.llc-gantt .g-vlabel {
background: var(--g-paper);
color: var(--g-amber);
font-weight: 500;
padding: 2px 6px;
border-radius: 3px;
border: 1px solid var(--g-amber);
font-size: 10.5px;
}
.llc-gantt .g-bottleneck {
position: absolute;
top: 4px;
font-family: "JetBrains Mono", ui-monospace, monospace;
font-size: 10px;
color: var(--g-amber);
letter-spacing: 0.05em;
text-transform: uppercase;
transform: translateX(-50%);
}
.llc-gantt .g-scenarios {
margin-top: 40px;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 16px;
}
.llc-gantt .g-card {
background: var(--g-paper);
border: 1px solid var(--g-rule-strong);
border-radius: 6px;
padding: 20px 22px;
position: relative;
overflow: hidden;
}
.llc-gantt .g-card::before {
content: "";
position: absolute;
left: 0; top: 0; bottom: 0;
width: 4px;
}
.llc-gantt .g-card.g-fast::before { background: var(--g-emerald); }
.llc-gantt .g-card.g-typical::before { background: var(--g-sky); }
.llc-gantt .g-card .g-kicker {
font-family: "JetBrains Mono", ui-monospace, monospace;
font-size: 10.5px;
letter-spacing: 0.12em;
text-transform: uppercase;
color: var(--g-muted);
margin-bottom: 6px;
}
.llc-gantt .g-card .g-title {
font-family: "Noto Serif TC", serif;
font-weight: 700;
font-size: 18px;
margin-bottom: 12px;
color: var(--g-ink);
}
.llc-gantt .g-card .g-big {
font-family: "Noto Serif TC", serif;
font-size: 44px;
font-weight: 700;
line-height: 1;
letter-spacing: -0.02em;
}
.llc-gantt .g-card.g-fast .g-big { color: var(--g-emerald); }
.llc-gantt .g-card.g-typical .g-big { color: var(--g-sky); }
.llc-gantt .g-card .g-unit {
font-size: 20px;
font-weight: 600;
margin-left: 6px;
color: var(--g-ink-2);
}
.llc-gantt .g-card .g-desc {
margin: 10px 0 0;
font-size: 13.5px;
color: var(--g-ink-2);
}
.llc-gantt .g-card .g-desc strong { color: var(--g-ink); font-weight: 500; }
.llc-gantt .g-legend {
margin-top: 28px;
display: flex;
flex-wrap: wrap;
gap: 20px 28px;
padding-top: 18px;
border-top: 1px solid var(--g-rule);
}
.llc-gantt .g-legend-item {
display: flex;
align-items: center;
gap: 10px;
font-size: 13px;
color: var(--g-ink-2);
}
.llc-gantt .g-swatch {
width: 14px; height: 14px;
border-radius: 3px;
display: inline-block;
}
.llc-gantt .g-swatch.g-emerald { background: var(--g-emerald); }
.llc-gantt .g-swatch.g-sky { background: var(--g-sky); }
.llc-gantt .g-swatch.g-amber {
background-color: var(--g-amber-soft);
background-image: repeating-linear-gradient(-45deg, var(--g-amber-stripe) 0 4px, transparent 4px 8px);
border: 1px solid var(--g-amber);
}
.llc-gantt .g-footnote {
margin-top: 14px;
font-size: 11.5px;
color: var(--g-muted);
font-family: "JetBrains Mono", ui-monospace, monospace;
}
@media (max-width: 720px) {
.llc-gantt { padding: 20px 16px; }
.llc-gantt .g-chart { grid-template-columns: 1fr; column-gap: 0; }
.llc-gantt .g-axis-spacer { display: none; }
.llc-gantt .g-axis { grid-column: 1 / -1; }
.llc-gantt .g-row-label {
padding: 14px 0 6px;
min-height: auto;
}
.llc-gantt .g-row-bar {
border-top: none;
min-height: 64px;
padding-bottom: 14px;
}
.llc-gantt .g-scenarios { grid-template-columns: 1fr; }
.llc-gantt .g-card .g-big { font-size: 36px; }
}
</style>

<section class="g-chart">
<div class="g-axis-spacer"></div>
<div class="g-axis">
<span class="g-tick" style="left: 0%;">Day 0</span>
<span class="g-tick" style="left: 33.333%;">Day 7</span>
<span class="g-tick" style="left: 66.666%;">Day 14</span>
<span class="g-tick" style="left: 100%;">Day 21</span>
</div>

<div class="g-row-label">
<span class="g-idx">01</span>
<span class="g-name">Northwest 填表</span>
<span class="g-dur">30 分鐘 · Day 0</span>
</div>
<div class="g-row-bar">
<div class="g-gridlines">
<span class="g-gridline" style="left: 0%;"></span>
<span class="g-gridline g-strong" style="left: 33.333%;"></span>
<span class="g-gridline g-strong" style="left: 66.666%;"></span>
<span class="g-gridline g-strong" style="left: 100%;"></span>
</div>
<div class="g-bar g-emerald" style="left: 0%; width: 3%; padding: 0 6px;">30m</div>
</div>

<div class="g-row-label">
<span class="g-idx">02</span>
<span class="g-name">州政府核准</span>
<span class="g-dur">24 小時（自動）· Day 1</span>
</div>
<div class="g-row-bar">
<div class="g-gridlines">
<span class="g-gridline" style="left: 0%;"></span>
<span class="g-gridline g-strong" style="left: 33.333%;"></span>
<span class="g-gridline g-strong" style="left: 66.666%;"></span>
<span class="g-gridline g-strong" style="left: 100%;"></span>
</div>
<div class="g-bar g-sky" style="left: 0%; width: 4.76%;">24h</div>
</div>

<div class="g-row-label">
<span class="g-idx">03</span>
<span class="g-name">申請 EIN <span class="g-warn">!</span></span>
<span class="g-dur">1 天 – 2 週 · Day 1–14</span>
</div>
<div class="g-row-bar" style="min-height: 72px;">
<div class="g-gridlines">
<span class="g-gridline" style="left: 0%;"></span>
<span class="g-gridline g-strong" style="left: 33.333%;"></span>
<span class="g-gridline g-strong" style="left: 66.666%;"></span>
<span class="g-gridline g-strong" style="left: 100%;"></span>
</div>
<span class="g-bottleneck" style="left: 33.333%;">瓶頸 · 變異大</span>
<div class="g-bar g-amber-solid" style="left: 4.76%; width: 4.76%; padding: 0 8px;">最快 1d</div>
<div class="g-bar g-variance" style="left: 9.52%; width: 57.14%;">
<span class="g-vlabel">變異範圍 · 最慢 2 週</span>
</div>
</div>

<div class="g-row-label">
<span class="g-idx">04</span>
<span class="g-name">Mercury 開戶</span>
<span class="g-dur">3–5 天 · Day 8–13</span>
</div>
<div class="g-row-bar">
<div class="g-gridlines">
<span class="g-gridline" style="left: 0%;"></span>
<span class="g-gridline g-strong" style="left: 33.333%;"></span>
<span class="g-gridline g-strong" style="left: 66.666%;"></span>
<span class="g-gridline g-strong" style="left: 100%;"></span>
</div>
<div class="g-bar g-sky" style="left: 38.095%; width: 23.81%;">3–5 天</div>
</div>

<div class="g-row-label">
<span class="g-idx">05</span>
<span class="g-name">Stripe 申請</span>
<span class="g-dur">1–3 天 · Day 14–16</span>
</div>
<div class="g-row-bar g-last">
<div class="g-gridlines">
<span class="g-gridline" style="left: 0%;"></span>
<span class="g-gridline g-strong" style="left: 33.333%;"></span>
<span class="g-gridline g-strong" style="left: 66.666%;"></span>
<span class="g-gridline g-strong" style="left: 100%;"></span>
</div>
<div class="g-bar g-sky" style="left: 66.666%; width: 9.52%;">1–3 天</div>
</div>
</section>

<section class="g-scenarios">
<article class="g-card g-fast">
<div class="g-kicker">情境 A · FASTEST</div>
<div class="g-title">最快</div>
<div class="g-big">~10<span class="g-unit">天</span></div>
<p class="g-desc"><strong>EIN 用 Fiverr 順利</strong>，代辦一次通過，流程無卡關。</p>
</article>
<article class="g-card g-typical">
<div class="g-kicker">情境 B · TYPICAL</div>
<div class="g-title">常見</div>
<div class="g-big">~16<span class="g-unit">天</span></div>
<p class="g-desc"><strong>DIY 傳真 EIN</strong>，IRS 回覆約 1–2 週，其他步驟正常推進。</p>
</article>
</section>

<section class="g-legend">
<div class="g-legend-item"><span class="g-swatch g-emerald"></span>主動動作</div>
<div class="g-legend-item"><span class="g-swatch g-sky"></span>被動等待</div>
<div class="g-legend-item"><span class="g-swatch g-amber"></span>瓶頸（變異大）</div>
</section>

<p class="g-footnote">* 時間估算基於一般情況，實際時程依各機構作業速度而異。</p>
</div>

### 為什麼我用 Northwest

先定位 Northwest：美國最大的 LLC 代辦公司之一，一站式服務包含「LLC 成立 + Registered Agent（RA — 每家 LLC 必要的美國法定代理人，前面已解釋）+ 文件轉寄」。第一年 $39（含 RA），第二年起 RA $125/年續約。

2024 年我開 AI Resume Advisor LLC 時選 Northwest，沒比較其他家 — 當時看到幾篇英文 review 都推、$39 第一年含 RA 合理、一次就下單。兩年下來的實際體驗：

- 刷卡下單到拿到 Articles of Organization（LLC 成立證書）不到 24 小時
- IRS 信件自動轉寄到我台灣 email，不用查實體信箱
- 沒遇過硬塞 upsell 或追加收費
- 第二年起 $125/年續 RA，沒踩雷

這不是「我比較過 10 家最後選它」的推薦，是「我用了兩年沒出事」的推薦。如果你有時間想比較 Bizee、ZenBusiness、Stripe Atlas，可以自己研究；如果你想跟我走同一條路，Northwest 就是我用的那一家。

### Step 1：Northwest 線上填表（$39 / 30 分鐘）

去 Northwest 網站選「Wyoming LLC formation」$39 方案 — 包含第一年 Registered Agent。

填公司名（你之後產品的品牌名）、你的台灣地址、刷卡付 $39。Northwest 會自動加收 Wyoming 州政府**一次性成立費 $100**（跟每年 $60 的 Annual Report 規費是兩回事 — 前面講的是每年維護費，這裡是開公司當下繳的設立費），合計 **$139 一次付清**。

整個流程大約 30 分鐘。

### Step 2：Wyoming 州政府核准（通常 24 小時內）

我自己是台灣晚上填完表、隔天早上起床就收到 email — 成立證書附在信裡，從那一刻起你有一家美國公司了。

這份 PDF 留好，後面開 Mercury、申請 EIN 都要用。

### Step 3：申請 EIN（幾小時到 1-2 週）

EIN 是美國公司統編。外國人不能線上申請，只能傳真或透過代辦。

**最重要的事：Line 9b 要填 "Wyoming"，不是你的國籍。**

Wyoming LLC 是在美國註冊的實體，不管 owner 是誰 — 這欄就是 Wyoming。很多代辦（或自己第一次填）會誤填 "Taiwan"，IRS 就會把你的 LLC 分類錯，核發不對的 EIN。**這一步填錯，後面報稅整個要重來**。

**三個選擇（推薦順序：DIY → Fiverr → Northwest）**：

- **DIY 傳真 SS-4**（$0 / 約 1 週拿到）：自己填 Form SS-4 半小時、傳真到 IRS 外國人專線，等 1 週左右收到 EIN。最便宜最可控，**推薦給願意花半小時讀 SS-4 表單的人**
- **Fiverr 代辦**（$15-50 / 24-48 小時）：賣家當 Third Party Designee 幫你打 IRS 國際專線，IRS 當場口頭給 EIN（letter 後補）。**推薦給趕時間的人** — 但要挑評價好的賣家（Fiverr 上有不少假號、盜用 EIN 的詐騙），別只挑最便宜的
- **Northwest 加購 EIN 服務**（外國人 $200 / 不保證時程）：我為了寫這篇特別寫信問 Northwest 的 Affiliate Manager — 他們**只代為傳真 SS-4，不打 IRS 電話、不當 Third Party Designee**。IRS 之後若要聯絡也只跟你本人聯絡（不是 Northwest）。官網寫「120 天」是 IRS worst case 估計，實務上常 1 週內，但 **Northwest 不保證**。對外國人這 $200 等於只買「代為遞件」— **不推薦**

我自己第一次踩過 Line 9b 的雷 — 找了一個 $15 Fiverr 代辦，他 Line 9b 填了 "Taiwan"（而不是 "Wyoming"），IRS 把我的 LLC 當外國實體分類，核發了一個 **98 開頭的 EIN**。我報稅時才發現分類錯，送 Form 1120X Amended Return 修正，IRS 重新核發 **30 開頭的 EIN**（30 系列 = 美國境內實體前綴）— **整個流程花快一個月**。

不管你選 DIY 還是 Fiverr，**送單前一定要明確告訴對方兩件事**：

1. **Line 9b 填 "Wyoming"，不是國籍** — Wyoming LLC 是美國境內實體，IRS 看公司註冊地、不看 owner 國籍
2. **EIN 應該是 "30-" 開頭** — 拿到 letter 第一件事先看前兩碼。30 系列 = 美國境內實體前綴（正確）；98 系列 = 外國實體前綴（代表 Line 9b 填錯被分類成外國公司）。**不是 30 開頭就退件當下處理，不要等到報稅才發現**

### Step 4：開 Mercury 銀行戶（線上 15 分鐘 + 3-5 天審核）

有了 Articles（成立證書）+ EIN 就能開 Mercury。不用飛美國、不用介紹人、全程線上。

Mercury 對外國 founder 友善，填表 15 分鐘送出，3-5 天會收到核准 email。帳號開好，就能綁 Stripe 了。

**不要用 Chase / Bank of America** — 那些傳統銀行會要你本人到場。

### Step 5：Stripe 申請（1-3 天）

用 Mercury 帳號當 payout 目的地，Stripe 註冊時 business entity 選 "LLC"、國家選美國。

1-3 天審核通過，你的產品就能開始收錢。

---

### 一張表看完美國公司全部費用（以 Wyoming + Northwest 為例）

五步驟走完了。這裡把全部費用一次列清楚 — 你可以對照剛才每一步，看錢是付給誰的。

**一次性成立費**

| 項目 | 金額 | 誰收 |
|------|------|------|
| Northwest LLC 代辦費 | $39 | Northwest（含第一年 RA）|
| Wyoming 州成立費 | $100 | Wyoming Secretary of State |
| EIN 申請（DIY 傳真）| $0 | IRS（免費）|
| **合計** | **$139** | **一次付清** |

> 想省時間：Fiverr 代辦 EIN 約 $15-50（24-48 小時）→ 合計 $154-189。Northwest 也有賣外國人 EIN 加購（$200），但只代為傳真、不打 IRS、不擋 IRS 後續聯絡 — 詳見 Step 3，不推薦。

**每年維護費（第二年起）**

| 項目 | 金額 | 誰收 |
|------|------|------|
| Wyoming Annual Report 規費 | $60 | Wyoming Secretary of State |
| Annual Report 代辦費 | $100 | Northwest |
| Registered Agent 年費 | $125 | Northwest |
| Zadarma 美國虛擬電話 | $24 | Zadarma（年付 $2/月）|
| Form 1120 + 5472 申報（DIY）| $0 | IRS（免費資訊揭露）|
| **合計** | **$309/年** | **我的實際組合** |

> 想省錢：Annual Report DIY 省 $100（自己上 wyobiz.wyo.gov 10 分鐘）、不裝虛擬電話省 $24 → **最低每年 $185**。

### 建立後：3 個日曆要標的 deadline

美國公司開完不是結束，三個時間點一定要記：

- **每年 3 月**：Registered Agent 自動扣卡續約。**記得主動檢查信用卡沒過期** — 卡過期、RA 失效，IRS 信件就沒人接收
- **每年 4/15**：IRS 申報 Form 1120 + 5472。漏報 5472 罰 **$25,000**（這不是繳稅，只是資訊申報）
- **每年 11/1**：Wyoming Annual Report 交 $60。漏交州政府會強制解散你的 LLC

這三個都進 Google Calendar 設年度提醒，不要靠記憶。


## 結語

美國公司不是夢想的入口。是一條水管。

$139 的成立費、$309/年的維護費，換的是**一勞永逸的收款能力**。未來你想賣訂閱、接諮詢、開課、做 newsletter — 同一條水管、同一個 Stripe、同一家美國公司。

不浪漫，但必要。沒這條管子，後面什麼都談不上。

---

## Affiliate 揭露

[在 Northwest 用 $39 成立美國公司 →](https://www.awin1.com/awclick.php?gid=573875&mid=66946&awinaffid=2731748&linkid=4625429&clickref=blog-zh-us-llc)

**📌 這是 affiliate 連結**。你透過這個連結成立公司，我會收到一筆佣金（對你的費用沒有影響）。我推薦 Northwest 是因為我自己 2024 年用過兩年沒出事、親身經驗寫這篇。

如果你想比較其他家：[Bizee](https://bizee.com/)、[ZenBusiness](https://www.zenbusiness.com/)、[Stripe Atlas](https://stripe.com/atlas) — 這三家我沒實際用過，你可以自己研究。

---

*如果這篇讓你有了想法，[訂閱每週一封信](/zh-TW/) — 我固定寫 AI 工作流、和一路上想通的事。*

*想聊聊怎麼把 AI 融入你的工作流？[看看我的服務](/zh-TW/services/)。*
