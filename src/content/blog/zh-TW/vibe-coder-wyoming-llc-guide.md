---
title: "Vibe coder 為什麼要開美國 LLC？不是為了夢想，是為了解鎖 Stripe"
description: "台灣 vibe coder 想收美金訂閱，Stripe 不支援台灣。這篇用 2 年實戰告訴你：LLC 不是國際化 / 身份 / 夢想，是變現基礎設施。包含浪漫化拆解、報稅實戰、Vibe coder 2.0 身份、完整成本 + 台灣金流對比。"
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

Vibe coder 為什麼要開美國 LLC？

不是為了國際化，不是為了美國身份，不是為了夢想。

是為了解鎖 Stripe。

## 先說結論：LLC 是水管，不是夢想

我是 vibe coder。2024 年 5 月用 Bubble（no-code）做 AI Resume Advisor，產品快 ship 時卡在金流選擇 — 能收美金的選項只有 Stripe 和 PayPal，我比較了兩邊：

| | Stripe（走 US LLC）| PayPal（台灣個人戶）|
|---|---|---|
| 費率 | 2.9% + $0.30 | 4.4% + $0.30 + 4% 換匯 ≈ **8%** |
| 開發者體驗 | API + CLI 業界標竿，Claude Code 能自動串 | 舊、踩坑多 |
| 訂閱制 | Stripe Billing 開箱即用 | 有 API 但陽春 |

> Stripe 收 USD 直接進美國帳戶（零換匯），想匯回台灣再用 Wise ~0.5%。PayPal 則是強制 4% 換匯，你沒得選。

PayPal 的好處是**今天就能用**，不用開公司。但費率高一倍、訂閱制陽春、開發者工具停在 2015 年。長期經營付費產品，Stripe 完勝。

選 Stripe 是理性決策。

但 Stripe 不收台灣。要用 Stripe 只有一條路：開一家美國公司。

2024 年 7 月，我開了 Wyoming LLC。

兩年下來，我所有產品銷售、個人服務要線上支付的，全部走同一個 Stripe 帳號 — USD 收海外、TWD 收台灣，一個 LLC 打兩個市場。

LLC 對我到底是什麼？兩年下來，我能給出比開戶當下更清楚的答案：

> LLC 是把水管接到你家的費用。Stripe 是水龍頭。
>
> 水管一接好，訂閱、諮詢、Course、Newsletter 都能用同一套系統收錢 — 不同用途、不同出水口，但背後同一條水管。
>
> 這就是為什麼 vibe coder 開 LLC — 不是為了「有水」，是為了「所有變現可能性一次解決」。

這篇是我踩過 3 個坑、跑完 2 次報稅、每年付 ~$322 維護費之後，對這件事的完整看法。

---

## 先破除兩個關於 LLC 的浪漫化

中文圈寫美國 LLC 的文章，很多把這件事包裝成人生升級 — 「走向國際」「美國公司主」「矽谷創業家」，這些詞我都看過。

坦白說，多半是錯覺。

### LLC 不會讓你的產品國際化

會讓產品國際化的是產品本身 — 能不能被海外用戶找到、用得順、願意付錢。

LLC 只解決一件事：**收得到錢**。沒別的。

你的 AI 產品在 Google 搜不到、使用者講英文看不懂你的 UI、客服只會中文回信 — LLC 完全幫不上忙。水管接好了，水龍頭也轉開了，水裡沒東西還是沒東西。

### LLC 不會幫你拿美國身份

這個誤會最嚴重。擁有美國 LLC 跟拿美國簽證、綠卡是三個完全獨立的系統。

| 你想要的 | 是什麼 | 跟 LLC 的關係 |
|---------|--------|--------------|
| LLC | 商業實體（收錢工具） | 本身 |
| H-1B / O-1 | 工作簽，要雇主 sponsor | 自己 sponsor 自己幾乎不會過 |
| EB-1A / EB-2 NIW / E-2 | 綠卡路徑 | 律師 $8K-$18K + 1-2 年，另一套遊戲 |

開 LLC 不會讓 USCIS（美國移民局）多看你一眼。

---

## LLC 的稅務結構：為什麼你不會被美國扒一層皮 — 以及每年要付多少

最常見的恐懼是「會不會被雙重課稅」「美國公司稅很重吧」。

不會。美國聯邦稅 LLC 不繳。州稅分兩種：「州所得稅」看你選哪州（Wyoming 免），「銷售稅」看你賣什麼、賣給誰。台灣那邊看你賺多少（大部分 vibe coder 免）。

逐項拆：

### 美國聯邦稅：不收你錢

一人持有的 LLC 是**穿透課稅**（pass-through）— LLC 本身不繳稅，收入穿透到 owner 個人。你是台灣人，不是美國稅務居民，所以美國聯邦個人稅也管不到你。

