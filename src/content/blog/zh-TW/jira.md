---
title: "為什麼要使用Jira管理專案"
description: "Jira 是由 Atlassian 開發的專案管理工具，支援議題追蹤、Scrum/Kanban 敏捷開發、即時儀表板，解決傳統專案管理中會議時間浪費、工具效率不足、團隊主動性下降等問題。"
pubDate: 2021-02-27
category: productivity
tags: ["專案管理", "專案管理工具", "Jira"]
lang: zh-TW
featured: false
heroImage: /images/blog/jira.webp
---

## 傳統專案管理常見的問題

作為一個專案經理我們必須把專案的現況搞清楚，也要能清楚的表達出來。這不是一件容易的事情。因為這包含了每一個要花人力、時間去執行的大大小小工作其「目標是什麼」、「現在的情況與目標的差異有多大?」、「什麼地方卡住了」、「卡住是因為交期太緊，資源不夠還是成員在能力上有落差?」、「預計多久時間可以完成里程碑?」、「各工作項的Due Date還有多久?」...等細節。傳統的作法是PM在固定週期(每週、每月)的專案會議中找各單位的同仁逐項review open issue，記錄進度以及討論衍生的follow up再押上owner。會議結束後用outlook、電話、面對面跟進來確保專案進度。然而，這樣的作法會遇到一些問題

### 每一個議題都應被管理，但不見得該在會議上討論

會議消耗大量團隊時間，若只牽涉2-3個成員的議題，PM需要列管但無需在大會議中佔用整體團隊的時間。

### 郵件(Outlook/Gmail) + Excel 不是一個有效率追蹤議題的方式

專案溝通以議題為單位，通常一個專案中進行中的議題數量超過數十個以上。假若這幾十個議題都藏在Outlook的收件匣中，要搞清楚專案現況就只能從Outlook中一個個找出來(搜寄件者/時間/標題)，判斷當前處理人是誰及其進度(尚未開始處理/執行中/已完成待確認)。接著PM需要額外再開另一個Excel整理出議題清單來追蹤。然而，Excel在維護議題討論過程中的附件或是圖片...等檔案是不友善的。或許在議題數量小的情況下，Outlook+Excel來追蹤或許並不困難，但若專案要追蹤的議題有數十或是上百條的話就需要有更有效率的工具。

### 專案議題均由PM來跟進讓團隊產生被動心態

當團隊習慣於接收PM的指示或是會議記錄來執行自己工作時，**短期的影響是PM在追的東西才處理，PM沒有留意到的事情就漏了**。**長期的影響是團隊成員逐漸開始失去與客人的連結**，沒有主動規劃、橫向溝通的習慣。不會主動的從專案或是客人的角度思考接下來自己要做什麼。長久下來當客人沒有明確的規格或是PM沒有要求時，部份團隊成員變的不知道怎麼拆解目標、發想思考、整合資源提出方案。也就是**喪失了自我提案的能力**。(或許這是近期敏捷專案管理被提倡的原因)

## Jira 功能介紹

如果專案日常營運與團隊協作觀念更有效率，專案經理則能花更多的時間與心力在規劃專案的「時程」、「成本」、「數據分析」、「客戶溝通」等更有價值、無法被取代的工作上。其實，這樣的工具早在20年前就已問市了，本篇文章介紹的軟體Jira就是其中之一。

Jira是澳洲的軟體公司Atlassian所開發的第一款軟體產品，Atlassian由Cannon-Brookes和Farquhar於2002年成立，當時身為軟體工程師的他們需要一個具體的地方來記錄問題並進行協作，他們厭倦了使用電子郵件或個人生產力工具(如Excel)來跟踪其開發人員的工作。所以他們拿出信用卡借了10,000美元創辦了Atlassian，推出Jira來解決上述問題。短短3年就實現了獲利，目前Atlassian已是市值60B美元的公司。

對於專案經理而言，Jira可以使用在以下2個面向：

- 議題追蹤管理
- 敏捷(Scrum 或是看板) 專案開發

### 議題追蹤

Jira可以為專案中不同的工作類型設定專屬的議題類型，不同類型的議題可以設定不同工作流(Workflow)、資料欄位、責任人。例如「客戶報價」、「軟體功能開發」、「Bug 回報」、「電路設計」...等不同型態的工作，依用戶自定議的工作類型快速的建立出相應的雲端協作流程與資訊輸入欄位。

<figure>
<img src="/images/blog/jira/workflow-quote.webp" alt="客戶報價工作流程" />
<figcaption>客戶報價工作流程</figcaption>
</figure>

<figure>
<img src="/images/blog/jira/workflow-dev.webp" alt="軟體開發工作流程" />
<figcaption>軟體開發工作流程</figcaption>
</figure>

以議題為單位進行追蹤。依專案角色讓團隊同仁針對不同議題有不同操作或是檢視(資料)的權限，另外，由於議題的數據(ex: 狀態、團隊同仁的comment、附件、負責人、處理時長)都是即時的進度。因此團隊可在相同的數據基礎上進行討論收斂共識。下圖是一個議題的範例，各種因專案所需要的資訊/欄位(Due Date、紅綠燈號...)也可以快速的建立。

