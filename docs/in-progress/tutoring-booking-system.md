# 1:1 Tutoring Booking System — Progress Tracker

**建立日期**：2026-04-16
**Target**：單頁式 1:1 教學預約 + Stripe TWD 付款（解決付款與時段原子性）
**Status**：✅ **Production live**（2026-04-17）— NT$20 real-card smoke test 通過，已改回 NT$8,000

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

**失敗路徑**：15 分鐘 hold 過期 → admin cron 打 `/cleanup-expired` → Calendly cancel API → DB status=expired

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
| `TUTORING_PRICE_TWD` | `8`（smoke test，後改 8000） |
| `FRONTEND_BASE_URL` | `https://yu-wenhao.com` |

**Secret refs**：
| Name | Secret |
|------|--------|
| `STRIPE_SECRET_KEY` | `secretref:stripe-secret-key` |
| `STRIPE_WEBHOOK_SECRET` | `secretref:stripe-webhook-secret` |
| `CALENDLY_PAT` | `secretref:calendly-pat` |

---

## 🔧 Future Enhancements（上線後再做）

- [ ] **文案優化**：Hero subhead / Outcomes 卡片用字調整
- [ ] **線上版 Event Type**：Calendly 建立 `tutoring_online` event → 加 frontend radio 選項
- [ ] **Cleanup cron**：GitHub Actions schedule（每分鐘）打 `/cleanup-expired`
- [ ] **Admin 儀表板頁**：`/zh-TW/admin/tutoring/` 列出所有 booking 狀態
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

**Last updated**：2026-04-17 — Production live 後補踩坑紀錄 + CSP/Stripe 學到的
