/* download-demo.js — 一鍵下載 demo 報表檔（學員下載後放進自己的 project 資料夾）
   用法：<a class="dl-row" href="assets/p63-mvp/X.html" download="X.html" data-download="X.html">…</a>
   file:// 開 deck 時，Chrome 會忽略 <a download> 的檔名、直接把 HTML 開成新分頁，
   所以優先用 assets/p63-mvp/demo-embed.js 內嵌的內容做 Blob 下載；
   內嵌檔沒載到才退回 anchor 原生行為（開新分頁 → 學員 Cmd+S）。
   不依賴、也不修改 deck-stage.js / copy-prompt.js。 */
(function () {
  'use strict';

  var MIME = {
    html: 'text/html;charset=utf-8',
    md: 'text/markdown;charset=utf-8',
    csv: 'text/csv;charset=utf-8',
    zip: 'application/zip'
  };

  function b64ToBytes(b64) {
    var bin = atob(b64), n = bin.length, out = new Uint8Array(n);
    for (var i = 0; i < n; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  function blobDownload(name, payload) {
    var ext = (name.split('.').pop() || '').toLowerCase();
    var url = URL.createObjectURL(new Blob([payload], { type: MIME[ext] || 'application/octet-stream' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function wire(el) {
    if (el.dataset.dlReady) return;
    el.dataset.dlReady = '1';

    el.addEventListener('click', function (e) {
      var name = el.getAttribute('data-download');
      var src = window.DEMO_FILES && window.DEMO_FILES[name];
      var bin = window.DEMO_FILES_B64 && window.DEMO_FILES_B64[name];
      if (!src && !bin) return;      // 沒內嵌 → 讓 anchor 自己走 href
      e.preventDefault();
      e.stopPropagation();
      blobDownload(name, bin ? b64ToBytes(bin) : src);
      var lab = el.querySelector('.go') || el.querySelector('.dl-state') || el.querySelector('.dl-file');
      if (lab) {
        var was = lab.textContent;
        lab.textContent = '✓ 已下載';
        el.classList.add('done');
        setTimeout(function () { lab.textContent = was; el.classList.remove('done'); }, 1800);
      }
    });
    // 阻止 deck-stage 的點擊翻頁誤觸
    el.addEventListener('keydown', function (e) { e.stopPropagation(); });
  }

  // 2026-09-10：樣式交給 deck.css 的 .dl-btn（匯流 DS outline 按鈕語法），這裡不再注入寫死色碼

  function init() {
    document.querySelectorAll('[data-download]').forEach(wire);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('load', init);
})();