唯一例外是 **ETBUS**（Effectively Connected Business in the US）— 也就是「你實體人在美國營業」（有美國辦公室、員工、長期停留）。絕大多數 solo vibe coder 都不符合，所以不用擔心。

每年 **4/15 前**交的 Form 1120 + 5472 是**資訊揭露**，不是繳稅表 — 按時交就沒事，漏交才罰。

### 美國州稅：看選哪州 + 看賣什麼

州稅由各州政府管，每州規則不同。對 LLC 來說要分兩塊看：**州所得稅 + 行政規費**（看你選哪州）和**銷售稅**（看你賣什麼）。

**州所得稅 + 行政規費**

對 pass-through LLC 來說，**沒有州所得稅要繳**（收入穿透到 owner，台灣人免）— 真正的成本是**行政規費**。

| 州 | 年度成本 | 備註 |
|---|---------|------|
| **Wyoming** | **$60** | **最適合 vibe coder**（費用最低、無隱藏稅、社群資料最多）|
| Delaware | $300（固定）| 要募資才值得（VC 最愛），LLC 不划算 |
| California | $800+（最低起，>$250K 加收）| 最貴，有 California 連結才考慮 |
| 其他無州稅州（Nevada / South Dakota / New Mexico / Florida / Texas）| $0–$550 | 各有缺點（知名度低、隱私差、要報額外文件），不推 |

**行政規費不是稅** — 是「公司存在」的管理費，不管你有沒有賺錢都要繳。這部分避不掉，**選 Wyoming 就是 $60/年**。

**銷售稅（Sales Tax）**

銷售稅看的是**你的買家在哪州、你賣什麼**。門檻：**單州一年 $100K 銷售額或 200 筆交易**（跟你 LLC 註冊在哪州無關）。

過門檻後會不會真的被課，看產品類型：

- **實體商品**：全美幾乎所有州都課
- **數位產品**（SaaS、下載軟體、ebook、template、course）：看州 — 約 21 州會課
- **服務類**（諮詢、Tutoring、一對一）：大多數州不課

好消息：你不用自己研究 50 州規則。**Stripe Tax**（$0.5/transaction + 0.5%）會自動判斷該不該收、自動計算稅率、幫你報稅。絕大多數 vibe coder 在起步期 / PMF 驗證期**根本不會觸發銷售稅**（單州營收離 $100K 很遠）。等某個州接近門檻，Stripe Tax 開起來就好。

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

### 每年稅務成本總結

| 你選的州 | 每年稅務維護成本 |
|---------|----------------|
| **Wyoming** | **$60**（純規費）|
| Delaware | **$300**（固定）|
| California | **$800+**（最低起）|

這是 LLC 在「稅 + 州規費」這塊的總支出。其他維護項目（Registered Agent、報稅、電話卡等）**下一段展開**。

**對台灣 vibe coder 來說，沒有「繳稅日」這個概念** — 你每年只有兩個 deadline：4/15 交聯邦揭露（不繳錢）、LLC 成立月最後一天交州 Annual Report（繳 $60 規費）。

選 Wyoming 就是 $60。大多數 vibe coder 走這條。

**LLC 不省你稅，也不多收你稅。它是中性的，別當成威脅。**

---

## 維持一家 LLC 的完整成本

講完稅，接下來看每年維持一家 LLC 還要花多少（以 Wyoming 為例）— 不只稅，還有 Registered Agent、申報、一些可選的小錢。

> **什麼是 Registered Agent（RA）？** 美國法律規定，每家 LLC 必須有一個在該州的「法定代理人」，負責接收政府文件（IRS 信、法院傳票等）。你可以自己當 RA（需有該州實體地址），或付錢給專業公司（Northwest $125 / Bizee $119 / ZenBusiness $199）。人不在該州就只能付費。

| 項目 | 金額 | 必要性 |
|------|------|--------|
| Wyoming Annual Report 規費 | $60 / ~$160 | ✅ 必要（DIY 上 wyobiz.wyo.gov 10 分鐘搞定 $60 / 加 $100 找代辦處理）|
| Registered Agent | $125 | ✅ 必要（法律要求，但付給私人公司）|
| Form 1120 + 5472 申報 | $0 / ~$100 | ✅ 必要（只是資訊揭露，不是繳稅 — 大部分 vibe coder 一毛稅都不用繳。DIY $0 / 想買心安找 Fiverr CPA ~$100。我連兩年都自己申報，沒用過 CPA）|
| 美國虛擬電話 | ~$36 | ⚠️ 選配（不一定需要，Mercury / Stripe 開戶有時會要求）|

**我自己的情況**：每年 **$60 + $100 + $125 + $0 + $0 = $285**（Wyoming 規費 + 代辦費 + RA + DIY 申報 + 無虛擬電話）。**這兩年我繳的美國 / 台灣稅都是 $0** — 都只是資訊申報。

