---
title: "Claude Skills 教學：是什麼、怎麼用，到寫出你的第一個 Skill"
description: "Claude Skills 是什麼、怎麼用？這篇用桌面 App 的 Code 分頁示範 skill 放哪裡、Claude 怎麼決定用哪一個，再帶你從零做出第一個「影片筆記」skill。"
pubDate: 2026-03-07
updatedDate: 2026-10-15
category: building-products
topics: ["ai-practice"]
tags: ["AI", "Claude Code", "agentic coding", "Claude Skills", "developer-tools"]
lang: zh-TW
translationKey: claude-skills-guide
featured: true
draft: false
heroImage: /images/blog/claude-skills-guide.webp
focusKeyphrase: "claude skills 教學"
relatedPosts: ["enterprise-ai-adoption-bottleneck.md", "claude-code-tutorial.md", "lyt-framework-guide.md"]
faq:
  - question: "Claude Skills 是什麼？"
    answer: "一個 skill 是一個資料夾，裡面的 SKILL.md 寫著某件事該怎麼做。Claude 需要的時候自己翻開來讀，照著做。解決的是「每次開新對話都要重新教一次」：做法寫一次，之後每次對話都照同一份跑。"
  - question: "Claude skill 如何使用？"
    answer: "在桌面 App 的 Code 分頁，把 skill 資料夾放進 ~/.claude/skills/，Claude 會在需要時自己用到，也可以打 /名字 直接叫出來。在 Claude App 的聊天分頁，到 Customize > Skills 打開官方內建的，或上傳自己的 zip。"
  - question: "如何在 Claude 新增 skill？"
    answer: "最簡單的方法是先在對話裡把一件事做到滿意，再跟 Claude 說「把剛剛的流程做成一個 skill，存到 ~/.claude/skills/」，它會建好資料夾和 SKILL.md。在聊天分頁則是把 skill 資料夾壓成 zip，從 Customize > Skills 按「+」，選 Create skill，再選 Upload a skill。"
  - question: "Claude skill 要付費嗎？"
    answer: "Claude App 裡不用。官方說明寫明免費、Pro、Max、Team、Enterprise 方案都能用 skill，前提是在 Settings > Capabilities 打開程式碼執行和建立檔案。Claude Code 不一樣，它本身需要付費方案。"
  - question: "Skills 和 MCP 有什麼不同？"
    answer: "MCP 是讓 Claude 連到外部工具和資料的接頭，解決「能不能做」。Skill 寫的是拿到資料後怎麼處理，解決「怎麼做最好」。以我的內容監控系統為例：MCP 負責從 Reddit、Hacker News 抓內容，skill 負責篩選互動分數 4 以上的、分成 5 種內容類型、推薦 2 到 3 個題材。"
  - question: "不會寫程式也能用 Skills 嗎？"
    answer: "可以。SKILL.md 是 Markdown，不需要寫程式碼。也不用自己手寫：先在對話裡把一件事做對，再請 Claude 把它做成 skill。Anthropic 官方還有一個叫 skill-creator 的 skill，會像訪談一樣問你問題，再產出 SKILL.md。"
  - question: "Skills 只能在 Claude 上用嗎？"
    answer: "不只 Claude。Agent Skills 是 Anthropic 2025 年 12 月公開的開放標準，OpenAI、Google、微軟的 AI 工具都支援，寫好的 skill 換到 ChatGPT 或 VS Code 也能用。在 Claude 這邊，你自己做的 skill 在 App、Claude Code、API 三邊要各自安裝，不會自動同步。Anthropic 內建的 pdf、xlsx 等 skill 是例外，用 claude.ai 帳號登入的 Claude Code 也會同步。"
  - question: "一個 Skill 能寫多長？"
    answer: "SKILL.md 建議控制在 500 行以內。太長的參考資料拆到 references/ 資料夾，要用時才讀。Claude 平常只讀每份 skill 的 name 和 description，約 100 tokens，所以放很多個 skill，佔掉的 context 也相對少。"
---

每個用 AI 工作的人，幾乎都曾撞上同一面牆：你教會了它一件事，隔天開新對話，一切歸零。

