---
type: 教學素材
status: ready
created: 2026-07-01
parent: studio-a-phase2
slide: F 組 D1 hands-on 跑你的場景
tags: [studio-a, phase-3, class-f, d1-slides, hands-on, fake-excel]
---

# F 組 D1 跑場景 hands-on · Fake Excel 素材包

> D1「跑你的真實場景」+ Timer 25 min hands-on 用。
>
> F 組 15 人（教育事業部 George 組），主題 = 校園 B2B 銷售 + MDM 裝置管理。
> 兩軌、學員各挑一份貼近自己工作的 fake Excel 跑（不硬分組）：
> Track 1「校園客戶標案彙整」/ Track 2「進出貨原廠報備核對」。

---

## 檔案清單

| 檔案 | 位置 | 用途 |
|---|---|---|
| `2026-06_校園客戶標案彙整表.xlsx` | **class-f 根目錄** | Track 1（3 分頁：客戶主檔 30 / 標案進度 40 / 拜訪記錄 52，用客戶編號串；5 待跟進 + 4 異常 + 5 髒 join）|
| `2026-06_進出貨原廠報備核對表.xlsx` | **class-f 根目錄** | Track 2（2 分頁：進出貨明細 61 + 核對規則 12 條 + 授權清單；11 筆疑慮 / 含 2 跨列）|
| `generate_customer_excel.py` | 本 pack | 生成 Track 1 Excel（輸出到 class-f 根目錄、可重跑）|
| `generate_procurement_excel.py` | 本 pack | 生成 Track 2 Excel（輸出到 class-f 根目錄）|
| `講師對話腳本.md` | 本 pack | 講師 talking points + 完整答案 key（兩軌）|

> 模式沿用 B 組 `slides/d1/assets/p44-fake-excel/`（Eric 比價 join / Kidd 規則分頁）。
> Track 1 = mirror Eric 的「跨分頁 join + 埋髒資料」；Track 2 = mirror Kidd 的「規則內建第 2 分頁 + 埋疑慮」。

---

## 重新生成假資料

```bash
cd "/Users/yuwenhao/Library/Mobile Documents/iCloud~md~obsidian/Documents/FLUX Vault/efforts/projects/active/studio-a-phase2/class-f/slides/d1/assets/p40-fake-excel"
python3 generate_customer_excel.py      # → class-f/2026-06_校園客戶標案彙整表.xlsx
python3 generate_procurement_excel.py   # → class-f/2026-06_進出貨原廠報備核對表.xlsx
```

兩個 script 都用 `random.seed(42)`、reproducible，預埋答案為確定性（改 seed 只動非答案的雜訊欄）。腳本最後會印完整答案 key。

---

## 上課前發送 SOP

D1 上課當天 13:30 開始、學員到 hands-on（約 16:30-17:00）要拿到 fake Excel。**課前環境安裝已完成（2026-07-01）**，發送方式跟 Kat/Peggy 對齊：

### Option A · USB 隨身碟（推薦）
- 課前準備 USB、預載對應 track 的檔案（做客戶標案的拿 Track 1、做進出貨的拿 Track 2；兩份都放也可、學員自選）
- hands-on 前發給學員

### Option B · 課前 email zip
- 上課前 1 天寄 zip 給 15 位學員、當天解壓到 Desktop / Downloads

### Option C · 上課當天 AirDrop
- hands-on 前講師 AirDrop（最快、但 15 人可能順序亂）

**推薦 A**：USB 最 robust、不依賴網路、現場可重發。

---

## 真實感檢查

兩份 Excel 都**完全脫敏**、不含任何 STUDIO A / 學校真實資料：

- ❌ 沒有真實校名（用「校 A ~ 校 AD」+ 類型後綴）
- ❌ 沒有真實客戶 / 標案 / 單號（用 C001-030 / F001-040 / IO2026060xxx）
- ❌ 沒有真實原廠名（用「原廠 X / Y / Z」）
- ❌ 沒有真實員工資料（業務用英文名，對齊 F 組 roster：Edick / Jim / KC / Max / Asa …）
- ✅ 用真實術語（教育專案 / 教育版 / MDM 授權 / 原廠報備 / 決標 / 評選 / 調撥 / iPad 教育版）
- ✅ 用真實業務流程（客戶 → 標案階段 → 拜訪跟進；進貨 → 出貨學校 → 原廠報備）
- ✅ 用真實痛點結構（跨表 join、報備加總、門市 key 錯）

學員拿到會覺得「像我們的資料」但實際完全模擬。

---

**Created**: 2026-07-01
**Owner**: 余文皓（講師）
**Next**: 跟 Kat/Peggy 對齊發送方式（A/B/C）+ 上課前確認 15 人各拿到對應 Excel
