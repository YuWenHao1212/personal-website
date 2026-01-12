# X (Twitter) Panopticon Integration

將 X (Twitter) 內容發現整合到 Panopticon 系統，提供 KOL 推文分析與內容轉化建議。

---

## 背景

Panopticon 原本只追蹤 Reddit、Hacker News、Product Hunt。現在新增 X (Twitter) 來源，追蹤 19 個 KOL 帳號，每日 4 次抓取分析。

### X vs 其他來源的差異

| 維度 | Reddit/HN/PH | X (Twitter) |
|------|--------------|-------------|
| 內容性質 | 長篇討論、文章 | 短思考、即時動態 |
| 適合動作 | 回覆、參與討論 | 轉化成自己的內容 |
| 時效性 | 數小時～1天 | 即時～數小時 |
| 頻率 | 2x/天 (5AM, 5PM) | 4x/天 (6AM, 12PM, 4PM, 8PM) |
| LLM 分析 | 簡單摘要 + 回應建議 | 翻譯 + 脈絡 + 轉化角度 |

### 追蹤的 KOL (19 帳號)

| Category | Accounts |
|----------|----------|
| AI & Tech | sama, ylecun, AndrewYNg, kaborofficial, hwchase17 |
| Indie Hacker | levelsio, marc_louvion, dvassallo |
| Business & Politics | elonmusk, realDonaldTrump |
| Startup & Investment | paborenstein, csallen, naval, paulg |
| Career | waborenstein |
| Philosophy & Mindset | nntaleb, SahilBloom |
| Claude Code | bcherny, AmandaAskell |

---

## 已完成 (Backend - Cockpit)

### ✅ 1. X Discovery Script

**檔案**: `Cockpit/automation/x_discovery.py`

獨立的 X 抓取腳本，包含：
- Apify API 整合
- Azure OpenAI LLM 分析
- 增強版 prompt（翻譯 + 脈絡 + 2+2 轉化角度）

### ✅ 2. X Discovery Workflow

**檔案**: `Cockpit/.github/workflows/x-discovery.yml`

4x daily 排程：
```yaml
schedule:
  - cron: '0 22 * * *'   # 6 AM Taiwan
  - cron: '0 4 * * *'    # 12 PM Taiwan
  - cron: '0 8 * * *'    # 4 PM Taiwan
  - cron: '0 12 * * *'   # 8 PM Taiwan
```

### ✅ 3. 輸出檔案結構

**位置**: `Cockpit/briefs/x/`

```
briefs/x/
├── 2026-01-12-06.json    # 6 AM batch
├── 2026-01-12-06.md
├── 2026-01-12-12.json    # 12 PM batch
├── 2026-01-12-12.md
├── 2026-01-12-16.json    # 4 PM batch
├── 2026-01-12-16.md
├── 2026-01-12-20.json    # 8 PM batch
└── 2026-01-12-20.md
```

### ✅ 4. JSON 輸出格式

```json
{
  "date": "2026-01-12",
  "hour": "20",
  "generated_at": "2026-01-12 20:56",
  "stats": {
    "total_fetched": 61,
    "total_items": 20,
    "analyzed_items": 20
  },
  "items": [
    {
      "id": "e2a67f6bc34c",
      "source": "x",
      "author": "levelsio",
      "author_name": "Pieter Levels",
      "category": "indie_hacker",
      "url": "https://x.com/levelsio/status/...",
      "timestamp": "Mon Jan 12 12:49:37 +0000 2026",
      "original_text": "Just crossed $100k MRR...",
      "metrics": {
        "likes": 5420,
        "retweets": 892,
        "replies": 234,
        "views": 450000
      },
      "engagement_score": 5,
      "analysis": {
        "translation": "Photo AI 剛突破月收 10 萬美金...",
        "context_explanation": "Pieter Levels 是知名獨立開發者...",
        "motivation": "里程碑分享 + 強化個人品牌敘事",
        "value_types": ["content_inspiration", "industry_insight"],
        "content_category": "industry_thoughts",
        "angles": {
          "conventional": [
            "一人公司的真實樣貌：沒有想像中浪漫，但自由是真的",
            "從 $0 到 $100k MRR：獨立開發者的產品選擇邏輯"
          ],
          "contrarian": [
            "為什麼我『不想』成為下一個 Pieter Levels",
            "月收 10 萬美金之後呢？獨立開發者不談的那一面"
          ]
        },
        "title_ideas": [
          "一個人，月收 300 萬：這真的是你要的生活嗎？",
          "沒有員工的公司：自由的代價與收穫"
        ],
        "investment_signal": null,
        "score": 5,
        "summary": "經典的獨立開發者里程碑分享，適合發展成「一人公司現實面」的深度內容"
      }
    }
  ]
}
```

