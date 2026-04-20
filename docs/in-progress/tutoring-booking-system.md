# 1:1 Tutoring Booking System — Progress Tracker

**建立日期**：2026-04-16
**Target**：單頁式 1:1 教學預約 + Stripe TWD 付款（解決付款與時段原子性）
**Status**：✅ **Production live**（2026-04-17）— 上午 NT$20 smoke test + 下午 UX 重構後 NT$20 real-card 再驗證，均通過
**Orphan cleanup**：✅ **上線 + 驗證通過**（2026-04-17）— Azure Container App Job `yu-wenhao-tutoring-cleanup` 每 5 min 自動跑
**UX 重構**：✅ **下午完成**（2026-04-17）— 從公開 landing page 架構改為熟人專用 split-layout 支付門戶

---

## Architecture

```
學員 → /zh-TW/tutoring/
  ↓ Calendly inline widget 選時段（postMessage event_scheduled）
  ↓ POST /api/tutoring/create-checkout
Backend：建 DB booking (status=pending, hold=15min) + Stripe Embedded Checkout Session
  ↓ 回傳 client_secret
前端：掛載 Stripe Embedded Checkout
  ↓ 付款完成
Stripe webhook → POST /api/tutoring/stripe-webhook
  ↓ 更新 DB status=paid
前端 polling /status/{id} → 切換 State 3 顯示預約確認
```

**失敗路徑 — 三層清理機制**：
```
1. Stripe webhook `session.expired`（~30 min 後）        ← 兜底，Stripe 自己推
2. Azure Container App Job cron `*/5 * * * *`          ← 主力，每 5 min 打 /cleanup
3. Manual admin trigger（az containerapp job start）    ← 緊急
```
`/cleanup` endpoint 兩個 pass：
- **db_expired pass**：DB pending + `hold_expires_at < NOW()` → Calendly cancel + DB status=expired
- **orphans pass**：Calendly 有 active event 但 DB 沒對應 row，且 Calendly `created_at` 距今 > 15 min → Calendly cancel（處理 CSP block / fetch timeout 等造成的孤兒）

---

## ✅ 已完成

### Code（本地 commit，未 push）

- [x] Backend `personal-website-api/src/routers/tutoring.py`
  - 5 endpoints：`create-checkout` / `status/{id}` / `stripe-webhook` / `cleanup-expired` / `bookings`
  - DB schema `tutoring_bookings`（UUID + unique invitee_uri）
  - Calendly API wrapper（fetch invitee/event、cancel scheduled event）
  - Stripe SDK 整合（Embedded Checkout Session）
  - Commit: `2fcbeee feat: add 1:1 tutoring booking API (Calendly + Stripe integration)`
- [x] Frontend `personal-website/src/pages/zh-TW/tutoring.astro`
  - Hero / Outcomes / Format / Who it's for / Why me / Testimonials
  - State machine UI：select → payment → confirmed / expired / error
  - `noindex=true`（隱藏頁）
  - Publishable key 自動切換（dev=test / prod=live）
  - Commit: `ec00d0b feat(tutoring): add /zh-TW/tutoring page with Calendly + Stripe booking flow`

### External 設定

- [x] Calendly Event Type `1:1 教學 - 實體（竹北 JustCo）` 建立
- [x] Calendly PAT 生成（scopes: event_types:read, scheduled_events:read/write, users:read）
- [x] Add Guests 關閉
- [x] Stripe live webhook `tutoring-backend` 建立
  - URL: `https://yu-wenhao-api.calmisland-ea7fe91e.japaneast.azurecontainerapps.io/api/tutoring/stripe-webhook`
  - Events: `checkout.session.completed`, `checkout.session.expired`
- [x] Stripe Restricted Key 建立（Checkout Sessions Write / PaymentIntents Read / Charges Read）

### Azure Container App（已設定，但 code 還沒 deploy）

- [x] Secrets 加入：`stripe-secret-key`, `stripe-webhook-secret`, `calendly-pat`
- [x] Env vars 加入：6 個（詳見下方）

### 本地 E2E 測試

