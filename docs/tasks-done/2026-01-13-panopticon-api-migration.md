# Panopticon API Migration (Phase 4)

**Date**: 2026-01-13
**Commits**: `033ae5a` (initial), `4a28455` (P0 fixes)
**Reference**: `Cockpit/ideas/panopticon-db-architecture-plan.md`
**Status**: Complete

---

## What (Overview)

將 Panopticon 前端從靜態 JSON 檔案改為從 azure_container API 動態載入資料。

這是 Panopticon DB Architecture 六階段計畫的 Phase 4。

---

## Why (Design Decisions)

根據架構計劃書 Section 7 的設計決策：

| 決策 | 原因 |
|------|------|
| **Client-side fetch (CSR)** | 隱藏頁面不需要 SEO，CSR 可即時取得最新資料 |
| **直連 azure_container** | 不經過 proxy，減少延遲和維護成本 |
| **GET endpoints 無需 API Key** | 資料本身是公開內容（Reddit/X/HN），頁面 URL 已隱藏 |
| **Pre-computed analysis** | AI 分析在 batch 處理時完成，前端不需 on-demand 呼叫 |

---

## How (Implementation)

### Changes Summary

| Type | Files | Lines |
|------|-------|-------|
| **Deleted** | 9 static JSON files | -10,470 |
| **Deleted** | `sync-panopticon.yml` workflow | -107 |
| **Modified** | `p4n0pt1c0n-7x9k2m.astro` | +298/-141 |

### 1. Removed Build-time JSON Imports

**Before**:
```astro
---
import data from '../../../../public/data/panopticon/latest.json';
import xData from '../../../../public/data/panopticon/x/latest.json';
---
```

**After**:
```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';

// Empty initial state - data loaded via client-side fetch
const data = null;
const xData = null;
---
```

### 2. Added Client-side API Fetch

```typescript
const API_BASE = 'https://airesumeadvisor-api.eastasia.azurecontainerapps.io/api/v1/panopticon';

async function loadDataFromAPI() {
  const [contentRes, xRes] = await Promise.all([
    fetch(`${API_BASE}/latest?source=content`),
    fetch(`${API_BASE}/latest?source=x`)
  ]);

  const contentData = await contentRes.json();
  const xData = await xRes.json();

  // Render items...
}
```

### 3. Dynamic HTML Rendering

Added render functions to generate HTML from API response:

| Function | Purpose |
|----------|---------|
| `renderItemCard(item)` | Render Reddit/HN/PH item card |
| `renderXItem(item)` | Render single X tweet |
| `renderXCategory(category, items)` | Render X category section with grouped authors |

### 4. Removed Sync Workflow

Deleted `.github/workflows/sync-panopticon.yml` (107 lines).

This workflow previously:
- Triggered by Cockpit discovery workflows
- Copied JSON files from Cockpit to personal-website
- Committed and pushed changes

No longer needed since data is fetched from API at runtime.

### 5. Removed Static Data Directory

Deleted `public/data/panopticon/` directory containing:
- `2026-01-10.json` to `2026-01-13.json` (daily content briefs)
- `latest.json` (symlink to current day)
- `x/2026-01-12-20.json`, `x/2026-01-13-06.json` (X briefs)
- `x/latest.json` (symlink to latest X brief)

---

## P0 Bug Fixes (2026-01-13 11:00 CST)

Code review 發現初始實作有遺留的舊架構程式碼，已修復：

### Fix 1: 移除硬編碼 API Token

**問題**：`__PANOPTICON_TOKEN__` 暴露在 client-side JS 中

**修復**：刪除整段程式碼，因為：
- GET endpoints 無需認證（依據架構設計 7.12）
- Token 是舊 proxy 架構遺留，不再使用

```diff
- (window as any).__PANOPTICON_TOKEN__ = 'd960abf9...';
```

### Fix 2: 修改 Refresh 按鈕行為

**問題**：呼叫不存在的 `/api/panopticon/refresh` 端點

**修復**：改為直接重新呼叫 `loadDataFromAPI()` 從 azure_container 載入最新資料