你花了三天調好一套工作流程，跟 Claude 來回對話搞定了。結果隔天又要從頭解釋。你把 prompt 存在筆記裡每次貼，但一段 500 字的指令，每天貼一次，貼了一個月——你開始懷疑，這真的是 AI 該有的用法嗎？

不是。有一個東西專門解決這件事——Agent Skills。

我用 Claude Code，所以這篇以 Claude Skills 為例。但同樣的概念在 Cursor 叫 Rules、在 Codex 叫 AGENTS.md——本質一樣，而且現在這些工具都讀得懂同一種 skill 格式。

我現在每天早上輸入兩個字「開工」，Claude 自動跑完 8 個步驟——回顧昨天、查週目標、同步四個專案、建好今天的工作清單——然後把每個任務標上顏色：綠色 AI 直接做、黃色 AI 備好選項我來挑、紅色我親自處理、灰色今天不用動。3 分鐘後問我：「今天先做哪個？」

因為我把這套流程寫成了一個 skill，所以兩個字，同樣的步驟，同樣的格式，每天都是。

這篇 Claude Skills 教學，從 skill 是什麼、怎麼用，講到你自己做出第一個。中間有三段可以直接複製的提問，照著做完，你會有一個把 YouTube 影片整理成筆記的 skill。


## Claude Skills 是什麼？

Claude Skills 是一個資料夾。裡面有一份寫著某件事該怎麼做的說明，也可以附上參考資料、可以直接執行的程式，和產出要套用的模板。Claude 需要的時候自己翻開來讀，照著做。

完整的 skill 資料夾長這樣：

```text
my-daily-planning/
├── SKILL.md          ← 主要指令（必要）
├── scripts/          ← 可執行的腳本（選用）
├── references/       ← 參考文件（選用）
└── assets/           ← 模板（選用）
```

`SKILL.md` 是食譜本體——你的工作流程、步驟、判斷邏輯都寫在這裡。Claude 讀了就知道該怎麼做。

其他三個資料夾是配料：

<figure class="fg fg-cols">
<div class="c"><b>01</b><strong>scripts/　程式</strong><span>需要跑程式的部分。這種事用程式跑，比叫 Claude 自己算更準。而且可以直接執行，不需要載入 context。</span><em>例：解析 CSV、算統計數字、呼叫外部 API</em></div>
<div class="c"><b>02</b><strong>references/　參考資料</strong><span>太長、不適合塞在 SKILL.md 裡的資料。Claude 需要時才去翻，不會每次都佔用 context。</span><em>例：API 文件、風格指南、決策規則表</em></div>
<div class="c"><b>03</b><strong>assets/　模板</strong><span>模板和素材。每次產出直接套用，格式不會跑掉。</span><em>例：daily note 的 Markdown 模板</em></div>
</figure>

看出來了嗎？這四個東西各自解決的問題不同，但背後都在服務同樣兩件事：**對你穩品質，對 AI 省 context。** Scripts 不佔 context 又算得準，references 按需載入不浪費空間，assets 讓輸出格式標準化。整個 skill 資料夾的設計，就是圍繞這兩個核心在轉。

寫一次。之後每次對話，Claude 自動套用。不用貼 prompt，不用重複解釋。

### SKILL.md 長什麼樣

核心是一份叫 `SKILL.md` 的 Markdown 檔案——你的 SOP 寫在這裡。開頭是一段 YAML 設定（告訴 Claude 這個 skill 做什麼、什麼時候該用），後面是具體的步驟和指令。

一個簡化的例子：

```markdown
---
name: daily
description: 每日工作規劃流程。當使用者說「規劃今天」「daily planning」
  「早安」「開工」時使用。
---

# 每日規劃

## 步驟

1. 確認今天日期和星期幾
2. 讀取最近兩份 daily note，盤點 carry-over
3. 讀取週目標，確認進度和剩餘天數
4. 掃描各專案的進行中任務
5. 建立今天的 daily note
6. 根據優先級建議今天的工作項目
```

`---` 之間的 YAML 就是封面——Claude 靠這段判斷要不要啟動這個 skill（後面會細講這件事有多重要）。下面的 Markdown 就是 SOP 本體。就這麼簡單。

### 為什麼需要 Skill

每次貼 prompt，問題不只是煩。對你，是碰運氣；對 AI，是浪費。

