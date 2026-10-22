---
title: "用 M1 Max 32GB 實測三個地端模型後，我決定先不換 Mac"
seoTitle: "跑地端 AI 要什麼 Mac？M1 Max 32GB 實測三個模型對上 Claude"
description: "我在考慮換新 Mac 跑地端 AI，先在手上的 M1 Max 32GB 實測 Gemma 4 26B、Qwen3.8 27B、Qwen3.6 35B 三個地端模型，讓它們跟雲端 Claude 做同樣四件工作。Claude 每件 72 秒內做完，地端每件要等 2 到 49 分鐘，12 次裡 5 次不能直接用。換新 Mac 也只會快一點，所以我先不換。"
pubDate: 2026-10-22
heroImage: /images/blog/local-llm-mac.webp
category: building-products
topics: ["ai-practice"]
tags: ["AI", "Claude Code", "local LLM", "self-hosted AI"]
lang: zh-TW
translationKey: local-llm-mac
featured: true
relatedPosts: ["ai-harness.md", "claude-code-tutorial.md", "enterprise-ai-data-security.md", "loop-engineering.md"]
faq:
  - question: "地端 AI 是什麼？"
    answer: "地端 AI（也稱本地 AI）是把模型下載到自己的電腦上跑，不必把資料送到別人的伺服器。跑在自己電腦上的模型，叫地端模型。地端本來就有的好處，是不用靠雲端的自由，還有資料不出電腦。跑地端 AI，像自己買車。自己的車想去哪就去哪，行程也不用給別人知道，只是得自己開、自己保養。用雲端的 Claude，像搭高鐵，速度快，也有人保養。"
  - question: "地端 AI 有哪些模型？"
    answer: "現在常見、能在地端跑的模型，大致分成大中小三級。名字裡的 120B、27B、4B 代表模型的大小，數字越大，模型越大。以 Ollama（跑地端模型的免費程式）上壓小過的模型檔來看，約 120B 的大級有 gpt-oss-120b、Qwen3.5 122B、Nemotron 3 Super 120B，模型檔 65 到 87GB。20B 到 35B 的中級有 gpt-oss-20b、Gemma 4 26B、Qwen3.8 27B、Qwen3.6 35B，模型檔 14 到 23GB。4B 到 9B 的小級有 Qwen3.5 4B、Qwen3.5 9B，模型檔 3.3 到 6.6GB。模型越大，放進記憶體要佔的空間越大。"
  - question: "跑地端 AI 要多少記憶體的 Mac？"
    answer: "記憶體的容量，決定放得下多大的模型，還有模型一次能讀多長。16GB 的 Mac 放不下像 Gemma 4 26B、Qwen3.8 27B 和 Qwen3.6 35B 這樣的中級模型，它們的模型檔約 18 到 23GB，光模型檔就比整台記憶體大。這幾個模型在 32GB 的 Mac 上跑得起來，但記憶體很吃緊，跑模型的 GPU 預設只能用其中約 25GB。想讓 Qwen3.8 27B 這樣的中級模型讀到跟 Claude 一樣長的內容，或跑模型檔 65 到 87GB 的大級模型，我目前的想法是記憶體要往 128GB 看，這種 Mac 的 GPU 能用約 107GB。"
  - question: "地端 AI 跟雲端 Claude 差在哪裡？"
    answer: "反應時間：同樣幾件要讀檔、改檔的日常工作，Claude 每件都在 72 秒內做完，地端模型跑在 M1 Max 32GB 上、沒有為了變快去調設定，每件要等 2 到 49 分鐘。回覆品質：我測的地端模型，結果比 Claude 常不能直接用，像是編出不存在的檔，或把引用的原話改到看不出原意。一次能讀多長：現在的 Claude 模型預設就是 100 萬 token（token 是模型計算文字的單位），地端模型受記憶體限制，要讀得越長，佔的記憶體越多。資料和自由：地端的資料不出電腦，也不用靠雲端。設定和維護：地端得自己裝、自己調，雲端的 Claude 有人保養。離線和用量：模型下載到自己的電腦後，不連網也能跑，而且沒有雲端服務那種用量額度。反應時間和回覆品質，都是某一次跑出來的結果，不是平均值。"
---

看到新的 Mac 上市，我在思考要不要換掉手上這台 2021 年的 MacBook Pro（M1 Max、32GB 記憶體）。我也聽說最近地端模型進步了很多，所以會想：如果要換電腦，在我的新機預算內，有沒有機會在新的 Mac 上跑地端 AI？地端 AI 指的是把模型下載到自己的電腦上跑，不必把資料送到別人的伺服器。我想親手測，不只查資料，就先在手上這台 M1 Max 跑地端 AI，看看它的表現如何。

## 地端 AI 在 32GB 的 Mac 上跑得動嗎？

跑得動，但是很喘。在這台 Mac 上，地端模型每做一件工作，都要等 Claude 的幾倍到幾十倍時間，結果也不一定能直接用。我讓三個地端模型和我平常用的雲端 Claude，各做我自己工作流程裡的四件事：開新專案、整理訪談逐字稿、排今天、每週回顧。三個地端模型是 Google 的 Gemma 4 26B，還有阿里巴巴的 Qwen3.8 27B 和 Qwen3.6 35B。

Claude 四件都能直接用，每一件都在 72 秒內做完。三個地端模型每件要等 2 到 49 分鐘，各做四件、一共 12 次，其中 5 次的結果不能直接用。

測完，我決定先不換電腦。買新 Mac 能讓地端 AI 快一點，但等的時間還是比 Claude 長得多，花這筆錢買不到生產力的提升。

## 我怎麼測地端 AI？

AI 能做的事很多，可以聊天問答，也能生圖、做影片。這次只測我工作上最常交給 AI 的那一類：讀檔案、寫文件、跟我來回討論。我拿自己工作流程裡的四件日常工作當考題，請 Claude 扮演一位虛構的社工系研究助理，把工作交代給地端模型。她叫芷晴，手上有一批訪談要分析。IRB（研究倫理審查）規定，這些訪談資料只能存在研究室這台電腦。

我挑這三個地端模型，是想要一個非中國模型（Gemma），一個中國模型（Qwen3.8），再加一個寫得快的（Qwen3.6）。包在模型外面、讓模型能讀檔、改檔、記住對話的整套系統，叫 harness。harness 會怎麼影響結果，我在〈[Harness：決定 AI Agent 成敗的不是模型，是這個東西](/zh-TW/blog/ai-harness/)〉寫過。兩邊各用哪些模型和 harness，列在下面這張表。

| | 地端 | 雲端（對照組） |
|---|---|---|
| 模型 | Gemma 4 26B、Qwen3.8 27B、Qwen3.6 35B | Claude Sonnet 5.5 |
| harness | OpenCode | Claude Code |

文章裡拿來比的 Claude，指的是表格右邊這一整組：Claude Sonnet 5.5 加 [Claude Code](/zh-TW/blog/claude-code-tutorial/)。同樣四件事也交給它做一遍。兩邊的模型和 harness 都不一樣，所以這次比的不只是模型，也比了兩邊的 harness。

