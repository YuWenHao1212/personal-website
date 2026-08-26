/* download-demo.js — 一鍵下載 demo 報表檔（學員下載後放進自己的 project 資料夾）
   用法：<a class="dl-btn" href="assets/p63-mvp/X.html" download="X.html" data-download="X.html">…</a>
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
      var lab = el.querySelector('.dl-state');
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

  function injectStyle() {
    if (document.getElementById('dl-style')) return;
    var st = document.createElement('style');
    st.id = 'dl-style';
    st.textContent =
      '.dl-btn{display:flex;align-items:center;gap:14px;text-decoration:none;' +
      'border:2px solid #111;background:#111;color:#F5F5F5;padding:14px 18px;' +
      'cursor:pointer;transition:all .15s ease;}' +
      '.dl-btn:hover{background:#C15F3C;border-color:#C15F3C;}' +
      '.dl-btn.done{background:#5B8C5A;border-color:#5B8C5A;}' +
      '.dl-btn .dl-ic{font-size:30px;line-height:1;flex:none;}' +
      '.dl-btn .dl-state{font-family:"JetBrains Mono","SF Mono",Menlo,monospace;' +
      'font-size:22px;letter-spacing:.1em;color:#BDBDBD;display:block;}' +
      '.dl-btn .dl-file{font-size:23px;font-weight:700;display:block;margin-top:3px;' +
      'word-break:break-all;line-height:1.25;}' +
      '.dl-alt{display:inline-flex;align-self:flex-start;align-items:center;gap:8px;text-decoration:none;' +
      'color:#3A3A3A;border-bottom:2px solid #E5E5E5;font-size:22px;padding-bottom:2px;}' +
      '.dl-alt:hover{color:#C15F3C;border-color:#C15F3C;}';
    document.head.appendChild(st);
  }

  function init() {
    injectStyle();
    document.querySelectorAll('[data-download]').forEach(wire);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  window.addEventListener('load', init);
})();