---

## 水管一接好，所有水龍頭都能用

$285/年，換什麼？

一件事：**未來你做任何新變現嘗試，都不用再卡在「沒有 Stripe」。**

- **想試付費 SaaS**：某個週末你用 Claude Code 做完一個小工具，發上 Twitter 收到回饋「我願意付錢」— 你週一花一小時接好 Stripe，$9/月訂閱連結當天就能發出去
- **想接諮詢 / Tutoring**：有天讀者 DM 你「能不能約一小時諮詢」，30 秒生成付款連結丟過去（海外客收 USD、台灣客收 TWD，同一個 Stripe），對方刷卡、你收到 email 通知，會議還沒開始錢已經進戶頭
- **想做線上課程**：你把自己擅長的東西錄成 10 小時教學，丟到 Teachable，下個月你會收到一封信 — 某個從沒聽過的國家有人刷卡買了你的課，你人還在睡覺
- **想開分潤計畫**：你發信給 10 個同領域 creator：「幫我推這個 $500 產品，每賣一單你抽 $150」。他們的專屬連結一刷，Stripe 自動把錢拆兩邊，你不用手動對帳

水管接好一次，要加幾個水龍頭都行。

**對 vibe coder 來說更爽**：Stripe 有 CLI，Claude Code 能直接叫它建 webhook、測試、串 API。一小時就能把金流系統整合進新產品（其中 45 分鐘還在想文案和 UI）。

$285/年換這個彈性，我覺得值。

---

## 如果你決定走這條路

前面講完為什麼，這段講怎麼做。不是完整教學，是把 2 年實戰壓縮成幾張表給你。

### 選州：Wyoming 是主流選擇

| 州 | 3 年成本 | 州稅 | 說明 |
|----|---------|------|------|
| **Wyoming** | ~$509 | 無 | 大多數 vibe coder 的選擇：州費便宜、隱私好、Member 不公開 |
| New Mexico | ~$339 | 有 | 最便宜，但銀行接受度略差 |
| Florida | ~$691 | 無 | Member 資訊公開 |
| Delaware | ~$979 | 8.7% franchise | $300/年 franchise tax，個人 vibe coder 不適合 |