**對你來說，是品質靠運氣。** 問題出在做法不一致。同樣一件事，今天你這樣解釋，明天換個說法，Claude 的做法就不一樣。有時候它會多做一步，有時候漏掉一步，有時候格式不對。沒有標準化的 SOP，品質靠運氣。而且每一次，你都得先把那段 prompt 找出來、貼上、再補兩句。

**對 AI 來說，是在搶空間和注意力。** 每貼一次，就佔掉 context window 的一塊空間。現在的 Claude 有 1M tokens，聽起來很多，但系統指令、工具說明、對話歷史全部共用這個空間。我自己一開新對話，工具說明、設定檔、記憶這些東西加起來，就先佔掉 12%，約 11.8 萬 tokens，對話都還沒開始。塞得越滿，它的注意力越分散，前面交代的事越容易漏看。

Skill 解決的是兩邊的事：

<figure class="fg fg-cols">
<div class="c is-em"><b>01</b><strong>對你：方便，品質也穩</strong><span>不用再找 prompt、貼 prompt。同一件事，每次都照同一份做法跑。</span><em>說一句「開工」就好</em></div>
<div class="c"><b>02</b><strong>對 AI：省 context，也省注意力</strong><span>平常只讀封面那一小段，用到了才翻開整份。不用每次塞進一大段指令，該注意的事不會被淹掉。</span><em>封面約 100 tokens</em></div>
</figure>

在 Anthropic 的開放標準裡，這套機制叫 Agent Skills——不只 Claude Code 能用，Cursor、Gemini CLI、Codex 都支援同一套格式。但不管叫什麼名字，核心都一樣：讓 AI 寫程式、做任務時，按照你定義的 AI 工作流來執行，把重複性工作變成真正的 AI 自動化。

### MCP 是廚房，Skills 是食譜

如果你用過 MCP（Model Context Protocol，讓 Claude 連到外部工具和資料的接頭），你已經給了 Claude 一整間廚房——各種工具、食材、設備。

但有廚房不代表會做菜。

<figure class="fg fg-cols">
<div class="c"><b>01</b><strong>MCP：廚房</strong><span>連接工具，提供即時資料。解決「能不能做」。</span><em>例：從 Reddit、Hacker News 抓內容</em></div>
<div class="c is-em"><b>02</b><strong>Skill：食譜</strong><span>封裝工作流和做法。解決「怎麼做最好」。</span><em>例：只留互動分數 4 以上的，分類，推薦題材</em></div>
</figure>

我的 [Panopticon（內容監控系統）](/zh-TW/blog/personal-panopticon/)是一個好例子。MCP 讓 Claude 能連到 API 抓取 Reddit、Hacker News、Product Hunt 的熱門內容。但「抓到之後怎麼處理」——篩選互動分數 4 以上的、分成 5 種內容類型、推薦 2-3 個題材——這些判斷邏輯寫在 skill 裡。

MCP 提供能力。Skills 提供智慧。

MCP 統一了「工具怎麼連」，Agent Skills 統一了「工具怎麼用」。

而且 skill 不是 Claude 專用的。Anthropic 在 2025 年 12 月把它公開成開放標準，現在 OpenAI、Google、微軟的 AI 工具都支援。你在 Claude 寫好的 skill，換到 ChatGPT 或 VS Code 也能用。


---


## Claude Skills 怎麼用？

在桌面 App 的 Code 分頁，skill 就是 `~/.claude/skills/` 裡的一個資料夾。放進去，Claude 在需要時會自己用到，也可以打 `/名字` 直接叫出來。

Code 分頁需要付費方案。免費方案也能用 skill，做法放在文末的常見問題。

### 在桌面 App 的 Code 分頁用

打開 Claude 桌面 App，左上角點 **</>**，就是 Code 分頁。它就是 Claude Code，能讀寫你電腦上的檔案，所以 skill 才能是放在資料夾裡的檔案。還沒裝的話，先看 [Claude Code 教學](/zh-TW/blog/claude-code-tutorial/)，裝桌面 App 不用開終端機。

Skill 有兩個地方可以放：

