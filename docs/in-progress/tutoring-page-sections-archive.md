# Tutoring Page — 已移除 Sections 存檔

**建立日期**：2026-04-17
**原因**：`/zh-TW/tutoring/` 改為熟人專用支付門戶（noindex + 不公開推廣），說服性內容移除。未來公開時或搬到 `/services/` / about 頁可復用。

**原始頁面結構（2026-04-16 ~ 2026-04-17 上午）**：
Hero → Outcomes → How it works → Who it's for → Why me → Testimonials → Booking

**精簡後（2026-04-17 下午）**：
Hero → Booking

以下保留被移除的 5 個 sections 原始 HTML，若要復用直接貼回 `tutoring.astro` 或搬到新頁。

---

## Section 1: Outcomes（課後你會帶走）

```astro
<!-- Outcomes -->
<section class="py-20 md:py-28 lg:py-32 bg-[#FFFDF9]">
  <div class="max-w-6xl mx-auto px-6">
    <div class="mb-12 md:mb-16">
      <span class="inline-block px-4 py-1.5 text-sm font-medium bg-[#B8926A]/10 text-[#B8926A] rounded-full mb-4 tracking-wide">課後你會帶走</span>
      <h2 class="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-[#2C2416] leading-[1.1] tracking-[-0.02em] mb-4">
        不是聽完一堂課，<br />是帶著能用的系統回去。
      </h2>
      <p class="text-xl md:text-2xl text-[#5C5144] max-w-2xl leading-relaxed">
        4 小時結束時，你的電腦裡會有實際在跑的工作流、知識庫和開發環境 — 不是 demo，是你真正會用的版本。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <!-- AI Workflow -->
      <div class="group bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-[#B8926A]/30 hover:-translate-y-1 transition-all duration-300">
        <div class="w-12 h-12 rounded-xl bg-[#F5F1EB] flex items-center justify-center mb-5">
          <svg class="w-6 h-6 text-[#B8926A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>
        </div>
        <h3 class="text-xl md:text-2xl font-semibold text-[#2C2416] mb-3">AI 驅動的工作流</h3>
        <p class="text-base md:text-lg leading-relaxed text-[#5C5144]">從筆記整理、週計畫到內容產出，把 AI 一步步接進日常。省下來的時間，拿去做真正需要你判斷的事。</p>
      </div>

      <!-- Goals & Projects -->
      <div class="group bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-[#B8926A]/30 hover:-translate-y-1 transition-all duration-300">
        <div class="w-12 h-12 rounded-xl bg-[#F5F1EB] flex items-center justify-center mb-5">
          <svg class="w-6 h-6 text-[#B8926A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>
        </div>
        <h3 class="text-xl md:text-2xl font-semibold text-[#2C2416] mb-3">目標與專案管理系統</h3>
        <p class="text-base md:text-lg leading-relaxed text-[#5C5144]">年初設的目標三月就忘了？我陪你建一套每天打開就知道該做什麼的系統 — 從年度目標、季度拆解到每日任務都串起來。</p>
      </div>

      <!-- Knowledge Mgmt -->
      <div class="group bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-[#B8926A]/30 hover:-translate-y-1 transition-all duration-300">
        <div class="w-12 h-12 rounded-xl bg-[#F5F1EB] flex items-center justify-center mb-5">
          <svg class="w-6 h-6 text-[#B8926A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>
        </div>
        <h3 class="text-xl md:text-2xl font-semibold text-[#2C2416] mb-3">知識管理系統（Obsidian）</h3>
        <p class="text-base md:text-lg leading-relaxed text-[#5C5144]">讀過的書、上過的課、開過的會 — 不再存了就忘。從 Obsidian vault 結構、PARA 分類到 AI 自動整理，一次建起來。</p>
      </div>

      <!-- Claude Code -->
      <div class="group bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-[#B8926A]/30 hover:-translate-y-1 transition-all duration-300">
        <div class="w-12 h-12 rounded-xl bg-[#F5F1EB] flex items-center justify-center mb-5">
          <svg class="w-6 h-6 text-[#B8926A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"/></svg>
        </div>
        <h3 class="text-xl md:text-2xl font-semibold text-[#2C2416] mb-3">Claude Code 開發環境</h3>
        <p class="text-base md:text-lg leading-relaxed text-[#5C5144]">不用懂 code 也能用 AI 處理電腦上的事。我陪你從安裝、設定 Skills、建第一個 workflow，到課後能自己擴充。</p>
      </div>
    </div>
  </div>
</section>
```

---

## Section 2: How it works（教學形式 — 3 段 + 2 場地）

