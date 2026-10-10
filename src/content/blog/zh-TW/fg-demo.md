---
title: "圖表元件示範：四種可以直接複製的寫法"
description: "這一頁只在本機預覽看得到，不會上線。四種圖表元件各放一個範例，寫文章時把那一段複製過去改字就能用。"
pubDate: 2026-10-11
category: building-products
topics: ["ai-practice"]
tags: ["內部示範"]
lang: zh-TW
draft: true
featured: false
---
這一頁是草稿，只在本機預覽出現。下面的數字都是 2026-10-10 這次改版時實際量到的，不是示意數字。

每個範例後面的內文段落是用來看「圖表和上下文放在一起」的樣子。要用的時候，打開這個檔案，把對應的那一段 HTML 複製到文章裡改字。

## 比較長條

適合：同一個數字，在幾個對象之間比大小。重點那一列加上 `is-em` 會變成橘色。

<figure class="fg fg-bars">
<p class="fg-h">中文文章一行排幾個字</p>
<div class="row"><span class="l">報導者</span><span class="bar" style="--v:64"></span><span class="n">32<small>字</small></span></div>
<div class="row"><span class="l">端傳媒</span><span class="bar" style="--v:78"></span><span class="n">39<small>字</small></span></div>
<div class="row"><span class="l">justfont 部落格</span><span class="bar" style="--v:82"></span><span class="n">41<small>字</small></span></div>
<div class="row"><span class="l">匯流顧問</span><span class="bar" style="--v:90"></span><span class="n">45<small>字</small></span></div>
<div class="row is-em"><span class="l">個人站（新版）</span><span class="bar" style="--v:92"></span><span class="n">46<small>字</small></span></div>
<p class="fg-note">1440 寬的螢幕上量到的數字。長條的長度以 50 字為滿格。</p>
</figure>

長條的長度寫在 `--v` 裡，填 0 到 100。數字和單位自己打，元件不會幫你算。

## 並列欄

適合：兩到四個並排的選項或組成。欄數會自己排，手機上變成兩欄。

<figure class="fg fg-cols">
<div class="c"><b>01</b><strong>內文黑體，標題明體</strong><span>台灣深度媒體最常見的搭法。</span><em>報導者、端傳媒</em></div>
<div class="c"><b>02</b><strong>內文和標題都是明體</strong><span>書卷氣最重，容易往線裝書的方向靠。</span><em>匯流顧問、Every</em></div>
<div class="c is-em"><b>03</b><strong>內文明體，標題換一套有份量的字</strong><span>內文維持好讀，標題負責辨識度。</span><em>個人站這次選的</em></div>
</figure>

每一欄有四個位置：編號、標題、一句說明、最下面的小字。小字可以不放。

## 步驟

適合：有先後順序的流程。編號是自動的，不用自己打。

<figure class="fg fg-steps">
<p class="fg-h">新文章用到新的字時</p>
<div class="s"><strong>寫完文章，存檔</strong><span>文章放在 src/content/blog/zh-TW/。</span></div>
<div class="s"><strong>重新產生字型檔</strong><span>跑 npm run fonts，它只會重做內容有變動的文章。</span></div>
<div class="s"><strong>照常建置</strong><span>上一步漏跑的話，建置會停下來，並列出是哪幾篇。</span></div>
</figure>

## 重點框

適合：整篇文章希望讀者帶走的幾句話，或是文末的自我檢查清單。一篇文章最多用一次。

<div class="fg fg-key">
<p class="fg-h">這次改版改了什麼</p>
<div class="k">文章的文字、表格、程式碼收成同一個欄寬。</div>
<div class="k">標題換成昭源宋體，內文換成源雲明體。</div>
<div class="k">多了四個圖表元件，就是這一頁示範的這些。</div>
</div>

重點框後面接一般段落，看間距是否合適。