<figure class="fg fg-cols">
<div class="c"><b>01</b><strong>全域</strong><span>放在 ~/.claude/skills/名稱/SKILL.md。你在哪個專案、哪個資料夾工作，都讀得到。</span><em>例：收信、看行事曆</em></div>
<div class="c"><b>02</b><strong>專案</strong><span>放在專案資料夾裡的 .claude/skills/名稱/SKILL.md。只有在這個專案開對話才讀得到，跟著專案走。</span><em>例：只讀某個筆記資料夾的流程</em></div>
</figure>

**`~/.claude/skills/` 在哪裡？** `~` 是你的個人資料夾：Mac 上是「使用者」底下你名字的那個資料夾，Windows 是 `C:\Users\你的名字`。`.claude` 開頭有一個點，在 Mac 上是隱藏資料夾，Finder 預設看不到，所以打開個人資料夾也找不到它。想看的話，在 Finder 按 `Cmd + Shift + .`（句點），隱藏的資料夾就會出現，再按一次就藏回去。

其實多數時候不用自己去翻。跟 Claude 說「打開我的 skills 資料夾」或「列出我有哪些 skill」就好。

我自己是這樣分的。收信、看行事曆這種在哪裡都會用到的，放全域。只跟某個資料夾有關的，放專案。像 `/daily` 讀的是我筆記資料夾裡的檔案，離開那個資料夾就沒用，所以它跟著專案走。

不確定放哪邊，先放全域。第 4 章的練習就放全域。

### 用 `/名字` 叫出來，或讓 Claude 自己判斷

放好之後有兩種用法。

一種是打 `/` 加上 skill 的名字，例如 `/daily`。這是主動叫它。

另一種是什麼都不打，直接提出相關的要求，由 Claude 自己判斷要不要用這個 skill。它怎麼判斷，是第 3 章的主題。

---


## Claude 怎麼知道該用哪個 Skill？

### 三層載入

我現在同時掛了三十多個 skills。如果每個都全部載入，Claude 會被資訊淹沒——想像一個廚師同時翻開三十多本食譜的所有頁面。

所以 skill 不是一次全部載入的。它的解法是一個三層架構，叫 **Progressive Disclosure**（漸進式揭露）：

<figure class="fg fg-flow">
<p class="fg-h">Claude 怎麼讀 skill</p>
<div class="grp">
<p class="ph"><b>情境 1</b>開新對話時<small>只做一次</small></p>
<div class="n">第一層：Claude 把每個 skill 的封面讀進來<span>name＋description，每份約 100 tokens。三十多個加起來，也只佔一小塊。</span></div>
</div>
<div class="grp">
<p class="ph"><b>情境 2</b>你說的每一句話<small>每句都跑</small></p>
<div class="q">這句話跟哪個封面有關<span>你直接打 /名字，就跳過這一步。</span><em><b>都無關 →</b> 照平常回答，skill 全部不打開</em></div>
<div class="n" data-in="有關">第二層：翻開那一份的完整說明<span>SKILL.md 後面的步驟，建議少於 500 行。</span></div>
<div class="q">步驟裡要用到附加檔案嗎<em><b>不用 →</b> 照步驟做完</em></div>
<div class="n is-em" data-in="要">第三層：讀 references/、跑 scripts/、套 assets/ 的模板<span>需要時才讀。scripts 直接執行，不用讀進 context。</span></div>
</div>
</figure>

封面就像食譜封面，只有兩樣東西：
- `name`——這個 skill 叫什麼
- `description`——做什麼、什麼時候該用（「番茄義大利麵，適合週末午餐」）

Claude 讀這個就知道什麼時候該啟動。封面和完整說明都在同一份 SKILL.md 裡，差別是：封面每次開新對話都會讀，完整說明只有在 Claude 判斷「這個任務需要這份食譜」時，才會翻開來讀。

這個設計讓三十多個 skills 可以和平共存。我說「早安」，只有 `/daily` 被完整載入，其他的安靜待命。說「SEO 研究」，打開的是查關鍵字那個 skill。每個 skill 只在被需要的時候才佔用 context window。

### Description 決定生死

三層架構裡，第一層封面的 `description` 是最關鍵的——它決定你的 skill 會不會被觸發。

Claude 靠這段文字判斷：「使用者現在說的話，跟這個 skill 有關嗎？」判斷方式是 LLM 自己的語義理解——它不是在做關鍵字比對，而是真的在「讀懂」你的意圖和 description 的描述，然後決定要不要啟動。