> 來源：[Wyoming SOS](https://sos.wyo.gov/Business/Docs/LLC_Filing.pdf)、[Delaware Franchise Tax](https://corp.delaware.gov/paytaxes/)

Wyoming 是 9 個無州所得稅的州之一（其他：Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington）。

### 成立流程：30 天、$139、5 步驟

| Step | 做什麼 | 時間 | 花費 |
|------|-------|------|------|
| 1 | Northwest 線上填表（ $39 含第一年 RA） | 30 分鐘 | $39 |
| 2 | Wyoming 州費 | 自動代辦 | $100 |
| 3 | 自己傳真 SS-4 申請 EIN | 1-2 週 | $0 |
| 4 | 開 Mercury 銀行戶 | 3-5 天 | $0 |
| 5 | Stripe 申請（用 EIN） | 1-3 天 | $0 |
|  | **Total** | **~30 天** | **$139** |

> 來源：[IRS Form SS-4](https://www.irs.gov/forms-pubs/about-form-ss-4)、[Mercury for Non-US Founders](https://mercury.com/international)

### 一年維護成本：強制 $185，實際 ~$322

| 項目 | 金額 | 能省嗎 |
|------|------|--------|
| Wyoming 州年報 | $60 | 不能（州規定） |
| Northwest Registered Agent | $125 | 換 Bizee $119 差 $6 不值 |
| **強制小計** | **$185** | |
| Northwest Annual Report 代辦服務 | ~$103 | 自己 wyobiz.wyo.gov 交免費 |
| 網域 | ~$34 | 看是否續 |
| **我實際花** | **~$322** | 可壓到 ~$185 |

### 為什麼台灣金流解不了你的問題

台灣本土金流都試過，每個都卡在不同地方：

| 工具 | 收海外 USD | 收 NTD | 訂閱制 | 主要 drawback |
|------|-----------|--------|--------|---------------|
| Line Pay | ❌ | ✅ | ⚠️ | 只服務台灣用戶 |
| 街口 | ❌ | ✅ | ❌ | 純台灣本土 |
| 藍新 | ⚠️ DCC | ✅ | ⚠️ 陽春 | 結算只撥台幣 |
| 綠界 | ⚠️ 要特約 | ✅ | ⚠️ 陽春 | 個人戶停收海外卡 |
| **Stripe（走 LLC）** | ✅ | ✅ | ✅ | 要開美國公司 |

如果你只收台灣客人、不做訂閱制，台灣本土金流夠用。但只要你的客戶在海外、或你想做訂閱 / SaaS — Stripe 幾乎是唯一路。

> 來源：[Stripe Countries](https://stripe.com/global)、[藍新 Official](https://www.newebpay.com/)、[綠界海外卡政策](https://www.ecpay.com.tw/)

### 3 個日曆要標的 deadline

| 時間 | 做什麼 | 漏了會怎樣 |
|------|-------|-----------|
| 每年 3 月 | Registered Agent 續約（Northwest 會自動扣卡） | 卡過期沒更新，RA 會停 service |
| 4/15 | IRS 報稅（Form 1120 + 5472） | 5472 漏報罰 $25,000 |
| 11/1 | Wyoming Annual Report | 逾期罰款 + 州政府會 dissolve 你的 LLC |

> 來源：[IRS Form 5472 Penalty](https://www.irs.gov/pub/irs-pdf/i5472.pdf)、[Wyoming Annual Report](https://wyobiz.wyo.gov/)

### 2025-2026 法規變動

3 件事影響外國人持有美國 LLC：

**1. FinCEN BOI 大鬆綁（2025/3/26）**
美國境內成立的 LLC（含外國人持有）**完全免報 BOI**。只有「外國法人登記在美國做生意」還要報。這是很多中文文章還沒更新的一個大變動。

> 來源：[FinCEN Press Release](https://www.fincen.gov/news/news-releases/fincen-removes-beneficial-ownership-reporting-requirements-us-companies-and-us)

**2. 1% 跨境匯款稅（2026/1/1 生效）**
美國新稅法，匯款出美國要課 1%。但 **Mercury wire 回台灣免稅**（銀行帳戶豁免條款）。

**3. H.R.33 美台雙重課稅減免法案**
眾議院 423:1 通過，參議院審查中。如果通過，台灣人持有美國公司未來可以免部分雙重課稅。觀察中。

---

## 結語

LLC 不是夢想的入口。是一條水管。

水管接好了，水龍頭（Stripe）就通了 — 訂閱、諮詢、course、newsletter 用同一套系統收錢。$139 的成立費 + $185/年 維護 換的，是未來每一個變現想法都不用再卡在「台灣收不到美金」。

2024 年 5 月我 ship 第一個產品時不知道這件事。2024 年 7 月開 LLC 時也沒完全想通。兩年過去、兩次報稅、交過幾筆學費之後，現在很清楚：

Vibe coder 2.0 = 用 AI agent 變現任何想法的 solo operator。LLC + Stripe + Claude Code 是這個身份的基礎建設。

### 延伸閱讀

- 還沒準備燒錢做產品的階段？先看 [Microsoft for Startups 免費 Azure 額度攻略](/zh-TW/blog/free-azure-startup-credits/)。$5,000 雲端額度夠你 ship 第一個 MVP 再決定要不要開 LLC。
- 如果你是幫企業評估 AI 部署，不是個人 vibe coder：[公司用 AI 資料會外洩嗎？三種部署方式完整比較](/zh-TW/blog/enterprise-ai-data-security/)。

---

## 工具推薦與揭露

### Northwest Registered Agent

我 2024 年用 Northwest 成立 AI Resume Advisor LLC，兩年下來的實際使用心得：

1. **$39 成立方案含第一年 RA**（其他家多收）— 我 2024 用的就是這個
2. **Walk-through 流程清楚** — IRS 信件自動轉寄台灣 email，不用每週查實體信箱
3. **不賣你資料、不加購** — 很多代辦會 upsell Operating Agreement / EIN 加價，Northwest 附贈
4. **美國境內電話客服** — 出事能直接打電話（英文 OK 的話）

> [在 Northwest 用 $39 成立 LLC →](https://www.awin1.com/awclick.php?gid=573875&mid=66946&awinaffid=2731748&linkid=4625429&clickref=blog-zh-us-llc)

**📌 揭露**：這是 affiliate 連結。若你透過文中連結成立 LLC，我會收到一筆佣金（對你的費用沒有影響）。我推薦 Northwest 是因為我自己 2024 年就是用他們成立 LLC，親身用過才寫這篇。

**替代方案**：
- [Bizee (前 Incfile)](https://bizee.com/)：RA 年費 $119，比 Northwest 便宜 $6
- [ZenBusiness](https://www.zenbusiness.com/)：$199/年，UX 較現代但貴
- [Stripe Atlas](https://stripe.com/atlas)：$500 一次性 Delaware C Corp，適合要募資的團隊

三家我都研究過，Northwest 是我自己實際用的那一家。

---

*如果這篇讓你有了想法，[訂閱每週一封信](/zh-TW/) — 我固定寫 AI 工作流、和一路上想通的事。*

*想聊聊怎麼把 AI 融入你的工作流？[看看我的服務](/zh-TW/services/)。*
