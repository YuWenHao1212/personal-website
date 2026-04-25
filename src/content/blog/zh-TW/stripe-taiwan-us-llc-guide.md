---
title: "台灣人用 Stripe 收美金：開一家美國公司的 2 年實戰心得"
description: "台灣 vibe coder 想收美金訂閱，Stripe 不支援台灣。這篇用 2 年實戰告訴你：LLC 不是國際化 / 身份 / 夢想，是變現基礎設施。包含浪漫化拆解、報稅實戰、完整成本 + 台灣金流對比、Wyoming LLC 設立 5 步驟。"
pubDate: 2026-04-17
author: "余文皓"
category: building-products
tags: ["vibe-coding", "美國-llc", "wyoming", "stripe", "claude-code", "solo-operator"]
lang: zh-TW
translationKey: vibe-coder-wyoming-llc-guide
featured: false
draft: false
heroImage: /images/blog/vibe-coder-wyoming-llc-guide.webp
focus_keyphrase: "stripe taiwan"
keywords: ["stripe taiwan", "stripe 台灣", "vibe coding", "美國 LLC", "Wyoming LLC", "Stripe Atlas", "Form 5472", "Mercury 開戶", "台灣人 美國公司", "vibe coder 收美金"]
relatedPosts: ["free-azure-startup-credits.md", "enterprise-ai-data-security.md"]
faq:
  - question: "Stripe 真的完全不支援台灣嗎？"
    answer: "Stripe 不支援台灣商家直接註冊收款帳號。台灣公司或個人沒辦法用台灣身份開 Stripe 帳號。理論上可以開新加坡、香港、日本、美國公司繞道收款，對 solo vibe coder 而言美國 LLC 是最務實的選擇 — $139 開戶、全程線上、pass-through 不繳公司稅。"
  - question: "Wyoming LLC 一年要花多少錢？"
    answer: "一次性成立費 $139（Northwest 代辦 $39 + Wyoming 州成立費 $100）。第二年起年度維護費約 $309，包含 Wyoming Annual Report 規費 $60、Annual Report 代辦費 $100、Registered Agent 年費 $125、Zadarma 美國虛擬電話 $24、Form 1120 + 5472 申報 DIY $0。全 DIY 最低可壓到每年 $185。"
  - question: "我會被美國和台灣雙重課稅嗎？"
    answer: "不會。美國這邊 single-member LLC 是 pass-through 穿透課稅，IRS 不對 LLC 本身收稅；台灣人非美國稅務居民、無 ETBUS（在美國有實質營業關聯），所以美國聯邦個人稅也不適用。台灣這邊看你的海外所得：< NT$100 萬免申報、NT$100-750 萬有 750 萬免稅額通常仍免稅、超過 750 萬才課 20% 最低稅負。每年只要交 Form 1120 + Form 5472 資訊揭露（不繳稅），4/15 截止。"
  - question: "為什麼選 Wyoming，不選 Delaware 或 California？"
    answer: "Wyoming 行政規費最低（$60/年），不課州所得稅，隱私保護好，社群資料最多。Delaware 適合要募 VC 的新創（年費 $300）；California 最貴（$800+ 起跳），有 California 連結才考慮。其他無州稅州（Nevada、South Dakota 等）各有缺點 — 知名度低、隱私差、要報額外文件。對 solo vibe coder 來說，Wyoming 是最划算的選擇。"
  - question: "EIN 申請最快多久？要怎麼申請？"
    answer: "外國人不能線上申請 EIN，只能傳真 Form SS-4 或代辦。最快路徑是 Fiverr 代辦（$15-50、24-48 小時），我會推薦這條 — 不用自己打英文國際電話跟 IRS 溝通。DIY 傳真 SS-4 約 1 週、Northwest 加購 EIN 服務 $200 但不打電話也不當 Third Party Designee 不推薦。拿到 EIN 第一件事看前兩碼是不是 98 — 98 開頭代表被當外國實體，Stripe / Mercury 開戶可能會被拒。"
---

為什麼我要開一家美國公司？

不是為了國際化，不是為了美國身份，不是為了夢想。

只為了一件事：讓 Stripe 幫我代收客戶的錢。Stripe 不支援台灣（你 Google 搜「Stripe Taiwan」會看到一堆「怎麼辦」的教學文），最務實的解是開一家美國公司。