<style>.inkf1{margin:var(--space-6) 0 var(--space-4)}.inkf1 svg{font-size:var(--t-ui);display:block;width:100%;height:auto;overflow:visible}.inkf1 text{font-family:var(--ar-text,Newsreader,'Noto Serif TC',Georgia,serif);fill:var(--ink)}.inkf1 .l{font-size:1.4em;letter-spacing:.06em}.inkf1 .s{font-size:1.0667em;letter-spacing:.04em;fill:var(--muted)}.inkf1 .em{fill:var(--terra-deep)}.inkf1 .v{font-size:1.5333em;font-weight:600;letter-spacing:.08em}.inkf1 .ln{fill:none;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:0}.inkf1 .thin{stroke:var(--ink);stroke-width:1.2}.inkf1 .ink{stroke:var(--ink);stroke-width:2.5}.inkf1 .och{stroke:var(--terra);stroke-width:2.5}.inkf1 .dot{fill:var(--ink)}.inkf1 .dot-em{fill:var(--terra)}.inkf1 .narrow{display:none}@media (max-width:700px){.inkf1 .wide{display:none}.inkf1 .narrow{display:block}.inkf1 .narrow .l{font-size:1em}.inkf1 .narrow .s{font-size:0.8333em}.inkf1 .narrow .v{font-size:1.1333em}}@media (prefers-reduced-motion:no-preference){.inkf1 .fd{opacity:0;transition:opacity .7s ease var(--d,0s)}.inkf1.visible .fd{opacity:1}.inkf1 .ln{stroke-dashoffset:1;transition:stroke-dashoffset 1.2s cubic-bezier(.4,.1,.2,1) var(--d,0s)}.inkf1.visible .ln{stroke-dashoffset:0}}</style><div class="inkf1 fade-in-section" role="img" aria-label="測試流程：我請 Claude 扮演虛構的社工系研究助理芷晴，把四件工作交代給在 M1 Max 32GB 上跑的三個地端模型。同樣四件也交給雲端的 Claude，做完由我判成功或失敗。"><svg class="wide" viewBox="0 0 960 540" aria-hidden="true"><text class="l fd" style="--d:0.0s" x="120" y="44" text-anchor="middle">① 開新專案</text><path class="ln thin" pathLength="1" style="--d:0.4s" d="M120 62 C120 96 480 86 480 118"/><text class="l fd" style="--d:0.0s" x="360" y="44" text-anchor="middle">② 整理訪談逐字稿</text><path class="ln thin" pathLength="1" style="--d:0.4s" d="M360 62 C360 96 480 86 480 118"/><text class="l fd" style="--d:0.0s" x="600" y="44" text-anchor="middle">③ 排今天</text><path class="ln thin" pathLength="1" style="--d:0.4s" d="M600 62 C600 96 480 86 480 118"/><text class="l fd" style="--d:0.0s" x="840" y="44" text-anchor="middle">④ 每週回顧</text><path class="ln thin" pathLength="1" style="--d:0.4s" d="M840 62 C840 96 480 86 480 118"/><circle class="dot fd" style="--d:1.3s" cx="480" cy="124" r="4.5"/><text class="l fd" style="--d:1.3s" x="500" y="132" text-anchor="start">芷晴交代</text><text class="s fd" style="--d:1.3s" x="500" y="156" text-anchor="start">由 Claude 扮演</text><path class="ln ink" pathLength="1" style="--d:1.3s" d="M480 128 V170"/><path class="ln och" pathLength="1" style="--d:1.7s" d="M480 170 C480 222 240 212 240 262"/><path class="ln ink" pathLength="1" style="--d:2.1s" d="M480 170 C480 222 720 212 720 262"/><text class="s em fd" style="--d:2.3s" x="330" y="206" text-anchor="end">地端</text><text class="s fd" style="--d:2.7s" x="630" y="206" text-anchor="start">雲端（對照）</text><circle class="dot-em fd" style="--d:3.0s" cx="240" cy="268" r="4.5"/><text class="l em fd" style="--d:3.0s" x="240" y="302" text-anchor="middle">三個地端模型</text><text class="s fd" style="--d:3.0s" x="240" y="326" text-anchor="middle">M1 Max 32GB 上，harness 用 OpenCode</text><circle class="dot fd" style="--d:3.0s" cx="720" cy="268" r="4.5"/><text class="l fd" style="--d:3.0s" x="720" y="302" text-anchor="middle">Claude Sonnet 5.5</text><text class="s fd" style="--d:3.0s" x="720" y="326" text-anchor="middle">雲端，harness 用 Claude Code</text><path class="ln och" pathLength="1" style="--d:3.4s" d="M240 342 C240 384 480 372 480 402"/><path class="ln ink" pathLength="1" style="--d:3.4s" d="M720 342 C720 384 480 372 480 402"/><circle class="dot fd" style="--d:4.4s" cx="480" cy="408" r="4.5"/><text class="l fd" style="--d:4.4s" x="480" y="442" text-anchor="middle">在資料夾裡建檔、改檔</text><path class="ln ink" pathLength="1" style="--d:4.7s" d="M480 456 V484"/><text class="v fd" style="--d:5.3s" x="480" y="520" text-anchor="middle">我判：成功／失敗</text></svg><svg class="narrow" viewBox="0 0 360 466" aria-hidden="true"><text class="l fd" style="--d:0.0s" x="92" y="26" text-anchor="middle">① 開新專案</text><text class="l fd" style="--d:0.0s" x="268" y="26" text-anchor="middle">② 整理訪談逐字稿</text><text class="l fd" style="--d:0.0s" x="92" y="54" text-anchor="middle">③ 排今天</text><text class="l fd" style="--d:0.0s" x="268" y="54" text-anchor="middle">④ 每週回顧</text><path class="ln thin" pathLength="1" style="--d:0.4s" d="M28 66 Q28 76 38 76 H322 Q332 76 332 66"/><path class="ln thin" pathLength="1" style="--d:0.9s" d="M180 76 V112"/><circle class="dot fd" style="--d:1.3s" cx="180" cy="118" r="4"/><text class="l fd" style="--d:1.3s" x="194" y="124" text-anchor="start">芷晴交代</text><text class="s fd" style="--d:1.3s" x="194" y="142" text-anchor="start">由 Claude 扮演</text><path class="ln ink" pathLength="1" style="--d:1.3s" d="M180 122 V160"/><path class="ln och" pathLength="1" style="--d:1.7s" d="M180 160 C180 200 90 192 90 232"/><path class="ln ink" pathLength="1" style="--d:2.1s" d="M180 160 C180 200 270 192 270 232"/><text class="s em fd" style="--d:2.3s" x="118" y="190" text-anchor="end">地端</text><text class="s fd" style="--d:2.7s" x="242" y="190" text-anchor="start">雲端</text><circle class="dot-em fd" style="--d:3.0s" cx="90" cy="238" r="4"/><text class="l em fd" style="--d:3.0s" x="90" y="264" text-anchor="middle">三個地端模型</text><text class="s fd" style="--d:3.0s" x="90" y="283" text-anchor="middle">M1 Max・OpenCode</text><circle class="dot fd" style="--d:3.0s" cx="270" cy="238" r="4"/><text class="l fd" style="--d:3.0s" x="270" y="264" text-anchor="middle">Claude Sonnet 5.5</text><text class="s fd" style="--d:3.0s" x="270" y="283" text-anchor="middle">雲端・Claude Code</text><path class="ln och" pathLength="1" style="--d:3.4s" d="M90 296 C90 330 180 322 180 350"/><path class="ln ink" pathLength="1" style="--d:3.4s" d="M270 296 C270 330 180 322 180 350"/><circle class="dot fd" style="--d:4.4s" cx="180" cy="356" r="4"/><text class="l fd" style="--d:4.4s" x="180" y="384" text-anchor="middle">在資料夾裡建檔、改檔</text><path class="ln ink" pathLength="1" style="--d:4.7s" d="M180 396 V420"/><text class="v fd" style="--d:5.3s" x="180" y="450" text-anchor="middle">我判：成功／失敗</text></svg></div>

<p style="font-size:.85em;color:#71655C;margin-top:-.5rem">圖 1　測試流程，看同樣四件事怎麼分成地端和雲端兩路</p>


### 四件事是哪四件？

四件事都要 AI 先讀資料夾裡的檔案，再動手建檔或改檔：

**① 開新專案**：我開始一件新工作時，會用一兩句話跟 AI 交代要開什麼專案、什麼時候做完。AI 會開一個新資料夾，在裡面寫一份 README.md，也就是這件工作的說明檔。README.md 寫清楚這件工作對到哪個目標、每週要做什麼、現在做到哪裡。

**② 整理訪談逐字稿**：芷晴把一份約 1,500 字的訪談逐字稿交給 AI，請它替每段話貼上短標籤（研究上叫編碼）。每個編碼底下，要從逐字稿抄下對應的原話當證據。最後從這份訪談寫出 3 到 5 個可能的主題。主題就是把相近的編碼歸在一起，取一個名稱，說明這一組在講什麼。芷晴沒有要求主題附原話，原話附在編碼底下就好。

**③ 排今天**：我早上開工時，會請 AI 先問我今天想做什麼，再對照這週的計畫和行程，和我討論出當天的工作。

**④ 每週回顧**：我每週會和 Claude 談我過去一週完成了哪些事情，把成果歸檔，並討論下一週的工作目標。測試時改由芷晴跟模型談這件事，地端那幾次的時間和來回次數上限，都是四件事裡最高的。

① 開新專案、③ 排今天、④ 每週回顧，都有一份寫好的 SOP，規定 AI 照什麼流程做。這份 SOP 寫在資料夾裡的 CLAUDE.md，這是給 AI 看的規則說明書，有 733 行。Claude Code 和 OpenCode 照同一份 CLAUDE.md 的流程做，兩邊的結果才能放在一起比較。② 整理逐字稿沒有寫成 SOP，靠芷晴當下交代。