### ✅ 5. Content Discovery 分離

`content_discovery.py` 已移除所有 X 相關代碼，專注 Reddit/HN/PH。

---

## 待實作 (Frontend - personal-website)

### 📋 1. 更新 sync-panopticon.yml Workflow

**檔案**: `.github/workflows/sync-panopticon.yml`

需要修改 workflow 來同時抓取 X 資料。

#### 修改內容

```yaml
name: Sync Panopticon Data

on:
  schedule:
    # Sync after X discovery runs (add buffer time)
    - cron: '5 22 * * *'   # 6:05 AM Taiwan (after X 6AM)
    - cron: '5 4 * * *'    # 12:05 PM Taiwan (after X 12PM)
    - cron: '5 8 * * *'    # 4:05 PM Taiwan (after X 4PM)
    - cron: '5 12 * * *'   # 8:05 PM Taiwan (after X 8PM)
  workflow_dispatch:

permissions:
  contents: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Set up date and hour
        id: datetime
        run: |
          echo "TODAY=$(TZ='Asia/Taipei' date +%Y-%m-%d)" >> $GITHUB_OUTPUT
          echo "HOUR=$(TZ='Asia/Taipei' date +%H)" >> $GITHUB_OUTPUT
          # Determine which X batch to fetch based on current hour
          CURRENT_HOUR=$(TZ='Asia/Taipei' date +%H)
          if [ "$CURRENT_HOUR" -lt 9 ]; then
            echo "X_HOUR=06" >> $GITHUB_OUTPUT
          elif [ "$CURRENT_HOUR" -lt 15 ]; then
            echo "X_HOUR=12" >> $GITHUB_OUTPUT
          elif [ "$CURRENT_HOUR" -lt 19 ]; then
            echo "X_HOUR=16" >> $GITHUB_OUTPUT
          else
            echo "X_HOUR=20" >> $GITHUB_OUTPUT
          fi

      - name: Fetch Reddit/HN/PH data from Cockpit
        env:
          COCKPIT_TOKEN: ${{ secrets.COCKPIT_REPO_TOKEN }}
        run: |
          mkdir -p public/data/panopticon

          HTTP_CODE=$(curl -s -w "%{http_code}" -o /tmp/content.json \
            -H "Authorization: token $COCKPIT_TOKEN" \
            -H "Accept: application/vnd.github.v3.raw" \
            "https://api.github.com/repos/YuWenHao1212/Cockpit/contents/briefs/content/${{ steps.datetime.outputs.TODAY }}.json")

          if [ "$HTTP_CODE" = "200" ]; then
            cp /tmp/content.json public/data/panopticon/latest.json
            cp /tmp/content.json "public/data/panopticon/${{ steps.datetime.outputs.TODAY }}.json"
            echo "Fetched content data for ${{ steps.datetime.outputs.TODAY }}"
          else
            echo "No content data available (HTTP $HTTP_CODE)"
          fi

      - name: Fetch X data from Cockpit
        env:
          COCKPIT_TOKEN: ${{ secrets.COCKPIT_REPO_TOKEN }}
        run: |
          mkdir -p public/data/panopticon/x

          HTTP_CODE=$(curl -s -w "%{http_code}" -o /tmp/x.json \
            -H "Authorization: token $COCKPIT_TOKEN" \
            -H "Accept: application/vnd.github.v3.raw" \
            "https://api.github.com/repos/YuWenHao1212/Cockpit/contents/briefs/x/${{ steps.datetime.outputs.TODAY }}-${{ steps.datetime.outputs.X_HOUR }}.json")

          if [ "$HTTP_CODE" = "200" ]; then
            cp /tmp/x.json public/data/panopticon/x/latest.json
            cp /tmp/x.json "public/data/panopticon/x/${{ steps.datetime.outputs.TODAY }}-${{ steps.datetime.outputs.X_HOUR }}.json"
            echo "Fetched X data for ${{ steps.datetime.outputs.TODAY }}-${{ steps.datetime.outputs.X_HOUR }}"
          else
            echo "No X data available (HTTP $HTTP_CODE)"
          fi

      - name: Commit and push
        id: commit
        run: |
          git config user.name "GitHub Actions Bot"
          git config user.email "actions@github.com"
          git add public/data/panopticon/
          if git diff --staged --quiet; then
            echo "changes=false" >> $GITHUB_OUTPUT
          else
            git commit -m "chore: sync panopticon data for ${{ steps.datetime.outputs.TODAY }}"
            git push
            echo "changes=true" >> $GITHUB_OUTPUT
          fi

      - name: Trigger Azure deployment
        if: steps.commit.outputs.changes == 'true'
        env:
          GH_TOKEN: ${{ secrets.COCKPIT_REPO_TOKEN }}
        run: |
          gh workflow run "Azure Static Web Apps CI/CD" --repo YuWenHao1212/personal-website
```

