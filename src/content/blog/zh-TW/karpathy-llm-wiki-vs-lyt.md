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

這半年 Obsidian + Claude Code / Codex 的組合已經是 PKM 圈的顯學之一。我自己去年底從 Roam 轉到 Obsidian，跑 Nick Milo 的 LYT 框架加 Claude Code 當後台，也快半年了。身邊還有幾個朋友在做類似的事。

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

## 二、骨架相同，我用 LYT 跑了半年

我打開自己的 FLUX Vault 對照他的 gist，發現兩件事。

第一件事：骨架幾乎一樣。

| Karpathy Pattern | 我的 LYT |
|---|---|
| `raw/` | `Atlas/Sources/` |
| `wiki/` | `Atlas/Dots/` + `Maps/` |
| schema 檔（`CLAUDE.md` / `AGENTS.md`） | `CLAUDE.md` + 各 `SKILL.md` |
| `index.md` | `Maps/` MOC（Maps of Content）|
| `log.md` | ❌ 原本沒有 |

註：Karpathy 的 gist 同時列出兩個 schema 檔名 —— `CLAUDE.md` 給 Claude Code 使用者、`AGENTS.md` 給 OpenAI Codex 使用者。gist 本身是工具不可知的，他的原話是「this is an idea file, it is designed to be copy pasted to your own LLM Agent (e.g. OpenAI Codex, Claude Code, OpenCode / Pi, or etc.)」。我用 Claude Code，所以對照我這邊用 `CLAUDE.md`。

四個層 1:1 對到。但第五層 —— `log.md`，我過去半年根本沒做。

`log.md` 是一份 append-only 的動作紀錄：誰改了什麼、為什麼改。它不是日記，是 wiki 變動的歷史紀錄。Karpathy 的 ingest 和 lint 會失控就是因為少了它 —— 你不知道哪些卡被動過、為什麼被動、什麼時候動的。

我昨天才第一次建立 `Atlas/log.md`。而且第一筆 entry 紀錄的 —— 就是這次研究本身。這件事後面會回頭講。