### 誰扮演芷晴、結果怎麼判？

兩邊的芷晴都由 Claude 扮演。差別在做事的一方，是前面表格裡的地端那組，還是雲端那組。扮演時有一份角色說明，寫了芷晴是誰、這件事要做到什麼。

芷晴只做一般使用者會做的事：回答問題，模型沒聽懂或做錯時換句話再講，說同意或不同意，不教模型怎麼做。每一輪她讀完對話和資料夾裡新增或改過的檔案，再回一到三句。

模型自己讀檔、改檔，不清楚可以回頭問芷晴。地端這幾次，① ② ③ 每件上限 90 分鐘、最多 6 次來回。④ 每週回顧是 120 分鐘、最多 8 次來回，兩種上限先到哪個就停。

判的時候只看最後交出來的東西能不能直接用，結果只分成功和失敗兩種。能直接用，算成功，中間要多講幾次才修好也算。不能直接用，算失敗，包括沒做出來、次數或時間用完時還沒完成，還有實際要用這份檔案的人得自己動手改才能用。整理逐字稿時抄下來的原話，改到看不出原意，整份也算失敗。

<style>.inkf2{margin:var(--space-6) 0 var(--space-4)}.inkf2 svg{font-size:var(--t-ui);display:block;width:100%;height:auto;overflow:visible}.inkf2 text{font-family:var(--ar-text,Newsreader,'Noto Serif TC',Georgia,serif);fill:var(--ink)}.inkf2 .l{font-size:1.4em;letter-spacing:.06em}.inkf2 .s{font-size:1.0667em;letter-spacing:.04em;fill:var(--muted)}.inkf2 .em{fill:var(--terra-deep)}.inkf2 .v{font-size:1.4em;font-weight:600;letter-spacing:.08em}.inkf2 .ln{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:0}.inkf2 .thin{stroke:var(--ink);stroke-width:1.2}.inkf2 .ink{stroke:var(--ink);stroke-width:2.5}.inkf2 .och{stroke:var(--terra);stroke-width:2.5}.inkf2 .chev{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.inkf2 .chev.och-c{stroke:var(--terra)}.inkf2 .chev.ink-c{stroke:var(--ink)}.inkf2 .dash{fill:none;stroke:var(--ink);stroke-width:1.5;stroke-dasharray:5 7}.inkf2 .rule{stroke:var(--muted);stroke-width:1;opacity:.5}.inkf2 .dot{fill:var(--ink)}.inkf2 .dot-em{fill:var(--terra)}.inkf2 .narrow{display:none}@media (max-width:700px){.inkf2 .wide{display:none}.inkf2 .narrow{display:block}.inkf2 .narrow .l{font-size:1em}.inkf2 .narrow .s{font-size:0.8333em}.inkf2 .narrow .v{font-size:1em}}@media (prefers-reduced-motion:no-preference){.inkf2 .fd{opacity:0;transition:opacity .7s ease var(--d,0s)}.inkf2.visible .fd{opacity:1}.inkf2 .ln{stroke-dashoffset:1;transition:stroke-dashoffset 1s cubic-bezier(.4,.1,.2,1) var(--d,0s)}.inkf2.visible .ln{stroke-dashoffset:0}}</style><div class="inkf2 fade-in-section" role="img" aria-label="Claude 照角色說明扮演芷晴，跟做事的一方一來一回：芷晴交代、回答，模型讀檔改檔、回報、提問，芷晴看得到檔案變化。地端那幾次，來回有次數和時間上限。結果分兩種：「成功：能直接用」和「失敗：不能直接用」。沒做出來、上限用完還沒完成、得自己改才能用、抄下來的原話改到看不出原意，都算失敗。"><svg class="wide" viewBox="0 0 960 520" aria-hidden="true"><text class="s fd" style="--d:0.0s" x="220" y="30" text-anchor="middle">角色說明</text><text class="s fd" style="--d:0.0s" x="220" y="56" text-anchor="middle">芷晴是誰・要做到什麼・只做使用者會做的事</text><path class="ln thin" pathLength="1" style="--d:0.4s" d="M220 68 V112"/><circle class="dot-em fd" style="--d:1.0s" cx="220" cy="126" r="4.5"/><text class="l em fd" style="--d:1.0s" x="220" y="160" text-anchor="middle">芷晴</text><text class="s fd" style="--d:1.0s" x="220" y="184" text-anchor="middle">由 Claude 扮演</text><path class="ln och" pathLength="1" style="--d:1.4s" d="M244 116 H716"/><path class="chev och-c fd" style="--d:2.3s" d="M706 110 L716 116 L706 122"/><text class="s em fd" style="--d:2.2s" x="480" y="102" text-anchor="middle">交代、回答</text><circle class="dot fd" style="--d:2.4s" cx="740" cy="126" r="4.5"/><text class="l fd" style="--d:2.4s" x="740" y="160" text-anchor="middle">做事的一方</text><text class="s fd" style="--d:2.4s" x="740" y="184" text-anchor="middle">地端模型＋OpenCode</text><text class="s fd" style="--d:2.4s" x="740" y="206" text-anchor="middle">或 Sonnet 5.5＋Claude Code</text><path class="ln och" pathLength="1" style="--d:2.8s" d="M716 136 H244"/><path class="chev och-c fd" style="--d:3.6999999999999997s" d="M254 130 L244 136 L254 142"/><text class="s em fd" style="--d:3.6s" x="480" y="160" text-anchor="middle">回報、提問</text><path class="ln ink" pathLength="1" style="--d:3.9s" d="M740 222 V292"/><circle class="dot fd" style="--d:4.5s" cx="740" cy="306" r="4.5"/><text class="l fd" style="--d:4.5s" x="740" y="340" text-anchor="middle">資料夾</text><text class="s fd" style="--d:4.5s" x="740" y="364" text-anchor="middle">讀檔、改檔</text><path class="dash fd" style="--d:4.9s" d="M724 306 H262 Q220 306 220 264 V200"/><path class="chev ink-c fd" style="--d:4.9s" d="M214 210 L220 200 L226 210"/><text class="s fd" style="--d:5.1000000000000005s" x="480" y="294" text-anchor="middle">看得到檔案變化</text><text class="s fd" style="--d:5.6s" x="480" y="412" text-anchor="middle">一來一回，地端每件事有次數和時間上限</text><path class="rule fd" style="--d:6.0s" d="M120 440 H840"/><text class="v fd" style="--d:6.0s" x="310" y="478" text-anchor="middle">成功</text><text class="s fd" style="--d:6.0s" x="310" y="504" text-anchor="middle">能直接用，多講幾次也算</text><text class="v fd" style="--d:6.2s" x="650" y="478" text-anchor="middle">失敗</text><text class="s fd" style="--d:6.2s" x="650" y="504" text-anchor="middle">不能直接用，得自己改也算</text></svg><svg class="narrow" viewBox="0 0 360 404" aria-hidden="true"><text class="s fd" style="--d:0.0s" x="180" y="18" text-anchor="middle">角色說明</text><text class="s fd" style="--d:0.0s" x="180" y="38" text-anchor="middle">芷晴是誰・要做到什麼・只做使用者會做的事</text><path class="ln thin" pathLength="1" style="--d:0.4s" d="M90 48 V96"/><circle class="dot-em fd" style="--d:1.0s" cx="90" cy="108" r="4"/><text class="l em fd" style="--d:1.0s" x="90" y="138" text-anchor="middle">芷晴</text><text class="s fd" style="--d:1.0s" x="90" y="156" text-anchor="middle">由 Claude 扮演</text><path class="ln och" pathLength="1" style="--d:1.4s" d="M106 100 H254"/><path class="chev och-c fd" style="--d:2.2s" d="M247 95 L254 100 L247 105"/><text class="s em fd" style="--d:2.2s" x="180" y="90" text-anchor="middle">交代、回答</text><circle class="dot fd" style="--d:2.4s" cx="270" cy="108" r="4"/><text class="l fd" style="--d:2.4s" x="270" y="138" text-anchor="middle">做事的一方</text><text class="s fd" style="--d:2.4s" x="270" y="156" text-anchor="middle">地端模型＋OpenCode</text><text class="s fd" style="--d:2.4s" x="270" y="173" text-anchor="middle">或 Sonnet 5.5＋Claude Code</text><path class="ln och" pathLength="1" style="--d:2.8s" d="M254 116 H106"/><path class="chev och-c fd" style="--d:3.5999999999999996s" d="M113 111 L106 116 L113 121"/><text class="s em fd" style="--d:3.6s" x="180" y="132" text-anchor="middle">回報、提問</text><path class="ln ink" pathLength="1" style="--d:3.9s" d="M270 184 V236"/><circle class="dot fd" style="--d:4.5s" cx="270" cy="246" r="4"/><text class="l fd" style="--d:4.5s" x="270" y="272" text-anchor="middle">資料夾</text><text class="s fd" style="--d:4.5s" x="270" y="290" text-anchor="middle">讀檔、改檔</text><path class="dash fd" style="--d:4.9s" d="M256 246 H116 Q90 246 90 220 V168"/><path class="chev ink-c fd" style="--d:4.9s" d="M85 176 L90 168 L95 176"/><text class="s fd" style="--d:5.1000000000000005s" x="180" y="238" text-anchor="middle">看得到檔案變化</text><text class="s fd" style="--d:5.6s" x="180" y="326" text-anchor="middle">一來一回，地端每件事有次數和時間上限</text><path class="rule fd" style="--d:6.0s" d="M20 344 H340"/><text class="v fd" style="--d:6.0s" x="95" y="372" text-anchor="middle">成功</text><text class="s fd" style="--d:6.0s" x="95" y="392" text-anchor="middle">能直接用，多講幾次也算</text><text class="v fd" style="--d:6.2s" x="265" y="372" text-anchor="middle">失敗</text><text class="s fd" style="--d:6.2s" x="265" y="392" text-anchor="middle">不能直接用，得自己改也算</text></svg></div>

<p style="font-size:.85em;color:#71655C;margin-top:-.5rem">圖 2　芷晴靠對話和檔案變化跟模型來回，下排是怎麼判成績</p>


<details>
<summary>這次測試的條件和限制</summary>

- 機器：2021 年款 MacBook Pro 16 吋，M1 Max，32GB 記憶體
- 地端：Ollama 0.40.4（跑地端模型的免費程式）、OpenCode 1.19.0
- 地端的設定：一次能讀多長，Gemma 和 Qwen3.8 設 10 萬 token，Qwen3.6 設 4 萬。有一項省記憶體的設定，只在 Qwen3.8 上生效。思考模式（回答前先想一輪）和跑模型的引擎，都照裝好時的樣子
- Claude：Claude Code 2.1.302，模型是 claude-sonnet-5-5
- 地端這邊的扮演者：Claude Code，模型是 claude-sonnet-5-5，effort 用 Claude Code 預設的 medium
- 四個模型從同一份資料夾開始，日期固定成週四 10/22（前三件）和週日 10/25（每週回顧）
- 兩邊都用指令跑，沒用圖形介面

這次測試的限制：

- 逐字稿只有約 1,500 字，真實一小時的訪談長很多
- 這次比的是 Claude Sonnet 5.5 加 Claude Code，對上地端模型加 OpenCode，差距有多少來自 harness，沒有拆開量

</details>

## 地端模型做得對嗎？

Claude 四件事都成功，三個地端模型各有一到兩件不能直接用，最常出錯的是每週回顧。

| 模型 | ① 開新專案 | ② 整理訪談逐字稿 | ③ 排今天 | ④ 每週回顧 |
|---|---|---|---|---|
| Claude | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> |
| Qwen3.8 | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> | <span style="background:#F3DBD2;color:#B23A28;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">失敗</span> | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> |
| Gemma | <span style="background:#F3DBD2;color:#B23A28;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">失敗</span> | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> | <span style="background:#F3DBD2;color:#B23A28;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">失敗</span> |
| Qwen3.6 | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> | <span style="background:#F3DBD2;color:#B23A28;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">失敗</span> | <span style="background:#F3DBD2;color:#B23A28;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">失敗</span> |

每一格都只有一筆結果，同一個設定再跑一次，結果可能不一樣。

**① 開新專案**：四個模型都建好了專案資料夾，也都在裡面寫了 README.md。Claude、Qwen3.8、Qwen3.6 寫出的 README.md 都能直接用。Gemma 判失敗，原因是 README.md 的內容沒有依據芷晴的情況寫出來。

**② 整理訪談逐字稿**：抄下來的原話之後會直接引用進論文，芷晴要的是一字不差。四個模型都改到了原話的字。改到字但意思沒變的，我判還能直接用。Claude、Gemma、Qwen3.6 改的字都沒動到意思，判成功。Qwen3.8 把「知道我們家的狀況」寫成「的狀態」，看不出原意，判失敗。

<details>
<summary>逐字稿原文和模型抄下來的原話對照</summary>

| 模型 | 逐字稿原文 | 模型抄下來的原話 | 判定 |
|---|---|---|---|
| Claude | 我已經一年多沒剪了。 | 我已經一年多沒剪<strong>頭髮</strong>了。 | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> |
| Gemma | 我覺得那個比錢重要，就是有人看到。 | 我覺得那個<strong>（小姑給的紅包）</strong>比錢重要，就是有人看到。 | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> |
| Qwen3.6 | 日照的交通車<strong>有時候</strong>排不到，我就要自己載，婆婆上下車很吃力 | 交通車排不到…我自己載婆婆上下車很吃力 | <span style="background:#E8E9D6;color:#5C6B45;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">成功</span> |
| Qwen3.8 | 如果有一個人<strong>知道我們家的狀況</strong>，我有問題就問他，那會省很多力氣。 | 如果有一個人<strong>的狀態</strong>、我有問題就問他，那會省很多力氣 | <span style="background:#F3DBD2;color:#B23A28;padding:2px 10px;border-radius:4px;font-weight:600;white-space:nowrap">失敗</span> |

前三句有的多了字，有的少了字，意思都還在。

</details>

Qwen3.6 第一次交出來的編碼檔夾了簡體字，芷晴請它改，最後一版改掉了。

**③ 排今天**：Claude、Qwen3.8、Gemma 都把今天的筆記建好了。Qwen3.6 判失敗，它編出一個不存在的檔，還把這個檔列成今天的任務。

**④ 每週回顧**：Claude 和 Qwen3.8 做完的回顧都能直接用。Gemma 判失敗，它後來每次改檔都重寫整份檔，前一週的歷史紀錄也被改壞。這週計畫做完的比例也算錯，照檔案上打勾的項目該是 40%，它算成 33%。Qwen3.6 判失敗，它一題一題問芷晴，來回次數用完時，還沒把結果寫進檔。

## 地端 AI 比雲端慢多少？

上一節看的是做得對不對，這一節看要等多久。一般文章測模型的速度，多半看每秒產生幾個 token，寫成 token/s。token 是模型計算文字的單位，中文字跟 token 怎麼換算，看模型而定。看 token/s 的好處是不同模型放在一起比，標準一致，缺點是跟日常的工作有距離。所以我用實際的工作來量，就是這次的四件事，看每件從開始到做完要等多久。像 ① 開新專案要建資料夾、寫 README.md，④ 每週回顧是跟芷晴用對話來做的工作。

這次三個地端模型，都是裝好就直接跑，沒有為了讓它們變快去調設定。這種跑法，我後面都叫它「照預設」。有動到的設定，主要是讓模型放得進記憶體，也讀得下這次工作的內容，細節寫在前面「這次測試的條件和限制」的折疊裡。

四件事加起來，Claude 不到 3 分鐘就做完，三個地端模型要等約 45 到 88 分鐘。最快的 Gemma 也要 Claude 的 16 倍時間，最慢的是 Qwen3.8。

<div role="img" aria-label="同一件工作的等待時間，每件事四條橫條，都從 0 起算。Claude 每件 22 到 72 秒，三個地端模型每件都要 2 分鐘以上。差最多的是每週回顧。Claude 72 秒，Gemma 約 19 分鐘，Qwen3.6 約 31 分鐘，Qwen3.8 約 49 分鐘。" style="margin:2rem 0 1rem"><div style="display:grid;grid-template-columns:120px 1fr;font-family:'Noto Sans TC',-apple-system,'PingFang TC',sans-serif;font-size:12.5px;color:#241B18;line-height:1.35"><div style="font-size:11px;color:#A99A8D;padding:0 12px 8px 0">單位：分鐘</div><div style="position:relative;height:22px"><span style="position:absolute;top:0;left:0%;transform:translateX(0);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">0</span><span style="position:absolute;top:0;left:20%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">10</span><span style="position:absolute;top:0;left:40%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">20</span><span style="position:absolute;top:0;left:60%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">30</span><span style="position:absolute;top:0;left:80%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">40</span><span style="position:absolute;top:0;left:100%;transform:translateX(-100%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">50</span></div><div style="font-weight:500;padding:10px 12px 10px 0;border-top:1px solid #E2D8C9">① 開新專案</div><div style="position:relative;padding:8px 0;border-top:1px solid #E2D8C9"><span style="position:absolute;top:0;bottom:0;left:0%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:20%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:40%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:60%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:80%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:100%;border-left:1px solid #E2D8C9"></span><div style="position:relative"><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(0.73%,3px);background:#C25B3F"></span><span style="position:absolute;top:0;left:calc(0.73% + 8px);font-size:11.5px;line-height:22px;color:#A3492B;white-space:nowrap">Claude 22 秒</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(20.93%,3px);background:#D4A27F"></span><span style="position:absolute;top:0;left:calc(20.93% + 8px);font-size:11.5px;line-height:22px;color:#241B18;white-space:nowrap">Qwen3.8 10.5 分</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(4.33%,3px);background:#D4A27F"></span><span style="position:absolute;top:0;left:calc(4.33% + 8px);font-size:11.5px;line-height:22px;color:#241B18;white-space:nowrap">Gemma 2 分</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(18.20%,3px);background:#D4A27F"></span><span style="position:absolute;top:0;left:calc(18.20% + 8px);font-size:11.5px;line-height:22px;color:#241B18;white-space:nowrap">Qwen3.6 9 分</span></div></div></div><div style="font-weight:500;padding:10px 12px 10px 0;border-top:1px solid #E2D8C9">② 整理訪談逐字稿</div><div style="position:relative;padding:8px 0;border-top:1px solid #E2D8C9"><span style="position:absolute;top:0;bottom:0;left:0%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:20%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:40%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:60%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:80%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:100%;border-left:1px solid #E2D8C9"></span><div style="position:relative"><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(1.57%,3px);background:#C25B3F"></span><span style="position:absolute;top:0;left:calc(1.57% + 8px);font-size:11.5px;line-height:22px;color:#A3492B;white-space:nowrap">Claude 47 秒</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(22.33%,3px);background:#D4A27F"></span><span style="position:absolute;top:0;left:calc(22.33% + 8px);font-size:11.5px;line-height:22px;color:#241B18;white-space:nowrap">Qwen3.8 11 分</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(39.77%,3px);background:#D4A27F"></span><span style="position:absolute;top:0;left:calc(39.77% + 8px);font-size:11.5px;line-height:22px;color:#241B18;white-space:nowrap">Gemma 20 分</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(54.40%,3px);background:#D4A27F"></span><span style="position:absolute;top:0;left:calc(54.40% + 8px);font-size:11.5px;line-height:22px;color:#241B18;white-space:nowrap">Qwen3.6 27 分</span></div></div></div><div style="font-weight:500;padding:10px 12px 10px 0;border-top:1px solid #E2D8C9">③ 排今天</div><div style="position:relative;padding:8px 0;border-top:1px solid #E2D8C9"><span style="position:absolute;top:0;bottom:0;left:0%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:20%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:40%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:60%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:80%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:100%;border-left:1px solid #E2D8C9"></span><div style="position:relative"><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(1.00%,3px);background:#C25B3F"></span><span style="position:absolute;top:0;left:calc(1.00% + 8px);font-size:11.5px;line-height:22px;color:#A3492B;white-space:nowrap">Claude 30 秒</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(34.57%,3px);background:#D4A27F"></span><span style="position:absolute;top:0;left:calc(34.57% + 8px);font-size:11.5px;line-height:22px;color:#241B18;white-space:nowrap">Qwen3.8 17 分</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(6.43%,3px);background:#D4A27F"></span><span style="position:absolute;top:0;left:calc(6.43% + 8px);font-size:11.5px;line-height:22px;color:#241B18;white-space:nowrap">Gemma 3 分</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(13.43%,3px);background:#D4A27F"></span><span style="position:absolute;top:0;left:calc(13.43% + 8px);font-size:11.5px;line-height:22px;color:#241B18;white-space:nowrap">Qwen3.6 7 分</span></div></div></div><div style="font-weight:500;padding:10px 12px 10px 0;border-top:1px solid #E2D8C9">④ 每週回顧</div><div style="position:relative;padding:8px 0;border-top:1px solid #E2D8C9"><span style="position:absolute;top:0;bottom:0;left:0%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:20%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:40%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:60%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:80%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:100%;border-left:1px solid #E2D8C9"></span><div style="position:relative"><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(2.40%,3px);background:#C25B3F"></span><span style="position:absolute;top:0;left:calc(2.40% + 8px);font-size:11.5px;line-height:22px;color:#A3492B;white-space:nowrap">Claude 72 秒</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:97.47%;background:#D4A27F;color:#241B18;font-size:11.5px;line-height:14px;text-align:right;padding-right:6px;box-sizing:border-box;white-space:nowrap">Qwen3.8 49 分</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:max(38.83%,3px);background:#D4A27F"></span><span style="position:absolute;top:0;left:calc(38.83% + 8px);font-size:11.5px;line-height:22px;color:#241B18;white-space:nowrap">Gemma 19 分</span></div><div style="position:relative;height:22px"><span style="position:absolute;top:4px;height:14px;border-radius:2px;left:0;width:61.57%;background:#D4A27F;color:#241B18;font-size:11.5px;line-height:14px;text-align:right;padding-right:6px;box-sizing:border-box;white-space:nowrap">Qwen3.6 31 分</span></div></div></div><div style="border-top:1px solid #E2D8C9"></div><div style="border-top:1px solid #E2D8C9"></div></div><div style="display:flex;flex-wrap:wrap;gap:6px 20px;margin-top:10px;font-family:'Noto Sans TC',-apple-system,'PingFang TC',sans-serif;font-size:12px;color:#71655C"><span><span style="display:inline-block;width:12px;height:12px;background:#C25B3F;border-radius:2px;vertical-align:-1px;margin-right:6px"></span>Claude（雲端）</span><span><span style="display:inline-block;width:12px;height:12px;background:#D4A27F;border-radius:2px;vertical-align:-1px;margin-right:6px"></span>三個地端模型</span></div></div>

<p style="font-size:.85em;color:#71655C;margin-top:-.5rem">圖 3　同一件工作要等多久，每一列是一件事，四條都從 0 起算，磚紅色是 Claude，牛皮紙色是三個地端模型</p>


差最多的是每週回顧。每週回顧是一來一回談的事，Qwen3.8 跟芷晴來回了 6 次，花了 49 分鐘。這是 Qwen3.8 每次回話的時間加起來，不含芷晴打字的時間。

地端模型慢，慢在寫。模型做事分兩段，先把給它的內容讀進去，再一個字一個字寫出回答。三個地端模型的等待時間，有八到九成花在寫。

時間既然多半花在寫，能不能靠調設定把這段縮短？後來我把最慢的 Qwen3.8 設定調過，四件重跑一次。等待時間加起來從約 88 分鐘降到約 34 分鐘，還是 Claude 的 12 倍左右。調過之後，四件工作也都正確完成。

<div role="img" aria-label="Qwen3.8 調過設定前後，四件事加起來的等待時間，三條橫條都從 0 起算，單位是分鐘。Qwen3.8 照預設約 88 分鐘，調過設定後約 34 分鐘，Claude 是 171 秒，不到 3 分鐘。" style="margin:2rem 0 1rem"><div style="display:grid;grid-template-columns:120px 1fr;font-family:'Noto Sans TC',-apple-system,'PingFang TC',sans-serif;font-size:12.5px;color:#241B18;line-height:1.35"><div style="font-size:11px;color:#A99A8D;padding:0 12px 8px 0">四件加起來（分鐘）</div><div style="position:relative;height:22px"><span style="position:absolute;top:0;left:0%;transform:translateX(0);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">0</span><span style="position:absolute;top:0;left:33.33%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">30</span><span style="position:absolute;top:0;left:66.67%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">60</span><span style="position:absolute;top:0;left:100%;transform:translateX(-100%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">90</span></div><div style="font-weight:500;padding:12px 12px 12px 0;border-top:1px solid #E2D8C9">Qwen3.8 照預設</div><div style="position:relative;padding:12px 0;border-top:1px solid #E2D8C9"><span style="position:absolute;top:0;bottom:0;left:0%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:33.33%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:66.67%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:100%;border-left:1px solid #E2D8C9"></span><div style="position:relative;height:22px"><span style="position:absolute;top:0;height:22px;border-radius:2px;left:0;width:97.39%;background:#D4A27F;color:#241B18;font-size:11.5px;font-weight:500;line-height:22px;text-align:right;padding-right:6px;box-sizing:border-box;white-space:nowrap">約 88 分</span></div></div><div style="font-weight:500;padding:12px 12px 12px 0;border-top:1px solid #E2D8C9">Qwen3.8 調過</div><div style="position:relative;padding:12px 0;border-top:1px solid #E2D8C9"><span style="position:absolute;top:0;bottom:0;left:0%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:33.33%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:66.67%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:100%;border-left:1px solid #E2D8C9"></span><div style="position:relative;height:22px"><span style="position:absolute;top:0;height:22px;border-radius:2px;left:0;width:max(37.28%,3px);background:#A47551"></span><span style="position:absolute;top:0;left:calc(37.28% + 8px);font-size:11.5px;font-weight:500;line-height:22px;color:#241B18;white-space:nowrap">約 34 分</span></div></div><div style="font-weight:500;padding:12px 12px 12px 0;border-top:1px solid #E2D8C9">Claude</div><div style="position:relative;padding:12px 0;border-top:1px solid #E2D8C9"><span style="position:absolute;top:0;bottom:0;left:0%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:33.33%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:66.67%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:100%;border-left:1px solid #E2D8C9"></span><div style="position:relative;height:22px"><span style="position:absolute;top:0;height:22px;border-radius:2px;left:0;width:max(3.17%,3px);background:#C25B3F"></span><span style="position:absolute;top:0;left:calc(3.17% + 8px);font-size:11.5px;font-weight:500;line-height:22px;color:#A3492B;white-space:nowrap">171 秒</span></div></div><div style="border-top:1px solid #E2D8C9"></div><div style="border-top:1px solid #E2D8C9"></div></div></div>

<p style="font-size:.85em;color:#71655C;margin-top:-.5rem">圖 4　Qwen3.8 調過設定前後，四件事加起來要等多久，三條都從 0 起算。牛皮紙色是 Qwen3.8 照預設跑，深一點的牛皮紙色是調過設定的 Qwen3.8，磚紅色是 Claude</p>


<details>
<summary>Qwen3.8 調了哪些設定、各快多少</summary>

Qwen3.8 調了四項設定。我試了三種組合，再跟照預設跑的結果比。下面的數字，除了講每週回顧的那一段，都只算前三件：開新專案、整理訪談逐字稿、排今天。

**關掉思考模式**：思考模式是模型回答前先想一輪，想的內容也要一個字一個字寫出來，只是畫面上看不到。關掉之後，前三件寫的 token 少了很多。每秒寫的量差不多，約 7 個 token。省下的時間來自少寫，不是寫得快。

**MTP**：MTP 讓模型一次先猜好幾個字，再檢查猜得對不對，猜對的就不用一個一個寫。我在關思考那組上再開 MTP，設成一次猜 4 個。它猜中約六成（61%），每秒從 7.0 個 token 變成 11.8 個。

**換成 MLX**：照預設跑的 Qwen3.8，用的是 GGUF 格式的模型檔（q4_K_M），由 llama.cpp 這個引擎來跑。引擎是實際把模型跑起來的程式。MLX 那組改用 MLX 格式的模型檔（nvfp4），配 Ollama 用 MLX 做的引擎。MLX 是 Apple 為自家晶片做的機器學習框架。q4_K_M 和 nvfp4 是兩種把模型檔壓小的方式。

MLX 那組也開了 MTP，這是引擎預設就開的。它猜中約八成（81%），每秒寫 16.2 個 token，是四組裡最快的。不過這組寫的 token 也比較多，約 1.16 萬。前三件的總時間，跟關思考＋MTP 那組差不多（21.3 對 20.9 分鐘）。

**一次能讀的長度**：調過的三組，一次能讀的長度都從 10 萬 token 縮到 4.8 萬。

| 組 | 思考模式 | MTP | 模型檔和引擎 | 一次能讀多長 | 前三件加起來 |
|---|---|---|---|---|---|
| 照預設 | 開 | 沒開 | GGUF 格式、llama.cpp 引擎 | 10 萬 token | 38.9 分鐘 |
| 關思考 | 關 | 沒開 | GGUF 格式、llama.cpp 引擎 | 4.8 萬 token | 27.8 分鐘 |
| 關思考＋MTP | 關 | 開，一次猜 4 個 | GGUF 格式、llama.cpp 引擎 | 4.8 萬 token | 20.9 分鐘 |
| MLX | 關 | 開（引擎預設） | MLX 格式、MLX 引擎 | 4.8 萬 token | 21.3 分鐘 |

10/21 那晚，每週回顧只跑了 MLX 那組，花了 12 分鐘，四件都判成功。正文說的「調過」，就是這組。

四組都在同一台 32GB 筆電上跑，全程插電，跑之前關掉其他程式。

</details>

只有 Qwen3.8 調過，Gemma 和 Qwen3.6 都沒調。這些數字都是某一次跑出來的結果，不是平均值，只能當參考。

這一節開頭說過，一般文章測速度多半看 token/s，也就是每秒產生幾個 token。習慣看這個數字的人，可以用下面這張表對照。表上的數字，跟前面的等待時間出自同樣那幾次實驗，每個數字都是四件事加起來算的。

| | 讀（每秒幾個 token） | 寫（每秒幾個 token） | 四件寫了多少 token | 四件要等多久 |
|---|---|---|---|---|
| Qwen3.8 照預設 | 約 90 | 約 6.5 | 約 3.0 萬 | 約 88 分鐘 |
| Qwen3.8 調過 | 約 88 | 約 16.4 | 約 1.9 萬 | 約 34 分鐘 |
| Claude | 至少約 800 | 至少約 120 | 約 2.0 萬 | 171 秒 |

調過設定之後，Qwen3.8 寫得比較快，讀的速度幾乎沒變。Claude 讀和寫都快很多，寫至少是調過的 Qwen3.8 的 7 倍，讀至少 9 倍。

<details>
<summary>這張表怎麼算的，Claude 為什麼寫「至少」</summary>

每秒幾個 token，就是做了多少個 token，再除以花了幾秒。表上的數字都是四件事加起來算的。

讀，只算模型真的重新讀進去的新內容。前面讀過、模型還記得的舊內容不算。Claude 另外從快取讀了約 125 萬個 token。快取是雲端替 Claude 存起來的舊內容，這部分也沒算進去。

讀花了幾秒、寫花了幾秒，都能從跑模型的程式留下的紀錄算出來。所以地端兩列直接相除就好，是實際量到的速度。拿 Qwen3.8 照預設那次來算：

- 讀：55,864 個 ÷ 620 秒 ≈ 90 個
- 寫：29,748 個 ÷ 4,590 秒 ≈ 6.5 個

雲端不會告訴我讀和寫各花幾秒，只給每次呼叫的總時間。四件事呼叫雲端的時間，加起來約 164 秒。這 164 秒裡，Claude 讀了 130,880 個新內容，寫了 20,109 個。

先算寫。就算 164 秒全部花在寫，每秒也寫了：

- 20,109 個 ÷ 164 秒 ≈ 123 個

可是這 164 秒裡，有一部分時間在讀，真正花在寫的時間比 164 秒短。寫的量一樣是 20,109 個，花的時間更短，每秒寫的就比 123 個多。所以表上寫「至少約 120」。

讀也是一樣的算法。就算 164 秒全部花在讀，每秒也讀了：

- 130,880 個 ÷ 164 秒 ≈ 798 個

真正花在讀的時間也比 164 秒短，所以每秒讀的會比這個更多。表上寫「至少約 800」。

Qwen3.8 調過之後，四件寫的 token 從約 3.0 萬少到約 1.9 萬。原因之一是關掉了思考模式。開著思考模式時，模型回答前會先寫一段畫面上看不到的思考內容。關掉之後，這一段就不用寫了。不過每次跑，模型來回的次數也不一樣。

</details>

## 跑地端 AI 要什麼樣的 Mac？

挑 Mac 跑地端 AI，要看記憶體的兩個數字，就像自己買車要看載重和馬力。一個是容量，像載重，決定放得下多大的模型，還有模型一次能讀多長。另一個是頻寬，像馬力，決定模型寫得多快。

### 容量要多大？

Mac 的記憶體是一整塊，CPU 和 GPU 一起用。跑模型主要靠 GPU，但 GPU 不能把整塊用完，要留一部分給系統。32GB 的 Mac，GPU 能用的部分預設約 25GB。128GB 的 Mac 約 107GB，系統留約 20GB。

跑模型時，記憶體要放三樣東西。

<figure class="fg fg-cols">
<div class="c"><b>01</b><strong>模型本身</strong><span>大小看模型，小的幾 GB，大的八十幾 GB。</span><em>放在 GPU 能用的部分</em></div>
<div class="c"><b>02</b><strong>模型正在讀的內容</strong><span>像規則、工具說明、對話和檔案，越長越佔空間。</span><em>放在 GPU 能用的部分</em></div>
<div class="c"><b>03</b><strong>macOS 和其他程式</strong><span>例如瀏覽器、OneDrive 這類雲端硬碟，還有平常在背景跑的小工具。</span><em>放在留給系統的部分</em></div>
</figure>

#### 模型本身

第一樣是模型本身，佔多少看模型多大。現在常見、能在地端跑的模型，大致分成大中小三級。名字裡的 120B、27B、4B 代表模型的大小，數字越大，模型越大。

| 級別 | 例子 | 模型檔大小 |
|---|---|---|
| 大（約 120B） | gpt-oss-120b、Qwen3.5 122B、Nemotron 3 Super 120B | 65 到 87GB |
| 中（20B 到 35B） | gpt-oss-20b、Gemma 4 26B、Qwen3.8 27B、Qwen3.6 35B | 14 到 23GB |
| 小（4B 到 9B） | Qwen3.5 4B、Qwen3.5 9B | 3.3 到 6.6GB |

表裡的大小，是 Ollama 上壓小過的版本。Ollama 是跑地端模型的免費程式，這次的地端模型也是用它跑的。這次測的三個模型都在中級，Qwen3.8 27B 的模型檔約 18GB。大級的模型檔，每一個都比 32GB 的 Mac 上 GPU 能用的約 25GB 還大。

#### 模型正在讀的內容

第二樣是模型正在讀的內容，包括規則、工具說明和對話。規則是模型先要知道的事，像前面提過的規則說明書 CLAUDE.md，還有 harness 本身帶的規則。工具說明寫的是模型能用哪些工具、每樣怎麼用，像讀檔、改檔。對話是到目前為止的來回，包括使用者說的話、模型的回覆、讀進來的檔案、工具跑出來的結果。模型這次正在寫的回覆，也算在裡面。

留給這一塊的空間，決定模型一次能讀多長。模型一次能讀進去的內容長度上限，叫 context window。要讀的內容越長，這一塊佔的空間越大。內容越長，模型第一次讀進去也要等越久。這次實驗做 ① 開新專案時，交代的工作只有短短兩句，Qwen3.8 第一次讀進去的內容卻有約 1.8 萬 token。多出來的幾乎都是規則和工具說明。Qwen3.8 照預設跑，光讀這一段就花了約 3 分鐘。現在的 Claude 模型，例如 claude-sonnet-5-5，預設就是 100 萬 token（1M），不用另外設定。

照 Claude 的 1M 來配，Qwen3.8 27B 光讀內容這一塊，用這次開的省記憶體設定推算，就要約 35GB，是模型本身的兩倍。加上模型本身約 18GB，合計 50GB 出頭。

#### macOS 和其他程式

第三樣是 macOS 和其他程式，用的是留給系統的那一部分。32GB 的 Mac 約留 7GB，128GB 的 Mac 約留 20GB。上面卡片裡那些程式，都在這約 7GB 或 20GB 裡搶空間。

#### 手上的 Mac 夠嗎？

16GB 跑不動這次測的模型。Apple 現在賣的 Mac，多數基本款是 16GB。照 Apple 台灣官網的規格頁（2026-10-20 讀取），[MacBook Air](https://www.apple.com/tw/macbook-air/specs/) 是 16GB 起。這次測的三個模型，Qwen3.8 27B 和 Gemma 4 26B 的模型檔約 18GB，Qwen3.6 35B 約 23GB。光模型檔就比整台記憶體大，放不下。

32GB 跑得起來，但記憶體很吃緊。我這台就是 32GB，GPU 能用約 25GB。Qwen3.8 和 Gemma 一次讀 10 萬 token，放得下。Qwen3.6 只讀 4 萬 token，佔用的記憶體就超過 GPU 能用的上限，還要借用硬碟空間。照上面的推算，Qwen3.8 27B 加上 1M 的內容，合計要 50GB 出頭，32GB 的 Mac 放不下。

128GB 放得下。128GB 的 Mac，GPU 能用約 107GB。Qwen3.8 加上 1M 的內容放得下，模型檔 65 到 87GB 的大級模型也放得進。

真的要把地端 AI 當成主要工具，我目前的想法是，記憶體要往 128GB 看。

### 頻寬要多快？

換成 M5 Max，寫的速度大約是原本的 1.5 倍。

寫的速度主要卡在記憶體頻寬。M5 Max（40 核心 GPU）的頻寬是 614GB/s，是 M1 Max 400GB/s 的約 1.5 倍。同一代的 M5 Pro 是 307GB/s，比 2021 年的 M1 Max 還低。挑 Mac 要看頻寬，不是看哪一年出的。買車也是這樣，新出廠的車，馬力不一定比老車大。

同一台 M1 Max 筆電，Qwen3.8 做每週回顧，照預設要等 49 分鐘，調過設定約 12 分鐘。這段等待裡，讀約 5 分鐘，寫約 7 分鐘。讀的部分，光第一次讀規則和工具說明就花了約 3 分鐘。換成 M5 Max，我粗算時只讓寫的部分變快，讀的部分當作不變，算出來約 10 分鐘。同一件事，Claude 是 72 秒。

<style>.m5b .s{display:block;height:100%;transform:scaleX(0);transform-origin:left center;transition:transform .6s cubic-bezier(.4,.1,.2,1) var(--d,0s)}.m5b .t{opacity:0;transition:opacity .5s ease var(--d,0s)}.m5b.visible .s{transform:scaleX(1)}.m5b.visible .t{opacity:1}.m5b .w2{width:53.077%}.m5b.visible .w2{animation:m5b-shrink .9s cubic-bezier(.4,.1,.2,1) 3.3s forwards}@keyframes m5b-shrink{from{width:53.077%}to{width:35.385%}}@media (prefers-reduced-motion:reduce){.m5b .s{transform:none!important;transition:none!important}.m5b .t{opacity:1!important;transition:none!important}.m5b .w2{width:35.385%!important;animation:none!important}}</style><div class="m5b fade-in-section" role="img" aria-label="Qwen3.8 調過設定後，每週回顧的等待時間，兩條橫條都從 0 起算，單位是分鐘。M1 Max 實測 12.2 分鐘，讀 4.9、寫 6.9、其他 0.4，其他是跑工具和空檔。M5 Max 是粗算，沒有實測，讀一樣是 4.9，寫縮成 4.6，其他 0.4，加起來約 10 分鐘。讀沒變，只有寫變快，少等 2.3 分鐘。" style="margin:2rem 0 1rem"><div style="display:grid;grid-template-columns:112px minmax(0,1fr);font-family:'Noto Sans TC',-apple-system,'PingFang TC',sans-serif;font-size:12.5px;color:#241B18;line-height:1.35"><div style="font-size:11px;color:#A99A8D;padding:0 10px 8px 0">每週回顧（分鐘）</div><div style="position:relative;height:22px"><span style="position:absolute;top:0;left:0%;transform:translateX(0);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">0</span><span style="position:absolute;top:0;left:23.08%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">3</span><span style="position:absolute;top:0;left:46.15%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">6</span><span style="position:absolute;top:0;left:69.23%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">9</span><span style="position:absolute;top:0;left:92.31%;transform:translateX(-50%);font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:11px;color:#A99A8D">12</span></div><div style="padding:14px 10px 14px 0;border-top:1px solid #E2D8C9"><div style="font-weight:500">M1 Max</div><div style="font-size:11px;color:#71655C">調過設定，實測</div><div class="t" style="--d:1.4s;font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:13px;color:#241B18;margin-top:2px">12.2 分</div></div><div style="position:relative;padding:14px 0;border-top:1px solid #E2D8C9"><span style="position:absolute;top:0;bottom:0;left:0%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:23.08%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:46.15%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:69.23%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:92.31%;border-left:1px solid #E2D8C9"></span><div style="display:flex;position:relative;height:24px"><span class="" style="position:relative;flex:none;width:37.692%;height:24px"><span class="s" style="--d:0s;background:#CDBFB1"></span><span class="t" style="--d:0.4s;position:absolute;left:6px;top:0;line-height:24px;font-size:11.5px;font-weight:500;color:#241B18;white-space:nowrap">讀 4.9</span></span><span class="" style="position:relative;flex:none;width:53.077%;height:24px"><span class="s" style="--d:0.6s;background:#A47551"></span><span class="t" style="--d:1.0s;position:absolute;left:6px;top:0;line-height:24px;font-size:11.5px;font-weight:500;color:#241B18;white-space:nowrap">寫 6.9</span></span><span class="" style="position:relative;flex:none;width:3.077%;height:24px"><span class="s" style="--d:1.2s;background:#E6DED4"></span></span></div></div><div style="padding:14px 10px 14px 0;border-top:1px solid #E2D8C9"><div style="font-weight:500">M5 Max</div><div style="font-size:11px;color:#71655C">粗算，沒實測</div><div class="t" style="--d:4.6s;font-family:'JetBrains Mono','SF Mono',Menlo,monospace;font-size:13px;color:#241B18;margin-top:2px">約 10 分</div></div><div style="position:relative;padding:14px 0 6px;border-top:1px solid #E2D8C9"><span style="position:absolute;top:0;bottom:0;left:0%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:23.08%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:46.15%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:69.23%;border-left:1px solid #E2D8C9"></span><span style="position:absolute;top:0;bottom:0;left:92.31%;border-left:1px solid #E2D8C9"></span><div style="position:relative;height:46px"><div style="display:flex;position:relative;height:24px"><span class="" style="position:relative;flex:none;width:37.692%;height:24px"><span class="s" style="--d:1.6s;background:#CDBFB1"></span><span class="t" style="--d:2.0s;position:absolute;left:6px;top:0;line-height:24px;font-size:11.5px;font-weight:500;color:#241B18;white-space:nowrap">讀 4.9</span></span><span class="w2" style="position:relative;flex:none;height:24px"><span class="s" style="--d:2.2s;background:#A47551"></span><span class="t" style="--d:4.2s;position:absolute;left:6px;top:0;line-height:24px;font-size:11.5px;font-weight:500;color:#241B18;white-space:nowrap">寫 4.6</span></span><span class="" style="position:relative;flex:none;width:3.077%;height:24px"><span class="s" style="--d:2.8s;background:#E6DED4"></span></span></div><span class="t" style="--d:4.2s;position:absolute;top:0;left:76.154%;width:17.692%;height:24px;box-sizing:border-box;border:1.5px dashed #A47551;border-radius:2px;background:rgba(164,117,81,.08)"></span><span class="t" style="--d:4.4s;position:absolute;top:28px;right:6.154%;font-size:11.5px;color:#6E4B31;white-space:nowrap">寫變快，少等 2.3 分</span></div></div><div style="border-top:1px solid #E2D8C9"></div><div style="border-top:1px solid #E2D8C9"></div></div><div style="display:flex;flex-wrap:wrap;gap:6px 20px;margin-top:10px;font-family:'Noto Sans TC',-apple-system,'PingFang TC',sans-serif;font-size:12px;color:#71655C"><span><span style="display:inline-block;width:12px;height:12px;background:#CDBFB1;border-radius:2px;vertical-align:-1px;margin-right:6px"></span>讀</span><span><span style="display:inline-block;width:12px;height:12px;background:#A47551;border-radius:2px;vertical-align:-1px;margin-right:6px"></span>寫</span><span><span style="display:inline-block;width:12px;height:12px;background:#E6DED4;border-radius:2px;vertical-align:-1px;margin-right:6px"></span>其他（跑工具、空檔）</span></div></div>

<p style="font-size:.85em;color:#71655C;margin-top:-.5rem">圖 5　Qwen3.8 調過設定後，每週回顧要等多久，上列是 M1 Max 實測，下列是 M5 Max 粗算，兩條都從 0 起算。淺灰褐色是讀，深一點的牛皮紙色是寫，更淺的灰褐色是跑工具和空檔</p>


<details>
<summary>速度數字怎麼來的</summary>

記憶體頻寬：M1 Max 的 400GB/s 出自 [Apple 2021 年發表 M1 Max 的新聞稿](https://www.apple.com/newsroom/2021/10/introducing-m1-pro-and-m1-max-the-most-powerful-chips-apple-has-ever-built/)，M5 Max 40 核心 GPU 的 614GB/s 和 M5 Pro 的 307GB/s，都出自 [Apple 的 MacBook Pro 規格頁](https://www.apple.com/macbook-pro/specs/)（2026-10-20 讀取）。

</details>

筆電要容量和頻寬都顧到，就是 128GB 的 M5 Max。14 吋、M5 Max、128GB 記憶體、2TB 的 MacBook Pro，[Apple 台灣官網](https://www.apple.com/tw/shop/buy-mac/macbook-pro/14-吋-space-black-標準顯示器-apple-m5-max-晶片-18-核心-cpu-40-核心-gpu-128gb-記憶體-2tb-儲存裝置)的售價是 NT$230,900（2026-10-20 讀取）。

## 地端 AI 還有哪些門檻？

地端 AI 不是買好電腦就能用。我這次在手上這台 Mac 走過一遍，每一步都要自己決定、自己調。自由度很高，但很花時間，對沒有技術背景的人是一道門檻。

裝好之後，還有一串設定得自己來，要讓 harness 看得到地端模型，要決定一次能讀多長，也要試怎麼讓它變快。以一次能讀多長為例，這台筆電的預設只有約 3.2 萬 token，還沒開始做事，光是規則和工具說明就用掉一半以上。這次三個模型能讀的長度，都是我自己調大的。每一項都要先知道有這回事才會去調，調了也不一定有效。

這些門檻讓我想到 Claude Code，它一開始的門檻也不低。當時只有終端機版，要自己裝好 Node.js、設定好路徑，還要會在終端機裡打指令。裝完一打指令，畫面可能只跳出一行英文 `command not found`，意思是找不到這個指令。官方的[疑難排解頁面](https://code.claude.com/docs/en/troubleshoot-install)，光是安裝和登入會遇到的錯誤，現在就列了 48 種。後來 VS Code 這類編輯器裡有了圖形介面，再來是下載就能用的桌面版，Claude Code 才比較走進一般人的生活。它門檻最高的時候，也比地端 AI 這一串設定簡單。雲端工具的門檻一直在降，地端這些設定，目前還是得自己來。

## 地端 AI 划算嗎？

我就是無法抗拒生產力工具的人，最怕研究了一堆工具，回報很久才來，或是根本沒有。所以我用 CP 值算一次帳：買新 Mac 跑地端 AI，投入的錢和時間，換到什麼。

投入的錢，是約 23 萬買一台 128GB 的 M5 Max，已經超出我的新機預算。投入的時間，是上一節那一串設定：裝好環境、調一次能讀的長度、一項一項試怎麼變快。花了這些時間，Qwen3.8 四件事加起來，從約 88 分鐘縮到約 34 分鐘。花錢買新機，還能再快一點。同樣四件事，Claude 不到 3 分鐘。

所以花錢換不到生產力的提升。換到的，是地端本來就有的好處：不用靠雲端的自由，還有資料不出電腦。

買新 Mac 跑地端 AI，像自己買車。自己的車想去哪就去哪，行程也不用給別人知道，只是得自己開、自己保養。用雲端的 Claude，像搭高鐵，速度快，也有人保養。要生產力，這筆投入不划算。資料不能離開電腦的人，或不想靠雲端的人，才值得考慮。

對我來說，地端還沒到甜蜜點，帳算不過來，還不到換的時候。手上的 M1 Max 32GB 跑雲端的 Claude 就夠了。原本要花在調地端設定的時間，我拿去優化[讓 Claude 自己做下去的流程](/zh-TW/blog/loop-engineering/)，回報是注意力和品質。我希望這套流程再自動一點，讓我能接更多案子，或少花一點工時。

或許明年、後年，等機器沒那麼貴、設定也沒那麼麻煩，我再來算一次地端這筆帳。在那之前，就拜託我這台 2021 年的 MacBook Pro 再多撐一陣子了。

---

*雲端 Claude 要用到位，自己摸索也做得到，想少繞一點路，<span data-workshop-cta><span data-ws-pre>可以參考我的</span>[實體工作坊](/zh-TW/workshop/)<span data-ws-post>。</span></span>*

*要帶整個團隊導入 Claude 的話，可以找[匯流顧問](https://confluence-partners.ai/)。*