聽起來很聰明，但有一個問題：Claude 傾向保守。它寧可不觸發，也不亂觸發。description 寫得模糊的時候，它常常就不啟動。不是 Claude 讀不懂你的意圖，而是 description 寫得不夠明確時，它會選擇「不確定就不啟動」。

怎麼寫才對？一個好的 description 要回答兩件事：

1. **這個 skill 做什麼**——讓 Claude 知道它的用途
2. **使用者會怎麼說**——具體的觸發詞，中英文都列

<figure class="fg fg-cols">
<div class="c"><b>✕</b><strong>寫得爛的</strong><span><code>description: 幫助處理日常工作。</code></span><span>只有一個模糊的用途，沒有觸發詞。Claude 不知道使用者會說什麼話來啟動它，結果就是永遠不觸發。</span></div>
<div class="c is-em"><b>✓</b><strong>寫得好的</strong><span><code>description: 每日工作規劃流程。當使用者說「規劃今天」「daily planning」「早安」「開工」時使用。</code></span><span>做什麼：每日工作規劃。怎麼觸發：四組中英文關鍵字。Claude 讀到「開工」就知道該啟動。</span></div>
</figure>

幾個要注意的：

- **雙語觸發**：如果你像我一樣中英文混著用，description 裡要同時寫中英文觸發詞。「規劃今天」和「daily planning」都要能觸發同一個 skill。
- **寧可多寫不要少寫**：因為 Claude 傾向保守不觸發，觸發詞多列幾組，比少列安全。

Description 的角色其實跟產品的 landing page 一樣。你怎麼描述它，決定了別人（在這裡是 Claude）會不會「點進來」。

自己的 skill 沒被用到，第一個要查的就是這裡。


---


## 動手做你的第一個 skill：影片筆記

我推薦你的第一個 skill 就做這個，不要先去裝別人的。

做法是：先在對話裡把一支 YouTube 影片整理成你滿意的筆記，再請 Claude 把「你的做法」做成 skill。之後只要貼上網址說「整理YT影片」，它就照你的格式整理好，存進「文件/影片筆記」。

<figure class="fg fg-steps">
<p class="fg-h">三個步驟</p>
<div class="s"><strong>先做一次</strong><span>挑一支你想看的影片，在對話裡整理成筆記，調到滿意。</span></div>
<div class="s"><strong>做成 skill</strong><span>請 Claude 把剛剛的做法做成 skill，存到 ~/.claude/skills/。</span></div>
<div class="s"><strong>驗證</strong><span>開新對話，貼另一支影片的網址，看它有沒有照你的格式做。</span></div>
</figure>

### 為什麼選影片筆記

一支 40 分鐘的影片，整理成筆記，一分鐘就讀完重點。每個人都在看影片，練習的素材隨手就有。

每個人要的筆記也不一樣。有人只要三句重點，有人要「這支我可以拿來做什麼」，有人要講者的原話。skill 就是把「我的筆記長這樣」寫下來。

這個練習也用得到第 1 章講的兩種配料。抓字幕的程式放在 `scripts/`，直接執行，不佔 context。筆記的格式放在 `assets/` 當模板，你改模板，筆記就跟著改。

不用接任何 MCP，筆記存在你自己電腦的資料夾裡。

### 照著做

**先選好資料夾。** 在 Code 分頁開新對話時，資料夾選「文件」。筆記會存進它底下的「影片筆記」，還沒有的話 Claude 會幫你建。

**第一步：先做一次。** 先不要急著做 skill。挑一支你想看、而且有字幕的 YouTube 影片，在這個新對話貼上這段：

```text wrap
幫我整理這支 YouTube 影片：（貼上網址）
用 yt-dlp 抓字幕就好，不用下載影片。還沒裝的話，幫我裝。
整理成下面的格式，存到「文件/影片筆記」這個資料夾，還沒有就建一個：
- 一句話摘要
- 三到五個重點，每個附上影片的時間點
- 我可以怎麼用
```

Claude 會先確認電腦裡有沒有 yt-dlp（一個抓 YouTube 字幕的免費工具），沒有的話會問你能不能裝，你按允許就好。接著抓字幕、整理筆記。