- [x] PostgreSQL 本地 DB 建表成功
- [x] 完整流程跑通：select → pay (test card 4242) → confirmed
- [x] NT$8,000 金額顯示正確（Stripe UI 會顯示 `.00` 是 Stripe 全球行為）
- [x] 15 分鐘過期自動取消流程驗證

---

## 🚀 2026-04-17 上線紀錄

### Deploy 順序
1. Backend push `2fcbeee` → Azure Container App deploy 1m31s ✅
2. 驗證 `/health` 200, `/api/tutoring/bookings` 401（未授權） / admin key 通過 → DB 空表建立 ✅
3. Frontend push `ec00d0b` → Azure Static Web Apps deploy 1m42s ✅
4. **踩坑 #1 — CSP frame-src**：Calendly widget 空白載入失敗
   - Root cause: `staticwebapp.config.json` 的 CSP 只白名單 `assets.calendly.com`（widget.js CDN），缺 `calendly.com` 本身（iframe 來源）
   - Fix: commit `b0449ce` 加三個白名單：`https://calendly.com`, `https://js.stripe.com`, `https://hooks.stripe.com`
5. **踩坑 #2 — Stripe 最低金額**：NT$8 被 Stripe 拒絕
   - Error: `Checkout Session's total amount must convert to at least 50 cents. $8.00 TWD converts to approximately $0.25 USD`
   - Fix: 臨時改 `TUTORING_PRICE_TWD=20`（≈ $0.62 USD），smoke test 通過後改回 8000
6. NT$20 real-card smoke test → 付款成功、State 3 確認畫面正確、Stripe Dashboard 看到 live payment ✅
7. `TUTORING_PRICE_TWD` 改回 8000 ✅

### 學到的（之後類似整合用）

1. **CSP 白名單 asset CDN ≠ iframe 來源**：每個 third-party 整合都要同時列 widget CDN + iframe host。Calendly: `assets.calendly.com` + `calendly.com`。Stripe: `js.stripe.com` + `hooks.stripe.com`（3DS / wallets）
2. **Stripe 全球最低金額 ≈ $0.50 USD**：TWD smoke test 最低用 **NT$20** 才過得去。以後類似 live 金流測試不要用 NT$1-8
3. **Localstorage resume 陷阱**：前端用 `tutoring_booking_id` 記住 pending booking，改金額或換 test/live mode 時要提醒使用者清掉（或手動 DevTools 刪）

---

## 🧹 2026-04-17 Orphan Cleanup 上線紀錄

**動機**：上線當天 11:34 試第一筆時 CSP 被擋，Calendly iframe 空白但內部仍建 event，前端 `postMessage` 沒觸發 → backend API 沒被呼叫 → **DB 無記錄 / Calendly 有 active event / Stripe 無 session** = 純 orphan。Stripe webhook 管不到（沒有 session 可過期），原 `/cleanup-expired` 也管不到（DB 沒 row 可掃）。

### 三種 orphan 情境分類

| Case | DB | Calendly | Stripe | 清理方式 |
|---|---|---|---|---|
| A 正常未付 | pending | active | open | Stripe webhook `session.expired` @ 30min |
| B 純孤兒（CSP/network 擋 fetch） | ❌ 無 | active | ❌ 無 | **新 `/cleanup` orphans pass** |
| C DB pending + Stripe webhook 漏送 | pending | active | expired | **新 `/cleanup` db_expired pass** |

### 設計決策

1. **以 Calendly 為真相來源反查 DB**：列 active events → 對每筆反查 DB，沒記錄 + 過 15 min buffer = orphan → cancel
2. **15 分鐘 orphan buffer**：避免誤殺「剛選完時段正要付款」的正常 fetch in-flight
3. **Schedule 執行方：Azure Container App Job，不用 GitHub Actions**
   - 實測 GitHub Actions `*/5` cron 跳過連續 3+ 輪（12:10 / 12:15 / 12:20 全部沒跑）— 官方文件明確警告高負載時段會延遲，實務上太不穩
   - Azure Job 同一個 managed environment，12:30 / 12:35 **整點準時執行**

### Endpoint 設計

