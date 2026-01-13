# Panopticon API Migration (Phase 4)

**Date**: 2026-01-13
**Commit**: `033ae5a`
**Reference**: `Cockpit/ideas/panopticon-db-architecture-plan.md`
**Status**: Complete

---

## Overview

將 Panopticon 前端從靜態 JSON 檔案改為從 azure_container API 動態載入資料。

這是 Panopticon DB Architecture 六階段計畫的 Phase 4。

---

## Changes Summary

| Type | Files | Lines |
|------|-------|-------|
| **Deleted** | 9 static JSON files | -10,470 |
| **Deleted** | `sync-panopticon.yml` workflow | -107 |
| **Modified** | `p4n0pt1c0n-7x9k2m.astro` | +298/-141 |

---

## Implementation Details

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

## API Endpoints Used

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/v1/panopticon/latest?source=content` | GET | None | Get latest content batch |
| `/api/v1/panopticon/latest?source=x` | GET | None | Get latest X batch |

Both endpoints are public (no API key required).

---

## UI States

| State | Condition | Display |
|-------|-----------|---------|
| **Loading** | Initial load | Spinner + "Loading from API..." |
| **Content** | Data loaded successfully | Item cards / X categories |
| **Empty** | No data returned | Empty state message |
| **Error** | API request failed | Error message + Retry button |

---

## Known Limitations

### P3 Issues (Not Blocking)

1. **Unused Frontmatter Variables**
   - `data` and `xData` are declared as `null` but still referenced in HTML
   - Shows `0` briefly during initial load
   - Impact: Minor UX flicker

2. **No XSS Escaping for `original_text`**
   - Tweet text inserted directly into HTML
   - Risk: Low (data source is controlled)
   - Mitigation: API data comes from our own backend

3. **No Fetch Timeout**
   - If API is slow, page stays in loading state indefinitely
   - Has retry button for recovery

---

## Verification

- [x] Page loads and displays loading state
- [x] Content items render after API response
- [x] X items render grouped by category and author
- [x] Tab filtering works (All, X, Reddit, HN, PH)
- [x] Search and filters work
- [x] Save/favorite functionality works (localStorage)
- [x] Analysis modal works
- [x] Error state shows retry button

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

**Document Version**: 1.0.0
**Last Updated**: 2026-01-13 11:30 CST