格式是我先幫你訂的，筆記出來之後照你的習慣改：重點太多、想多一塊「講者的原話」、不需要「我可以怎麼用」，直接跟它講，調到滿意為止。

**第二步：把做法做成 skill。** 筆記調到滿意之後，在同一個對話裡貼：

```text wrap
把剛剛的做法，做成一個 skill，名字叫 video-notes，存到 ~/.claude/skills/。
抓字幕的步驟寫成 scripts/ 裡的程式，筆記格式存成 assets/ 裡的模板。
筆記一律存到「文件/影片筆記」這個資料夾，不管我在哪裡開對話。
description（封面那段說明）寫清楚它做什麼，還有我會怎麼開口，例如「整理YT影片」「幫我做筆記」「這支影片在講什麼」。
再加一條規則：抓不到字幕就停下來告訴我，因為只看標題和簡介寫出來的筆記，看起來像真的，其實是猜的。
```

最後那條規則，我把原因也寫了進去。第 5 章會回頭講為什麼要這樣寫。

`~/.claude/skills/` 在你的個人資料夾裡，是隱藏資料夾，Mac 的 Finder 預設看不到（第 2 章講過怎麼打開）。Claude 會建好資料夾，裡面有 SKILL.md、`scripts/` 和 `assets/`，就是第 1 章那張圖裡的三樣。想看筆記模板長什麼樣，請它顯示出來。

**第三步：開新對話，驗證。** 開一個新的對話，選哪個資料夾都可以。不要再解釋任何事，只講一句：

```text wrap
整理YT影片：（貼上另一支 YouTube 影片的網址）
```

跑完之後，看三件事：

<figure class="fg fg-cols">
<div class="c"><b>01</b><strong>格式</strong><span>跟第一步調好的一不一樣。</span></div>
<div class="c"><b>02</b><strong>時間點</strong><span>點開影片對一下，講的是不是那一段。</span></div>
<div class="c"><b>03</b><strong>存檔</strong><span>「文件/影片筆記」裡有沒有多一份筆記。</span></div>
</figure>

**筆記存在同一個地方。** skill 做好之後，不管你在哪個資料夾開對話，筆記都會存進「文件/影片筆記」。

筆記一份一份積起來，那個資料夾就記著你看過什麼、在意什麼。

---


## 怎麼寫得好？

### 先做對，再請 Claude 寫

我的 skill 沒有一個是手寫的。

第 4 章走的就是這條路。Anthropic 官方還有一個專門做這件事的 skill，叫 `skill-creator`。啟動後，Claude 會像訪談一樣問你問題：工作流長什麼樣、什麼時候該用、有哪些邊界條件，然後產出 SKILL.md。

它也能幫你測試：自動寫測試案例，檢查 skill 會不會被用到，再根據結果改 description。

### 用原因代替命令

前面提到的 `skill-creator` 裡有一段話，我覺得點出了寫 skill 最重要的一件事：

> Try to explain to the model why things are important in lieu of heavy-handed musty MUSTs.
> （與其用一堆死板的 MUST 來壓模型，不如跟它解釋為什麼這件事重要。）

用原因代替命令。

如果你發現自己在 SKILL.md 裡寫了很多「ALWAYS」和「NEVER」（全大寫），那是一個訊號——試著改成解釋為什麼。

舉個例子。你在 skill 裡可以這樣寫：

```text
ALWAYS 在執行命令前顯示命令內容。NEVER 直接執行。
```

也可以這樣寫：

```text
執行命令前先顯示內容，因為使用者需要確認安全性。
未經確認就執行可能造成不可逆的損害。
```

第一種寫法，Claude 只會照做這兩條規則。遇到規則沒覆蓋的情境（比如一個看起來安全但其實有風險的命令），它不知道該怎麼判斷。

第二種寫法，Claude 理解了「為什麼」——保護使用者安全。所以即使遇到規則沒寫到的灰色地帶，它也會傾向謹慎處理。原因讓模型舉一反三，規則只能覆蓋你想到的情境。

第 4 章做 skill 時加的那條規則，也是這樣寫的：「抓不到字幕就停下來告訴我」，後面接著寫原因。

唯一的例外是格式規範——「輸出一定要用這個模板」這種機械性要求，沒有「為什麼」可以解釋，直接寫死就對了。