`POST /api/tutoring/cleanup?key={admin_key}` 兩 pass 合一：
```python
async def _run_cleanup():
    # Pass 1: DB pending 過期 → Calendly cancel + DB mark expired
    # Pass 2: Calendly active 無 DB 對應 + created_at > NOW - 15min → Calendly cancel
    return { db_expired_ids, orphans_cancelled_uris, calendly_events_scanned }
```

`POST /api/tutoring/cleanup-expired` 保留為 deprecated alias。
`DELETE /api/tutoring/bookings/{id}` 新增 admin-only，僅供測試 orphan path 用。

### Azure Container App Job 設定

```yaml
# deploy/cleanup-job.yaml
triggerType: Schedule
cronExpression: "*/5 * * * *"
image: curlimages/curl:8.11.1
command: curl → POST /api/tutoring/cleanup?key=$ADMIN_KEY
secrets: admin-key (ref to ADMIN_KEY env)
```

建立：`az containerapp job create --yaml deploy/cleanup-job.yaml`
手動觸發：`az containerapp job start --name yu-wenhao-tutoring-cleanup --resource-group airesumeadvisorfastapi`
查 executions：`az containerapp job execution list --name yu-wenhao-tutoring-cleanup -g airesumeadvisorfastapi`

### 驗證結果

| 時點 | 事件 |
|---|---|
| 12:09:35 | 使用者選 4/24 時段 → 看到 Stripe 立刻關 tab → DB pending + Calendly active（Case C 成立）|
| 12:16:10 | 手動 DELETE DB row → Case B 純孤兒成立（Calendly `a0865696` 孤立）|
| 12:19:03 | 使用者再選 4/29 時段 → 同樣關 tab → 第二筆 Case C（DB `192992f8` / Calendly `b398db37`）|
| **12:25:34** | Azure Job 手動 execution → Case B `a0865696` cancelled with reason "Orphan booking — no payment session created" ✅ |
| **12:30:00** | Azure Job schedule 第一次自動 execution → Case C 仍在 buffer 內，正確跳過 |
| **12:35:00** | Azure Job 第二次自動 execution → Case C 清：DB `192992f8` status=expired + Calendly `b398db37` cancelled with reason "Payment hold expired" ✅ |
| 12:36:57 | 手動 cancel NT$20 smoke test booking（Calendly `c40bcd60`，4/21 08:30）— 避免真佔時段。Stripe refund 待手動 |
| 12:40 | 刪除 GitHub Actions `cleanup-tutoring.yml`（原本只保留 workflow_dispatch，決定完全清掉，Azure Job 單一真相）|

三次 execution 全部 Succeeded，整點準時。

### 學到的

1. **Calendly `scheduled_events` API 時間窗口用 `start_time`**，不是 `created_at`。初版用 `min_start_time=now-2h` 會漏抓「剛建但預約未來日期」的 event。修正為 `min_start_time=now, max_start_time=now+60d`，orphan 年齡檢查改在 Python 用 `created_at` 做
2. **GitHub Actions `*/5` cron 實務上不可靠** — 尤其整點時段、剛部署時、低流量 repo。高可用場景要用 Azure Container App Job / Cloud Scheduler / 外部 cron
3. **驗證 orphan cleanup 需要刻意製造孤兒**：Calendly 沒有讓 PAT 直接建 event 的 API，要用「刪 DB row + 留 Calendly event」的方式手動製造，這就是為什麼加 `DELETE /bookings/{id}` admin endpoint

---

## 🎨 2026-04-17 下午 UX 重構紀錄

### 動機與診斷

上午 smoke test 通過後重新檢視頁面，發現三個結構性問題（使用者回饋）：
1. Hero 的「寫信預約」按鈕跟流程不符 — 整頁是自動 Calendly + Stripe，但 CTA 文字寫「寫信預約」
2. 「線上場」section 存在但沒有對應的 Calendly online event type — 違反「不捏造」原則
3. 頁面太長（Hero → Outcomes → Format → Who it's for → Why me → Testimonials → Booking 共 7 section），很多使用者滑到一半就離開，沒看到 Calendly

