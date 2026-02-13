---
title: "Agentic Coding：從 Vibe Coding 到 AI 自主寫程式的進化"
description: "Agentic Coding 是什麼？和 Vibe Coding 差在哪？從 Karpathy 一則推文開始，AI 寫程式一年內從「憑感覺」進化到「指揮 AI 團隊交付產品」。一個 PM 的實戰觀點。"
pubDate: 2026-02-13
category: building-products
tags: ["AI", "一人公司", "Claude Code", "agentic coding", "agentic engineering", "vibe coding", "developer-tools"]
lang: zh-TW
translationKey: agentic-coding
draft: false
featured: true
heroImage: /images/blog/agentic-coding.webp
focus_keyphrase: "agentic coding"
relatedPosts: ["claude-code-tutorial.md", "nocode-to-ai-coding.md"]
faq:
  - question: "Agentic Coding 是什麼？"
    answer: "人定方向，AI 團隊執行。你設定目標，多個 AI Agent 自主分工——一個寫前端、一個寫後端、一個跑測試，像帶一個工程團隊。但能力愈大，方向錯了代價也愈高，所以重點不是讓 AI 跑得快，而是確保它們跑對方向。Karpathy 稱之為 Agentic Engineering——engineering 這個字就是重點：用工程思維建立人機協作的工作流，讓一個人指揮一整個 AI 團隊交付產品。"
  - question: "Vibe Coding 和 Agentic Coding 有什麼差別？"
    answer: "一個字：品質。Vibe Coding 憑感覺讓 AI 寫，Accept All，能動就好——你不在乎程式碼長什麼樣，因為這是 demo，不是產品。Agentic Coding 是你定方向、AI 團隊執行，但你要持續確認方向對不對、架構撐不撐得住。差別不在用了什麼工具，而在你有沒有把「能動」的標準提升到「能維護、能上線、能收費」。"
  - question: "Agentic Coding 會取代工程師嗎？"
    answer: "不會取代，但角色會根本改變。工程師從自己寫程式碼，變成指揮 AI 團隊寫——從 IC 變成 manager，管的不是人，是 AI。關鍵能力從「寫得出來」轉為「定義需求、判斷架構、問對問題」。這恰好是產品經理的核心能力——定義目標、拆解任務、審查產出、把關品質。在 Agentic Coding 的時代，懂得管理的人比懂得寫程式的人更有優勢。"
  - question: "非工程師可以用 Agentic Coding 嗎？"
    answer: "可以，而且可能比你想的更適合。Agentic Coding 的核心能力是定義清楚的目標、審查 AI 的產出方向、建立品質把關機制——這些是管理能力，不是寫程式的能力。真正的門檻不是「會不會寫 code」，而是「能不能判斷 AI 做的東西是好是壞、方向對不對」。"
---

2025 年 2 月 3 日，Andrej Karpathy 在 X 上發了一則推文。

他是前 Tesla AI 負責人、OpenAI 創始成員。在 AI 圈，他說的話會被認真對待。

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."

