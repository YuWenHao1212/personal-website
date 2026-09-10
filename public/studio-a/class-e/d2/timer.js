/* timer.js — 匯流 deck 計時器（2026-09-10，d2 先行；核准後進 deck-kit）
   markup：<div class="timer" data-seconds="300" data-size="corner|side|hero" data-warn="60">
             <span class="tm-label">動手</span><span class="tm-time">05:00</span>
             <span class="tm-bar"><i></i></span>
             <span class="tm-ctl"><button class="tm-btn primary" data-start>START</button><button class="tm-btn" data-reset>RESET</button></span>
           </div>
   狀態：進行中（.run）／最後 data-warn 秒（.warn，數字與進度線轉 terra）／時間到（.done，標籤換「時間到」）。
   不依賴引擎；每個 .timer 自己一個狀態機。工具用 el.__timer.set(秒) 可直接跳到某個剩餘秒數（截圖／測試）。 */
(function () {
  function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; }
  function init(el) {
    var total = parseInt(el.getAttribute('data-seconds'), 10) || 300;
    var warnAt = parseInt(el.getAttribute('data-warn'), 10); if (isNaN(warnAt)) warnAt = 60;
    var timeEl = el.querySelector('.tm-time'), bar = el.querySelector('.tm-bar i'), label = el.querySelector('.tm-label');
    var startBtn = el.querySelector('[data-start]'), resetBtn = el.querySelector('[data-reset]');
    var labelText = label ? label.textContent : '';
    var remain = total, running = false, endAt = 0, tid = null;
    function paint() {
      timeEl.textContent = fmt(remain);
      if (bar) bar.style.width = (remain / total * 100) + '%';
      el.classList.toggle('run', running);
      el.classList.toggle('warn', remain > 0 && remain <= warnAt);
      el.classList.toggle('done', remain === 0);
      if (label) label.textContent = remain === 0 ? '時間到' : labelText;
      if (startBtn) { startBtn.disabled = remain === 0; startBtn.textContent = remain === 0 ? 'DONE' : running ? 'PAUSE' : (remain === total ? 'START' : 'RESUME'); }
    }
    function tick() {                       // 以時鐘為準，不靠 setInterval 累積誤差
      var left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      if (left !== remain) { remain = left; paint(); }
      if (remain <= 0) { running = false; paint(); return; }
      tid = setTimeout(tick, 250);
    }
    function start() {
      if (remain === 0) return;
      if (running) { running = false; clearTimeout(tid); paint(); return; }
      running = true; endAt = Date.now() + remain * 1000; paint(); tid = setTimeout(tick, 250);
    }
    function reset() { running = false; clearTimeout(tid); remain = total; paint(); }
    if (startBtn) startBtn.addEventListener('click', function (e) { e.stopPropagation(); start(); });
    if (resetBtn) resetBtn.addEventListener('click', function (e) { e.stopPropagation(); reset(); });
    el.__timer = { start: start, reset: reset, set: function (s) { running = false; clearTimeout(tid); remain = Math.max(0, Math.min(total, s | 0)); paint(); } };
    paint();
  }
  function boot() { [].forEach.call(document.querySelectorAll('.timer'), function (el) { if (!el.__timer) init(el); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