## 先說結論：美國公司是水管，不是夢想

我是 **vibe coder** — 用 AI 工具（[Claude Code](https://claude.com/claude-code)、[Cursor](https://cursor.com/) 這類）寫產品的個人開發者。2024 年 5 月，我在做 [AI Resume Advisor](https://airesumeadvisor.com/)，卡在一個很實際的問題：怎麼讓國外的人付錢給我？

當時用 [Bubble](https://bubble.io/)（不用寫 code、拖拉介面就能做網站的工具）做產品，能收美金的線上金流選項只有兩個 — Stripe 和 PayPal。我比較了兩邊：

| | Stripe（走 US LLC）| PayPal（台灣個人戶）|
|---|---|---|
| 費率 | 2.9% + $0.30 | 4.4% + $0.30 + 4% 換匯 ≈ **8%** |
| 開發者體驗 | API（程式自動串接）+ CLI（命令列工具）業界標竿，Claude Code 能自動串 | 舊、踩坑多 |
| 訂閱制 | Stripe Billing 開箱即用 | 有 API 但陽春 |

> Stripe 收 USD 直接進美國帳戶（零換匯），想匯回台灣再用 [Wise](https://wise.com/)（跨國轉帳服務，比銀行電匯便宜很多）~0.5%。PayPal 則是強制 4% 換匯，你沒得選。

PayPal 的好處是**今天就能用**，不用開公司。但費率高一倍、訂閱制陽春、開發者工具停在 2015 年。長期經營付費產品，Stripe 完勝。

選 Stripe 是理性決策。

而那「一家美國公司」最常見的形態是 **LLC — Limited Liability Company**，類似台灣的有限公司。

2024 年 7 月，我就選了 Wyoming 這州開 LLC — 美國對個人 LLC 最友善的一州，註冊最便宜、隱私最好。

2025 年 **Claude Code**（Anthropic 出的程式碼 AI 助手，能直接在你電腦上幫你寫整套產品）上線之後，我把整個產品從 Bubble 搬到自己寫的 codebase（程式碼倉庫）。

但這次大改寫底下的金流一行沒動 — 同一個 LLC、同一個 Stripe 帳號、同一個 Mercury（美國新創友善銀行）戶頭。**水管沒變，水龍頭接什麼產品都行。**

兩年下來，我所有產品銷售、個人服務要線上支付的，全部走同一個 Stripe 帳號 — USD 收海外、TWD 收台灣，一個 LLC 打兩個市場。

美國公司對我到底是什麼？兩年下來，我能給出比開戶當下更清楚的答案：

> 美國公司（LLC）是把水管接到你家的費用。Stripe 是水龍頭。
>
> 水管一接好，訂閱、諮詢、Course、Newsletter 都能用同一套系統收錢 — 不同用途、不同出水口，但背後同一條水管。
>
> 這就是為什麼 vibe coder 開美國公司 — 為了「所有變現可能性一次解決」。

這篇是我踩過幾個坑、跑完 2 次報稅、每年付 ~$309 維護費之後，對這件事的完整看法。

---

## 在你動心之前：兩個常見誤會

中文圈寫美國 LLC 的文章，很多把這件事包裝成人生升級 — 「走向國際」「跨國創業家」「矽谷夢」，這些詞我都看過。

坦白說，多半是誤會。

### 美國公司會讓我的產品國際化嗎？

一個海外買家願意付你錢，中間要跨過三關：**找到你**、**產品真的有人要**（Product-Market Fit，產品有沒有市場買單，簡稱 PMF）、**付得了**。

美國公司只解決第三關。

前兩關是行銷和產品的事 — 海外買家找不到你、找到了也不想用，美國公司完全幫不上忙。

### 開美國公司能拿到美國身份嗎？

這個誤會最嚴重。擁有美國公司跟拿美國簽證、綠卡是三個完全獨立的系統。

| 名目 | 是什麼 | 取得難度 |
|---------|--------|--------------|
| 美國公司（LLC, 有限公司）| 商業實體（收錢工具） | 線上填表 $139、約 2 週 |
| H-1B（一般工作簽）/ O-1（傑出人才簽）| 工作簽，要雇主 sponsor（出面擔保你來美國工作）| 自己 sponsor 自己幾乎不會過 |
| EB-1A（傑出人才綠卡）/ EB-2 NIW（國家利益豁免綠卡）/ E-2（投資簽證）| 綠卡 / 長期居留路徑 | 律師 $8K-$18K + 1-2 年，另一套遊戲 |

開一家美國公司不會讓 USCIS（美國移民局）多看你一眼。

---

## 台灣人開美國公司會被雙重課稅嗎？

最常見的恐懼是「會不會被雙重課稅」「美國公司稅很重吧」。

不會。美國聯邦稅 LLC 不繳。州稅分兩種：「州所得稅」看你選哪州（Wyoming 不課州所得稅），「銷售稅」看你賣什麼、賣給誰。台灣那邊看你賺多少（大部分 vibe coder 免）。

逐項拆：

### 美國聯邦稅會收我的錢嗎？

先講最讓人擔心的「美國聯邦稅」 — 也就是會不會被山姆大叔抽一筆。答案是不會。

一人持有的 LLC 是**穿透課稅**（pass-through）— 想像 LLC 是一個透明信封，錢從外面進來、直接穿過去到你個人，IRS（美國國稅局）不對信封本身收稅，只看誰拿了錢。你是台灣人，不是美國稅務居民，所以美國聯邦個人稅也管不到你。

但凡規則都有例外，這條也有 — 例外叫做 **ETBUS**（Effectively Connected Business in the US，「在美國有實質營業關聯」）。簡單講就是「你的業務實質發生在美國」 — 有美國辦公室、雇美國員工、或在美國有代理人替你做生意。絕大多數 solo vibe coder 都不符合，所以不用擔心。

每年 **4/15 前**要交兩張表：**[Form 1120](https://www.irs.gov/pub/irs-pdf/f1120.pdf)**（公司年度申報書）+ **[Form 5472](https://www.irs.gov/pub/irs-pdf/f5472.pdf)**（外國人持股揭露表）。它們是**資訊揭露**，不是報稅 — 只是告訴 IRS 你這家公司的狀況，沒有繳稅動作。按時交就沒事，漏交才罰（5472 漏報罰 $25,000 起跳、無上限，這不是打字打錯）。

### 美國州稅是怎麼算的？

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

> ⚠️ **常見誤解**：有些中文文章寫「選 Wyoming 因為數位產品免銷售稅」。實際上 — **銷售稅看買家所在州、看你賣什麼，跟你 LLC 註冊州無關**。你 LLC 註冊在 Wyoming、Delaware、Texas，對銷售稅義務沒差別。選 Wyoming 的真正理由是行政規費便宜 + 隱私好，**不是「免銷售稅」**。

**銷售稅（Sales Tax）**（看買家所在州）

銷售稅看的是**買家在哪州、你賣什麼**。門檻：**多數州單州一年 $100K 銷售額**（CA/TX/NY 提高到 $500K、AL/MS $250K）。過去還有「200 筆交易」門檻，但 Wyoming 等多州已取消，各州現在陸續統一為單一金額門檻。

過門檻後會不會真的被課，看產品類型：

- **實體商品**：全美幾乎所有州都課
- **數位產品**（SaaS、下載軟體、ebook、template、course）：看州 — 各州判定差異大，多半會課
- **服務類**（諮詢、Tutoring、一對一）：大多數州不課

好消息：你不用自己研究 50 州規則。**[Stripe Tax](https://stripe.com/tax)**（Stripe 的稅務自動化服務，約 0.5%/筆）會幫你做三件事：

1. **結帳時自動判斷** — 偵測買家地址 → 查該州稅則 → 自動計算稅率加進結帳總額
2. **自動追蹤每州累積銷售額** — 你還沒過門檻時不收稅但持續記錄，快到門檻會 email 警告你
3. **過門檻後自動收稅 + 產生報表** — 你去該州政府註冊 sales tax permit（銷售稅執照）後，在 Stripe Dashboard 勾選「已註冊」就切換

絕大多數 vibe coder 在起步期 / **PMF 驗證期**根本不會觸發銷售稅 — 單州營收要累積到 $100K 很難，除非你的客戶高度集中在某個小州。等 Stripe 寄 email 警告你接近門檻，再去註冊那州的 permit 就好（10-30 分鐘線上搞定）。

### 台灣這邊會課我多少稅？

美國那邊基本不用擔心，台灣這邊才是真正要看的關卡。但壞消息也沒多壞 — 大部分 vibe coder 還是免。

| 年海外所得 | 台灣課稅 |
|-----------|---------|
| < NT$100 萬 | 免申報、免課稅 |
| NT$100-750 萬 | 計入最低稅負制，但有 NT$750 萬免稅額 → 通常仍免稅 |
| > NT$750 萬 | 超出部分課 20% 最低稅負 |

**實例 1（< 750 萬門檻）**：你年海外所得 NT$500 萬 + 台灣綜所淨額 NT$100 萬（扣完免稅額和各項扣除額後）。

- 台灣綜所稅：100 萬 × 12% - 累進差額 4 萬 ≈ **NT$8 萬**（階梯驗算：56 萬 × 5% + 44 萬 × 12% = 2.8 + 5.28 = 8.08 萬）
- 最低稅負（**AMT**，Alternative Minimum Tax）：基本所得額 = 500 + 100 = NT$600 萬 < 750 萬門檻 → **0**

結論：那 500 萬海外 LLC 收入**不用額外多繳稅**。台灣那 100 萬本來就要繳綜所稅 — 不管你有沒有 LLC 都要繳。


**實例 2（> 750 萬門檻）**：你年海外所得 NT$700 萬 + 綜所淨額 NT$100 萬 = 總 800 萬。

- 台灣綜所稅：**~NT$8 萬**（同上）
- 最低稅負（AMT）：(800 - 750) × 20% = **NT$10 萬**
- 你繳 max(綜所稅, AMT) = max(8, 10) = **NT$10 萬**

  結論：跨過 750 萬門檻 50 萬 → **只多補 2 萬差額**。

  為什麼是 2 萬不是 10 萬？因為 AMT 的邏輯是「補差」 — max(綜所稅, AMT) - 你已繳的綜所稅 = 10 - 8 = 2 萬。不是「綜所稅繳完，AMT 全額再另外繳一次」。

  **白話翻譯**：你年收 800 萬（其中 700 萬從 LLC 來），多繳的 2 萬大概是一頓中等餐廳的家庭聚餐錢。LLC 不會把你逼到稅務地獄。

### 一句話總結：選 Wyoming 就是 $60/年

**對台灣 vibe coder 來說，沒有「繳稅日」這個概念** — 你每年只有兩個 deadline：4/15 交聯邦揭露（不繳錢）、LLC 成立月份的第 1 天交州 Annual Report（繳 $60 規費）。

**LLC 不省你稅，也不多收你稅。它對稅務是中立的 — 不幫你避稅，也不害你多繳，別當成威脅。**

---

## 養一家 LLC 一年要花多少錢？

前面講完稅和州規費（Wyoming $60/年），接下來看 LLC 還有哪些維護項要錢 — Registered Agent、申報、一些可選的小錢。

> **什麼是 Registered Agent（RA）？** 美國法律規定，每家 LLC 必須有一個在該州的「法定代理人」，負責接收政府文件（IRS 信、法院傳票等）。你可以自己當 RA（需有該州實體地址），或付錢給專業公司（Northwest $125 / Bizee $119 / ZenBusiness $199）。人不在該州就只能付費。

| 項目 | 金額 | 必要性 |
|------|------|--------|
| Wyoming Annual Report 規費 | $60 / ~$160 | ✅ 必要（DIY 上 wyobiz.wyo.gov 10 分鐘搞定 $60 / 加 $100 找代辦處理）|
| Registered Agent | $125 | ✅ 必要（法律要求，但付給私人公司）|
| Form 1120 + 5472 申報 | $0 / ~$100 | ✅ 必要（只是資訊揭露，不是繳稅 — 大部分 vibe coder 一毛稅都不用繳。DIY $0 / 想買心安找 Fiverr CPA（會計師）~$100。我連兩年都自己申報，沒用過 CPA）|
| 美國虛擬電話 | $24/年（Zadarma 年付）| ⚠️ 選配（Mercury / Stripe 開戶會寄 SMS 驗證碼到你填的電話，有美國號碼比較保險 — 我後來用 [Zadarma](https://zadarma.com/) 年付方案 $2/月）|

**我自己的情況**：每年 **$309**。組成：$60 Wyoming 規費 + $100 代辦費 + $125 RA + $24 Zadarma 虛擬電話 + $0 DIY 申報。

這兩年 LLC 賺到的錢，**美國和台灣都沒繳一毛所得稅**。

為什麼？美國那邊只是「資訊申報」（Form 1120 + 5472，告訴 IRS 你存在，不用繳錢）；台灣那邊因為「台灣所得 + 海外所得」加起來沒超過 NT$750 萬的最低稅負免稅門檻。

---

## LLC 開好之後我能做什麼？

講完稅、講完費用，看實際換到什麼。

$309/年，換的是一件事：**未來你做任何新變現嘗試，都不用再卡在「沒有 Stripe」。**

- **想試付費 SaaS**：某個週末你用 [Claude Code](/zh-TW/blog/claude-code-tutorial/) 做完一個小工具，發上 Twitter 收到回饋「我願意付錢」— 你週一花一小時接好 Stripe，$9/月訂閱連結當天就能發出去
- **想接諮詢 / Tutoring**：有天讀者 DM 你「能不能約一小時諮詢」，30 秒生成付款連結丟過去（海外客收 USD、台灣客收 TWD，同一個 Stripe），對方刷卡、你收到 email 通知，會議還沒開始錢已經進戶頭
- **想做線上課程**：你把自己擅長的東西錄成 10 小時教學，丟到 [Teachable](https://teachable.com/)，下個月你會收到一封信 — 某個從沒聽過的國家有人刷卡買了你的課，你人還在睡覺

水管接好一次，要加幾個水龍頭都行。

**對 vibe coder 來說這套組合更舒服**：Stripe 有 CLI，Claude Code 能直接叫它建 webhook（事件通知 — 客戶刷卡成功，Stripe 自動 ping 你的程式）、測試、串 API。一小時就能把金流系統整合進新產品（其中 45 分鐘還在想文案和 UI）。

**順帶一提**：開了 LLC 不只解鎖 Stripe — [Microsoft for Startups 還有 Azure 額度可以拿](/zh-TW/blog/free-azure-startup-credits/)，有公司身份能升到 **$5,000** 額度。

---

> 💡 **想動手了？** 我自己 2024 年用 [Northwest](https://www.awin1.com/awclick.php?gid=573875&mid=66946&awinaffid=2731748&linkid=4625429&clickref=blog-zh-us-llc) 開的 Wyoming LLC，**$139 一次付清**（$39 代辦費含第一年 Registered Agent + $100 Wyoming 州政府成立費），刷卡到拿成立證書 < 24 小時。下面 5 步驟也是用這條路寫的。
>
> *📌 這是 affiliate 連結，但對你費用沒影響。詳細推薦理由見文末「參考資料」區塊。*

---

## 實作篇：怎麼開？$139、5 步驟、2-3 週

從決定要開到 Stripe 開始收錢，花費 $139、大約 2-3 週。時程主要看 **EIN**（Employer Identification Number，美國公司統一編號，類似台灣統編）那步你選哪條路。

五個步驟：**美國公司成立申請 → 州政府核准 → 申請 EIN → 開銀行戶 → Stripe 申請**，必須依序進行（後面要前面的產出才能開始），EIN 是最可能卡住的瓶頸。

**以下是我自己跑過的時程（用 Northwest + Wyoming + Mercury）**。先掃一眼整體節奏，5 個步驟的細節我在圖下方一個個拆 — 手機讀者看不清楚 Gantt，直接往下捲到「Step 1」也行。

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

### 我用的是 Northwest（美國 LLC 代辦）

我用 Northwest 送美國公司成立申請、代繳州政府成立規費 $100。第一年 $39 含 Registered Agent（收 IRS 信件 + 轉寄到我 email），第二年起 RA $125/年續約。

2024 年開 AI Resume Advisor LLC 時，看幾篇英文 review 都推就下單，沒比較其他家。兩年下來：刷卡到拿 Articles 不到 24 小時、沒被硬塞 upsell、$125 續 RA 沒踩雷。

這不是「比較過 10 家」的推薦，是「用了兩年沒出事」的推薦。想比較 Bizee / ZenBusiness / Stripe Atlas 自己研究；想跟我走同一條路就 Northwest。

### Step 1：Northwest 線上填表（$39 / 30 分鐘）

去 [Northwest 網站](https://www.awin1.com/awclick.php?gid=573875&mid=66946&awinaffid=2731748&linkid=4625429&clickref=blog-zh-us-llc) 選「Wyoming LLC formation」$39 方案 — 包含第一年 Registered Agent。

填公司名（你之後產品的品牌名）、你的台灣地址、刷卡付 $39。Northwest 會自動加收 Wyoming 州政府**一次性成立費 $100**（跟每年 $60 的 Annual Report 規費是兩回事 — 前面講的是每年維護費，這裡是開公司當下繳的設立費），合計 **$139 一次付清**。

整個流程大約 30 分鐘。

### Step 2：Wyoming 州政府核准（通常 24 小時內）

我自己是台灣晚上填完表、隔天早上起床就收到 email — 成立證書附在信裡，從那一刻起你有一家美國公司了。

這份 PDF 留好，後面開 Mercury、申請 EIN 都要用。

### Step 3：申請 EIN（1 天到 2 週）

EIN 是美國公司的統一編號（類似台灣統編）。外國人不能線上申請，只能傳真或代辦。

我自己用 Northwest 註冊 LLC（Step 1），但 EIN 沒加購他們的服務 — 後面解釋為什麼。

**三個選擇（推薦順序）**：

- **DIY 傳真 [Form SS-4](https://www.irs.gov/pub/irs-pdf/fss4.pdf)**（$0 / 約 1 週）：SS-4 是 EIN 申請表，自己填表半小時、傳真到 IRS 外國人專線。**最便宜，但對台灣人不友善** — 英文表單、國際傳真、有問題只能自己打英文國際電話跟 IRS 溝通
- **[Fiverr 代辦](https://www.fiverr.com/search/gigs?query=EIN)**（$15-50 / 24-48 小時）：你填 SS-4，賣家代為遞件 + 跟 IRS 溝通跟催。**我會推薦這條** — $15-50 買「不用自己打英文國際電話跟 IRS 溝通」
- **Northwest 加購 EIN**（$200 / 約 1 週）：我寫信問過 Northwest，他們**只代為傳真，不打電話給 IRS、也不當 Third Party Designee**（第三方代理人，IRS 認可的代收件窗口，可以代你接電話、回信）。時程跟 DIY 差不多，但貴 $200 — **不推薦**

**不管選哪條路，都要填這張 SS-4。表上 30 幾欄、90% 直覺填就對，但有兩處 LLC 要特別注意：**

- **Line 8a-8c**（LLC 專屬）：8a 勾 Yes、8b 填成員數（你一人就填 1）、8c 勾「Organized in the United States」Yes + 填註冊州（這篇講的是 Wyoming LLC，所以填 "Wyoming"）
- **Line 9a**（實體類型）：勾 **Other**，寫「**Disregarded entity**」（一人 LLC）或「**Partnership**」（多人 LLC）
- **Line 9b 不要填**（那欄只給 Corporation）

> ⚠️ **血淚提醒：拿到 EIN letter 第一件事，看前兩碼是不是 98。**
>
> - **98 開頭** ❌ IRS 把你登記成「外國實體」 — 代表 SS-4 填錯了（多半是 Line 8c 沒勾「Organized in the United States」）
> - **不是 98**（30、35、61 等都正常）✅ IRS 認你是美國境內實體
>
> 為什麼 98 開頭是地雷？Stripe / Mercury 在開戶審核看到 98 開頭，可能會直接拒絕你（他們把你當外國公司，不是美國公司）。當下發現就退件重申請最省力，拖到 Stripe 拒絕你才回頭改，要重跑整個流程。

### Step 4：開 Mercury（美國新創友善銀行，線上 15 分鐘 + 3-5 天審核）

申請入口：[mercury.com/signup](https://mercury.com/signup)

有了 Articles（成立證書）+ EIN 就能開 Mercury。不用飛美國、不用介紹人、全程線上。

Mercury 對海外創辦人友善，填表 15 分鐘送出，3-5 天會收到核准 email。帳號開好，就能綁 Stripe 了。

**不要用 Chase / Bank of America** — 那些傳統銀行會要你本人到場。

### Step 5：Stripe 申請（1-3 天）

申請入口：[dashboard.stripe.com/register](https://dashboard.stripe.com/register)

用 Mercury 帳號當收款戶（payout destination），Stripe 註冊時公司類型（business entity）選 "LLC"、國家選美國。

1-3 天審核通過，你的產品就能開始收錢。

---

### 一張表看完美國公司全部費用（以 Wyoming + Northwest 為例）

這裡把全部費用一次列清楚 — 你可以對照剛才每一步，看錢是付給誰的。

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
- **每年 LLC 成立月的 1 號**（你 7 月成立 → 每年 7/1；11 月成立 → 每年 11/1）：Wyoming Annual Report 交 $60。漏交州政府會強制解散你的 LLC

這三個都進 Google Calendar 設年度提醒，不要靠記憶。

---

## 兩年後回頭看

美國公司不是夢想的入口。是一條水管。

$139 的成立費、$309/年的維護費，換的是**一勞永逸的收款能力**。未來你想賣訂閱、接諮詢、開課、做 newsletter — 同一條水管、同一個 Stripe、同一家美國公司。

不浪漫，但必要。沒這條管子，後面什麼都談不上。

---

## 參考資料

### 五步驟申請入口（照順序開戶）

| 步驟 | 連結 | 用途 |
|------|------|------|
| Step 1 LLC 成立 | [Northwest](https://www.awin1.com/awclick.php?gid=573875&mid=66946&awinaffid=2731748&linkid=4625429&clickref=blog-zh-us-llc) ⭐ | 我自己用的代辦商（affiliate） |
| Step 3 EIN 申請（DIY）| [Form SS-4 PDF](https://www.irs.gov/pub/irs-pdf/fss4.pdf) | IRS 官方表格 |
| Step 3 EIN 申請（代辦）| [Fiverr](https://www.fiverr.com/search/gigs?query=EIN) | 我推薦這條 |
| Step 4 開銀行戶 | [mercury.com/signup](https://mercury.com/signup) | 美國新創友善銀行 |
| Step 5 收款設定 | [dashboard.stripe.com/register](https://dashboard.stripe.com/register) | Stripe 註冊 |

### LLC 代辦商比較

我用 **Northwest**（[$39 含第一年 Registered Agent →](https://www.awin1.com/awclick.php?gid=573875&mid=66946&awinaffid=2731748&linkid=4625429&clickref=blog-zh-us-llc)）— 兩年實戰沒踩雷的推薦，不是「比較過 10 家」的推薦。

> **📌 Affiliate 揭露**：上面這個 Northwest 連結是 affiliate 連結。你透過它成立公司，我會收到一筆佣金（對你的費用沒影響）。我推薦的理由是親身用過兩年，沒出事。

想比較其他家：[Bizee](https://bizee.com/)、[ZenBusiness](https://www.zenbusiness.com/)、[Stripe Atlas](https://stripe.com/atlas) — 這三家我沒實際用過，你可以自己研究。

### 官方表格與政府網站

| 項目 | 連結 |
|------|------|
| Form SS-4（EIN 申請）| [irs.gov/pub/irs-pdf/fss4.pdf](https://www.irs.gov/pub/irs-pdf/fss4.pdf) |
| Form 1120（公司年度申報書）| [irs.gov/pub/irs-pdf/f1120.pdf](https://www.irs.gov/pub/irs-pdf/f1120.pdf) |
| Form 5472（外國人持股揭露表）| [irs.gov/pub/irs-pdf/f5472.pdf](https://www.irs.gov/pub/irs-pdf/f5472.pdf) |
| Wyoming Annual Report DIY | [wyobiz.wyo.gov](https://wyobiz.wyo.gov/) |
| Stripe Tax（自動收銷售稅）| [stripe.com/tax](https://stripe.com/tax) |

### 文中提到的工具與服務

| 類別 | 工具 |
|------|------|
| Vibe coding 工具 | [Claude Code](https://claude.com/claude-code) · [Cursor](https://cursor.com/) · [Bubble](https://bubble.io/) |
| 跨國金流 | [Wise](https://wise.com/)（轉帳）|
| 美國虛擬電話 | [Zadarma](https://zadarma.com/)（$2/月年付）|
| 我的產品 | [AI Resume Advisor](https://airesumeadvisor.com/) |
| 變現平台 | [Teachable](https://teachable.com/)（線上課程）|
| 雲服務折扣 | [Microsoft for Startups（拿 Azure 額度）](/zh-TW/blog/free-azure-startup-credits/) |

---

*如果這篇讓你有了想法，[訂閱每週一封信](/zh-TW/) — 我固定寫 AI 工作流、和一路上想通的事。*

*想聊聊怎麼把 AI 融入你的工作流？[看看我的服務](/zh-TW/services/)。*