```astro
<!-- How it works -->
<section class="py-20 md:py-28 lg:py-32 bg-[#F5F1EB]">
  <div class="max-w-6xl mx-auto px-6">
    <div class="mb-12 md:mb-16">
      <span class="inline-block px-4 py-1.5 text-sm font-medium bg-[#B8926A]/10 text-[#B8926A] rounded-full mb-4 tracking-wide">教學形式</span>
      <h2 class="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-[#2C2416] leading-[1.1] tracking-[-0.02em] mb-4">
        一次連上 4 小時，邊做邊改。
      </h2>
      <p class="text-xl md:text-2xl text-[#5C5144] max-w-2xl leading-relaxed">
        不是看我 demo，是我陪你動手 — 你的電腦、你的檔案、你的工作場景。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      <div class="bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8">
        <p class="text-sm font-medium text-[#B8926A] mb-3 tracking-wide uppercase">第一段 · 30 分鐘</p>
        <h3 class="text-xl font-semibold text-[#2C2416] mb-3">釐清你的場景</h3>
        <p class="text-base leading-relaxed text-[#5C5144]">先了解你目前的工作流、痛點、和想解決的問題 — 課程內容會根據你的需求調整重點。</p>
      </div>
      <div class="bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8">
        <p class="text-sm font-medium text-[#B8926A] mb-3 tracking-wide uppercase">第二段 · 3 小時</p>
        <h3 class="text-xl font-semibold text-[#2C2416] mb-3">手把手建系統</h3>
        <p class="text-base leading-relaxed text-[#5C5144]">分四個區塊（AI 工作流 / 目標管理 / 知識管理 / Claude Code），中間休息 15 分鐘。每段都有實際產出，不是聽完就忘。</p>
      </div>
      <div class="bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8">
        <p class="text-sm font-medium text-[#B8926A] mb-3 tracking-wide uppercase">第三段 · 30 分鐘</p>
        <h3 class="text-xl font-semibold text-[#2C2416] mb-3">收斂與下一步</h3>
        <p class="text-base leading-relaxed text-[#5C5144]">統整當天設定、列出你回去要持續的習慣、和未來 30 天可以擴充的方向。</p>
      </div>
    </div>

    <!-- Format details -->
    <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#F5F1EB] flex items-center justify-center">
            <svg class="w-6 h-6 text-[#B8926A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
          </div>
          <div>
            <h3 class="text-lg md:text-xl font-semibold text-[#2C2416] mb-2">實體場</h3>
            <p class="text-base leading-relaxed text-[#5C5144]">JustCo 竹北高鐵站<br /><span class="text-sm text-[#8B7355]">高鐵新竹站步行 5 分鐘，咖啡點心提供</span></p>
          </div>
        </div>
      </div>
      <div class="bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8">
        <div class="flex items-start gap-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#F5F1EB] flex items-center justify-center">
            <svg class="w-6 h-6 text-[#B8926A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5 21 6v12l-5.25-4.5M3 18a2.25 2.25 0 0 0 2.25-2.25V8.25A2.25 2.25 0 0 0 3 6h10.5a2.25 2.25 0 0 0 2.25 2.25v7.5A2.25 2.25 0 0 0 13.5 18H3Z"/></svg>
          </div>
          <div>
            <h3 class="text-lg md:text-xl font-semibold text-[#2C2416] mb-2">線上場</h3>
            <p class="text-base leading-relaxed text-[#5C5144]">Google Meet<br /><span class="text-sm text-[#8B7355]">全程螢幕共享，課後寄當天的設定檔和連結</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

> ⚠️ 注意：復用時若「線上場」仍未實作，先只放實體場卡片。

---

## Section 3: Who it's for（適合誰來上 + Mid CTA）

```astro
<!-- Who it's for -->
<section class="py-20 md:py-28 lg:py-32 bg-[#FFFDF9]">
  <div class="max-w-6xl mx-auto px-6">
    <h2 class="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-[#2C2416] leading-[1.1] tracking-[-0.02em] mb-12 md:mb-16">
      適合誰來上
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <div>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-full bg-[#B8926A]/10 flex items-center justify-center">
            <svg class="w-5 h-5 text-[#B8926A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
          </div>
          <h3 class="text-xl md:text-2xl font-semibold text-[#2C2416]">適合</h3>
        </div>
        <ul class="space-y-4 text-base md:text-lg leading-relaxed text-[#5C5144]">
          <li><strong class="text-[#2C2416]">想轉型的工程師</strong> — 寫了多年 code，想用 AI 把產品力、內容力、商業力一次補起來。</li>
          <li><strong class="text-[#2C2416]">自由接案者</strong> — 一個人扛所有事，需要一套能 scale 的個人系統，不再靠記性硬撐。</li>
          <li><strong class="text-[#2C2416]">想認真用 AI 的中階主管</strong> — 用過 ChatGPT，但覺得只是聊天玩具。想知道怎麼讓 AI 真的接進你的工作。</li>
          <li><strong class="text-[#2C2416]">獨立工作者 / 個人品牌經營者</strong> — 想把寫作、知識管理、內容產出串成一條線。</li>
        </ul>
      </div>

      <div>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-full bg-[#E8E4DD] flex items-center justify-center">
            <svg class="w-5 h-5 text-[#8B7355]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
          </div>
          <h3 class="text-xl md:text-2xl font-semibold text-[#2C2416]">不適合</h3>
        </div>
        <ul class="space-y-4 text-base md:text-lg leading-relaxed text-[#5C5144]">
          <li><strong class="text-[#2C2416]">完全沒用過 AI 工具的人</strong> — 這堂不是 ChatGPT 入門，建議先自己玩過幾週再來。</li>
          <li><strong class="text-[#2C2416]">只想聽概念的人</strong> — 全程要動手做，不適合純聽課。</li>
          <li><strong class="text-[#2C2416]">想找 enterprise 導入方案的團隊</strong> — 這是個人系統課，企業需求請看 <a href="/zh-TW/services/" class="text-[#B8926A] hover:underline">企業服務</a>。</li>
          <li><strong class="text-[#2C2416]">期待一堂課改變所有事的人</strong> — 4 小時建得起系統，但持續使用是你的事。</li>
        </ul>
      </div>
    </div>

    <!-- Mid-page CTA -->
    <div class="mt-16 md:mt-20 text-center">
      <p class="text-lg md:text-xl text-[#5C5144] mb-6">看起來適合你？</p>
      <a href="#tutoring-cta" class="inline-flex items-center justify-center px-8 py-4 bg-[#B8926A] text-white text-base md:text-lg font-medium rounded-full hover:bg-[#A67D55] hover:shadow-lg hover:scale-105 transition-all duration-200" data-umami-event="tutoring_mid_cta">
        預約時段 &rarr;
      </a>
    </div>
  </div>
</section>
```

---

## Section 4: Why me（為什麼找我 — 4 數字）

```astro
<!-- Why me -->
<section class="py-20 md:py-28 lg:py-32 bg-[#F5F1EB]">
  <div class="max-w-6xl mx-auto px-6">
    <h2 class="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-[#2C2416] leading-[1.1] tracking-[-0.02em] mb-4">
      為什麼找我
    </h2>
    <p class="text-lg md:text-xl text-[#5C5144] mb-12 md:mb-16 max-w-2xl leading-relaxed">
      不是紙上談兵。我自己每天跑這套系統，有真實產品和數據可以看。
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <div class="flex gap-5">
        <div class="flex-shrink-0 w-16 h-16 rounded-xl bg-[#B8926A] flex items-center justify-center">
          <span class="text-2xl font-bold text-white">15</span>
        </div>
        <div>
          <p class="text-lg md:text-xl font-semibold text-[#2C2416] mb-2">年科技業經驗</p>
          <p class="text-base md:text-lg leading-relaxed text-[#5C5144]">工程師 → 產品經理 → 數據分析，全棧背景讓我能從技術和商業兩個角度幫你規劃。</p>
        </div>
      </div>

      <div class="flex gap-5">
        <div class="flex-shrink-0 w-16 h-16 rounded-xl bg-[#B8926A] flex items-center justify-center">
          <span class="text-lg font-bold text-white">Day 1</span>
        </div>
        <div>
          <p class="text-lg md:text-xl font-semibold text-[#2C2416] mb-2">Claude Code 第一批深度使用者</p>
          <p class="text-base md:text-lg leading-relaxed text-[#5C5144]">2025 年 5 月至今，用 AI 從零做出完整 SaaS、Chrome Extension、工具站、個人網站。</p>
        </div>
      </div>

      <div class="flex gap-5">
        <div class="flex-shrink-0 w-16 h-16 rounded-xl bg-[#B8926A] flex items-center justify-center">
          <span class="text-lg font-bold text-white">4K</span>
        </div>
        <div>
          <p class="text-lg md:text-xl font-semibold text-[#2C2416] mb-2">真實產品驗證</p>
          <p class="text-base md:text-lg leading-relaxed text-[#5C5144]"><a href="https://airesumeadvisor.com/zh-TW/" target="_blank" rel="noopener noreferrer" class="text-[#B8926A] hover:underline">AI Resume Advisor</a>（SaaS + 瀏覽器擴充）、<a href="https://www.neatoolkit.com/zh-TW" target="_blank" rel="noopener noreferrer" class="text-[#B8926A] hover:underline">NeatToolkit</a>（上線首日 4,000 用戶）。</p>
        </div>
      </div>

      <div class="flex gap-5">
        <div class="flex-shrink-0 w-16 h-16 rounded-xl bg-[#B8926A] flex items-center justify-center">
          <span class="text-lg font-bold text-white">60K</span>
        </div>
        <div>
          <p class="text-lg md:text-xl font-semibold text-[#2C2416] mb-2">這個網站月流量 60,000+</p>
          <p class="text-base md:text-lg leading-relaxed text-[#5C5144]">兩個月內從零長出來。同一套 AI + 知識管理 + SEO 的工作流，我每天在跑，也是這堂課要教你的。</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## Section 5: Testimonials（學員怎麼說）

```astro
<!-- Testimonials -->
<section class="py-20 md:py-28 lg:py-32 bg-[#FFFDF9]">
  <div class="max-w-6xl mx-auto px-6">
    <h2 class="text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-bold text-[#2C2416] leading-[1.1] tracking-[-0.02em] mb-4">
      學員怎麼說
    </h2>
    <p class="text-lg md:text-xl text-[#5C5144] mb-12 md:mb-16 max-w-2xl leading-relaxed">
      不同背景，同樣的改變 — 用 AI 打造自己的工作流。
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8">
        <div class="flex items-center gap-4 mb-6">
          <img src="/images/workshop/jack-liu.jpg" alt="劉子維 臨床心理師" class="w-16 h-16 rounded-full object-cover object-top" />
          <div>
            <p class="font-semibold text-[#2C2416]">
              <a href="https://warmflowpsy.tw/" target="_blank" rel="noopener noreferrer" class="hover:text-[#B8926A] transition-colors">暖流人心規劃顧問</a> 執行長
            </p>
            <p class="text-sm text-[#8B7355]">暖陽身心診所 心理科主任 劉子維 臨床心理師</p>
          </div>
        </div>
        <p class="text-base md:text-lg leading-relaxed text-[#5C5144] mb-6">「我是臨床心理師，聽到『你也可以用 Claude Code 建自己的工作流系統』的時候，心裡想你在開我玩笑吧？結果在余老師手把手的引導下，我從覺得『這種東西我不可能學得會』，到現在用一成的時間完成拖了大半年的雜事，剩下九成拿來思考品牌和產品。用 AI 打造自己的工作流，才是真正的改變。」</p>
        <div class="pt-5 border-t border-[#E8E4DD]">
          <p class="text-sm text-[#8B7355] font-medium mb-3">延伸閱讀</p>
          <p class="text-sm mb-2">
            <a href="https://warmflowpsy.tw/psychologist-learns-vscode/" target="_blank" rel="noopener noreferrer" class="text-[#B8926A] hover:underline">子維的視角：〈臨床心理師學會用 Claude Code 的那一天〉</a>
          </p>
          <p class="text-sm">
            <a href="/zh-TW/blog/teaching-48yo-psychologist-claude-code/" target="_blank" rel="noopener noreferrer" class="text-[#B8926A] hover:underline">我的視角：〈我教一個 48 歲的心理師用 Claude Code〉</a>
          </p>
        </div>
      </div>

      <div class="bg-white border border-[#E8E4DD] rounded-xl p-6 md:p-8">
        <div class="flex items-center gap-4 mb-6">
          <img src="/images/workshop/lin-dinglun.png" alt="林鼎倫" class="w-16 h-16 rounded-full object-cover" />
          <div>
            <p class="font-semibold text-[#2C2416]">卡佶特品牌策略有限公司</p>
            <p class="text-sm text-[#8B7355]">品牌總監 林鼎倫</p>
          </div>
        </div>
        <p class="text-base md:text-lg leading-relaxed text-[#5C5144]">「做品牌策略，手上永遠同時跑好幾個專案，以前進度散在不同工具裡，靠自己搬來搬去，常常漏掉東西。我用過 ChatGPT，但它就是另一個聊天視窗，問完還是要自己動手。Claude Code 完全不同 — 它直接讀我電腦裡的檔案，跟我討論策略、規劃排程，然後直接幫我執行。它不只是我的策略夥伴，也是我的執行秘書，我終於不用一個人扛所有事。這才是 AI 該有的樣子。」</p>
      </div>
    </div>
  </div>
</section>
```