**更深層的問題**：頁面本質定位錯誤。經過與使用者討論釐清：此頁 **不公開對外**，只給熟人（已決定要買）分享連結完成交易用，因此：
- Landing page（說服）邏輯不適用 — 熟人不需要被說服
- 正確定位 = **payment portal（支付門戶）**，KPI 是轉換不是說服
- 所有說服性內容（Outcomes 卡片、Why me 數字、Testimonials）都是多餘的，甚至反效果

但重要原則：**「專業感 ≠ 客製化」** — 即使給熟人，文案要保留通用銷售文案質感。熟人看到正式產品頁反而會更認真對待。

### 六題對話式決策（使用者一題題確認）

| Q | 決定 | 理由 |
|---|------|------|
| Q1 Hero subhead | 保留完整文案 + 流程提示「選時段 → 付款 → 預約成功」移到 Calendly 上方 | 文案專業感不動；流程提示在「即將操作」處最有用 |
| Q2 規格說明 | 一行 tag：「包含：AI 工作流 · 目標與專案管理 · Obsidian 知識庫 · Claude Code 環境」 | 熟人一眼確認「對就是這個」，不用 4 張卡片 |
| Q3 取消政策 | 一行淡色小字：`需要改期或取消，請直接聯絡我：mail@yu-wenhao.com` | 回應付款前的焦慮，不破壞熟人調性 |
| Q4 線上場 | 全部拿掉 | 目前沒 online event type，不捏造 |
| Q5 Testimonials + Why me | 全部拿掉 | 熟人信任已建立，內容搬到 archive 未來復用 |
| Q6 Format 3 段 + 2 場地卡 | 壓縮成一行文字：「流程：30 分鐘釐清場景 → 3 小時手把手建系統 → 30 分鐘收斂下一步」 | 預期管理有價值，但不值得 3 張卡片 |

### Layout 決策：Split（左右切）而不是 Stack（上下堆疊）

使用者提出參考 `/zh-TW/survey/ai-meeting-tool/` 的 split layout：**左邊文字 / 右邊直接是預約元件，一屏完成 qualify + 預約，不用 scroll**

核心洞察：**「支付門戶」的 above-the-fold 就要能操作**，不能把預約埋在頁面底部。

四個技術細節確認：
- **D1 Calendly 高度**：保持 700px，左邊文字垂直可視 ✅
- **D2 Payment state**：維持 split（左 info / 右 Stripe）— 一開始誤做成「切回單欄置中」，使用者澄清：**右邊容器內容換，左邊 info 全程保留**，才是對的 UX
- **D3 背景色**：整頁米色 `#F5F1EB`，卡片白色浮在上面 — 最乾淨
- **D4 CTA 按鈕**：桌機版不需要（Calendly 已在右邊），mobile-only 保留 anchor scroll

### 實際改動

**砍掉的 5 個 sections**（存檔於 `docs/in-progress/tutoring-page-sections-archive.md`）：
- Outcomes 4 格卡片
- How it works 3 段 + 2 場地
- Who it's for（適合 / 不適合 + mid CTA）
- Why me 4 數字
- Testimonials 2 則（含延伸閱讀連結）

**新增**：
- Hero tag 列（包含 + 流程）
- 左右 split layout（lg breakpoint 以上）
- 統一卡片樣式：`bg-white rounded-2xl shadow-sm border border-[#E8E4DD]`
- `hydratePaymentSummary()` 函數 — Payment state 上方「時段已預留」從「載入中...」改為實際時段（`2026/04/28（週二）13:30—17:30`）
- Dev-mode graceful fallback — backend 沒跑時 reset 到 select state 而非卡 error

**Commits**：`244790e refactor(tutoring): simplify to split-layout payment portal` + `aadcc26 fix(tutoring): keep split layout in all states; fill time in payment summary`

**檔案變動**：tutoring.astro 從 727 lines → 496 lines（-231 lines，-32%）

### Production 驗證（下午 2 次）

| 時間 | 金額 | 結果 |
|---|---|---|
| 13:22 | NT$8,000（忘記改回 20）| Stripe 跳 Link 驗證碼，沒完成 — 非 bug，Stripe 偵測到 email 有 Link 帳號 |
| 13:28 | NT$20（臨時改 env var） | ✅ 完整流程通過 — split layout + Stripe Embedded + State 3 預約成功畫面全部正確 |