### Skill 能做到哪些事

Anthropic 從早期使用者歸納出 5 種設計模式：

- **按步驟執行**：有順序的流程。例：每天早上排今天要做的事，先回顧昨天，再查本週目標，最後建清單。
- **跨工具協作**：資料在幾個工具之間流動。例：讀信、查行事曆，整理成一份今天的待辦。
- **迭代校稿**：做一版、檢查、不過關就回去改。例：文章初稿過一輪品質檢查，不合格再改。
- **條件分支**：同一個目標，依情況走不同路。例：SEO 研究，依題目決定查關鍵字、看競爭對手，或畫產業版圖。
- **嵌入專業知識**：把領域知識寫進去，寫一次就好。例：你公司的報告格式和用字規範。

大部分好用的 skill 混用好幾種。不用刻意套，知道有哪些可能，寫的時候比較有結構。

---


## Skill 會跟著你長大

### 一個 Skill 要改很多次

我的 `/daily` 現在是 v8。第一版很爛——步驟不清楚、路徑寫錯、有些情況沒處理到。

第二版加了內容發現系統整合。第三版發現週進度計算常出錯，加了明確的計算規則。第四版加了自動觸發——當時是週二提醒跑週會、月初提醒歸檔。第五版加了 iPhone 輕量模式（偵測環境，手機上跳過需要 Python 的步驟）。之後又改了三版，才是現在的 v8。

每一版都是在使用中發現「這裡不夠好」，然後改。

Skill 不是寫完就丟著的設定檔——它是你工作流的活文件。你的工作方式會變，需求會變，skill 跟著變。每改一次，你對自己的工作流就多理解一層。這個過程本身就在逼你思考：「我到底是怎麼工作的？哪些步驟真的重要？」

Anthropic 的指南裡也說了同樣的話：

> 最有效的做法，是在一個有挑戰性的任務上反覆嘗試，直到 Claude 做對，再把成功的方法抽成 skill。
> （The Complete Guide to Building Skills for Claude，第 15 頁）

不要追求一步到位。今天做一個 v1，用幾天發現問題改成 v2。好的工作流是長出來的，不是設計出來的。

### 三十多個 Skill 也不是一次建的

我是從一個 `/daily` 開始的。用了一陣子之後，發現每週一人週會的流程也在重複，就做成一個 skill。後來關鍵字研究每次都要重新解釋策略，又做成一個。再後來 YouTube 影片分析的串接也固定了，再做一個。

每一個 skill 都是因為「這件事我重複做了太多次」才誕生的。不是坐下來規劃「我需要哪些 skill」，而是日常工作中自然長出來的。

回頭看，已經有三十多個了——不是因為我一開始就計畫好，而是因為每天都在用、每次遇到重複的事就多封裝一個。

你的第一個，就是第 4 章的影片筆記。下一個，從你每天在做的重複小事長出來：

| 重複的事 | 為什麼值得做成 skill |
|---------|---------------------|
| 每天早上排今天要做的事 | 每天都要跑，步驟多，有先後關係 |
| 每週回顧 | 固定流程：算分、回顧、規劃下週 |
| 把讀過的文章存成筆記 | 跟影片筆記同一套格式，只是來源從影片換成網頁 |
| 收信、看行事曆 | 不管在哪裡工作都用得到，所以放全域 |

做下一個的時候，有兩條路：

<figure class="fg fg-cols">
<div class="c is-em"><b>01</b><strong>讓 Claude 幫你寫</strong><span>先在對話裡做到滿意，再說「把剛才的流程做成 skill」。</span><em>第 4 章走的就是這條</em></div>
<div class="c"><b>02</b><strong>從現成的改</strong><span>找官方或來源可信的 skill，改成你自己的流程。</span><em>先看一份好食譜長什麼樣</em></div>
</figure>