第二件事：Mehmet Gökçe（2026-04-08 第一個完整開源實作者）發了一篇 [Substack 文章](https://mehmetgoekce.substack.com/p/i-built-karpathys-llm-wiki-with-claude)，他指出 Karpathy gist 有 5,000+ stars 但幾乎沒人真的建出來。原因：gist 描述的是 pattern 不是 implementation，告訴你要建什麼但沒告訴你怎麼串起來。

Mehmet 的貢獻是把抽象 pattern 轉成可 git clone 的完整系統。他的 append-only 五階段實作我後面會用到。

但骨架像不代表兩條路一樣。我用 LYT 半年，知識庫一直在長大 —— 只是長大的方式跟 Karpathy 描述的完全不同。

差在哪？不在工具，在兩個哲學分歧。

## 三、分歧一 —— 靜止 vs 改寫

我用 LYT 的習慣是這樣：

一張卡片建進來，就是它當下的 status。之後會被 MOC 收進去、會被後來的新卡 backlink。但**卡片本體的內容不會再動**。新的理解不是併進舊卡，是另開一張新卡掛在旁邊。

靜止是代價，但省下了一整套麻煩。你不用判斷「這個新資訊要併進哪張舊卡」、不用擔心改壞了、不用維護版本歷史。

Karpathy 不這樣。

新 source 進來，LLM 會回頭改寫相關的舊 page —— 這個動作他叫 `ingest`。但 ingest 不是隨便覆蓋。Karpathy gist 裡的原則是：LLM 負責判斷新資訊跟舊 page 的關係，**遇到矛盾要標出來，留給人判斷**。不能自作主張。

Mehmet 實作後把這個原則細化成更具體的五階段：

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

## 五、停下來聽一下反對聲音

寫到這裡我本來可以直接下結論 —— 但如果不讓反對的聲音有位置，整篇就變成「Karpathy 很對、我也要做」的附和文。這不是我想寫的。

HN 上這個 gist 的討論有兩層有論證的反對聲音。兩層都不是在攻擊 LLM 的能力，是在攻擊**人類的懶惰**。

### 反對一：Model Collapse（技術面）

除了容器邊界問題，Karpathy 的 pattern 還有一個更根本的技術擔憂。HN 上有人直接點名：

> I don't see why this wouldn't just lead to model collapse. The compounding will just be rewriting valid information with less sense information.

論點是：LLM 寫出來的 wiki 本身帶有 AI slop。下次 ingest 時 LLM 會讀到舊 wiki + 新 source，等於「LLM 在自己寫的東西上再寫」。長期下來可能變成平均的平均的平均，細節慢慢消失。這個現象 AI 圈有個名字叫 **Model Collapse**，[2024 年 Nature 的論文](https://www.nature.com/articles/s41586-024-07566-x) 有完整論證。

HN thread 上有反駁的聲音，但那些反駁針對的是 LLM 訓練場景，跟 Karpathy 的 ingest 場景不完全一樣。這個 pattern 會不會真的觸發 Model Collapse，目前還沒人跑夠久可以證明。

Karpathy 的 `log` + `lint` 就是在試著擋 —— `log` 讓 drift 可被追溯、`lint` 定期掃矛盾和過期段落。但「試著擋」不等於「擋得住」。

### 反對二：Vibe Thinking（認知面）

這個反對最狠。HN 原文：

> Rule of thumb: if you find yourself having to come up with instead of what it helps you produce, ask yourself 'am I thinking?'

翻成白話：有深度的寫作是從 **produce**（生產）的過程中 **come up with**（想出）東西。如果你只是讓 AI produce、你只負責 come up with 問題，那你可能根本沒在思考。

Karpathy 其實在 gist 裡有預先反駁這點：

> The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means.

「think about what it all means」這句話是他留給人類的。但 HN 的論點是：**這是理論上的分工，實際上很少人會做到**。

「vibe coding」是一個已經存在的現象 —— 不懂原理就讓 AI 寫 code，結果能跑但你不懂。HN 擔心的是 vibe thinking —— 把「整理」外包等於把「思考」外包，wiki 看起來很有組織但你根本沒 internalize。

### 我的綜合判斷

這兩個反對聲音有個共同點 —— 它們都不是在攻擊 LLM 的能力，是在攻擊**人類的懶惰**。Karpathy 的 pattern 理論上要求人保持警醒。這是它的根本前提。

問題是 —— 我自己也懶。

我用 LYT 半年，真正的防禦機制不是「保持警醒」。警醒這件事我做不到。我的防禦是**前置的**：新東西進來先跟 LLM 討論到我理解，理解完才決定要不要歸檔。

這個動作把「思考」和「歸檔」拆成兩件事。思考在對話裡發生，歸檔是思考完的結果。

這正好繞開兩個反對聲音。對 Model Collapse 來說，我沒有把 raw 直接丟給 LLM 讓它自己 compound —— 每張進 Atlas 的卡都是我理解過的，不是 LLM 寫完我沒看就 commit 的。對 Vibe Thinking 來說，我的歸檔不是「還沒理解時的外包」，是「已完成理解的儲存」。

## 六、我為什麼不搬家

我昨天跑那次 ingest 的 12 份 wiki page 現在還在 `inbox/research/karpathy-llm-wiki/`。沒搬到 Atlas。

但我**從那 12 份 wiki page 拆出了 6 張原子化 Dots 歸檔到 Atlas**。兩張 Things（LLM Wiki Pattern、L1-L2 Knowledge Layering）、兩張 Statements（我對 Karpathy pattern 的兩個判斷）、兩張 Quotes（Karpathy gist 裡的兩句金句）。

這個差別就是答案。

對我來說，Karpathy 的 wiki page 是**過程**，不是**終點**。我用他的方法把 raw 編譯成 wiki page 做理解，但編譯完之後我沒把那些 wiki page 當成知識庫的一部分 —— 我只把它們當成拆 Dots 的原料。

為什麼？因為我不想再做分類決策。

那 12 份 wiki page 要活下去，需要我定期回去決定：這份要不要跟那份合併？主題邊界要不要調整？新的 source 進來該塞進哪一份？這些都是 folder / tag 時代的老問題。LYT 的原子化讓我這半年沒在做這些決策，我不想搬回去做。

Karpathy 的 pattern 解決的是 compound 成本，不是分類成本。對他 100 份 wiki page 的研究主題來說，compound 成本才是瓶頸。對我這種多主題散落的使用者來說，分類成本一直是真正的痛點 —— 而 LYT 已經幫我繞開了。

所以我不搬家。不是因為 Karpathy 的 pattern 不好，是因為它優化的不是我的瓶頸。

如果你是 PKM 老手，你對 Karpathy pattern 的不安其實有理由。不是 pattern 的問題，是這個 pattern 要求你做的決策類型，很多人已經離開很久了。

## 結論 —— 三個 takeaways

這不是誰比較好的問題，是**一張卡到底是什麼**的問題。

三個帶走的東西：

1. **如果你還沒開始整合 LLM + 個人知識管理**，Karpathy 的 pattern 是目前最完整的藍圖。去讀他的 [gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)，搭配 Mehmet 的 [實作文章](https://mehmetgoekce.substack.com/p/i-built-karpathys-llm-wiki-with-claude) 一起看。

2. **如果你已經在做**（用 Obsidian / Notion / Roam 搭配 Claude / GPT），真正的問題不是「要不要換工具」，是「你的工作流有沒有處理新舊之間的交互」。你可能像我一樣骨架早就對了，差的是 workflow 那一層。

3. **選系統之前先想清楚你的瓶頸是什麼**。Karpathy pattern 優化的是 compound 成本 —— LLM 幫你把 cross-reference、summary、synthesis 這些重複勞動壓到零。但如果你的痛點是分類成本（「這個東西該放哪裡」），它不會幫你。先搞清楚自己在煩惱什麼，再決定要不要換工具。

我用他的方法研究他的方法，結果沒讓我換系統 —— 但讓我看到自己的系統缺了什麼。這可能就是一份好 gist 應該做到的事。

---

## FAQ

### Karpathy 的 LLM Wiki 跟 RAG 有什麼不同？

RAG 是每次查詢時才臨時從 raw 文件找答案，stateless、transient。LLM Wiki 是 LLM 作為 compiler，把 raw 文件增量編譯成一份持久化的 markdown wiki，然後一直維護它。兩者的根本差異是時間維度 —— RAG 重新找，wiki 一次編譯持續維護。Karpathy 的論點是 RAG 把 cross-reference 和矛盾處理的成本壓到每次查詢，wiki 把這個成本攤銷到 ingest 當下。

### 什麼是 Model Collapse？Karpathy 的 pattern 會遇到嗎？

Model Collapse 是 AI 模型反覆吃自己寫的東西會逐漸退化的現象，[Nature 2024](https://www.nature.com/articles/s41586-024-07566-x) 有論文證實。這是 HN 社群對 Karpathy pattern 最大的技術擔憂 —— 每次 ingest 時 LLM 會讀到舊 wiki + 新 source，長期下來可能出現「平均的平均的平均」。Karpathy 的 `log` + `lint` 就是在試著擋，但能不能擋住還沒有人跑夠久可以證明。

### LYT 和 Zettelkasten 的差別是什麼？

Zettelkasten 是德國社會學家 Luhmann 發明的紙卡知識管理系統，核心是「原子化筆記 + 手動反向連結」。LYT（Linking Your Thinking）是 Nick Milo 在 Obsidian 時代對 Zettelkasten 的現代化詮釋，加入 MOC（Maps of Content）作為跨層索引。兩者都是原子化路線，用「一張卡片一個概念 + 連結取代分類」的方式繞開容器決策 —— 這是 folder 和 tag 時代留下來的老問題。我自己用 LYT 半年，這條路讓我不用每次新東西進來都想「該歸到哪裡」。

### 我該用 Karpathy 的方法嗎？

看三個條件。第一，你是不是在單一主題上累積大量 sources？（例如深度研究、書籍、長期 project）—— 這是 Karpathy 自己的使用情境，pattern 在這種 context 下最有效。第二，你有沒有能力保持警醒？Karpathy pattern 的根本前提是「人持續 curate 不放手」，HN 的兩層反對聲音（Model Collapse 和 Vibe Thinking）在懶惰的使用者身上都會成立。第三，你願不願意承擔「主題邊界該怎麼切」的分類決策？這是 pattern 留給使用者的問題，Karpathy 繞過去了。如果三個條件都成立，值得試。不然就像我一樣，繼續用原子化系統就好。