```typescript
// Before: 呼叫不存在的 API
fetch('/api/panopticon/refresh', { ... })

// After: 直接重新載入資料
await loadDataFromAPI();
// Re-initialize UI after data reload
prefs = getPrefs();
applyStates();
updateCounts();
applyFilters();
```

### Fix 3: 移除 On-demand Analyze Fallback

**問題**：呼叫不存在的 `/api/panopticon/analyze` 端點

**修復**：依據新架構，AI 分析應為 pre-computed。若無分析資料，顯示提示訊息：

```typescript
// Before: 呼叫不存在的 API
fetch('/api/panopticon/analyze', { ... })

// After: 顯示提示訊息
modalContent.innerHTML = `
  <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
    <p class="text-amber-800 text-sm">
      <strong>AI 分析尚未準備好</strong><br>
      此項目的 AI 分析將在下次 batch 處理時生成。
    </p>
  </div>
  ...
`;
```

### Fix 4: 修復 XSS 漏洞

**問題**：`original_text` 等欄位直接插入 HTML，有 XSS 風險

**修復**：新增 `escapeHtml()` 函數，應用於所有動態內容：

```typescript
function escapeHtml(str: string): string {
  if (!str) return '';
  const escapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return str.replace(/[&<>"']/g, c => escapeMap[c] || c);
}

// Applied to:
// - renderItemCard(): title, selftext, all data-* attributes
// - renderXItem(): original_text, translation, summary, url
// - handleAnalyze(): modal content display
```

---

## API Endpoints Used

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/v1/panopticon/latest?source=content` | GET | None | Get latest content batch |
| `/api/v1/panopticon/latest?source=x` | GET | None | Get latest X batch |

Both endpoints are public (no API key required) - see architecture doc Section 7.12.

---

## UI States

| State | Condition | Display |
|-------|-----------|---------|
| **Loading** | Initial load | Spinner + "Loading from API..." |
| **Content** | Data loaded successfully | Item cards / X categories |
| **Empty** | No data returned | Empty state message |
| **Error** | API request failed | Error message + Retry button |
| **No Analysis** | Item has no pre-computed AI analysis | Warning + original content |

---

## Known Limitations

### P3 Issues (Not Blocking)

1. **Unused Frontmatter Variables**
   - `data` and `xData` are declared as `null` but still referenced in HTML
   - Shows `0` briefly during initial load
   - Impact: Minor UX flicker

2. ~~**No XSS Escaping for `original_text`**~~ **[FIXED]**

3. **No Fetch Timeout**
   - If API is slow, page stays in loading state indefinitely
   - Has retry button for recovery

4. **Unused Astro Components**
   - `src/components/panopticon/*.astro` are dead code (replaced by client-side render functions)
   - Should be deleted in future cleanup

---

## Verification

- [x] Page loads and displays loading state
- [x] Content items render after API response
- [x] X items render grouped by category and author
- [x] Tab filtering works (All, X, Reddit, HN, PH)
- [x] Search and filters work
- [x] Save/favorite functionality works (localStorage)
- [x] Analysis modal works (with pre-computed analysis)
- [x] Analysis modal shows warning when no analysis available
- [x] Error state shows retry button
- [x] Refresh button reloads data from API
- [x] XSS protection applied to all dynamic content

---

## Related Changes

| Repo | Phase | Description |
|------|-------|-------------|
| azure_container | Phase 1 | PostgreSQL schema |
| azure_container | Phase 2 | Backend API endpoints |
| Cockpit | Phase 3 | Discovery scripts → API integration |
| **personal-website** | **Phase 4** | **Frontend API migration** |
| Cockpit | Phase 5 | Historical data migration script |
| Cockpit | Phase 6 | Cleanup sync workflows |

---

## Changelog

- **v1.1.0** (2026-01-13 11:00 CST): P0 bug fixes
  - Removed hardcoded API token
  - Fixed Refresh button to reload from API
  - Removed legacy analyze API fallback
  - Added XSS protection with `escapeHtml()`
  - Updated document structure with Why/How sections
- **v1.0.0** (2026-01-13 09:30 CST): Initial Phase 4 implementation

---

**Document Version**: 1.1.0
**Last Updated**: 2026-01-13 11:00 CST