[Anthropic 官方 repo](https://github.com/anthropics/skills) 裡，做簡報、試算表、Word、PDF 的那幾個 skill 可以打開來看看，知道一份寫得好的 skill 長什麼樣。這是參考，不用當第一步。

現成的 skill 到處都有。最大的目錄是 [SkillsMP](https://skillsmp.com)，自動從 GitHub 收錄，數量超過 300 萬個，沒有經過審核。官方 repo 數量少，品質有保證。

我不推薦一開始就從目錄網站下載一堆。數量多、沒人審，而且別人的流程跟你的不一樣。

要裝別人的 skill，先把資料夾裡的檔案看過一遍，尤其是 `scripts/`。Skill 可以帶腳本，可以碰你的檔案。官方的建議也是只用自己寫的，或來源可信的 skill。

社群的 skill 是通用的起點。一個通用的「每日規劃」skill，不知道你用什麼專案管理工具、週目標長什麼樣、習慣怎麼排優先順序。改成你的流程，才好用。

### 不寫程式，也改得動

一家企業客戶有位不寫程式的員工，發現行事曆 skill 怎麼都抓不到某一場會議，就問 Claude 為什麼。

Claude 找到原因：這個 skill 只抓「現在」之後才開始的會議，今天稍早開始的都不會出現。要改的，只是 skill 裡的一行條件，改成從當天凌晨 12 點起算。

Skill 是看得懂的文字。不寫程式的人，出了錯也查得到、改得動。

<div class="fg fg-key">
<p class="fg-h">這篇帶走三句話</p>
<div class="k">Skill 是一份寫好的食譜：重複交代的事寫一次，Claude 需要時自己翻開照做。</div>
<div class="k">封面那段說明決定會不會被用到：寫做什麼，再寫你會怎麼開口。</div>
<div class="k">先把一件事做對再寫成 skill，之後看到它做錯，就改一次。</div>
</div>


### 這意味著什麼

每次開新 session，Claude 都是一個什麼都不知道的新人。Skill 就是你給它的 onboarding 手冊——讀完就知道你的流程、你的標準、你的偏好。不用每次重新帶，開口就能上手。

`/daily` 是行政助理，管週會的是週會主持人，幫我寫文章的是寫作教練。每一個都是最懂你的資深員工——知道你的偏好、熟悉你的流程、記得你上次踩過的坑——不是第一天報到的實習生。

Agent Skills 本身不難——就是 Markdown 加上一些結構。但它代表的趨勢很重要：**AI 從「你每次都要教它」變成「你教一次就好」。**

而且這個標準是開放的。你今天在 Claude Code 寫的 skill，明天可以搬到 Cursor、Gemini CLI、Codex 上用。你投入的時間不會被綁定在一個平台上。

對我來說，Agent Skills 是 AI 從「能用」變成「好用」的那一步。工具接好了（MCP），知識封裝好了（Skills），剩下的就是讓 AI 按照你的方式做事——不管你用它來寫程式、做研究、還是把日常管理變成 AI 自動化流程。

---


## 下一步：從一個 skill，長成一套系統

我從 2025 年 6 月開始用 Claude Code，一開始拿來開發產品，後來連工作和生活也交給它。它幫我寫這個網站和幾個產品，每天早上排好今天的工作，收信、看行事曆，每週回顧目標進度，把學到的東西收進知識庫。

這些事，每一件背後都有 skill。但它們串得起來，靠的是一套系統。目標管理決定這一季、這一週該推什麼。專案和任務管理把它拆成今天的清單。知識庫記著做過什麼、學到什麼。skill 再照我的方式把事情做完。這套系統，我叫它 FLUX。

FLUX 怎麼搭起來，寫在下面三篇。第一篇講先定方向，第二篇是整套系統長什麼樣，第三篇給還沒裝 Claude Code 的人：

- [先定方向，再建系統，最後才是工具](/zh-TW/blog/flux-direction-system-leverage/)
- [我的 AI 工作流：用 Claude Code + Obsidian 打造個人 AI 助理系統](/zh-TW/blog/personal-panopticon/)
- [Claude Code 教學](/zh-TW/blog/claude-code-tutorial/)

自己摸索也做得到，只是花時間。想用最有效率的方式走完這一段，<span data-workshop-cta><span data-ws-pre>可以參考我的</span>[實體工作坊](/zh-TW/workshop/)<span data-ws-post>。</span></span>要帶整個團隊導入 Claude 的話，可以找[匯流顧問](https://confluence-partners.ai/)。

---

*我把和 AI 一起工作想通的事，寫成電子報：怎麼讓做的事影響更多人，也把時間留給自己。想收到的話，可以[訂閱](/zh-TW/#newsletter-form)。*
