# Frontend X Items Field Name Cleanup

**Date**: 2026-01-13
**Status**: ✅ Completed
**Related**: `azure_container/docs/tasks-done/2026-01-13-panopticon-x-field-mapping.md`

---

## Why (背景)

### Backend 已完成的改動

Backend 執行了 DB schema 改動，將欄位名稱統一：

| Before (舊) | After (新) |
|-------------|-----------|
| `author_handle` | `author` |
| `author_category` | `category` |

**Migration Script**: `scripts/migrations/005_rename_x_items_columns.sql`

```sql
ALTER TABLE panopticon.x_items RENAME COLUMN author_handle TO author;
ALTER TABLE panopticon.x_items RENAME COLUMN author_category TO category;
```

### 為什麼要改？

1. **消除 Mapping** — 從 source (`x_discovery.py`) 到 DB 到 API 都使用同一套欄位名
2. **簡化程式碼** — 不再需要 fallback 邏輯
3. **降低 Bug 風險** — 舊版 API filter 使用 `xi.author` 會報錯，改欄位名後自動修復

### API Response 變化

**Before**:
```json
{
  "author_handle": "elonmusk",
  "author_category": "tech_leader",
  ...
}
```

**After**:
```json
{
  "author": "elonmusk",
  "category": "tech_leader",
  ...
}
```

---

## What (需要修改的檔案)

### File: `src/pages/zh-TW/tools/p4n0pt1c0n-7x9k2m.astro`

| Line | Current Code | Issue |
|------|--------------|-------|
| 525 | `data-author="${escapeHtml(item.author_handle \|\| '')}"` | 使用舊欄位名 |
| 542 | `// API returns: author_handle, author_name, author_category` | 註解過時 |
| 546 | `// Group by author - API uses author_handle field` | 註解過時 |
| 549 | `item.author_handle \|\| item.author \|\| 'unknown'` | 不需要 fallback |
| 640 | `// Group by category - API uses author_category field` | 註解過時 |
| 643 | `item.author_category \|\| item.category \|\| 'other'` | 不需要 fallback |
| 736 | `item.author_category \|\| item.category \|\| 'other'` | 不需要 fallback |
| 1508 | `storedItem.author_handle` | 使用舊欄位名 |
| 1520 | `storedItem.author_handle` | 使用舊欄位名 |
| 1530 | `storedItem.author_handle` | 使用舊欄位名 |
| 1541 | `storedItem.author_handle` | 使用舊欄位名 |

---

## How (建議做法)

### Step 1: 更新 data attribute

```typescript
// Line 525
// Before
data-author="${escapeHtml(item.author_handle || '')}"

// After
data-author="${escapeHtml(item.author || '')}"
```

### Step 2: 移除 fallback 邏輯

```typescript
// Line 549
// Before
const author = item.author_handle || item.author || 'unknown';

// After
const author = item.author || 'unknown';
```

```typescript
// Line 643
// Before
const cat = item.author_category || item.category || 'other';

// After
const cat = item.category || 'other';
```

```typescript
// Line 736
// Before
const cat = item.author_category || item.category || 'other';

// After
const cat = item.category || 'other';
```

### Step 3: 更新 Modal 相關程式碼

```typescript
// Line 1508
// Before
title: `@${storedItem.author_handle}: ${(storedItem.original_text || '').slice(0, 50)}...`,

// After
title: `@${storedItem.author}: ${(storedItem.original_text || '').slice(0, 50)}...`,
```

```typescript
// Line 1520
// Before
modalTitle.textContent = `@${storedItem.author_handle}`;

// After
modalTitle.textContent = `@${storedItem.author}`;
```

```typescript
// Line 1530
// Before
const kolDesc = kolDescriptions[storedItem.author_handle] || '';

// After
const kolDesc = kolDescriptions[storedItem.author] || '';
```

```typescript
// Line 1541
// Before
<span class="font-semibold text-sky-700">@${escapeHtml(storedItem.author_handle)}</span>

// After
<span class="font-semibold text-sky-700">@${escapeHtml(storedItem.author)}</span>
```

### Step 4: 更新註解

```typescript
// Line 542
// Before
// API returns: author_handle, author_name, author_category (not author, category)

// After
// API returns: author, author_name, category
```

```typescript
// Line 546
// Before
// Group by author - API uses author_handle field

// After
// Group by author
```

```typescript
// Line 640
// Before
// Group by category - API uses author_category field (not category)

// After
// Group by category
```

---

## Testing Checklist

修改後請驗證：

- [x] X Tab 正確顯示所有 items
- [x] Category sub-tabs (Tech Leaders, AI Builders, etc.) 正確分類
- [x] 點擊 item 顯示正確的 Modal 標題 (`@author`)
- [x] Modal 中 KOL description 正確顯示
- [x] 收藏功能正常運作
- [x] 隱藏功能正常運作

---

## Rollback Plan

如果遇到問題：

1. **API 仍支援舊格式** — Backend 的 `insert_x_items()` 仍有 fallback 邏輯
2. **可暫時恢復 fallback** — 前端可以恢復 `item.author_handle || item.author` 語法

---

## Summary

| Item | Count |
|------|-------|
| Files to modify | 1 |
| Lines to change | 11 |
| Complexity | Low |
| Risk | Low (API has backward compatibility) |

**Estimated effort**: 15-20 minutes

---

**Created by**: Claude
**Date**: 2026-01-13