<figure>
<img src="/images/blog/jira/issue-screen.webp" alt="Issue Screen Sample" />
<figcaption>Issue Screen Sample</figcaption>
</figure>

即時儀表板，自動產出專案中議題狀態報告。任何議題屬性的變更系統會自動公告於活動串流公佈欄。議題的相關人亦可設定提醒通知郵件。

<figure>
<img src="/images/blog/jira/dashboard.webp" alt="Real Time Dashboard" />
<figcaption>Real Time Dashboard</figcaption>
</figure>

### 敏捷專案開發

Jira支持敏捷專案開發中主流的Scrum與kanban方法論。可以建立待開發的Backlog，讓PM與團隊計劃各項功能所需的工期(or story point)，並用視覺化的看板開始專案開發。

<figure>
<img src="/images/blog/jira/sprint-plan.webp" alt="Sprint Plan" />
<figcaption>Sprint Plan</figcaption>
</figure>

<figure>
<img src="/images/blog/jira/scrum-board.webp" alt="Scrum 看板" />
<figcaption>Scrum 看板</figcaption>
</figure>

## Jira 版本與費用

Jira目前提供2種方案，Cloud版本與Data Center版本

### Cloud 版本

直接使用雲端版本無需安裝在自家的伺服器中，沒有維運支出(機房/伺服器、電費、網站)。只要註冊選取Cloud方案後即可開始設定與使用。依使用人數級距有不同的訂價。以一個100人的團隊言，每年的費用為7,000美金(21萬台幣不到)。還不到一個工讀生一年的薪資。如果能善用它的功能節省工時的消耗，這筆支出會是相當划算的投資。([價格表連結](https://www.atlassian.com/software/jira/pricing))

<figure>
<img src="/images/blog/jira/cloud-pricing.webp" alt="Cloud Version Price" />
<figcaption>Cloud Version Price</figcaption>
</figure>

### Data Center 版本

需安裝在自家的伺服器，適用於自有IT維運部門的大型公司，其最小購買用戶人數為500人，首年的購買價格約125萬台幣，第二年後若是需要Atlassian協助維護則需購買價格的一半，若無需Atlassian維護合約則無需費用。

<figure>
<img src="/images/blog/jira/datacenter-pricing-1st.webp" alt="Data Center Version Price 1st Year" />
<figcaption>Data Center Version Price 1st Year</figcaption>
</figure>

<figure>
<img src="/images/blog/jira/datacenter-pricing-after.webp" alt="Data Center Version Price after 1st Year" />
<figcaption>Data Center Version Price after 1st Year</figcaption>
</figure>

## 結語

隨著時代的演進，藉由工具的輔助以及團隊觀念的升級讓專案管理愈來愈細緻。我衷心的希望台灣的廠商，在高喊產業升級/數位轉型的同時，其心態上能真正準備好接受新的思維與工具，而不是仍然沿用20年前就被淘汰的方法在當代的產業環境中參與競爭。馬雲說很多人都輸在：「看不見，看不懂，看不起，來不及」。或許一開始我們看不見國外專案管理的最佳實踐，後來看不懂或看不起新的工具與思維，以致於到最後想在競爭中勝出也來不及了。《最低的水果摘完之後》這本書中，作者顏擇雅提到:「台灣問題就是最低的水果摘完了，如今應該趕緊打造工具去摘更高的水果。」其實，工具早已經擺在那裡了呀，但我們是否有勇氣拋棄過往的慣性學著使用它，摘取果樹上更高的水果？這個決定權就在我們自己手上。

## Jira 試用與學習資源

### 試用連結

Jira是一套功能強大且自由度很高的軟體。適合5人以上的專案團隊使用。如果5人以內的團隊甚至個人使用的話，或許Trello / Notion等輕型的軟體會是更合適的工具。(送自己孩子上學不需要買一台校車巴士)阿！但如果您的團隊對於Jira有興趣的話，Atlassian在官網有提供免費的試用方案。進入官網後可以點擊如下的試用連結取得30天的試用期(無需輸入信用卡資料)。

<figure>
<img src="/images/blog/jira/trial.webp" alt="Jira Trial" />
<figcaption>Jira Trial</figcaption>
</figure>

[Jira 官方免費試用（30天）](https://www.atlassian.com/software/jira/free)

### 學習資源

之前剛接觸Jira時，曾找過中文學習資源，但沒有發現有系統的課程。後來在Udemy上有找到2個入門的線上課程(購買30天內可以不滿意退費)。提供給有需要朋友參考囉。

1. [Learn JIRA with real-world examples (+Confluence bonus)](https://www.udemy.com/course/the-complete-guide-to-jira-with-real-world-examples/)

<figure>
<img src="/images/blog/jira/udemy-realworld.webp" alt="Learn JIRA with real-world examples" />
<figcaption>Learn JIRA with real-world examples (+Confluence bonus)</figcaption>
</figure>

2. [Understanding Jira for users, managers and admins](https://www.udemy.com/course/introduction-to-jira/)

<figure>
<img src="/images/blog/jira/udemy-concept.webp" alt="Understanding Jira for users, managers and admins" />
<figcaption>Understanding Jira for users, managers and admins</figcaption>
</figure>
