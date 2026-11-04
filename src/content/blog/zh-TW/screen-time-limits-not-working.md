---
title: "螢幕使用時間失效之後，我用 Claude Code 讓孩子的 Wi-Fi 照家規開關"
seoTitle: "螢幕使用時間失效怎麼辦？我改從路由器管孩子上網時間"
description: "我家 Mac 上的螢幕使用時間失效，原本路由器的封鎖也常沒擋住。我用 Claude Code 做了一個小程式：每個孩子一組專屬 Wi-Fi，看流量算有在用的時間，說一句話就開關。文末附一段 Prompt，貼給 Claude Code，就能請它帶你建立這個環境。"
pubDate: 2026-11-04
heroImage: /images/blog/screen-time-limits-not-working.webp
category: building-products
topics: ["ai-practice"]
tags: ["Claude Code", "vibe coding", "self-hosted AI"]
lang: zh-TW
translationKey: screen-time-limits-not-working
featured: true
relatedPosts: ["claude-code-tutorial.md", "personal-panopticon.md", "ai-meeting-notes.md"]
faq:
  - question: "為什麼螢幕使用時間的限制沒作用？"
    answer: "Apple 承認過的一個問題，是部分使用者的螢幕使用時間設定可能會無預期被重置。這是 2023 年 7 月 Apple 向《華爾街日報》說的，當時的報導談的是家長在 iPhone、iPad 上設的限制。據美國科技媒體 9to5Mac 報導，Apple 當時能給的建議只有重置裝置。我家是 Mac 上的螢幕使用時間失效，時間到了，Chrome 有時還點得開。想查原因，我手上沒有任何數據可以排查。"
  - question: "路由器可以設家長控制嗎？"
    answer: "可以，有些路由器內建家長控制，像 TP-Link 的 Deco 能設排程和封鎖。我家用 Deco 的時候，封鎖常常沒擋住，想查原因也沒有數據可以排查。後來我換了一台路由器，給每個孩子一組專屬 Wi-Fi（路由器內建的訪客 Wi-Fi）。家裡一台一直開著的電腦上跑一個小程式，照每天的額度開關這幾組 Wi-Fi，規則跟著孩子走，他用哪台裝置連都一樣。"
  - question: "要從路由器管孩子的 Wi-Fi，路由器需要什麼條件？"
    answer: "我家的做法，是讓家裡一台一直開著的電腦照每天的額度開關孩子的 Wi-Fi，這樣路由器要做得到三件事。第一，主 Wi-Fi 之外還能開訪客 Wi-Fi，而且每一組都能單獨開關，這樣才能只關孩子的、不動到大人的。第二，系統以 OpenWrt（開放原始碼的路由器系統）為基礎、能用 SSH（另一台電腦用指令登入、操作它的方式）登入，那台電腦才能用指令查流量、開關 Wi-Fi。第三，路由器自己有排程，晚上關掉孩子的 Wi-Fi、早上打開，所以那台電腦當機時，孩子的 Wi-Fi 最晚隔天早上也會打開。我家用的是 GL.iNet Flint 3e，挑型號時最該找的是 OpenWrt 和 SSH 這兩個關鍵字。"
  - question: "用 AI 自己做開關孩子 Wi-Fi 的小程式，要會寫程式嗎？"
    answer: "不用會寫程式，但要有裝在電腦上的 AI 工具，像我用的 Claude Code；網頁上聊天的 AI 碰不到你家的路由器。你要做的，是把家裡的環境、規則和需求講清楚。把文末那段需求貼給它之後，它會照那段最後一句的要求，先問還缺哪些資訊，再提出架構和步驟，每一步動手前先問你，所以你得一路確認。登入 AI 工具這類帳號的兩步驟驗證，也要你自己開。以我家為例，我每天都用 Claude Code，程式的部分兩個晚上做完。"
---

我覺得兒子的上網時間到了，他說他中途離開了 30 分鐘，那段時間沒在用。我們各講各的，就是講不清，我手上也沒有一筆對得上的紀錄。

## 螢幕使用時間失效：設了，就是鎖不住

廠商給的現成工具，我用起來每一步都卡。以前家長大多只能將就這類工具，像 Apple 的螢幕使用時間、路由器家長控制。我在螢幕使用時間設了時間限制，在家裡原本的路由器（TP-Link 的 Deco）設了封鎖。孩子的 Mac 和 iPhone 登入的是不同帳號，螢幕使用時間我得各設各的，原本的路由器又是另一套。