[這則推文](https://x.com/karpathy/status/1886192184808149383)被看了 670 萬次。

「Vibe Coding」——憑感覺寫程式——成為 2025 年科技圈最紅的詞。[Collins Dictionary 選它為年度詞彙](https://www.cnn.com/2025/11/06/tech/vibe-coding-collins-word-year-scli-intl)。[Y Combinator 冬季班有 25% 的新創公司用 AI 生成了 95% 的程式碼](https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/)。[Lovable 在 8 個月內達到 1 億美元年營收](https://techcrunch.com/2025/07/23/eight-months-in-swedish-unicorn-lovable-crosses-the-100m-arr-milestone/)。

一年後，2026 年 2 月，Karpathy 自己說這個詞不夠用了。

他提出了新概念：[**Agentic Engineering**](https://x.com/karpathy/status/2019137879310836075)。Anthropic 在官方報告中稱之為 **Agentic Coding**。

從「憑感覺」到「自主代理」，只花了一年。

這篇文章，就從那則推文開始說起。

---

## Vibe Coding 是什麼？

我第一次體驗到 Vibe Coding，是 2025 年 2 月用 Cursor 做了一個股市回測網頁。

輸入股票代號，自動抓歷史股價，算出年化報酬率、最大回撤、Beta 值，還能模擬初期單筆投入或定期定額到現在的終值。

我已經 14 年沒寫過程式了。

但那天晚上，從吃完飯到上床睡覺，東西就能跑了。隔天我 demo 給同事看，大家都嚇到。

這就是 Vibe Coding 的魔力。你用自然語言告訴 AI 你想要什麼，AI 產出程式碼，跑跑看，能動就好。不看 diff，不讀程式碼（反正我也看不懂），Accept All。

但當時我完全沒想過安全性、穩定性、登入機制、或是怎麼收費。

因為不需要。這是一個 demo，不是一個產品。

Vibe Coding 最適合的就是這種場景：原型驗證、週末 side project、demo 給同事看。

它不適合的場景：任何你在乎品質、安全、和長期維護的東西。

大部分有價值的軟體，都屬於後者。

但 Vibe Coding 不是終點。回頭看，它只是 AI 寫程式演化過程中的一個階段。

## AI 寫程式的三個階段

### 補全：AI 猜你下一行

2021 年，GitHub Copilot 出現。你打字，AI 猜你下一行要寫什麼。

有用，但本質上跟手機的選字建議沒什麼不同。人類主導一切，AI 只是讓你打字快一點。

### 對話：你說，AI 寫

2023 年 ChatGPT 爆發，一切加速。

你打開聊天視窗，用中文描述你想要什麼功能。AI 回一段程式碼。你看不太懂，但沒關係——複製，貼到編輯器，跑跑看。報錯了，把錯誤訊息整段貼回去，AI 再給你一版。就這樣來回，像在跟一個很有耐心的工程師朋友傳訊息。

2024 年 Cursor 把這個流程搬進了編輯器。不用再切視窗、不用再複製貼上——AI 直接在你的檔案裡改程式碼，你只要按 Accept。

[一個 8 歲的小女孩用 Cursor，45 分鐘就做出一個 AI 聊天機器人](https://x.com/rickyrobinett/status/1825581674870055189)。Vibe Coding 把「會寫程式」的門檻，降到了小學生的程度。

幾個月後，我也做了自己的股市回測網頁。一個晚上，從零到能 demo。那種「我居然做得出來」的感覺，很難忘。

2025 年 2 月，Karpathy 給這種模式取了名字：Vibe Coding。

但不管工具怎麼進化，本質沒變：你要一步一步引導，AI 才會動。

### 代理：你說目標，AI 自己搞定

同一個月，Anthropic 推出了 Claude Code preview。

三個月後正式上線，搭載兩款模型：**Opus 4**（複雜任務更穩，準確度高 10-20%，但慢一半、貴五倍）和 **Sonnet 4**（速度快、成本較低，日常主力，但複雜邏輯容易出包）。

這次不一樣了。

你不再告訴 AI「寫一個函數做 X」，而是說「我想讓使用者可以用 Google 帳號登入」。然後 Agent 自己去規劃要改哪些檔案、寫程式碼、跑測試、發現 bug、修 bug、再跑測試。

整個過程形成一個自主迴圈——**推理 → 行動 → 觀察 → 再推理**。

人類的角色從「寫程式碼的人」變成「定義目標和審查結果的人」。

接下來的迭代速度令人窒息：

- **9 月 Sonnet 4.5**——比 Sonnet 4 快 20-25%，抓 bug 更準
- **11 月 Opus 4.5**——[輸出速度超越 Sonnet 4.5，token 用量省 76%](https://www.anthropic.com/news/claude-opus-4-5)。頂級模型變成日常主力
- **2026 年 2 月 Opus 4.6**——多 Agent 同時做事

最後這一步是質變。之前是一個人對一個 Agent，你下指令，它執行。現在你面對的是一個 AI Team Lead——你跟它討論需求，確認計畫後，它自動拆解任務、生成多個專家 Agent，前端、後端、測試、文件各司其職，平行工作，追蹤依賴，甚至互相溝通協調。你喝杯咖啡回來，整個團隊都推進了。

五月到隔年二月，九個月，四次重大升級。每次升級都讓 Agent 能做的事更多、需要人類介入的時刻更少。

一夜之間，每個工程師都升職了——從 IC 變成 manager，只是管的不是人，是一個 AI 團隊。

2026 年初，[Elon Musk 在 X 上說「We have entered the Singularity」](https://x.com/elonmusk/status/2007738847397036143)。很多人覺得太誇張。但至少在軟體開發這個領域，很難說他錯了。

這就是 Agentic Coding。

---

## 當我開始認真做產品

我做了 10 年產品經理，最後幾年在車用電子。

車規軟體對安全的標準很高——ASPICE V-model 框架，需求、設計、實作、測試每一層都要對應追溯。我同時負責開發流程和工具的導入——Jira、Polarion、DOORS，需求追溯、問題追蹤、變更管理，這些是我的日常。

2025 年，我在 Minerva University 念碩士，論文題目是做一個 AI 履歷分析工具——[AIResumeAdvisor](https://airesumeadvisor.com)。

MVP 用 No-Code 工具做的，能動，但處處受限。只能遷就現成的元件和 plugin，很多想法沒辦法實現。Claude Code 發布後，我決定用它重新來過。

這不是另一個週末 demo。這是要上線、有使用者、要長期維護的產品。

很自然地，我把過去 10 年的經驗搬了過來：DevOps、需求管理、自動測試、CI/CD——上了個全套。

結果發現，**居然 work。**

我還是那個 PM。定義需求、審查產出、把關品質。只是做事的從工程師變成了一個 AI 團隊。

具體來說：

1. **先定義清楚要什麼**，再跟 Agent 說
2. **讓 Agent 先出計畫**，我審核計畫才讓它動手
3. **看大方向，不逐行看程式碼**——架構對不對、方向有沒有偏。不確定的時候就問 AI：你怎麼評估的？成本多少？response time 能接受嗎？風險和安全性呢？這跟做 PM 一樣，我們本來就是靠問對問題來下決定
4. **讓機器幫我把關品質**——unit test、integration test、E2E test、pre-commit hook、後端監控系統，全部自動化。我不逐行看測試程式碼，但任何東西壞了我會第一時間知道

這不就是 V-model 嗎？需求 → 設計 → 實作 → 測試。只是執行的速度從「幾個 sprint」變成「幾個小時」。

我的 Agentic Coding workflow：

```
想做什麼 → 跟 Agent 討論計畫 → 確認方向 → AI 團隊執行 → 我看架構和結果 → merge
```

80% 的時間在思考和審查。20% 的時間在跟 Agent 對話。0% 的時間在親手寫程式碼。

但 AI 在開發這件事上的進步，不僅於此。

## 連工作流本身都在進化

Agentic Coding 改變的不只是「誰寫程式碼」，而是整個工作流。

以前，每個工程師的做法不同。經驗在腦中，難以傳承。新人入職要花幾個月才能上手。

現在，怎麼做規劃、怎麼做 code review、怎麼做前端設計——全都寫成 prompts、skills、agent configs，存在 repo 裡。

**過程本身變成了可持續改進的程式碼。**

我自己的專案就是這樣。CLAUDE.md 裡寫了專案的技術棧、程式碼風格、工作流程。每次 Agent 啟動都會讀這份文件。一分鐘讀完 onboarding，馬上就有資深工程師的產出品質。

而且這份文件會越來越好。每次發現 Agent 犯了某個錯，我就加一條規則。下次它就不會再犯。

知識不再鎖在人的腦中。它變成了可以版本控制、可以迭代、可以分享的東西。

---

Vibe Coding 一週年的時候，Karpathy 自己寫了一段[回顧](https://x.com/karpathy/status/2019137879310836075)：

> 當時 LLM 的能力還不夠強，vibe coding 大多用在好玩的拋棄式專案、demo 和實驗。好玩，而且幾乎能用。一年後的今天，透過 LLM agent 寫程式正在成為專業人士的預設工作流——只是多了更多的監督和審查。目標是在不妥協軟體品質的前提下，拿到 agent 帶來的槓桿。

他給這種新模式取了名字：**Agentic Engineering**。

> "Agentic"——因為 99% 的時間你不是自己寫程式碼，而是指揮 agent 來寫，你負責監督。"Engineering"——強調這是一門有藝術、有科學、需要專業技能的工作。是你可以學習、可以精進的東西。

Karpathy 談的是軟體開發。但我覺得這個模式不止於此。

我現在用同樣的方式管理知識——AI 幫我研究、整理、歸檔到 Obsidian，我負責決定什麼值得留下。用同樣的方式做[目標管理](/zh-TW/blog/ai-goal-management-system/)——AI 幫我追蹤進度、提醒偏離，我負責設定方向。

**設定目標 → Agent 執行 → 人類審查 → 迭代改進。**

這個迴圈可以套用在人生的方方面面。寫程式只是起點。

從 2021 年的 Autocomplete，到 2023 年的 Chat，到 2025 年的 Agent。四年內，AI 寫程式從「猜你下一行要打什麼」進化到「你說目標，它自己搞定」。

AI 一年已經改變了太多事情。

一年後的今天，又會是什麼樣子？

---

*如果你對 AI 應用、AI 工作流、一人開發有興趣，我會持續分享實戰經驗。[訂閱電子報](/zh-TW/)*