---

### 📋 2. 建立 X 資料目錄

```bash
mkdir -p public/data/panopticon/x
```

建立空的 placeholder 檔案（避免 build 失敗）：

**檔案**: `public/data/panopticon/x/latest.json`

```json
{
  "date": "",
  "hour": "",
  "stats": {
    "total_fetched": 0,
    "total_items": 0,
    "analyzed_items": 0
  },
  "items": []
}
```

---

### 📋 3. 更新 TypeScript 型別定義

**檔案**: `src/pages/zh-TW/tools/p4n0pt1c0n-7x9k2m.astro`

在檔案頂部新增 X 資料的型別定義：

```typescript
// X (Twitter) data types
interface XMetrics {
  likes: number;
  retweets: number;
  replies: number;
  views: number;
}

interface XAnalysis {
  translation: string;
  context_explanation: string;
  motivation: string;
  value_types: string[];
  content_category: string | null;
  angles: {
    conventional: string[];
    contrarian: string[];
  };
  title_ideas: string[];
  investment_signal: string | null;
  score: number;
  summary: string;
}

interface XItem {
  id: string;
  source: 'x';
  author: string;
  author_name: string;
  category: string;
  url: string;
  timestamp: string;
  original_text: string;
  metrics: XMetrics;
  engagement_score: number;
  analysis: XAnalysis | null;
}

interface XData {
  date: string;
  hour: string;
  generated_at: string;
  stats: {
    total_fetched: number;
    total_items: number;
    analyzed_items: number;
  };
  items: XItem[];
}
```

---

### 📋 4. 顯示架構設計（Category → KOL 分組）

X Tab 的顯示採用 **兩層分組** 結構：

```
┌─ AI & Tech ──────────────────────────────────────────────┐
│                                                          │
│  ┌─ @sama (Sam Altman) ─────────────────────────────┐   │
│  │  ┌──────────┐  ┌──────────┐                      │   │
│  │  │ Tweet 1  │  │ Tweet 2  │                      │   │
│  │  └──────────┘  └──────────┘                      │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─ @ylecun (Yann LeCun) ───────────────────────────┐   │
│  │  ┌──────────┐                                    │   │
│  │  │ Tweet 1  │                                    │   │
│  │  └──────────┘                                    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└──────────────────────────────────────────────────────────┘

┌─ Indie Hacker ───────────────────────────────────────────┐
│                                                          │
│  ┌─ @levelsio (Pieter Levels) ──────────────────────┐   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │   │
│  │  │ Tweet 1  │  │ Tweet 2  │  │ Tweet 3  │       │   │
│  │  └──────────┘  └──────────┘  └──────────┘       │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**層級結構**：
1. **第一層**：Category 區塊（AI & Tech、Indie Hacker、Business...）
2. **第二層**：該 Category 下的 KOL（按 author 分組）
3. **第三層**：該 KOL 的推文卡片

---

### 📋 5. 新增 X Tab 到來源選擇

在 Source Tabs 區塊新增 X tab：

```astro
<!-- Source Tabs -->
<div id="source-tabs" class="flex gap-2 mb-4 overflow-x-auto pb-2">
  <button data-source="all" class="source-tab active ...">
    All <span class="ml-1 opacity-80">{totalCount}</span>
  </button>
  <button data-source="x" class="source-tab flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-sky-50 text-sky-700 hover:bg-sky-100">
    𝕏 <span class="ml-1 opacity-70">{xData?.stats.total_items || 0}</span>
  </button>
  <button data-source="reddit" class="source-tab ...">
    Reddit <span class="ml-1 opacity-70">{data?.stats.reddit_posts || 0}</span>
  </button>
  <!-- ... other tabs ... -->