時間到了，Mac 上的螢幕使用時間失效，Chrome 有時還點得開。原本的路由器設的封鎖，常常沒擋住。想查原因，我手上沒有任何數據可以排查。TP-Link 官網上有一份英文排查文件，標題就叫〈[Deco 家長監護沒有如預期運作](https://community.tp-link.com/en/smart-home/kb/detail/412628)〉。

出問題的不只我家，有人是設好的限制自己消失。2022 年 12 月，一位用 iPhone 的家長在 [Apple 社群](https://discussions.apple.com/thread/254480754)發文，說限制設好後，一天、甚至不到一天就消失。這篇討論後來累積了 7,056 個「我也有這個問題」（2026 年 11 月 3 日查）。2023 年 7 月，Apple 向《華爾街日報》表示，知道部分使用者可能遇到螢幕使用時間設定無預期被重置的問題，報導的是家長在 iPhone、iPad 上設的限制失效（[Engadget](https://www.engadget.com/apple-says-its-aware-of-a-bug-that-may-affect-screen-time-restrictions-for-kids-052057086.html)、[瘋先生](https://mrmad.com.tw/apple-admits-iphone-screen-bug)）。據美國科技媒體 [9to5Mac](https://9to5mac.com/2023/07/31/screen-time-is-broken/) 報導，Apple 當時能給的建議只有重置裝置。

我家 Mac 上，Apple 螢幕使用時間內建的使用報表，我看了覺得很粗。同一個時間開了好幾個 App，看起來每個 App 的時間都算進去，加起來比實際在用的時間多很多。

曾經有一位 iPhone 使用者在 [Apple 社群](https://discussions.apple.com/thread/255762373)反應，那天他用手機不超過一小時，自己手機的報表卻顯示 13 小時。

這種報表，根本沒辦法拿來算帳。

孩子做完家事，我想臨時多給一點時間，可是規則太死，就得先在 Mac 的螢幕使用時間輸密碼改時限，再打開原本的路由器 App 解除封鎖。

## 為什麼不自己做一個？

我[每天都用 Claude Code 處理工作上的事](/zh-TW/blog/personal-panopticon/)，卻從來沒想過替自己家做一個小程式，一直靠現成的工具在管。Claude Code 是會寫程式、也會跑程式的 AI 工具。

Vibe Coding 出現之後，家長多了第二條路：自己做。

有一天，我把系統架構畫出來，拆成幾塊。拆開來看，每一塊都是做得到的事，規則由我定，而且自由。我說的自由，是不用再記兒子何時有用、何時開始，用的每一分鐘都有紀錄。

## 我說一句話，孩子的 Wi-Fi 就照著開關

整個做法用到三台機器：我這端的手機或筆電、家裡的 Mac mini（一台一直開著的電腦）、一台全家共用的路由器。另外還有一頁放在雲端的顯示頁，讓孩子看自己還剩多少時間。

我把原本的路由器換成新的（GL.iNet 的 Flint 3e）。爸媽和其他家人用主 Wi-Fi，兒子、女兒各用一組專屬 Wi-Fi（路由器內建的訪客 Wi-Fi），他們只有自己的密碼。關掉孩子那一組，主 Wi-Fi 照常。原本的路由器是照裝置管：排程和封鎖都認 MAC 位址（裝置在網路上的識別碼），裝置的位址一變，規則就管不到。新的架構改成照人管：規則跟著孩子的專屬 Wi-Fi 走，他用哪台裝置連都一樣。

額度是每天能上網的分鐘數，半夜歸零，沒用完也不留到隔天。孩子有在用的每一分鐘，都從額度裡扣，扣完就關掉他的專屬 Wi-Fi。

我在手機或筆電上講人話，像是「開」「幫兒子加 30 分鐘」。臨時加時間也不用再改兩套設定，一句話就好。說完之後，只要額度還有剩，孩子的專屬 Wi-Fi 一分鐘內就會打開。

顯示頁每個孩子一頁，大字寫著今天還剩多少，還有一條 24 小時的時段條，標出哪幾段在用，每筆時間加減的事由也列在上面。我跟 Claude Code 說「查額度」，就查得到孩子用了多少時間。

<style>
.ar .ar-body .kt-map { margin: var(--space-6) 0; }
.ar .ar-body .kt-map svg { display: block; width: 100%; height: auto; overflow: visible; }
.ar .ar-body .kt-map .narrow { display: none; }
@media (max-width: 700px) { .ar .ar-body .kt-map .wide { display: none; } .ar .ar-body .kt-map .narrow { display: block; } }
.ar .ar-body .kt-map .bx { fill: var(--paper); stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-map .zone { fill: none; stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 8 6; }
.ar .ar-body .kt-map .zone-em { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-map .dim { fill: var(--paper); stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 8 6; }
.ar .ar-body .kt-map .chip-em { fill: var(--paper); stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-map .chip-dim { fill: var(--paper); stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 6 5; }
.ar .ar-body .kt-map .ic { fill: none; stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-map .ic circle { fill: var(--ink); }
.ar .ar-body .kt-map .ar { fill: none; stroke: var(--ink); stroke-width: 2.5; }
.ar .ar-body .kt-map .ar-wl { fill: none; stroke: var(--ink); stroke-width: 2.5; stroke-dasharray: 7 6; }
.ar .ar-body .kt-map .ar-wl-dim { fill: none; stroke: var(--muted); stroke-width: 2; stroke-dasharray: 7 6; }
.ar .ar-body .kt-map .ar-acc { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-map .mk-ink { fill: var(--ink); }
.ar .ar-body .kt-map .mk-acc { fill: var(--terra); }
.ar .ar-body .kt-map .mk-dim { fill: var(--muted); }
.ar .ar-body .kt-map text { font-family: var(--ar-text, 'Noto Serif TC', serif); fill: var(--ink); }
.ar .ar-body .kt-map .tt, .ar .ar-body .kt-map .tc { font-weight: 700; }
.ar .ar-body .kt-map .ts, .ar .ar-body .kt-map .tls, .ar .ar-body .kt-map .zl, .ar .ar-body .kt-map .tds, .ar .ar-body .kt-map .tcs { fill: var(--muted); }
.ar .ar-body .kt-map .tl { font-weight: 700; fill: var(--terra-deep); }
.ar .ar-body .kt-map .td, .ar .ar-body .kt-map .tcd { font-weight: 700; fill: var(--muted); }
.ar .ar-body .kt-map .wide .tt, .ar .ar-body .kt-map .wide .td { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .wide .ts, .ar .ar-body .kt-map .wide .tds { font-size: 19px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .wide .tc, .ar .ar-body .kt-map .wide .tcd { font-size: 21px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .wide .tcs { font-size: 18px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .wide .tl { font-size: 17px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .wide .tls, .ar .ar-body .kt-map .wide .zl { font-size: 17px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .tt, .ar .ar-body .kt-map .narrow .td { font-size: 32px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .ts, .ar .ar-body .kt-map .narrow .tl, .ar .ar-body .kt-map .narrow .tds { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .tc, .ar .ar-body .kt-map .narrow .tcd { font-size: 25px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .narrow .tls, .ar .ar-body .kt-map .narrow .zl { font-size: 24px; } /* ds-local: svg user units */
.ar .ar-body .kt-map .legend { margin-top: var(--space-4); font-size: var(--t-small); line-height: 1.7; }
.ar .ar-body .kt-map .legend p { margin: 0 0 var(--space-1); }
.ar .ar-body .kt-map .legend b { margin-right: var(--space-2); color: var(--terra-deep); }
</style>
<figure class="fg kt-map"><div role="img" aria-label="路由器全家共用一台，開四組 Wi-Fi。主 Wi-Fi 的 2.4G、5G 給爸媽和家人的手機、電腦，小程式不碰。訪客 Wi-Fi 的 2.4G 給女兒的電腦、5G 給兒子的電腦，小程式會開關。Mac mini 用網路線或主 Wi-Fi 接在路由器上，每分鐘用 SSH 查流量、開關兩組訪客 Wi-Fi。手機用 Claude App 遠端控制 Mac mini，筆電用 SSH 連 Mac mini。剩下的時間推到雲端顯示頁，孩子經自己的 Wi-Fi 打開來看。"><svg class="wide" viewBox="0 0 1034 950" aria-hidden="true"><defs><marker id="m-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="m-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker><marker id="m-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-dim" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone" x="10" y="10" width="250" height="420"/><text class="zl" x="26" y="40" text-anchor="start">我這端</text><rect class="bx" x="30" y="60" width="210" height="140"/><g class="ic"><rect x="48" y="92" width="34" height="58" rx="6"/><line x1="60" y1="142" x2="70" y2="142"/></g><text class="tt" x="98" y="116" text-anchor="start">手機</text><text class="ts" x="98" y="150" text-anchor="start">Claude App</text><rect class="bx" x="30" y="250" width="210" height="140"/><g class="ic"><rect x="48" y="290" width="48" height="32"/><line x1="42" y1="328" x2="102" y2="328"/></g><text class="tt" x="114" y="306" text-anchor="start">筆電</text><text class="ts" x="114" y="340" text-anchor="start">Claude Code</text><rect class="zone-em" x="360" y="10" width="280" height="540"/><text class="zl" x="376" y="40" text-anchor="start">家裡的 Mac mini</text><rect class="bx" x="380" y="60" width="240" height="110"/><text class="tt" x="398" y="102" text-anchor="start">Claude Code</text><text class="ts" x="398" y="136" text-anchor="start">執行我說的話</text><rect class="bx" x="380" y="230" width="240" height="100"/><text class="tt" x="398" y="270" text-anchor="start">額度紀錄</text><text class="ts" x="398" y="302" text-anchor="start">每筆加減和事由</text><rect class="bx" x="380" y="390" width="240" height="120"/><text class="tt" x="398" y="432" text-anchor="start">每分鐘計時</text><text class="ts" x="398" y="464" text-anchor="start">看流量</text><text class="ts" x="398" y="490" text-anchor="start">算有沒有在用</text><rect class="bx" x="780" y="10" width="210" height="130"/><g class="ic"><path d="M930,56 a12,12 0 0,1 4,-23 a16,16 0 0,1 30,-4 a12,12 0 0,1 10,27 z"/></g><text class="tt" x="798" y="62" text-anchor="start">顯示頁</text><text class="ts" x="798" y="94" text-anchor="start">雲端，孩子看</text><path class="ar" d="M242,130 L376,108" marker-end="url(#m-ink)"/><text class="tl" x="262" y="104" text-anchor="start">① 遠端控制</text><path class="ar" d="M242,320 L300,320 L300,150 L376,150" marker-end="url(#m-ink)"/><text class="tl" x="310" y="236" text-anchor="start">② SSH</text><path class="ar-acc" d="M500,172 L500,226" marker-end="url(#m-acc)"/><text class="tl" x="512" y="206" text-anchor="start">③ 記一筆</text><path class="ar" d="M500,332 L500,386" marker-end="url(#m-ink)"/><text class="tls" x="512" y="366" text-anchor="start">讀</text><path class="ar-acc" d="M622,440 L700,440 L700,75 L776,75" marker-end="url(#m-acc)"/><text class="tl" x="712" y="262" text-anchor="start">⑥ 有變才推</text><rect class="bx" x="10" y="600" width="985" height="140"/><g class="ic"><rect x="150" y="642" width="60" height="22" rx="4"/><line x1="162" y1="642" x2="156" y2="622"/><line x1="198" y1="642" x2="204" y2="622"/><circle cx="196" cy="653" r="3"/></g><text class="tt" x="26" y="690" text-anchor="start">路由器</text><text class="ts" x="26" y="724" text-anchor="start">全家共用一台</text><rect class="chip-dim" x="240" y="632" width="175" height="88"/><text class="tcd" x="327" y="670" text-anchor="middle">主 Wi-Fi</text><text class="tcs" x="327" y="700" text-anchor="middle">2.4 GHz</text><rect class="chip-dim" x="430" y="632" width="175" height="88"/><text class="tcd" x="517" y="670" text-anchor="middle">主 Wi-Fi</text><text class="tcs" x="517" y="700" text-anchor="middle">5 GHz</text><rect class="chip-em" x="620" y="632" width="175" height="88"/><text class="tc" x="707" y="670" text-anchor="middle">訪客 Wi-Fi</text><text class="tcs" x="707" y="700" text-anchor="middle">2.4 GHz</text><rect class="chip-em" x="810" y="632" width="175" height="88"/><text class="tc" x="897" y="670" text-anchor="middle">訪客 Wi-Fi</text><text class="tcs" x="897" y="700" text-anchor="middle">5 GHz</text><path class="ar-acc" d="M560,512 L560,582 L802,582 L802,626" marker-start="url(#m-acc)" marker-end="url(#m-acc)"/><text class="tl" x="652" y="568" text-anchor="start">④ SSH：查流量、開關訪客 Wi-Fi</text><path class="ar-wl-dim" d="M327,722 L327,786" marker-end="url(#m-dim)"/><path class="ar-wl-dim" d="M517,722 L517,786" marker-end="url(#m-dim)"/><rect class="dim" x="240" y="790" width="365" height="120"/><g class="ic"><rect x="500" y="806" width="34" height="58" rx="6"/><line x1="512" y1="856" x2="522" y2="856"/></g><g class="ic"><rect x="554" y="818" width="48" height="32"/><line x1="548" y1="856" x2="608" y2="856"/></g><text class="td" x="256" y="862" text-anchor="start">爸媽和家人</text><text class="tds" x="256" y="894" text-anchor="start">手機、電腦照常上網</text><path class="ar-wl" d="M707,722 L707,786" marker-end="url(#m-ink)"/><path class="ar-wl" d="M897,722 L897,786" marker-end="url(#m-ink)"/><text class="tl" x="716" y="762" text-anchor="start">⑤</text><text class="tl" x="906" y="762" text-anchor="start">⑤</text><rect class="bx" x="620" y="790" width="175" height="120"/><g class="ic"><rect x="735" y="800" width="48" height="32"/><line x1="759" y1="832" x2="759" y2="842"/><line x1="747" y1="842" x2="771" y2="842"/></g><text class="tt" x="636" y="872" text-anchor="start">女兒的電腦</text><text class="ts" x="636" y="900" text-anchor="start">只連訪客 2.4G</text><rect class="bx" x="810" y="790" width="175" height="120"/><g class="ic"><rect x="925" y="800" width="48" height="32"/><line x1="949" y1="832" x2="949" y2="842"/><line x1="937" y1="842" x2="961" y2="842"/></g><text class="tt" x="826" y="872" text-anchor="start">兒子的電腦</text><text class="ts" x="826" y="900" text-anchor="start">只連訪客 5G</text><path class="ar-wl" d="M707,912 L707,936 L1008,936 L1008,75 L994,75" marker-end="url(#m-ink)"/><path class="ar-wl" d="M897,912 L897,936"/><text class="tl" x="1014" y="330" transform="rotate(90 1014 330)">⑦ 經 Wi-Fi 打開看</text></svg><svg class="narrow" viewBox="0 0 600 1450" aria-hidden="true"><defs><marker id="mn-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="mn-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker><marker id="mn-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-dim" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone" x="10" y="10" width="580" height="210"/><text class="zl" x="28" y="44" text-anchor="start">我這端</text><rect class="bx" x="28" y="64" width="260" height="136"/><g class="ic"><rect x="46" y="94" width="34" height="58" rx="6"/><line x1="58" y1="144" x2="68" y2="144"/></g><text class="tt" x="96" y="124" text-anchor="start">手機</text><text class="ts" x="96" y="160" text-anchor="start">Claude App</text><rect class="bx" x="312" y="64" width="260" height="136"/><g class="ic"><rect x="332" y="100" width="48" height="32"/><line x1="326" y1="138" x2="386" y2="138"/></g><text class="tt" x="398" y="124" text-anchor="start">筆電</text><text class="ts" x="398" y="160" text-anchor="start">Claude Code</text><path class="ar" d="M158,202 L158,328" marker-end="url(#mn-ink)"/><text class="tl" x="170" y="256" text-anchor="start">① 遠端控制</text><path class="ar" d="M442,202 L442,328" marker-end="url(#mn-ink)"/><text class="tl" x="454" y="256" text-anchor="start">② SSH</text><rect class="zone-em" x="10" y="290" width="580" height="500"/><text class="zl" x="28" y="316" text-anchor="start">家裡的 Mac mini</text><rect class="bx" x="28" y="332" width="544" height="100"/><text class="tt" x="48" y="372" text-anchor="start">Claude Code</text><text class="ts" x="48" y="408" text-anchor="start">執行我說的話</text><path class="ar-acc" d="M300,432 L300,486" marker-end="url(#mn-acc)"/><text class="tl" x="312" y="466" text-anchor="start">③ 記一筆</text><rect class="bx" x="28" y="490" width="544" height="100"/><text class="tt" x="48" y="532" text-anchor="start">額度紀錄</text><text class="ts" x="48" y="566" text-anchor="start">每筆加減和事由</text><path class="ar" d="M300,592 L300,640" marker-end="url(#mn-ink)"/><text class="tls" x="312" y="624" text-anchor="start">讀</text><rect class="bx" x="28" y="644" width="544" height="120"/><text class="tt" x="48" y="688" text-anchor="start">每分鐘計時</text><text class="ts" x="48" y="724" text-anchor="start">看流量，算有沒有在用</text><path class="ar-acc" d="M141,766 L141,866" marker-start="url(#mn-acc)" marker-end="url(#mn-acc)"/><text class="tl" x="155" y="816" text-anchor="start">④ SSH</text><text class="tl" x="155" y="852" text-anchor="start">查流量、開關訪客 Wi-Fi</text><rect class="bx" x="10" y="870" width="262" height="410"/><g class="ic"><rect x="196" y="904" width="60" height="22" rx="4"/><line x1="208" y1="904" x2="202" y2="884"/><line x1="244" y1="904" x2="250" y2="884"/><circle cx="242" cy="915" r="3"/></g><text class="tt" x="28" y="912" text-anchor="start">路由器</text><text class="ts" x="28" y="948" text-anchor="start">全家共用一台</text><rect class="chip-dim" x="28" y="962" width="226" height="60"/><text class="tcd" x="141" y="1002" text-anchor="middle">主 Wi-Fi 2.4G</text><rect class="chip-dim" x="28" y="1034" width="226" height="60"/><text class="tcd" x="141" y="1074" text-anchor="middle">主 Wi-Fi 5G</text><rect class="chip-em" x="28" y="1120" width="226" height="60"/><text class="tc" x="141" y="1160" text-anchor="middle">訪客 Wi-Fi 2.4G</text><rect class="chip-em" x="28" y="1204" width="226" height="60"/><text class="tc" x="141" y="1244" text-anchor="middle">訪客 Wi-Fi 5G</text><path class="ar-wl-dim" d="M256,992 L326,992" marker-end="url(#mn-dim)"/><path class="ar-wl-dim" d="M256,1064 L326,1064" marker-end="url(#mn-dim)"/><rect class="dim" x="330" y="962" width="226" height="142"/><g class="ic"><rect x="448" y="972" width="34" height="58" rx="6"/><line x1="460" y1="1022" x2="470" y2="1022"/></g><g class="ic"><rect x="496" y="986" width="48" height="32"/><line x1="490" y1="1024" x2="550" y2="1024"/></g><text class="td" x="346" y="1062" text-anchor="start">爸媽和家人</text><text class="tds" x="346" y="1094" text-anchor="start">照常上網</text><path class="ar-wl" d="M256,1150 L326,1150" marker-end="url(#mn-ink)"/><path class="ar-wl" d="M256,1234 L326,1234" marker-end="url(#mn-ink)"/><text class="tl" x="282" y="1140" text-anchor="start">⑤</text><text class="tl" x="282" y="1224" text-anchor="start">⑤</text><rect class="bx" x="330" y="1112" width="226" height="76"/><text class="tt" x="346" y="1162" text-anchor="start">女兒的電腦</text><rect class="bx" x="330" y="1196" width="226" height="76"/><text class="tt" x="346" y="1246" text-anchor="start">兒子的電腦</text><path class="ar-acc" d="M540,766 L540,915 L578,915 L578,1375 L560,1375" marker-end="url(#mn-acc)"/><text class="tl" x="400" y="905" text-anchor="start">⑥ 有變才推</text><path class="ar-wl" d="M443,1274 L443,1316" marker-end="url(#mn-ink)"/><text class="tl" x="312" y="1304" text-anchor="start">⑦ 打開看</text><rect class="bx" x="10" y="1320" width="546" height="110"/><g class="ic"><path d="M480,1366 a12,12 0 0,1 4,-23 a16,16 0 0,1 30,-4 a12,12 0 0,1 10,27 z"/></g><text class="tt" x="28" y="1366" text-anchor="start">顯示頁</text><text class="ts" x="28" y="1404" text-anchor="start">雲端，孩子看</text></svg></div><div class="legend">
<p>實線箭頭是程式之間的連線，虛線箭頭是 Wi-Fi 無線連線。路由器的四組 Wi-Fi 裡，紅框是小程式會開關的，灰色虛線是小程式不碰的。</p>
<p><b>①</b>手機用 Claude App 的 Remote Control（遠端控制），連到 Mac mini 上的 Claude Code。</p>
<p><b>②</b>筆電上的 Claude Code 用 SSH（一種加密連線，讓另一台電腦用指令登入、操作它）連進 Mac mini，在上面執行。人在外面時，筆電和 Mac mini 都裝了 Tailscale（讓不同網路的機器連得到彼此的工具），就連得回家。</p>
<p><b>③</b>Claude Code 在額度紀錄寫一筆加減，下一分鐘計時就讀到。</p>
<p><b>④</b>Mac mini 用主 Wi-Fi 或網路線接在路由器上，小程式每分鐘用 SSH 向路由器查一次流量，再叫它開或關那個孩子的訪客 Wi-Fi。Mac mini 不接在這台路由器上的話，兩邊都裝 Tailscale 也連得到。</p>
<p><b>⑤</b>路由器開四組 Wi-Fi：主 Wi-Fi 的 2.4G、5G 給爸媽和家人，照常開著。訪客 Wi-Fi 的 2.4G 給女兒、5G 給兒子，各自只有自己那組密碼。</p>
<p><b>⑥</b>小程式把剩下的時間和時段推到雲端的顯示頁，有變才推。</p>
<p><b>⑦</b>孩子的電腦經自己的 Wi-Fi 上網，用瀏覽器打開自己的那一頁。</p>
</div><figcaption>圖 1　這個小程式由哪幾塊組成、怎麼串起來？</figcaption></figure>


以前我們各講各的，現在兩邊看的是同一本帳。

## 平常是關的，有在用才算時間

家長無法一直盯著小孩的使用，所以我家開學後定了一條家規：預設關網。兒子、女兒的 Wi-Fi 平日一早都是關的，我說「開」之前額度是 0。早上路由器自己的排程還是會打開孩子的 Wi-Fi，小程式馬上把還沒說「開」的孩子關掉。兒子做完功課或家事，我用手機的 Claude App 遠端叫 Mac mini 上的 Claude Code「開兒子的」，他就拿到當天預先設好的額度，之後還能再加或減。

預先設好的額度，平日短、週末寬一些。週末早上孩子的 Wi-Fi 會自動打開，不用等我說「開」。

Wi-Fi 開了之後，只看裝置有沒有連著還不夠，睡著的 Mac 也一直掛在網路上，時間會被白白算掉。所以小程式改看流量：這一分鐘真的有在傳東西，才算用了一分鐘。流量要超過多少才算，就是門檻：現在設在每分鐘 150KB。

這樣，我可以讓小程式自己算出孩子是不是真的有在用。兒子說中途離開的那 30 分鐘，現在算得出來：那段時間只要流量沒過門檻，就不算他在用。

<style>
.ar .ar-body .kt-day .track { position: relative; height: var(--space-6); background: var(--paper-2); }
.ar .ar-body .kt-day .seg { position: absolute; top: 0; bottom: 0; left: calc(var(--l) * 1%); width: calc(var(--w) * 1%); background: var(--ink); }
.ar .ar-body .kt-day .seg.gap { background: var(--paper); border: 1px dashed var(--terra); }
.ar .ar-body .kt-day .off { position: absolute; top: 0; bottom: 0; left: calc(var(--l) * 1%); border-left: 2px solid var(--terra); }
.ar .ar-body .kt-day .axis { position: relative; height: var(--space-5); font-size: var(--t-small); color: var(--muted); }
.ar .ar-body .kt-day .axis span { position: absolute; left: calc(var(--l) * 1%); transform: translateX(-50%); }
.ar .ar-body .kt-day .axis span.first { transform: none; }
.ar .ar-body .kt-day .axis span.last { transform: translateX(-100%); }
.ar .ar-body .kt-day .key { margin-top: var(--space-3); font-size: var(--t-small); }
.ar .ar-body .kt-day .key p { margin: 0 0 var(--space-1); font-size: var(--t-small); line-height: 1.6; }
.ar .ar-body .kt-day .key i { display: inline-block; width: var(--space-4); height: var(--space-3); margin-right: var(--space-2); vertical-align: middle; background: var(--ink); }
.ar .ar-body .kt-day .key i.gap { background: var(--paper); border: 1px dashed var(--terra); }
.ar .ar-body .kt-day .key i.off { position: static; border-left: 0; width: 2px; height: var(--space-4); background: var(--terra); }
</style>
<figure class="fg kt-day" role="img" aria-label="示意：平日一個晚上（19:00 到 21:00）的時段條。19:30 開始用 15 分鐘，流量過門檻，算在用。19:45 起離開 30 分鐘，流量沒過門檻，不算。20:15 回來再用 15 分鐘，20:30 額度用完，關掉他的 Wi-Fi。">
<p class="fg-h">平日一個晚上的時段條（示意）</p>
<div class="track">
<span class="seg" style="--l:25;--w:12.5"></span>
<span class="seg gap" style="--l:37.5;--w:25"></span>
<span class="seg" style="--l:62.5;--w:12.5"></span>
<span class="off" style="--l:75"></span>
</div>
<div class="axis"><span class="first" style="--l:0">19:00</span><span style="--l:25">19:30</span><span style="--l:50">20:00</span><span style="--l:75">20:30</span><span class="last" style="--l:100">21:00</span></div>
<div class="key">
<p><i></i>流量過門檻，算在用：兩段各 15 分鐘</p>
<p><i class="gap"></i>離開 30 分鐘：流量沒過門檻，不算</p>
<p><i class="off"></i>額度用完，關掉他的 Wi-Fi</p>
</div>
<p class="fg-note">示意資料，不是孩子的實際用量。真正的顯示頁畫的是一整天 24 小時。</p>
<figcaption>圖 2　時段條怎麼算出「中途離開的 30 分鐘」？</figcaption>
</figure>


有了時段條以後，「到底用了多久」這種事，就沒有再吵過了。

## 要準備什麼、自己做多少

想自己做的話，照我家的架構要準備三樣東西。前兩樣是一台一直開著的電腦，和裝在它上面的 AI 工具。第三樣是一台能單獨開關孩子 Wi-Fi 的路由器。

<style>
.ar .ar-body .kt-prep { margin: var(--space-6) 0; }
.ar .ar-body .kt-prep svg { display: block; width: 100%; height: auto; overflow: visible; }
.ar .ar-body .kt-prep .narrow { display: none; }
@media (max-width: 700px) { .ar .ar-body .kt-prep .wide { display: none; } .ar .ar-body .kt-prep .narrow { display: block; } }
.ar .ar-body .kt-prep .bx { fill: var(--paper); stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-prep .zone-em { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-prep .sep { stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 6 5; }
.ar .ar-body .kt-prep .ic { fill: none; stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-prep .ic circle { fill: var(--ink); }
.ar .ar-body .kt-prep .ar { fill: none; stroke: var(--ink); stroke-width: 2.5; }
.ar .ar-body .kt-prep .ar-acc { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-prep .mk-ink { fill: var(--ink); }
.ar .ar-body .kt-prep .mk-acc { fill: var(--terra); }
.ar .ar-body .kt-prep text { font-family: var(--ar-text, 'Noto Serif TC', serif); fill: var(--ink); }
.ar .ar-body .kt-prep .tt { font-weight: 700; }
.ar .ar-body .kt-prep .ts { fill: var(--muted); }
.ar .ar-body .kt-prep .tl { font-weight: 700; fill: var(--terra-deep); }
.ar .ar-body .kt-prep .wide .tt { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-prep .wide .ts { font-size: 19px; } /* ds-local: svg user units */
.ar .ar-body .kt-prep .wide .tl { font-size: 17px; } /* ds-local: svg user units */
.ar .ar-body .kt-prep .narrow .tt { font-size: 32px; } /* ds-local: svg user units */
.ar .ar-body .kt-prep .narrow .ts, .ar .ar-body .kt-prep .narrow .tl { font-size: 26px; } /* ds-local: svg user units */
</style>
<figure class="fg kt-prep"><div role="img" aria-label="左邊大框是一直開著的電腦，要設成不睡眠，我家是 Mac mini，Windows 應該也行。框裡上面是 AI 工具，我用的是 Claude Code，Codex、Grok Build 應該也行。下面是 AI 寫的小程式，每分鐘查流量、開關孩子的 Wi-Fi。AI 工具有箭頭指到小程式，標「寫出來、之後再改」。右邊框是路由器，要做到三件事：主 Wi-Fi 之外還能開訪客 Wi-Fi，每組都能單獨開關。以 OpenWrt 為基礎、能用 SSH 登入。自己有排程。我家是 GL.iNet Flint 3e。小程式用 SSH 連到路由器。"><svg class="wide" viewBox="0 0 1034 520" aria-hidden="true"><defs><marker id="p-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="p-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone-em" x="10" y="10" width="550" height="500"/><g class="ic"><rect x="476" y="34" width="56" height="20" rx="4"/><line x1="482" y1="60" x2="526" y2="60"/></g><text class="tt" x="30" y="56" text-anchor="start">一直開著的電腦</text><text class="ts" x="30" y="92" text-anchor="start">要：不睡眠</text><text class="ts" x="30" y="122" text-anchor="start">我家：Mac mini（Windows 應該也行）</text><rect class="bx" x="40" y="150" width="490" height="124"/><text class="tt" x="60" y="190" text-anchor="start">AI 工具</text><text class="ts" x="60" y="224" text-anchor="start">Claude Code（我用的）</text><text class="ts" x="60" y="254" text-anchor="start">Codex、Grok Build 應該也行</text><path class="ar" d="M285,276 L285,350" marker-end="url(#p-ink)"/><text class="tl" x="300" y="320" text-anchor="start">寫出來、之後再改</text><rect class="bx" x="40" y="354" width="490" height="124"/><text class="tt" x="60" y="396" text-anchor="start">小程式（AI 寫的）</text><text class="ts" x="60" y="430" text-anchor="start">每分鐘查流量</text><text class="ts" x="60" y="460" text-anchor="start">開關孩子的 Wi-Fi</text><path class="ar-acc" d="M532,416 L676,416" marker-end="url(#p-acc)"/><text class="tl" x="604" y="402" text-anchor="middle">SSH</text><rect class="bx" x="680" y="120" width="344" height="390"/><g class="ic"><rect x="944" y="158" width="60" height="22" rx="4"/><line x1="956" y1="158" x2="950" y2="138"/><line x1="992" y1="158" x2="998" y2="138"/><circle cx="990" cy="169" r="3"/></g><text class="tt" x="700" y="166" text-anchor="start">路由器</text><text class="ts" x="700" y="210" text-anchor="start">要：</text><text class="ts" x="700" y="248" text-anchor="start">・主 Wi-Fi 之外還能開訪客 Wi-Fi</text><text class="ts" x="700" y="276" text-anchor="start">　每組能單獨開關</text><text class="ts" x="700" y="314" text-anchor="start">・以 OpenWrt 為基礎、能 SSH</text><text class="ts" x="700" y="352" text-anchor="start">・自己有排程</text><line class="sep" x1="700" y1="420" x2="1004" y2="420"/><text class="ts" x="700" y="466" text-anchor="start">我家：GL.iNet Flint 3e</text></svg><svg class="narrow" viewBox="0 0 600 950" aria-hidden="true"><defs><marker id="pn-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="pn-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone-em" x="10" y="10" width="580" height="520"/><g class="ic"><rect x="506" y="30" width="56" height="20" rx="4"/><line x1="512" y1="56" x2="556" y2="56"/></g><text class="tt" x="28" y="56" text-anchor="start">一直開著的電腦</text><text class="ts" x="28" y="94" text-anchor="start">要：不睡眠</text><text class="ts" x="28" y="128" text-anchor="start">我家：Mac mini（Windows 應該也行）</text><rect class="bx" x="28" y="154" width="544" height="136"/><text class="tt" x="48" y="196" text-anchor="start">AI 工具</text><text class="ts" x="48" y="232" text-anchor="start">Claude Code（我用的）</text><text class="ts" x="48" y="266" text-anchor="start">Codex、Grok Build 應該也行</text><path class="ar" d="M300,292 L300,366" marker-end="url(#pn-ink)"/><text class="tl" x="314" y="338" text-anchor="start">寫出來、之後再改</text><rect class="bx" x="28" y="370" width="544" height="136"/><text class="tt" x="48" y="412" text-anchor="start">小程式（AI 寫的）</text><text class="ts" x="48" y="448" text-anchor="start">每分鐘查流量</text><text class="ts" x="48" y="482" text-anchor="start">開關孩子的 Wi-Fi</text><path class="ar-acc" d="M300,508 L300,612" marker-end="url(#pn-acc)"/><text class="tl" x="314" y="566" text-anchor="start">SSH</text><rect class="bx" x="10" y="616" width="580" height="324"/><g class="ic"><rect x="506" y="652" width="60" height="22" rx="4"/><line x1="518" y1="652" x2="512" y2="632"/><line x1="554" y1="652" x2="560" y2="632"/><circle cx="552" cy="663" r="3"/></g><text class="tt" x="28" y="662" text-anchor="start">路由器</text><text class="ts" x="28" y="704" text-anchor="start">要：</text><text class="ts" x="28" y="742" text-anchor="start">・主 Wi-Fi 之外還能開訪客 Wi-Fi</text><text class="ts" x="28" y="776" text-anchor="start">　每組能單獨開關</text><text class="ts" x="28" y="814" text-anchor="start">・以 OpenWrt 為基礎、能 SSH</text><text class="ts" x="28" y="852" text-anchor="start">・自己有排程</text><line class="sep" x1="28" y1="878" x2="572" y2="878"/><text class="ts" x="28" y="918" text-anchor="start">我家：GL.iNet Flint 3e</text></svg></div><figcaption>圖 3　要準備哪幾樣，AI 和程式各放在哪？</figcaption></figure>


**電腦**：要設成不睡眠。換成 Windows 電腦應該也可以（Claude Code 有 Windows 版），我沒試過。

**AI 工具**：要用裝在家裡那台電腦上的 AI Agent，像 [Claude Code](/zh-TW/blog/claude-code-tutorial/)（會自己動手下指令的 AI），不是 claude.ai、ChatGPT 這種在網頁上聊天的 AI。聊天的 AI 可以幫你寫程式，但指令下不到你家那台電腦上，碰不到你家的路由器。

我是用 Claude Code 做的，筆電用 SSH（另一台電腦用指令登入、操作它的方式）連進 Mac mini，或用手機的 Claude App 遠端控制。OpenAI 的 Codex、xAI 的 Grok Build 也是這類工具，應該也做得到，一樣能用 SSH 連進那台電腦操作。手機遙控 Codex，家裡那台電腦要裝 ChatGPT 的桌面 App，手機再用 ChatGPT 的 App 連過去。

**路由器**：要做得到這三件事。

- 除了主 Wi-Fi 還能開訪客 Wi-Fi，而且每一組都能單獨開關，這樣才能只關孩子的、不動到大人的。
- 系統以 OpenWrt（開放原始碼的路由器系統）為基礎、能用 SSH 登入，家裡那台電腦才能用指令查流量、開關 Wi-Fi。
- 自己有排程，晚上關掉孩子的 Wi-Fi、早上打開，所以家裡那台電腦當機時，孩子的 Wi-Fi 最晚隔天早上也會打開。

OpenWrt 和 SSH 是挑型號時最該找的兩個關鍵字。挑出廠時系統就以 OpenWrt 為基礎的型號，就不用自己換掉路由器原本的系統（刷機）。

家裡那台電腦用網路線或主 Wi-Fi 接在這台路由器上，就能直接用 SSH 連它。沒接在這台底下，路由器就要能裝 Tailscale（讓不同網路的機器連得到彼此的工具），跟那台電腦兩邊都裝上。人在外面要用筆電連回家，也是靠 Tailscale，筆電和那台電腦都要裝。

> **我家用的這台**：<a href="https://www.amazon.com/dp/B0FX9C5QVJ?&amp;linkCode=ll2&amp;tag=yuwenhao-20&amp;linkId=d60b9045636fffa192386031fc34ec74&amp;language=zh_TW&amp;gaOptInStatus=true&amp;ref_=as_li_ss_tl" target="_blank" rel="sponsored nofollow noopener noreferrer">GL.iNet Flint 3e（GL-BE6500）</a>。系統以 OpenWrt 為基礎、能用 SSH 登入，後台也內建 Tailscale。

**自己做多少**：路由器是在 Amazon 美國站買的，從加州寄來台灣，下單後九天收到。程式的部分兩個晚上就做完了。程式、測試和顯示頁，都交給 Claude Code。

## 會不會變成家裡的資安破口？

外人要的，是偷你的密碼和 API token（程式登入用的通行碼）、用你的帳號花你的錢。或是改你家路由器，把你導到假網站。

我盤點了我家的架構，能開關網路的東西集中在一台一直開著的電腦上。登入路由器的一把金鑰（代替密碼的檔案）放在它上面，從外面碰得到這台電腦的，是 AI 工具和 Tailscale 兩個帳號。

<style>
.ar .ar-body .kt-sec { margin: var(--space-6) 0; }
.ar .ar-body .kt-sec svg { display: block; width: 100%; height: auto; overflow: visible; }
.ar .ar-body .kt-sec .narrow { display: none; }
@media (max-width: 700px) { .ar .ar-body .kt-sec .wide { display: none; } .ar .ar-body .kt-sec .narrow { display: block; } }
.ar .ar-body .kt-sec .bx { fill: var(--paper); stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-sec .chip { fill: var(--paper-2); stroke: var(--ink); stroke-width: 1.5; }
.ar .ar-body .kt-sec .zone { fill: none; stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 8 6; }
.ar .ar-body .kt-sec .zone-em { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-sec .grp { fill: none; stroke: var(--terra); stroke-width: 1.5; stroke-dasharray: 4 5; }
.ar .ar-body .kt-sec .dim { fill: var(--paper); stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 8 6; }
.ar .ar-body .kt-sec .sep { stroke: var(--muted); stroke-width: 1.5; stroke-dasharray: 6 5; }
.ar .ar-body .kt-sec .ic { fill: none; stroke: var(--ink); stroke-width: 2; }
.ar .ar-body .kt-sec .ic circle { fill: var(--ink); }
.ar .ar-body .kt-sec .ar { fill: none; stroke: var(--ink); stroke-width: 2.5; }
.ar .ar-body .kt-sec .ar-acc { fill: none; stroke: var(--terra); stroke-width: 2.5; }
.ar .ar-body .kt-sec .ar-out { fill: none; stroke: var(--terra); stroke-width: 2.5; stroke-dasharray: 7 6; }
.ar .ar-body .kt-sec .blk { stroke: var(--terra); stroke-width: 6; }
.ar .ar-body .kt-sec .mk-ink { fill: var(--ink); }
.ar .ar-body .kt-sec .mk-acc { fill: var(--terra); }
.ar .ar-body .kt-sec .bd circle { fill: var(--terra); }
.ar .ar-body .kt-sec .bd text { fill: var(--paper); font-weight: 700; }
.ar .ar-body .kt-sec text { font-family: var(--ar-text, 'Noto Serif TC', serif); fill: var(--ink); }
.ar .ar-body .kt-sec .tt { font-weight: 700; }
.ar .ar-body .kt-sec .ts, .ar .ar-body .kt-sec .zl { fill: var(--muted); }
.ar .ar-body .kt-sec .td { font-weight: 700; fill: var(--muted); }
.ar .ar-body .kt-sec .tl { font-weight: 700; fill: var(--terra-deep); }
.ar .ar-body .kt-sec .wide .tt, .ar .ar-body .kt-sec .wide .td { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .wide .ts { font-size: 19px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .wide .tl, .ar .ar-body .kt-sec .wide .zl { font-size: 17px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .wide .bd text { font-size: 18px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .narrow .tt { font-size: 32px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .narrow .ts, .ar .ar-body .kt-sec .narrow .tl, .ar .ar-body .kt-sec .narrow .td { font-size: 26px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .narrow .zl, .ar .ar-body .kt-sec .narrow .bd text { font-size: 24px; } /* ds-local: svg user units */
.ar .ar-body .kt-sec .legend { margin-top: var(--space-4); font-size: var(--t-small); line-height: 1.7; }
.ar .ar-body .kt-sec .legend p { margin: 0 0 var(--space-2); font-size: var(--t-small); }
</style>
<figure class="fg kt-sec"><div role="img" aria-label="家裡一台路由器，Mac mini 接在主 Wi-Fi，裡面有 Claude Code 和登入路由器的金鑰。孩子的電腦在另一個網路（訪客 Wi-Fi）。手機經 Claude 帳號、筆電經 Tailscale 帳號連回家。四個紅圈是要守的地方：①門口擋下陌生人，②兩個帳號，③假的安裝頁和有毒的套件進電腦的那條路，④金鑰。編號對應下面的四條原則。"><svg class="wide" viewBox="0 0 1034 680" aria-hidden="true"><defs><marker id="s-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="s-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone" x="10" y="10" width="260" height="660"/><text class="zl" x="26" y="40" text-anchor="start">外面</text><rect class="bx" x="30" y="65" width="220" height="110"/><g class="ic"><rect x="46" y="91" width="34" height="58" rx="6"/><line x1="58" y1="141" x2="68" y2="141"/></g><text class="tt" x="96" y="112" text-anchor="start">手機</text><text class="ts" x="96" y="150" text-anchor="start">Claude App</text><rect class="bx" x="30" y="205" width="220" height="110"/><g class="ic"><rect x="48" y="236" width="48" height="32"/><line x1="42" y1="274" x2="102" y2="274"/></g><text class="tt" x="114" y="252" text-anchor="start">筆電</text><text class="ts" x="114" y="288" text-anchor="start">Tailscale</text><rect class="dim" x="30" y="465" width="220" height="90"/><text class="td" x="50" y="519" text-anchor="start">網路上的陌生人</text><rect class="grp" x="288" y="50" width="288" height="278"/><rect class="bx" x="300" y="65" width="270" height="110"/><text class="tt" x="320" y="112" text-anchor="start">Claude 帳號</text><text class="ts" x="320" y="150" text-anchor="start">遠端控制經過這裡</text><rect class="bx" x="300" y="205" width="270" height="110"/><text class="tt" x="320" y="252" text-anchor="start">Tailscale 帳號</text><text class="ts" x="320" y="288" text-anchor="start">連回家經過這裡</text><rect class="dim" x="300" y="360" width="270" height="84"/><text class="td" x="320" y="394" text-anchor="start">假的安裝頁、</text><text class="td" x="320" y="428" text-anchor="start">有毒的套件</text><path class="ar" d="M252,120 L296,120" marker-end="url(#s-ink)"/><path class="ar" d="M572,120 L662,120" marker-end="url(#s-ink)"/><text class="tl" x="613" y="108" text-anchor="middle">遠端控制</text><path class="ar" d="M252,260 L296,260" marker-end="url(#s-ink)"/><path class="ar" d="M572,260 L662,260" marker-end="url(#s-ink)"/><text class="tl" x="613" y="248" text-anchor="middle">連回家</text><path class="ar-acc" d="M572,402 L662,402" marker-end="url(#s-acc)"/><path class="ar-out" d="M252,510 L638,510"/><line class="blk" x1="644" y1="486" x2="644" y2="534"/><text class="tl" x="440" y="498" text-anchor="middle">門沒開</text><rect class="zone-em" x="650" y="10" width="374" height="660"/><text class="zl" x="666" y="40" text-anchor="start">家裡（一台路由器）</text><rect class="bx" x="666" y="58" width="340" height="380"/><text class="tt" x="686" y="94" text-anchor="start">Mac mini</text><text class="ts" x="820" y="94" text-anchor="start">接在主 Wi-Fi</text><rect class="chip" x="686" y="108" width="300" height="150"/><text class="tt" x="706" y="165" text-anchor="start">Claude Code</text><text class="ts" x="706" y="203" text-anchor="start">會照指令做事</text><rect class="chip" x="816" y="300" width="170" height="108"/><text class="tt" x="836" y="344" text-anchor="start">金鑰</text><text class="ts" x="836" y="382" text-anchor="start">登入路由器用</text><path class="ar-acc" d="M901,410 L901,466" marker-end="url(#s-acc)"/><text class="tl" x="912" y="462" text-anchor="start">SSH</text><rect class="bx" x="666" y="470" width="340" height="80"/><g class="ic"><rect x="930" y="502" width="60" height="22" rx="4"/><line x1="942" y1="502" x2="936" y2="482"/><line x1="978" y1="502" x2="984" y2="482"/><circle cx="976" cy="513" r="3"/></g><text class="tt" x="686" y="520" text-anchor="start">路由器後台</text><line class="sep" x1="666" y1="580" x2="760" y2="580"/><line class="sep" x1="912" y1="580" x2="1006" y2="580"/><text class="ts" x="836" y="586" text-anchor="middle">不在同一個網路</text><rect class="bx" x="666" y="600" width="340" height="46"/><text class="tt" x="686" y="632" text-anchor="start">孩子的電腦</text><text class="ts" x="846" y="632" text-anchor="start">連訪客 Wi-Fi</text><g class="bd"><circle cx="612" cy="510" r="15"/><text x="612" y="516" text-anchor="middle">①</text></g><g class="bd"><circle cx="576" cy="50" r="15"/><text x="576" y="56" text-anchor="middle">②</text></g><g class="bd"><circle cx="570" cy="360" r="15"/><text x="570" y="366" text-anchor="middle">③</text></g><g class="bd"><circle cx="986" cy="300" r="15"/><text x="986" y="306" text-anchor="middle">④</text></g></svg><svg class="narrow" viewBox="0 0 600 1420" aria-hidden="true"><defs><marker id="sn-ink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-ink" d="M0,0 L10,5 L0,10 z"/></marker><marker id="sn-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk-acc" d="M0,0 L10,5 L0,10 z"/></marker></defs><rect class="zone" x="10" y="10" width="580" height="190"/><text class="zl" x="28" y="40" text-anchor="start">外面</text><rect class="bx" x="28" y="56" width="262" height="124"/><g class="ic"><rect x="46" y="88" width="34" height="58" rx="6"/><line x1="58" y1="138" x2="68" y2="138"/></g><text class="tt" x="96" y="112" text-anchor="start">手機</text><text class="ts" x="96" y="152" text-anchor="start">Claude App</text><rect class="bx" x="310" y="56" width="262" height="124"/><g class="ic"><rect x="328" y="100" width="48" height="32"/><line x1="322" y1="138" x2="382" y2="138"/></g><text class="tt" x="396" y="112" text-anchor="start">筆電</text><text class="ts" x="396" y="152" text-anchor="start">Tailscale</text><rect class="grp" x="16" y="226" width="568" height="146"/><rect class="bx" x="28" y="240" width="262" height="120"/><text class="tt" x="48" y="288" text-anchor="start">Claude 帳號</text><text class="ts" x="48" y="330" text-anchor="start">遠端控制經過</text><rect class="bx" x="310" y="240" width="262" height="120"/><text class="tt" x="328" y="288" text-anchor="start">Tailscale 帳號</text><text class="ts" x="328" y="330" text-anchor="start">連回家經過</text><rect class="dim" x="180" y="400" width="240" height="96"/><text class="td" x="198" y="438" text-anchor="start">假的安裝頁、</text><text class="td" x="198" y="478" text-anchor="start">有毒的套件</text><rect class="zone-em" x="10" y="520" width="580" height="750"/><rect class="bx" x="28" y="560" width="544" height="330"/><text class="tt" x="340" y="814" text-anchor="start">Mac mini</text><text class="ts" x="340" y="854" text-anchor="start">接在主 Wi-Fi</text><rect class="chip" x="48" y="616" width="504" height="116"/><text class="tt" x="68" y="666" text-anchor="start">Claude Code</text><text class="ts" x="68" y="710" text-anchor="start">會照指令做事</text><rect class="chip" x="48" y="752" width="264" height="116"/><text class="tt" x="68" y="802" text-anchor="start">金鑰</text><text class="ts" x="68" y="846" text-anchor="start">登入路由器用</text><path class="ar-acc" d="M180,870 L180,942" marker-end="url(#sn-acc)"/><text class="tl" x="196" y="916" text-anchor="start">SSH</text><rect class="bx" x="28" y="946" width="544" height="96"/><g class="ic"><rect x="488" y="980" width="60" height="22" rx="4"/><line x1="500" y1="980" x2="494" y2="960"/><line x1="536" y1="980" x2="542" y2="960"/><circle cx="534" cy="991" r="3"/></g><text class="tt" x="48" y="1006" text-anchor="start">路由器後台</text><line class="sep" x1="48" y1="1080" x2="170" y2="1080"/><line class="sep" x1="430" y1="1080" x2="552" y2="1080"/><text class="ts" x="300" y="1089" text-anchor="middle">不在同一個網路</text><rect class="bx" x="28" y="1110" width="544" height="96"/><text class="tt" x="48" y="1170" text-anchor="start">孩子的電腦</text><text class="ts" x="300" y="1170" text-anchor="start">連訪客 Wi-Fi</text><text class="zl" x="28" y="1248" text-anchor="start">家裡（一台路由器）</text><path class="ar-out" d="M300,1328 L300,1278"/><line class="blk" x1="270" y1="1272" x2="330" y2="1272"/><text class="tl" x="372" y="1306" text-anchor="start">門沒開</text><rect class="dim" x="169" y="1330" width="262" height="80"/><text class="td" x="188" y="1382" text-anchor="start">網路上的陌生人</text><path class="ar" d="M159,182 L159,236" marker-end="url(#sn-ink)"/><path class="ar" d="M441,182 L441,236" marker-end="url(#sn-ink)"/><path class="ar" d="M159,374 L159,612" marker-end="url(#sn-ink)"/><text class="tl" x="40" y="456" text-anchor="start">遠端控制</text><path class="ar" d="M441,374 L441,556" marker-end="url(#sn-ink)"/><text class="tl" x="456" y="456" text-anchor="start">連回家</text><path class="ar-acc" d="M300,498 L300,556" marker-end="url(#sn-acc)"/><g class="bd"><circle cx="340" cy="1298" r="20"/><text x="340" y="1306" text-anchor="middle">①</text></g><g class="bd"><circle cx="584" cy="226" r="20"/><text x="584" y="234" text-anchor="middle">②</text></g><g class="bd"><circle cx="420" cy="400" r="20"/><text x="420" y="408" text-anchor="middle">③</text></g><g class="bd"><circle cx="312" cy="752" r="20"/><text x="312" y="760" text-anchor="middle">④</text></g></svg></div><div class="legend"><p>紅色圓圈是要守的地方，編號對應下面的四條原則。</p></div><figcaption>圖 4　這種做法要守哪四個地方？</figcaption></figure>


外人要進來，只有三條路：直接敲門、冒用帳號，或騙你或 AI 把壞東西裝進電腦。下面四條原則，前三條各守一條路，第四條讓人就算進來了，也做不了什麼。

**1. 門不要開**：不讓外面直接連進來，連回家用 Tailscale 這類工具。只有加進你自己 Tailscale 網路的裝置連得到，連線也有加密。人在外面也連得回家，家裡卻不用對外開門。

**2. 帳號和密碼都要上鎖**：Claude、Tailscale 都沒有自己的密碼，用 Google 這類帳號登入。替登入用的帳號開兩步驟驗證，兩邊用不同帳號就兩個都開，新裝置得先過這關。顯示頁的雲端服務也要鎖，密碼和 token 不寫在檔案裡。

**3. 電腦要乾淨**：要裝的東西只從官方網址下載，AI 裝的也一樣，路由器、電腦、AI 工具都更新。

**4. 權限給到剛好**：AI 會照它讀到的指令做事，網頁、檔案裡別人藏進去的也一樣。所以登入路由器的金鑰只給查流量、開關 Wi-Fi 的權限，AI 也不開跳過確認的模式。

2026 年起，有人買搜尋廣告做假的 Claude Code 安裝頁，叫你貼一行指令，Mac 就[中了偷資料的木馬](https://www.kaspersky.co.za/about/press-releases/kaspersky-discovers-infostealers-mimicking-claude-code-openclaw-and-other-ai-developer-tools)。它會偷瀏覽器的登入狀態，[兩步驟驗證只管登入那一刻](https://blog.google/chromium/fighting-cookie-theft-using-device/)，所以第 3 條更要緊。假頁甚至放在 claude.ai 上[別人分享的對話頁](https://www.huntress.com/blog/fake-claude-macsync)，連網址都是真的。最可靠的分辨方法，是看你怎麼到那一頁：自己打官方網址 code.claude.com，不要點廣告。

下一節那段需求，寫進了這四條。路由器和程式的設定，AI 會照著做。帳號的兩步驟驗證要你自己開，AI 會提醒你。

## 想自己做？把這段需求貼給 Claude Code

你不需要我的程式，需要的是把你家的環境、規則和需求講清楚。下面這段可以直接貼給 Claude Code、Codex 這類裝在電腦上的 AI 工具，把【】換成你家的情況。貼上之後，AI 會先問你還缺哪些資訊，再提出架構和步驟，一步步帶你做完。這段的最後一句，就是請它每一步動手前先跟你確認。你不用懂程式。

```text
我想在家裡做一個管孩子上網時間的小程式，請幫我規劃，再一步一步做出來。

我家的情況：
- 孩子：【幾個孩子，各用哪些裝置】
- 一台一直開著的電腦：【型號、作業系統】
- 一台全家共用的路由器：【型號】。它要能開多個 Wi-Fi，也能單獨開關其中一個。如果你不確定這台路由器的系統是不是以 OpenWrt 為基礎、能不能用 SSH 登入，請先幫我查。
- 家裡那台電腦【接在這台路由器的主網（網路線或主 Wi-Fi）／不在這台路由器底下】。不在這台路由器底下的話，可以用 Tailscale 這類工具連起來。接好之後，先幫我確認那台電腦連得到路由器的後台。不確定怎麼接的話，我可以拍路由器背面的照片給你看。
- 家長和其他家人用的網路：這台路由器的主 Wi-Fi

我要的規則：
- 每個孩子一個專屬 Wi-Fi，開在路由器的訪客 Wi-Fi 上，只給他自己那組密碼。每個孩子的 Wi-Fi 只放在一個頻段，例如一個 2.4G、一個 5G。規則跟著孩子走，綁在他自己的 Wi-Fi 上，不認裝置。建好之後，幫我確認孩子的 Wi-Fi 真的建在訪客 Wi-Fi 上。
- 每天的額度：【平日幾分鐘、週末幾分鐘】。半夜歸零，沒用完不留到隔天。
- 用流量判斷有沒有在用：一分鐘內流量超過某個門檻才算用了一分鐘，睡著的電腦不要被算時間。門檻先記錄幾天，再依實際數字建議給我。
- 額度用完，就關掉那個孩子的 Wi-Fi。
- 晚上由路由器自己的排程強制關掉孩子的 Wi-Fi：【幾點關掉、早上幾點打開】。排程只排孩子那幾組，不能關到主 Wi-Fi；這台路由器做不到的話，先跟我說。我說「開」就是今天放行，每天、每個孩子各說一次（週末可以設成早上自動放行）。早上由路由器的排程把孩子的 Wi-Fi 打開，小程式再把還沒放行的孩子關掉。這樣小程式壞了，孩子的 Wi-Fi 最晚隔天早上也會打開。

我怎麼操作：
- 我想在【用手機遠端控制家裡那台電腦／在那台電腦前面】跟你說，人不在家也要能操作。
- 用一句話加時間、扣時間、今天不限、提前斷今天。今天不限是到晚上關掉孩子的 Wi-Fi 前都不扣。提前斷今天是今天剩下的時間，孩子的 Wi-Fi 都不開。每一筆都記下事由。

孩子看得到的：
- 每個孩子一頁網頁，顯示今天還剩多少、24 小時裡哪幾段在用、每筆加減的事由。
- 紀錄留在家裡那台電腦，網頁放在雲端，有變才更新。孩子的訪客 Wi-Fi 通常跟主網隔開，連不到家裡那台電腦，網頁放家裡他們打不開。

安全原則：
- 程式出錯時，往網路開著那邊壞，不要因為程式壞掉就關掉孩子的 Wi-Fi。
- 登入路由器用金鑰，不要叫我把密碼貼進對話。
- 設定都做完之後，關掉路由器 SSH 的密碼登入，這把金鑰只能做查流量和開關 Wi-Fi 這幾件事。
- 不要設連接埠轉送、不要開路由器的遠端管理，從外面連回家用 Tailscale 這類工具。
- 用 Tailscale 的話，幫我設規則，只讓要連的那幾台互連。
- 幫我列出要更新的東西（路由器韌體、Tailscale、家裡那台電腦的系統、AI 工具），提醒我定期更新。
- 提醒我替登入 AI 工具、Tailscale 和放網頁的雲端服務用的帳號（例如 Google）開兩步驟驗證，打開遠端控制的信任裝置和 Tailscale 的裝置核准，路由器後台不要用簡單的密碼。
- 程式要用的密碼和 token 不要明文寫在檔案裡，改用系統的鑰匙圈或密碼管理器。
- 如果我開的是跳過確認的模式，先提醒我換掉，做這個專案都不要用。
- 需要裝套件時，只從官方來源裝，裝之前先跟我說。
- 建好之後，從孩子的 Wi-Fi 試一次，確認連不到家裡那台電腦和路由器後台。
- 先只記錄、不關孩子的 Wi-Fi，跑幾天確認數字合理，再開始真的關。
- 不要動到家長用的主 Wi-Fi。開始真的關之前，先切換孩子的 Wi-Fi 測幾次，用 ping 確認主 Wi-Fi 上的裝置沒有斷線。

請先問我還缺哪些資訊，再提出架構和步驟，每一步動手前先跟我確認。
```

*文中的 Amazon 連結是聯盟連結，透過它購買我會收到一點佣金，你的費用不變。As an Amazon Associate I earn from qualifying purchases.*
