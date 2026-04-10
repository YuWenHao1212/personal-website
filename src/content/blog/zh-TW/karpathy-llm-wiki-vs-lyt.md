---
title: "Karpathy LLM Wiki 是什麼？我用他的方法研究了一次，發現兩個你該知道的分歧"
description: "Andrej Karpathy 公開的 LLM Wiki pattern 被 AI 圈洗版。我用他的方法研究他的方法 —— 跑了一次 ingest、對照我的 LYT 系統、聽了 HN 的反對聲音。最後發現這其實是 folder/tag 時代的老問題換了個皮。"
pubDate: 2026-04-10
category: building-products
tags: ["karpathy", "llm", "obsidian", "知識管理", "zettelkasten", "lyt", "ai 工作流"]
lang: zh-TW
featured: true
heroImage: /images/blog/karpathy-llm-wiki-vs-lyt.webp
translationKey: karpathy-llm-wiki-vs-lyt
relatedPosts: ["lyt-framework-guide.md", "personal-panopticon.md", "claude-skills-guide.md", "teaching-48yo-psychologist-claude-code.md"]
focus_keyphrase: "karpathy llm wiki"
---

這一週，AI 社群被一篇技術筆記洗版。

作者是 Andrej Karpathy。

如果你沒聽過他 —— 他是 OpenAI 最早的創辦成員之一，後來去 Tesla 當 AI 總監，現在自己開了 Eureka Labs 做 AI 教育。在 AI 圈子裡，他說什麼、隔天就會有一堆人跟著試。