</div>
```

---

### 📋 6. 建立 XItemCard Component

**新檔案**: `src/components/panopticon/XItemCard.astro`

```astro
---
interface Props {
  item: {
    id: string;
    author: string;
    author_name: string;
    category: string;
    url: string;
    original_text: string;
    metrics: {
      likes: number;
      retweets: number;
      replies: number;
      views: number;
    };
    engagement_score: number;
    analysis: {
      translation: string;
      context_explanation: string;
      angles: {
        conventional: string[];
        contrarian: string[];
      };
      investment_signal: string | null;
      score: number;
    } | null;
  };
}

const { item } = Astro.props;
const analysis = item.analysis;

// Category colors
const categoryColors: Record<string, string> = {
  ai_tech: 'bg-purple-100 text-purple-700',
  indie_hacker: 'bg-green-100 text-green-700',
  business: 'bg-blue-100 text-blue-700',
  startup: 'bg-amber-100 text-amber-700',
  career: 'bg-pink-100 text-pink-700',
  philosophy: 'bg-indigo-100 text-indigo-700',
  claude_code: 'bg-orange-100 text-orange-700',
};

const categoryNames: Record<string, string> = {
  ai_tech: 'AI & Tech',
  indie_hacker: 'Indie Hacker',
  business: 'Business',
  startup: 'Startup',
  career: 'Career',
  philosophy: 'Philosophy',
  claude_code: 'Claude Code',
};

// Format large numbers
function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
---

<div class="bg-white rounded-xl border border-cream-200 p-4 hover:shadow-md transition-shadow" data-x-category={item.category}>
  <!-- Header -->
  <div class="flex items-start justify-between mb-3">
    <div class="flex items-center gap-2">
      <span class="text-sky-500 font-bold">𝕏</span>
      <a href={`https://x.com/${item.author}`} target="_blank" class="font-medium text-ink-900 hover:text-accent">
        @{item.author}
      </a>
      <span class="text-ink-400 text-sm">{item.author_name}</span>
    </div>
    <span class={`px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[item.category] || 'bg-gray-100 text-gray-700'}`}>
      {categoryNames[item.category] || item.category}
    </span>
  </div>

  <!-- Original Text -->
  <p class="text-ink-700 text-sm mb-3 line-clamp-3">
    {item.original_text}
  </p>

  <!-- Translation -->
  {analysis?.translation && (
    <div class="bg-cream-50 rounded-lg p-3 mb-3">
      <p class="text-ink-600 text-sm">
        <span class="text-ink-400 text-xs mr-1">翻譯:</span>
        {analysis.translation}
      </p>
    </div>
  )}

  <!-- Context -->
  {analysis?.context_explanation && (
    <p class="text-ink-500 text-xs mb-3">
      <span class="font-medium">脈絡:</span> {analysis.context_explanation}
    </p>
  )}

  <!-- Transformation Angles -->
  {analysis?.angles && (
    <div class="mb-3 space-y-1">
      <p class="text-xs font-medium text-ink-500">轉化角度:</p>
      <div class="flex flex-wrap gap-1">
        {analysis.angles.conventional.map((angle) => (
          <span class="inline-block px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
            ✅ {angle.slice(0, 30)}...
          </span>
        ))}
        {analysis.angles.contrarian.map((angle) => (
          <span class="inline-block px-2 py-1 bg-amber-50 text-amber-700 text-xs rounded">
            💡 {angle.slice(0, 30)}...
          </span>
        ))}
      </div>
    </div>
  )}

  <!-- Investment Signal -->
  {analysis?.investment_signal && (
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-2 mb-3">
      <p class="text-blue-700 text-xs">
        <span class="font-medium">📈 投資訊號:</span> {analysis.investment_signal}
      </p>
    </div>
  )}

  <!-- Metrics & Actions -->
  <div class="flex items-center justify-between pt-3 border-t border-cream-100">
    <div class="flex items-center gap-3 text-xs text-ink-400">
      <span>❤️ {formatNumber(item.metrics.likes)}</span>
      <span>🔁 {formatNumber(item.metrics.retweets)}</span>
      <span>💬 {formatNumber(item.metrics.replies)}</span>
      <span>👀 {formatNumber(item.metrics.views)}</span>
    </div>
    <div class="flex items-center gap-2">
      <!-- Score badge -->
      <span class={`px-2 py-0.5 rounded text-xs font-medium ${
        item.engagement_score >= 4 ? 'bg-red-100 text-red-700' :
        item.engagement_score >= 2 ? 'bg-amber-100 text-amber-700' :
        'bg-gray-100 text-gray-500'
      }`}>
        Score: {analysis?.score || item.engagement_score}
      </span>
      <a
        href={item.url}
        target="_blank"
        class="px-3 py-1 bg-sky-500 text-white text-xs rounded hover:bg-sky-600 transition-colors"
      >
        View →
      </a>
    </div>
  </div>
