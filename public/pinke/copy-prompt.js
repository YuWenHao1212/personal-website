/* copy-prompt.js — 一鍵複製 prompt（學員把 prompt 貼進自己的 Claude Code）
   用法：在 prompt 終端機方塊（dark #1A1410）的 div 上加 data-copy="要複製的純文字"。
   本檔自動在每個 [data-copy] 右上角放一顆「複製」按鈕。
   不依賴、也不修改 deck-stage.js。https 與 localhost 走 navigator.clipboard，
   file:// 走 execCommand fallback。 */
(function () {
  'use strict';

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // fallback（file:// 或舊瀏覽器）
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject();
      } catch (e) { reject(e); }
    });
  }

  function makeButton(target) {
    if (target.dataset.cpReady) return;
    target.dataset.cpReady = '1';

    var cs = getComputedStyle(target);
    if (cs.position === 'static') target.style.position = 'relative';
    // 騰出右上角空間、避免蓋到單行 prompt
    target.style.paddingRight = '108px';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cp-btn';
    btn.textContent = '⧉ 複製';
    btn.setAttribute('aria-label', '複製這段 prompt');

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      copyText(target.getAttribute('data-copy')).then(function () {
        btn.textContent = '✓ 已複製';
        btn.classList.add('done');
        setTimeout(function () {
          btn.textContent = '⧉ 複製';
          btn.classList.remove('done');
        }, 1600);
      }).catch(function () {
        btn.textContent = '✗ 失敗';
        setTimeout(function () { btn.textContent = '⧉ 複製'; }, 1600);
      });
    });
    // 阻止 deck-stage 的鍵盤/點擊翻頁誤觸
    btn.addEventListener('keydown', function (e) { e.stopPropagation(); });

    target.appendChild(btn);
  }

  function injectStyle() {
    if (document.getElementById('cp-style')) return;
    var st = document.createElement('style');
    st.id = 'cp-style';
    st.textContent =
      '.cp-btn{position:absolute;top:10px;right:10px;z-index:5;' +
      'font-family:"JetBrains Mono","SF Mono",Menlo,monospace;font-size:18px;' +
      'line-height:1;padding:8px 12px;border-radius:6px;cursor:pointer;' +
      'background:rgba(245,237,228,0.12);color:#F5EDE4;' +
      'border:1px solid rgba(245,237,228,0.35);transition:all .15s ease;' +
      'backdrop-filter:blur(2px);}' +
      '.cp-btn:hover{background:#C25B3F;border-color:#C25B3F;color:#fff;}' +
      '.cp-btn.done{background:#5B8C5A;border-color:#5B8C5A;color:#fff;}';
    document.head.appendChild(st);
  }

  function init() {
    injectStyle();
    document.querySelectorAll('[data-copy]').forEach(makeButton);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // deck-stage 若稍後才把 slide 接上，補一次掃描
  window.addEventListener('load', init);
})();
