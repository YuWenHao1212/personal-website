---
type: 教學素材
status: ready
created: 2026-07-01
updated: 2026-07-02
parent: studio-a-phase2
slide: F 組 D1 B3「用它產出」· 週進銷存 資料包
tags: [studio-a, phase-3, class-f, d1-slides, block-3, stock-rollup]
---

# F 組 D1 B3「用它產出」· 週進銷存 資料包

> B3 climax（案例情境 → 學員用 Claude Code 讀多來源、彙總、找洞察 → 產 STUDIO A 報告）的 hands-on 原料。
> **Claude Code 直接讀**（不上傳 Excel Online、不裝增益集）。
>
> ⚠️ 2026-07-02：從「一個乾淨 xlsx（10 行）」改成**多來源資料包**——
> 理由：① 10 行人眼就看完、show 不出 AI 能力；② 對準 53 痛點「多來源、格式不一、逐筆要彙總」。

---

## 資料包（4 來源 · 2 格式）→ `STUDIO_A_W27_資料包.zip`

| 檔案 | 格式 | owner | 內容 |
|---|---|---|---|
| `EPB_進出貨明細_2026-W27.csv` | CSV | EPB 系統匯出 | **逐筆 243 筆**（出貨/進貨/調撥/退貨）· 含 32 筆退貨/作廢/調撥雜訊要 filter |
| `品項主檔_成本庫存.xlsx` | XLSX | 採購/財會 | 10 品項（教育售價 / 進貨成本 / 期末庫存 / 近4週均出貨）|
| `標案進度_2026Q2.xlsx` | XLSX | 業務 | 12 案（金額 / 階段 / 決標日 / 達成率 / 負責人）|
| `季度達成_產品線.csv` | CSV | 業績系統匯出 | 6 產品線（季目標 vs 累計 / 達成率）|

Claude 的活：讀 4 檔 → filter 正常出貨 → 依品項彙總營收 → join 主檔算毛利率＋WOI → 交叉標案/季度達成 → 找反直覺洞察。

> ⚠️ 2026-07-02 命名修正：原 `原廠報備_季累計.csv` 名不符實（內容是「產品線 × 季目標 vs 累計達成率」＝業績目標達成表，非案件報備）→ 更名 `季度達成_產品線.csv`。deck 內 B3 練習資料相關的「原廠報備」一併改「季度達成」；**前段需求原話牆/工作描述保留原話**（那是學員問卷真實用語）。

## 重新生成

```bash
cd "…/class-f/slides/d1/assets/p60-claude-excel"
python3 generate_stock_rollup.py     # → 4 檔 + STUDIO_A_W27_資料包.zip，並印健檢 key
```

## 健檢 key（給講師，與 slides 對得上）

- EPB 明細 **243 筆**（正常出貨 187 · 雜訊 32 要 filter）｜本週出貨營收 **NT$6,505,080（~6.5M）**｜綜合毛利率 **18.6%**
- **營收榜（類目）**：平板 54% > 週邊 24% > 筆電 12% > MDM 6% > 網路 4%
- **毛利榜（類目）**：週邊 46% > 平板 26% > MDM 18% > 網路 6% > 筆電 4% ← 週邊＋MDM 是利潤引擎
- **WOI**：iPad A 1.4🔴 / iPad B 1.7🔴（見底）· 充電車 17.1🟠（積壓）· 其餘 4~7 週健康 · MDM 授權無庫存
- **單品毛利率**：MDM 62% / 保護殼 48% / 轉接器 45% / 觸控筆 38%（高）↔ iPad B 10% / iPad A 8% / MacBook 6%（薄）
- **cross-source**：校A 全校 iPad 標案 0.85 交機中 ←→ iPad A WOI 1.4 週（斷貨會擋交機）

## aha（B3 climax）

> 你盯著營收看 iPad 最多 —— 下鑽兩件事都翻盤：① 毛利只 8%（最薄）② WOI 剩 1.4 週要斷貨（還擋校A交機）。
> 利潤引擎其實是週邊 ＋ MDM。本週真正該做：急補 iPad、清充電車積壓。

## B3 流程（two-wow · slides 52–62）

| slide | 內容 | 用到的檔 |
|---|---|---|
| 54 | 案例情境＋任務（三題：補什麼 / 推哪案 / 清什麼）＋下載資料包 | `STUDIO_A_W27_資料包.zip` |
| 55 | **你先自己看** — 4 檔攤開、手動兜（timer 4min，感受痛） | 資料包 4 檔 |
| 56 | **WOW 1** — 一個 prompt 濾正常出貨＋算 WOI/毛利 → 產 `週決策表_W27.csv`（決策表 = 分析 aha） | 資料包 4 檔 |
| 57 | 有數據還不夠 → 要視覺化（3 個理由：主管沒空 / 要轉發原廠 / 重點要被看見） | — |
| 58 | 介紹 DS（仿 sonice d2 #30，5 元件：logo/配色/字型/版型/元件） | — |
| 59 | **裝 DS** — 下載 STUDIO A DS 包 → 丟 Inbox → 寫進 CLAUDE.md | `STUDIO_A_design-system.zip` |
| 60 | **WOW 2** — 用決策表產一頁式 HTML 報表（表＋insight block＋STUDIO A DS · timer 10min） | `週決策表_W27.csv` |
| 61 | aha 揭曉＋debrief（營收榜→毛利榜兩榜翻盤＋WOI 見底＋抽 3 人） | — |
| 62 | BRIDGE → D2（Claude Design） | — |

> DS 包（`STUDIO_A_design-system.zip` = design-system.md + tokens.css）由 `../../design-system/studioa/` 打包，供 59 下載。

## 真實感

- 沿用 p40 宇宙：校 A~ 代號、同 SKU 通稱、原廠 X/Y/Z、業務對齊 roster
- 真實術語：EPB / 進銷存 / WOI / 教育版 / MDM 授權 / 季度達成 / 標案 / 交機 / 調撥
- 逐筆＋多來源＋要 filter 雜訊 → 學員感覺「像我們每週在兜的資料」；乾淨、不埋髒 join（清/併/抓髒是 B2 開工 p40 的活）

---

**Created**: 2026-07-01 · **Updated**: 2026-07-02（多來源資料包 · 243 筆逐筆明細）
**Owner**: 余文皓（講師）