Env var 操作：`az containerapp update ... --set-env-vars TUTORING_PRICE_TWD=20` → Revision `0000035` 接流量 → 測完改回 8000 → Revision `0000036` 接流量 100%

### CAPTCHA 謎團（非 bug）

UX 重構後使用者發現 Calendly 開始跳 CAPTCHA（重構前沒跳）。推論與驗證：

**假設**：Calendly rate-limit（IP-based anti-bot），不是 layout 問題
- 今天同一 IP 反覆建 6-8 筆 event（含 orphan + 測試）→ 被標為可疑
- 重構前 smoke test 只建 1 筆，所以沒跳

**驗證方法 A**：使用者換網路（手機 4G / 其他 WiFi）→ **CAPTCHA 不跳** ✅ 推論確認

**結論**：Production 真實用戶（不同 IP、單次預約）不會跳。即使跳了，點一下驗證碼就通過。

### 今天下午產生的 Calendly / DB 狀態

截至 13:35 DB 5 筆 bookings：
| Scheduled | Status | 說明 |
|---|---|---|
| 4/21 08:30 | paid | 昨天 NT$20 smoke test（Stripe 已收款，Calendly 昨天已 cancel） |
| 4/29 08:30 | expired | 今天中午測 orphan cleanup 用的 Case C，cleanup 已處理 |
| 4/28 08:30 | expired | UX 重構後測試過程的 pending，cleanup 05:35 cron 自動 expire + Calendly cancel with reason "Payment hold expired" |
| 4/28 13:30 | pending | 最後一次 UI 測試沒走完付款，會被下次 cleanup 處理 |
| 4/30 08:30 | paid | 下午 NT$20 real-card smoke test ✅ |

**使用者手動 TODO**：
- Calendly cancel `WenHao Yu 1328` 4/30 08:30（NT$20 smoke test）
- Stripe NT$40（2 筆 NT$20）**不 refund，當 Stripe balance 儲值**（扣手續費後 ≈ NT$18.84）

### 學到的

1. **「頁面本質」決定一切**：Landing page（說服）和 payment page（轉換）是根本不同的 UX 邏輯。一開始當 landing page 做是錯配。**下次做 payment page 先問「目的是說服還是轉換」**
2. **「專業感 ≠ 客製化」**：即使熟人用，文案要保留通用質感。熟人看正式產品頁更認真
3. **Split layout > Stack layout for payment portals**：一屏完成 qualify + 預約，零滾動到達
4. **State machine 切換要守住容器**：payment state 別改動外層 layout，只換容器內部內容（我一開始做錯了，使用者更正）
5. **Calendly CAPTCHA 是 IP-based rate limit**（debug 「為什麼突然出現」先換網路驗證）
6. **Stripe Link 跳驗證碼不是 bug**：Stripe 偵測到 email 有 Link 帳號就會跳，真實用戶第一次付款不會跳
7. **Archive over delete**：砍掉的 section 存到 md 檔，未來公開版 / services 頁 / about 頁可復用 — 不是刪掉是搬家
8. **文案迭代用對話式 Q&A**：6 題一題題確認（我提建議 + 使用者決定），避免一次改太多又推翻

### 未完成（Future Enhancements）

- [ ] Confirmed 畫面 NT$8,000 硬編碼（真實付款金額存在 DB，前端寫死 8,000 剛好一致，smoke test 時會顯示 mismatch）— **暫不改**，等 DB schema 加 `amount_twd` 欄位時一起做
- [ ] Mobile（< lg breakpoint）split layout 變 stack，Calendly widget 會變很長 — 可能要改成「開啟 Calendly 新頁」按鈕或 modal
- [ ] Hero 左邊 info 的 sticky 在長 Calendly 中會跟不上 — 可接受

---

## ⏳ 待做（明天繼續）

> ✅ **Steps 1-6 已於 2026-04-17 完成**（見上方「上線紀錄」），保留原始內容作歷史紀錄。

### 1. Secrets 存放位置（已完成 ✅）

**所有 secrets 已寫入**：
```
~/Library/Mobile Documents/iCloud~md~obsidian/Documents/FLUX Vault/secrets/.env.personal-website-api
```