</div>
```

---

### 📋 7. 更新頁面 JavaScript

在 `<script>` 區塊加入 X 相關的過濾邏輯：

```javascript
// X data handling
let xData = null;

// Fetch X data
async function fetchXData() {
  try {
    const response = await fetch('/data/panopticon/x/latest.json');
    if (response.ok) {
      xData = await response.json();
      updateXDisplay();
    }
  } catch (error) {
    console.log('X data not available');
  }
}

// Update X display
function updateXDisplay() {
  const xTab = document.querySelector('[data-source="x"]');
  if (xTab && xData) {
    xTab.querySelector('span').textContent = xData.stats.total_items;
  }
}

// Handle X category filtering
document.querySelectorAll('.x-category-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.xCategory;
    filterXByCategory(category);

    // Update active state
    document.querySelectorAll('.x-category-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

function filterXByCategory(category) {
  const cards = document.querySelectorAll('[data-x-category]');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.xCategory === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Show/hide X category tabs based on source selection
function handleSourceChange(source) {
  const xCategoryTabs = document.getElementById('x-category-tabs');
  const subredditTabs = document.getElementById('subreddit-tabs');

  if (source === 'x') {
    xCategoryTabs?.classList.remove('hidden');
    xCategoryTabs?.classList.add('flex');
    subredditTabs?.classList.add('hidden');
    subredditTabs?.classList.remove('flex');
  } else if (source === 'reddit') {
    xCategoryTabs?.classList.add('hidden');
    xCategoryTabs?.classList.remove('flex');
    subredditTabs?.classList.remove('hidden');
    subredditTabs?.classList.add('flex');
  } else {
    xCategoryTabs?.classList.add('hidden');
    subredditTabs?.classList.add('hidden');
  }
}

// Initialize
fetchXData();
```

---

## 實作順序建議

1. **Workflow 更新** - 先確保資料能正確同步
2. **建立資料目錄** - 加入 placeholder JSON
3. **TypeScript 型別** - 避免型別錯誤
4. **XItemCard Component** - 單一推文卡片元件
5. **XKolGroup Component** - KOL 分組元件（包含該 KOL 的所有推文）
6. **XCategorySection Component** - Category 區塊元件（包含該分類的所有 KOL）
7. **頁面整合** - X Tab + 分組顯示邏輯

---

## 測試方式

1. 手動觸發 `sync-panopticon.yml` workflow
2. 確認 `public/data/panopticon/x/latest.json` 有資料
3. 本地 `npm run dev` 檢查頁面顯示

---

## 相關檔案

### Cockpit (Backend)

| 檔案 | 狀態 | 說明 |
|------|------|------|
| `automation/x_discovery.py` | ✅ Done | X 抓取 + LLM 分析 |
| `.github/workflows/x-discovery.yml` | ✅ Done | 4x daily workflow |
| `briefs/x/` | ✅ Done | X 輸出目錄 |

### personal-website (Frontend)

| 檔案 | 狀態 | 說明 |
|------|------|------|
| `.github/workflows/sync-panopticon.yml` | ✅ Done | 新增 X 資料同步 |
| `public/data/panopticon/x/latest.json` | ✅ Done | Placeholder |
| `src/components/panopticon/XItemCard.astro` | ✅ Done | 單一推文卡片 |
| `src/components/panopticon/XKolGroup.astro` | ✅ Done | KOL 分組（含該 KOL 所有推文） |
| `src/components/panopticon/XCategorySection.astro` | ✅ Done | Category 區塊（含該分類所有 KOL） |
| `src/pages/zh-TW/tools/p4n0pt1c0n-7x9k2m.astro` | ✅ Done | 加入 X tab + 分組顯示 |

---

**Created**: 2026-01-12
**Completed**: 2026-01-12
**Priority**: Medium
**Depends on**: Cockpit X discovery (✅ Done)
**Status**: ✅ Done