4 月 3 日他在 X 發了一段話，隔天把整套做法寫成一份 [GitHub gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 放出來。一週之內 Hacker News、X、Substack 全在討論。

最被瘋狂轉的一句是這個：

> Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase.
> — Karpathy gist

老實說，這篇紅起來的時候我有點困惑。

這半年 Obsidian + Claude Code / Codex 的組合已經是 PKM 圈的顯學之一。我自己去年底從 Roam 轉到 Obsidian，跑 Nick Milo 的 [LYT 框架](/zh-TW/blog/lyt-framework-guide/)加 [Claude Code](/zh-TW/blog/claude-code-tutorial/) 當後台，也快半年了。身邊還有幾個朋友在做類似的事。

所以 Karpathy 這篇對我來說，第一眼看過去幾乎沒有新東西。

為什麼這篇會爆成這樣？

帶著這個困惑，我花了半天用他的方法研究他的方法 —— 把 7 份 raw 素材丟進去，跑出 12 張 wiki 頁面，然後跟我自己用了半年的 LYT 系統做對照。

跑完之後我想跟你說兩件事，都不是我一開始以為的那種。

第一，骨架是一樣的。差的不是架構，是 workflow。

第二，根本的分歧不在技術，在哲學 —— 一張卡到底是什麼？

## 一、Karpathy 說了什麼

他的核心主張很簡單：**不要做 RAG，改做 wiki**。

RAG 的做法是每次查詢時才臨時從 raw 文件找答案。Karpathy 的做法是：讓 LLM 作為 compiler，把 raw 文件增量編譯成一份持久化的 markdown wiki，然後一直維護它。

這兩者的根本差異是時間維度：

- **RAG**：每次查詢 = 重新找答案（stateless、transient）
- **LLM Wiki**：一次編譯、持續維護（stateful、compounding）

「the wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged.」

Karpathy 的理由是這個：

> The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. Humans abandon wikis because the maintenance burden grows faster than the value. LLMs don't get bored.
> — Karpathy gist

翻成白話：人會放棄 wiki 不是因為懶，是因為維護成本超過回報。LLM 解決的是**維護成本的結構性問題** —— LLM 不會累、不會忘記更新 cross-reference、可以一次 touch 15 個檔案。

所以這個 pattern 的核心不是「讓 AI 寫筆記」。是「把 bookkeeping 壓到接近零，人才有力氣思考」。

順帶一提，Karpathy 把這個 pattern 連回 Vannevar Bush 1945 的 Memex 願景。Bush 80 年前就想做「人的延伸記憶系統」，但他解決不了一件事 —— 誰來維護？Karpathy 對這句話的回答是：

> The part he couldn't solve was who does the maintenance. The LLM handles that.

這個歷史縱深讓這個 pattern 不只是 2026 年的一時熱潮。是一個 80 年前的願景終於有了答案。

## 二、骨架相同，但長大方式不同

我打開自己的 FLUX Vault 對照 Karpathy 的 gist，骨架幾乎一樣：

| Karpathy Pattern | 我的 LYT |
|---|---|
| `raw/`（原始來源） | `Atlas/Sources/` |
| `wiki/`（LLM 維護的知識頁） | `Atlas/Dots/` + `Maps/` |
| schema 檔（規則設定） | `CLAUDE.md` + 各 `SKILL.md` |
| `index.md`（索引） | `Maps/` MOC |

Karpathy 的 gist 是工具不可知的 —— 他同時列了 Claude Code、OpenAI Codex、OpenCode 等選項。我用 Claude Code，所以對照我這邊用 `CLAUDE.md`。

四個層對到了。但骨架像不代表兩條路一樣 —— 我用 LYT 半年，知識庫一直在長大，只是長大的方式跟 Karpathy 描述的完全不同。

差在哪？不在工具，在兩個哲學分歧。

## 三、分歧一 —— 靜止 vs 改寫

我用 LYT 的習慣是這樣：

一張卡片建進來，就是它當下的 status。之後會被 MOC 收進去、會被後來的新卡 backlink。但**卡片本體的內容不會再動**。新的理解不是併進舊卡，是另開一張新卡掛在旁邊。

靜止是代價，但省下了一整套麻煩。你不用判斷「這個新資訊要併進哪張舊卡」、不用擔心改壞了、不用維護版本歷史。

Karpathy 不這樣。

新 source 進來，LLM 會回頭改寫相關的舊 page —— 這個動作他叫 `ingest`。但 ingest 不是隨便覆蓋。Karpathy gist 裡的原則是：LLM 負責判斷新資訊跟舊 page 的關係，**遇到矛盾要標出來，留給人判斷**。不能自作主張。

[Mehmet Gökçe](https://mehmetgoekce.substack.com/p/i-built-karpathys-llm-wiki-with-claude)（第一個把 Karpathy gist 做成完整開源實作的人）把這個原則細化成五階段：

1. Analyze & Extract entities and relationships
2. Scan existing wiki to find affected pages
3. **Update pages (append-only, never overwrite)** ← 關鍵原則
4. Quality gate validation
5. Report summary with warnings

**append-only** 是重點。新資訊往上加，不覆蓋舊的；矛盾就並列兩個版本、標出處；取代的話舊說法標為過時但保留。

搭配這個改寫，還有兩個配套動作。

一個叫 `log` —— 每次動到 wiki 都留一筆紀錄：誰改了什麼、為什麼改。append-only，不能事後修改。

一個叫 `lint` —— 定期回頭掃整座 wiki 找重複、找矛盾、找過期段落，然後人去看 lint 報告做決定。

這三個動作是一組的：有改寫就要有 log，有 log 才能 lint。少任何一個，改寫就會失控。

## 四、分歧二 —— 原子化 vs 主題聚合

這是兩條路的分水嶺。兩個做法真正差在 —— **一張卡到底是什麼？**

LYT 的答案是一個**原子概念**。一張卡片只講一件事。LYT 一張、MCP 一張、Claude Code 一張，邊界很清楚。每張卡片是一個乾淨的人類思考 snapshot，不會被改寫。

原子的好處是歸檔不用想太多 —— 新東西進來該放哪、切成幾張，概念本身會告訴你答案。你可以偷懶半年不 review，卡片還在那裡、還是你當初想的那樣。

代價是：舊卡的內容不會自己演化。新資訊進來只會長出新卡，但之前寫好的卡本體停在它被建立的那一天。你要掌握一個主題的最新狀態，得靠 MOC 和連結自己在腦子裡拼圖。

Karpathy 的答案是一個**主題聚合**。一張 wiki page 不是原子，是那個主題目前的 best-of 總整理。10 個 sources 可能被 LLM 併進 1-2 張 page。

好處是：你打開一張就看到整個主題的最新狀態，不用自己拼。

代價有兩個。

一個是**維護成本很高**。前面說的 ingest + log + lint 整套規則你得持續跑，一旦偷懶就崩。

另一個更麻煩 —— **主題的邊界在哪？** 要切成幾張 page？哪些東西該併進同一張、哪些該獨立出來？

這個問題 Karpathy 的 gist 沒給明確規則。他說 LLM 負責編譯、矛盾留給人判斷，但主題怎麼切他繞過去了。實作者 Mehmet 的說法是：「hub pages should emerge organically」—— 翻譯成白話就是「我也不知道，跑一跑看」。

我昨天跑那次 ingest 的時候就卡在這裡。

7 份 source 該編譯成幾張 wiki page？併太多看起來太擠，切太細又失去聚合的意義。最後跑出 12 張。但那 12 張的邊界是我臨時決定的，不是某個規則告訴我的。

寫完我突然意識到：這個問題我見過。

它其實是 folder 和 tag 時代的老問題換了個皮。Evernote 時代你在問「這個筆記放哪個 folder」。Notion 早期你在問「這個頁面打哪些 tag」。Karpathy wiki 現在在問「這個 source 併進哪張 wiki page」。

三個問題的形狀一模一樣：**對一個新進來的東西，你要決定它屬於哪個容器**。

LYT / Zettelkasten 的原子化就是在繞開這個問題 —— 一張卡一個概念，連結取代分類。新東西進來就開新卡，不用想它歸哪個既有容器。

Karpathy 的主題聚合是往回走。它用 LLM 的能力把 compound 成本壓低，但沒解決「容器邊界在哪」這個老問題。

我卡在 12 張的真正原因不是經驗不足，是這個問題本來就沒好答案。

## 五、HN 的反對聲音

容器邊界是我自己跑完實驗後的觀察。但 HN 上還有兩層不同角度的反對，都不是在攻擊 LLM 的能力，是在攻擊**人類的懶惰**。

### 反對一：Model Collapse（技術面）

除了容器邊界問題，Karpathy 的 pattern 還有一個更根本的技術擔憂。HN 上有人直接點名：

> I don't see why this wouldn't just lead to model collapse. The compounding will just be rewriting valid information with less sense information.

論點是：LLM 寫出來的 wiki 本身就有資訊損耗 —— 看起來通順但細節被磨平、風格被單一化。下次 ingest 時 LLM 會讀到舊 wiki + 新 source，等於「LLM 在自己寫的東西上再寫」。長期下來可能變成平均的平均的平均，細節慢慢消失。這個現象 AI 圈有個名字叫 **Model Collapse**，[2024 年 Nature 的論文](https://www.nature.com/articles/s41586-024-07566-x) 有完整論證。

HN thread 上有反駁的聲音，但那些反駁針對的是 LLM 訓練場景，跟 Karpathy 的 ingest 場景不完全一樣。這個 pattern 會不會真的觸發 Model Collapse，目前還沒人跑夠久可以證明。

### 反對二：Vibe Thinking（認知面）

這個反對最狠。HN 原文：

> Rule of thumb: if you find yourself having to come up with instead of what it helps you produce, ask yourself 'am I thinking?'

翻成白話：有深度的寫作是從 **produce**（生產）的過程中 **come up with**（想出）東西。如果你只是讓 AI produce、你只負責 come up with 問題，那你可能根本沒在思考。

Karpathy 其實在 gist 裡有預先反駁這點：

> The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means.

「think about what it all means」這句話是他留給人類的。但 HN 的論點是：**這是理論上的分工，實際上很少人會做到**。

「vibe coding」是一個已經存在的現象 —— 不懂原理就讓 AI 寫 code，結果能跑但你不懂。HN 擔心的是 vibe thinking —— 把「整理」外包等於把「思考」外包，wiki 看起來很有組織但你根本沒內化。

### 我的綜合判斷

這兩個反對聲音有個共同點 —— 它們都不是在攻擊 LLM 的能力，是在攻擊人類的懶惰。

問題是 —— 我自己也懶。

我的防禦不是「保持警醒」，是前置的：新東西進來先跟 LLM 討論到我理解，理解完才決定要不要歸檔。思考在對話裡發生，歸檔是思考完的結果。

但這不是誰比較好的問題，是**你願不願意做分類決策**的問題。兩條路都用 LLM 做 compound —— Karpathy 把新舊資訊併進 wiki page，LYT 把新資訊拆成原子卡片再連結回去。bookkeeping 成本兩邊都壓得下來。

差別在容器。Karpathy 的 wiki page 是主題聚合 —— 你要決定主題邊界在哪、哪些東西該併進同一張 page。LYT 的原子卡片繞開了這個問題 —— 一張卡一個概念，不用想歸到哪裡。

如果你對「這個東西該放哪」這類決策不覺得煩，Karpathy 的 pattern 值得試。去讀他的 [gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)，搭配 Mehmet 的[實作文章](https://mehmetgoekce.substack.com/p/i-built-karpathys-llm-wiki-with-claude)。

如果你跟我一樣，從 folder 出來、從 tag 出來，不想再走進另一個分類系統 —— 那原子化可能更適合你。

我用他的方法研究他的方法，結果沒讓我換系統。但讓我搞清楚一件事：兩條路的分歧不在技術，在你對分類的容忍度。

---

## FAQ

### Karpathy 的 LLM Wiki 跟 RAG 有什麼不同？

RAG 每次查詢重新從 raw 文件找答案，什麼都不留。LLM Wiki 讓 LLM 把 raw 增量編譯成一份持久化的 wiki，然後一直維護它。差別是時間維度 —— RAG 每次重新推導，wiki 把推導結果存起來持續累積。Karpathy 自己的說法：「the wiki is a persistent, compounding artifact」。

### 什麼是 Model Collapse？

LLM 反覆讀自己寫的東西再改寫，長期下來細節被磨平、風格單一化 —— 平均的平均的平均。[Nature 2024](https://www.nature.com/articles/s41586-024-07566-x) 有論文論證。這是 HN 對 Karpathy pattern 最大的技術擔憂。我自己的做法是用前置防禦繞開 —— 先跟 LLM 討論到理解，理解完才歸檔，所以進知識庫的每張卡片都是我理解過的，不是 LLM 寫完我沒看就存進去的。

### LYT 和 Karpathy LLM Wiki 的核心差別是什麼？

容器。LYT 的原子卡片一張一個概念，連結取代分類，不用想「這個東西歸哪裡」。Karpathy 的 wiki page 是主題聚合，一張 page 裝一個主題的所有東西，但你要決定主題邊界在哪。這是 folder 和 tag 時代的老問題換了個皮 —— 選哪個 folder 變成選哪張 wiki page。

### 我該用 Karpathy 的方法嗎？

問自己一個問題：你對「這個東西該放哪」這類分類決策煩不煩？如果不煩，Karpathy 的 pattern 值得試 —— 去讀他的 [gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)，搭配 Mehmet 的[實作文章](https://mehmetgoekce.substack.com/p/i-built-karpathys-llm-wiki-with-claude)。如果你跟我一樣，從 folder 出來、從 tag 出來，不想再走進另一個分類系統，那原子化路線可能更適合你。