權限 `-rw-------`（只有你能讀）。iCloud 自動同步到所有裝置。

包含：`ADMIN_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PUBLISHABLE_KEY_LIVE`, `STRIPE_PUBLISHABLE_KEY_TEST`, `CALENDLY_PAT`, `CALENDLY_EVENT_TYPE_IN_PERSON_URI`, `CALENDLY_USER_URI`, `TUTORING_PRICE_TWD`, `FRONTEND_BASE_URL`

> ⚠️ 這個檔案**不在任何 git repo**，純 iCloud 同步。不會外洩到 GitHub。

### 2. Push backend

```bash
cd ~/GitHub/personal-website-api
git push origin main
```

CI/CD 會自動 build + deploy（3-5 分鐘）。追蹤：
```bash
gh run watch
```

### 3. 驗證 backend 上線

```bash
# Health check
curl https://yu-wenhao-api.calmisland-ea7fe91e.japaneast.azurecontainerapps.io/health

# Verify tutoring endpoints are registered (unauth 401 是預期)
curl 'https://yu-wenhao-api.calmisland-ea7fe91e.japaneast.azurecontainerapps.io/api/tutoring/bookings'

# Admin check (需要真的 ADMIN_KEY)
curl 'https://yu-wenhao-api.calmisland-ea7fe91e.japaneast.azurecontainerapps.io/api/tutoring/bookings?key=DEStEtbf44BKrVNiL5xkRZqwzpHyfNPd-tigDvITKvA'
```

### 4. Push frontend

```bash
cd ~/GitHub/personal-website
git status  # 檢查只 push tutoring.astro，不要不小心帶到 staticwebapp.config.json
git push origin main
```

Azure Static Web Apps 會自動部署（2-3 分鐘）。

### 5. Production Real-money smoke test（NT$8）

現在 `TUTORING_PRICE_TWD=8`（不是 8000）— 這是刻意的。

**測試步驟**：
1. 瀏覽器打開：https://yu-wenhao.com/zh-TW/tutoring/
2. 滑到最下面「準備好了嗎？」
3. 選時段（隨便選一個，事後會 cancel）
4. **用你自己的真信用卡**刷 NT$8
5. 確認流程：
   - [ ] 付款頁顯示 NT$8（不是 NT$800 或其他）
   - [ ] 付款完成後頁面切到 State 3
   - [ ] 時間、地點、收據連結都正確
   - [ ] Google Calendar 出現事件
   - [ ] Stripe Dashboard 看到 NT$8 live payment
6. **Stripe Dashboard refund** 這筆 NT$8
7. **Calendly 取消**這個預約（避免真的佔時段）

### 6. 改回 TUTORING_PRICE_TWD=8000

```bash
az containerapp update \
  --name yu-wenhao-api \
  --resource-group airesumeadvisorfastapi \
  --set-env-vars TUTORING_PRICE_TWD=8000
```

---

## 🧪 待測項目（Production 上線後）

### 功能驗證

- [ ] Happy path：選時段 → 付款 → 預約成功
- [ ] 付款失敗 / 關掉分頁：15 分鐘後時段自動釋放
- [ ] 重新載入頁面：localStorage 讀到 `tutoring_booking_id` → 顯示當前 status
- [ ] 成功後重新載入：還是顯示 State 3（預約確認）
- [ ] Success URL 帶 `?success=1&session_id=xxx`：URL 清理 + 顯示確認畫面
- [ ] Calendly widget 載入（production 網路下）
- [ ] Stripe Embedded Checkout 載入（production 網路下）

### 邊界狀況

- [ ] 同一個 invitee 重複呼叫 create-checkout（應該 reuse session）
- [ ] Stripe webhook 延遲：前端 polling 最多 5 分鐘，學員需要可看到載入狀態
- [ ] 學員進頁面但 JavaScript disabled：state machine UI 整個不 render（目前邏輯如此，可接受）
- [ ] 學員預約後網路斷線：DB 有 pending booking，但沒 client_secret → 下次重進頁面會 reset 到 select state

### 需要 **手動追蹤** 的邊界

