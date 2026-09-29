/* 匯流 deck 引擎 v3.0.0（2026-09-10，自 holtek-deck deck.js 抽出）
   翻頁 / 防溢出縮放 / 分步顯示 / 影片 / 計時器 / 本機註解（HUD 與抽屜元素存在才啟用）
   投影片內容全部在 index.html，這裡不放任何文案。 */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var slides = [].slice.call(document.querySelectorAll('.slide'));
  var stage = $('stage');
  var counter = $('counter'), titleEl = $('title'), ownerEl = $('owner'), stepsEl = $('steps');
  var drawer = $('drawer'), note = $('note'), dctx = $('dctx'), dot = $('dot'), tally = $('tally');
  var KEY = (stage && stage.getAttribute('data-notes-key')) || 'deck-notes:' + (document.title || location.pathname);   // 舊 deck 用 data-notes-key 沿用既有註解
  var i = 0, step = 0;

  // 每頁包一層 .sheet：縮放要作用在它身上（縮 .slide 沒用，容器會跟內容一起縮）
  slides.forEach(function (el, n) {
    var sh = document.createElement('div');
    sh.className = 'sheet';
    while (el.firstChild) sh.appendChild(el.firstChild);
    el.appendChild(sh);
    if (stage && stage.hasAttribute('data-pn')) {   // 頁碼：右下、安全區外
      var pn = document.createElement('div'); pn.className = 'pn';
      pn.textContent = String(n + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      el.appendChild(pn);
    }
  });

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function save(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function refreshTally() {
    if (!tally) return;
    var n = load(), c = 0;
    for (var k in n) if (n[k] && n[k].trim()) c++;
    tally.textContent = c ? c + ' 頁有註解' : '';
  }

  function fit() {
    var hud = $('hud') ? 52 : 0;
    var s = Math.min(window.innerWidth / 1920, (window.innerHeight - hud) / 1080);
    stage.style.transform = 'scale(' + s + ')';
  }

  // 量真正的溢出：走訪所有子節點比對實際邊界（scrollHeight 量不到 flex 子層的溢出）
  function overflowPx(el) {
    var cs = getComputedStyle(el), r = el.getBoundingClientRect();
    var top = r.top + parseFloat(cs.paddingTop), bot = r.bottom - parseFloat(cs.paddingBottom);
    var minT = Infinity, maxB = -Infinity, nodes = el.querySelectorAll('*');
    for (var k = 0; k < nodes.length; k++) {
      if (nodes[k].classList.contains('pn') || nodes[k].classList.contains('wm')) continue;   // 安全區外元素不算
      var b = nodes[k].getBoundingClientRect();
      if (!b.width && !b.height) continue;
      if (b.top < minT) minT = b.top;
      if (b.bottom > maxB) maxB = b.bottom;
    }
    if (minT === Infinity) return 0;
    return Math.max(0, top - minT) + Math.max(0, maxB - bot);
  }
  function autofit(el) {
    var sheet = el.firstElementChild;
    if (!sheet || !sheet.classList.contains('sheet')) return;
    sheet.style.zoom = '';
    for (var pass = 0; pass < 10; pass++) {
      var over = overflowPx(el);
      if (over <= 1) break;
      var cs = getComputedStyle(el), r = el.getBoundingClientRect();
      var avail = r.height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      var cur = parseFloat(sheet.style.zoom || 1);
      var next = Math.max(0.6, cur * (avail / (avail + over)) * 0.99);
      if (Math.abs(next - cur) < 0.002) break;
      sheet.style.zoom = next;
    }
  }
  // 內容壓到貼底的 .foot 多少（兄弟節點重疊，overflowPx 量不到）
  function footOverlapPx(el) {
    var foot = el.querySelector('.foot');
    if (!foot) return 0;
    var fr = foot.getBoundingClientRect(), worst = 0;
    var nodes = el.querySelectorAll('.fill, .fill *, figure, .body-cols, h2, .lede, .punch');
    for (var k = 0; k < nodes.length; k++) {
      if (nodes[k] === foot || foot.contains(nodes[k])) continue;
      var b = nodes[k].getBoundingClientRect();
      if (!b.width && !b.height) continue;
      var ov = b.bottom - fr.top;
      if (ov > worst) worst = ov;
    }
    return Math.max(0, worst);
  }
  window.__overflowPx = overflowPx;      // tools/check-layout.mjs 會呼叫
  window.__footOverlapPx = footOverlapPx;

  // 影片：進頁從頭播、離頁停。R 重播。
  function syncVideo() {
    slides.forEach(function (el, n) {
      var v = el.querySelector('video');
      if (!v) return;
      if (n === i) { v.currentTime = 0; v.play().catch(function () {}); } else { v.pause(); }
    });
  }
  function replayVideo() {
    var v = slides[i].querySelector('video');
    if (v) { v.currentTime = 0; v.play().catch(function () {}); }
  }

  function render() {
    slides.forEach(function (el, n) { el.classList.toggle('is-active', n === i); });
    autofit(slides[i]);
    syncVideo();
    var t = slides[i].getAttribute('data-t') || '';
    var o = slides[i].getAttribute('data-owner') || '';
    if (counter) counter.textContent = (i + 1) + ' / ' + slides.length;
    if (titleEl) titleEl.textContent = t;
    if (ownerEl) { ownerEl.textContent = o; ownerEl.setAttribute('data-o', o); }
    if (dctx) dctx.textContent = (i + 1) + ' / ' + slides.length + '　' + t;
    if (note) { var notes = load(); note.value = notes[i] || ''; if (dot) dot.classList.toggle('on', !!(notes[i] && notes[i].trim())); }
    paintSteps();
    try { history.replaceState(null, '', '#p' + (i + 1)); } catch (e) {}
  }
  function go(n) { i = Math.max(0, Math.min(slides.length - 1, n)); step = 0; render(); }

  // ── 分步顯示：.step[data-step=N] 逐格揭露；→ 先走完本頁步驟才換頁 ──
  function stepsOf(el) { return [].slice.call(el.querySelectorAll('.step')); }
  function maxStep(el) { return stepsOf(el).reduce(function (m, e) { return Math.max(m, +e.dataset.step || 0); }, 0); }
  function paintSteps() {
    var el = slides[i];
    stepsOf(el).forEach(function (e) { e.classList.toggle('on', (+e.dataset.step || 0) <= step); });
    var m = maxStep(el);
    if (stepsEl) stepsEl.textContent = m ? (step + 1) + ' / ' + (m + 1) : '';
  }
  function fwd() { if (step < maxStep(slides[i])) { step++; paintSteps(); } else go(i + 1); }
  function back() {
    if (step > 0) { step--; paintSteps(); }
    else if (i > 0) { i--; step = maxStep(slides[i]); render(); }
  }

  // ── 計時器：.timer[data-seconds][data-warn]，內含 .tm-time / .tm-bar i / [data-start] / [data-reset]（.tm-label 預設隱藏，.show-label 打開）
  //    狀態 .run / .warn（最後 data-warn 秒）/ .done；el.__timer.set(秒) 給截圖與測試用 ──
  function tfmt(s) { var m = Math.floor(s / 60), r = s % 60; return (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; }
  function init(el) {
    var total = parseInt(el.getAttribute('data-seconds'), 10) || 300;
    var warnAt = parseInt(el.getAttribute('data-warn'), 10); if (isNaN(warnAt)) warnAt = 60;
    var timeEl = el.querySelector('.tm-time'), bar = el.querySelector('.tm-bar i'), label = el.querySelector('.tm-label');
    var startBtn = el.querySelector('[data-start]'), resetBtn = el.querySelector('[data-reset]');
    var labelText = label ? label.textContent : '';
    var remain = total, running = false, endAt = 0, tid = null;
    function paint() {
      timeEl.textContent = tfmt(remain);
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
  [].forEach.call(document.querySelectorAll('.timer'), function (el) { if (!el.__timer) init(el); });

  // ── copy box：.copybtn 複製同框 .body 的顯示字 ──
  function copyText(text, done) {
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
    else fallback();
  }
  [].forEach.call(document.querySelectorAll('.copybox .copybtn'), function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var body = btn.closest('.copybox').querySelector('.body');
      copyText(body.innerText, function (ok) { var old = btn.textContent; btn.textContent = ok ? '✓ 已複製' : '複製失敗'; if (ok) btn.classList.add('done'); setTimeout(function () { btn.textContent = old; btn.classList.remove('done'); }, 1600); });
    });
  });

  // ── HUD / 註解抽屜（元素存在才接） ──
  if ($('prev')) $('prev').onclick = function () { back(); };
  if ($('next')) $('next').onclick = function () { fwd(); };
  function openDrawer() { if (!drawer) return; drawer.classList.toggle('open'); if (drawer.classList.contains('open') && note) note.focus(); }
  if ($('toggle')) $('toggle').onclick = openDrawer;
  if ($('close')) $('close').onclick = function () { drawer.classList.remove('open'); };
  if ($('clear')) $('clear').onclick = function () { var n = load(); delete n[i]; save(n); render(); note.focus(); };
  if (note) note.addEventListener('input', function () {
    var n = load();
    if (note.value.trim()) n[i] = note.value; else delete n[i];
    save(n);
    if (dot) dot.classList.toggle('on', !!note.value.trim());
    refreshTally();
  });
  function collect() {
    var n = load(), out = [], count = 0;
    slides.forEach(function (el, k) {
      if (n[k] && n[k].trim()) { count++; out.push('p' + String(k + 1).padStart(2, '0') + '　' + (el.getAttribute('data-t') || '')); out.push(n[k].trim()); out.push(''); }
    });
    var head = [document.title + ' 註解', location.host + '　·　' + new Date().toLocaleString('zh-TW') + '　·　' + count + ' 頁有註解', ''];
    return { text: head.concat(out).join('\n').trim(), count: count };
  }
  var copyBtn = $('copy');
  if (copyBtn) copyBtn.onclick = function () {
    var c = collect();
    if (!c.count) { flash(copyBtn, '沒有註解'); return; }
    copyText(c.text, function (ok) { flash(copyBtn, ok ? '已複製 ' + c.count + ' 頁' : '複製失敗'); });
  };
  function flash(btn, msg) { var old = btn.textContent; btn.textContent = msg; setTimeout(function () { btn.textContent = old; }, 1600); }

  document.addEventListener('keydown', function (e) {
    if (note && e.target === note) { if (e.key === 'Escape') drawer.classList.remove('open'); return; }
    if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;   // Cmd+C / Cmd+R 放行給瀏覽器
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); fwd(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); back(); }
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(slides.length - 1);
    else if (e.key === 'r' || e.key === 'R') replayVideo();
    else if (e.key === 'c' || e.key === 'C') openDrawer();
    else if (e.key === 'f' || e.key === 'F') { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen(); }
    else if (e.key === 'Escape' && drawer) drawer.classList.remove('open');
  });

  window.addEventListener('resize', function () { fit(); autofit(slides[i]); });
  // 工具鉤子（排版檢查／截圖）：直接跳頁，不經鍵盤（→ 會先被本頁分步吃掉）
  window.__deck = {
    goto: function (n) { go(n); },
    total: function () { return slides.length; },
    maxStep: function () { return maxStep(slides[i]); },
    showAllSteps: function () { step = maxStep(slides[i]); paintSteps(); },
  };

  var m = (location.hash || '').match(/^#p(\d+)$/);
  if (m) i = Math.max(0, Math.min(slides.length - 1, parseInt(m[1], 10) - 1));
  fit();
  refreshTally();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { render(); });   // 字型載完再量一次
  render();
})();