- [ ] 學員付款成功但 Calendly booking 被他取消？（Calendly 不通知我們）
- [ ] Stripe 付款成功但 webhook 漏送？（Stripe Dashboard 可 manually retry）
- [ ] 時段重複：Calendly 會擋，DB unique constraint 是第二道防線

### 已知問題 / 不做

- **Stripe 顯示 NT$8,000.00 有小數點**：Stripe 全球行為，除非改用 Payment Element 自刻 UI 否則改不掉 → **決定接受**
- **Calendly 在學員選完時段當下就寄 email 給學員**：可能讓學員以為已確認 → **目前接受**（文案 workaround 是之後的優化）
- **Cleanup cron 還沒掛**：admin endpoint `POST /cleanup-expired` 存在但沒定期觸發 → 可以手動 curl，或之後用 GitHub Actions

---

## 📋 Azure Container App Env Vars（已設定）

**Plain values**：
| Name | Value |
|------|-------|
| `CALENDLY_EVENT_TYPE_IN_PERSON_URI` | `https://api.calendly.com/event_types/2240ad18-666c-4122-be6b-11c195a70c66` |
| `CALENDLY_USER_URI` | `https://api.calendly.com/users/06e4e598-...`（orphan 掃描用，2026-04-17 加）|
| `TUTORING_PRICE_TWD` | `8000`（live）|
| `FRONTEND_BASE_URL` | `https://yu-wenhao.com` |

**Secret refs**：
| Name | Secret |
|------|--------|
| `STRIPE_SECRET_KEY` | `secretref:stripe-secret-key` |
| `STRIPE_WEBHOOK_SECRET` | `secretref:stripe-webhook-secret` |
| `CALENDLY_PAT` | `secretref:calendly-pat` |

### Azure Container App Job（2026-04-17 加）
| Property | Value |
|---|---|
| Name | `yu-wenhao-tutoring-cleanup` |
| Trigger | Schedule, cron `*/5 * * * *` |
| Image | `curlimages/curl:8.11.1` |
| Spec | `deploy/cleanup-job.yaml`（repo 內）|
| Secret | `admin-key`（對應 API 的 `ADMIN_KEY`）|

---

## 🔧 Future Enhancements（上線後再做）

- [ ] **文案優化**：Hero subhead / Outcomes 卡片用字調整
- [ ] **線上版 Event Type**：Calendly 建立 `tutoring_online` event → 加 frontend radio 選項
- [x] ~~**Cleanup cron**~~ ✅ 已上線（Azure Container App Job，見「Orphan Cleanup 上線紀錄」）
- [ ] **Calendly webhook 根治 orphan**：用 `invitee.created` 即時同步，取代 polling。需驗簽 + shared secret，但完全消除 15 min 延遲
- [ ] **Azure Job 失敗告警**：連續 N 次失敗 → email notify（目前靠手動 `az containerapp job execution list`）
- [ ] **Admin 儀表板頁**：`/zh-TW/admin/tutoring/` 列出所有 booking 狀態 + 最近 N 次 cleanup execution
- [ ] **公開頁面**：確認穩定後移除 `noindex`，加入 nav
- [ ] **日文學員支援**：頁面語言切換（zh-TW / en / ja）
- [ ] **金流替代方案**：如果 Stripe TWD 小數點影響太大，考慮綠界 / 藍新

---

## 📁 File References

### 會動到的檔案
- `~/GitHub/personal-website-api/src/routers/tutoring.py`（新增）
- `~/GitHub/personal-website-api/src/main.py`（+3 行）
- `~/GitHub/personal-website-api/src/config.py`（+env vars 讀取）
- `~/GitHub/personal-website-api/requirements.txt`（+stripe, httpx）
- `~/GitHub/personal-website/src/pages/zh-TW/tutoring.astro`（新增）

### 不會動
- `~/GitHub/personal-website/public/staticwebapp.config.json`（有獨立的 blog 301 redirect 變更，待你另外決定要不要一起 commit）

---

**Last updated**：2026-04-17 下午 — UX 重構（熟人支付門戶 split layout）+ production 再驗證通過（NT$20 real-card）+ tutoring.astro 從 727 → 496 lines（-32%）
