// Event tracking helpers, 10/9 (with the author). One naming rule for new events: page_action_target, e.g. workshop_form_submit;
// which article / which entrance travels as event data, not in the name. Old event names are kept so their history is not cut.
// What each event is for: FLUX Vault → Cockpit/Issues ISS-360 (the event list agreed on 10/9).

/**
 * Fire an Umami event without ever blocking the page. The tracker loads async and may arrive late (cold start).
 * 11/7 (ISS-520): it used to give up after 5 s, so on a 10–30 s cold start the event was lost. Now it keeps waiting —
 * every 250 ms for the first 5 s, then every 2 s — and stops after 5 minutes (a blocked tracker never arrives).
 */
export function track(name: string, data?: Record<string, string | number>) {
  let tries = 0;
  (function go() {
    const u = (window as any).umami;
    // every event carries the page's language (Chinese and English pages share event names)
    if (u?.track) u.track(name, { lang: document.documentElement.lang || '', ...data });
    else if (tries++ < 170) setTimeout(go, tries <= 20 ? 250 : 2000);
  })();
}

/**
 * Reading progress (11/7, ISS-520; plan: FLUX Vault efforts/areas/seo/tracking/umami/iss-520-plan.md §4 E2).
 * One event, page_progress, sent on the spot when the reader's ACTIVE time passes a mark — never on leaving, so nothing
 * depends on a request surviving the tab being closed.
 *   marks: every page 10s; articles also 30s, 60s, 3m, half and full (of the estimated reading time `est`)
 *   active time: the page is in front AND there was input in the last 2 minutes. Page load and coming back to the tab count
 *     as input, so a phone reader who reads the first screen without touching it still counts. A focused iframe (the
 *     YouTube player) counts too, for at most 20 minutes in a row.
 *   each event also carries fg (seconds in front, idle included) so the 2-minute rule can be checked later.
 * Umami counts a visit with any custom event as "not a bounce", so after this ships Umami's bounce = one page and under
 * 10 s active. The reports compute their own "quick exit" rate instead (plan §2).
 * One instance per page, kept on window: layouts load this file from separate scripts.
 */
const IDLE_MS = 120_000;
const IFRAME_MAX_MS = 20 * 60_000;
type Progress = { addArticle: (body: string, slug: string) => void; active: () => number };

export function startProgress(article?: { body: string; slug: string }): Progress {
  const w = window as any;
  if (!w.__readProgress) w.__readProgress = createProgress();
  if (article) w.__readProgress.addArticle(article.body, article.slug);
  return w.__readProgress;
}

/** Estimated reading seconds of an article body: Chinese 400 characters/min, English 200 words/min, code blocks left out. */
export function estimateSeconds(el: HTMLElement): number {
  const copy = el.cloneNode(true) as HTMLElement;
  copy.querySelectorAll('pre, .expressive-code, script, style, iframe, button').forEach((n) => n.remove());
  const text = copy.textContent || '';
  const han = /[㐀-鿿豈-﫿]/g;
  const cjk = (text.match(han) || []).length;
  const words = (text.replace(han, ' ').match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
  return Math.max(30, Math.round((cjk / 400 + words / 200) * 60));
}

function createProgress(): Progress {
  let active = 0;
  let fg = 0;
  let last = performance.now();
  let lastInput = last; // page load counts as input
  let iframeSince = 0;
  let lastMove = 0;
  let extra: Record<string, string | number> = {};
  const marks: { at: string; ms: number }[] = [{ at: '10s', ms: 10_000 }];
  const sent = new Set<string>();
  const input = () => (lastInput = performance.now());

  ['scroll', 'wheel', 'click', 'keydown', 'touchstart', 'pointerdown'].forEach((t) =>
    window.addEventListener(t, input, { passive: true, capture: true }),
  );
  window.addEventListener('mousemove', () => {
    const now = performance.now();
    if (now - lastMove > 1000) (lastMove = now), input();
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    last = performance.now();
    if (document.visibilityState === 'visible') input();
  });
  window.addEventListener('pageshow', () => ((last = performance.now()), input()));

  setInterval(() => {
    const now = performance.now();
    const dt = Math.min(now - last, 2000); // a timer frozen in the background or by sleep never adds a jump
    last = now;
    if (document.visibilityState !== 'visible') return;
    fg += dt;
    const inFrame = document.hasFocus() && document.activeElement?.tagName === 'IFRAME';
    iframeSince = inFrame ? iframeSince || now : 0;
    if (now - lastInput <= IDLE_MS || (inFrame && now - iframeSince < IFRAME_MAX_MS)) active += dt;
    for (const m of marks) {
      if (sent.has(m.at) || active < m.ms) continue;
      sent.add(m.at);
      track('page_progress', { at: m.at, ...extra, fg: Math.round(fg / 1000), active: Math.round(active / 1000) });
    }
  }, 1000);

  return {
    addArticle(body, slug) {
      const el = document.querySelector<HTMLElement>(body);
      if (!el || extra.slug) return;
      const est = estimateSeconds(el);
      extra = { slug, est };
      marks.push(
        { at: '30s', ms: 30_000 }, { at: '60s', ms: 60_000 }, { at: '3m', ms: 180_000 },
        { at: 'half', ms: est * 500 }, { at: 'full', ms: est * 1000 },
      );
    },
    active: () => Math.round(active / 1000),
  };
}

// Links that pay a commission. The one list to keep up: add a line when a new affiliate programme is used in an article.
const AFFILIATE = [
  /awin1\.com/i, // AWIN (Northwest Registered Agent …)
  /linksynergy|[?&]ranMID=/i, // Rakuten (Udemy)
  /books\.com\.tw\/exep\/assp/i, // 博客來 AP
  /\/referral\//i, // YNAB
  /go\.fiverr\.com|i384100\.net|pxf\.io|sjv\.io/i, // Fiverr, Coursera (Impact)
  /[?&](ref|via|aff|affiliate)=/i,
];

// Headings that open a list of sources. A click on a link under one is a reader checking a source, not leaving for
// something else, so it gets its own event (blog_click_source) and is not counted with the other outbound clicks (10/11).
const SOURCES = /^(sources?|references?|further reading|資料來源|參考資料|參考來源|延伸閱讀|來源)/i;

const hostOf = (href: string) => {
  try {
    return new URL(href, location.href).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

/**
 * Every link inside an article's text is recorded when clicked: which article, what kind of link, where it leads.
 * `end` is the element that marks "read to the end": the block right after the text, in both languages (10/12; Chinese pages
 * used the author block, which sits below the FAQ, so an article with an FAQ needed more scrolling to count).
 */
export function trackArticle(opts: { body: string; end?: string }) {
  const slug = location.pathname.replace(/^\/[^/]+\/blog\//, '').replace(/\/$/, '');
  const lang = location.pathname.split('/')[1] || '';
  const base = { slug, lang };

  // Where a link sits: the heading above it and which third of the article. Read at click time, when the layout is final.
  const bodyEl = document.querySelector<HTMLElement>(opts.body);
  const heads = bodyEl ? Array.from(bodyEl.querySelectorAll<HTMLElement>('h2, h3')) : [];
  const place = (a: HTMLAnchorElement) => {
    let sec = '';
    for (const h of heads) {
      if (h.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_FOLLOWING) sec = (h.textContent || '').trim();
      else break;
    }
    const box = bodyEl?.getBoundingClientRect();
    const at = box && box.height ? (a.getBoundingClientRect().top - box.top) / box.height : 0;
    return { sec: sec.slice(0, 40), pos: at < 1 / 3 ? 'top' : at < 2 / 3 ? 'mid' : 'end' };
  };

  document.querySelectorAll<HTMLAnchorElement>(`${opts.body} a[href]`).forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) return; // footnotes and in-page jumps
    const host = hostOf(href);
    const internal = href.startsWith('/') || host === location.hostname.replace(/^www\./, '') || host === 'yu-wenhao.com';
    const path = internal ? new URL(href, location.href).pathname : '';

    let name: string;
    let data: Record<string, string> = { ...base };
    if (href.startsWith('mailto:')) name = 'blog_click_email';
    else if (href.includes('ccarf-contact.pages.dev')) name = 'blog_click_ccarf_form';
    else if (href.includes('/services/')) name = 'blog_click_services';
    else if (AFFILIATE.some((re) => re.test(href))) (name = 'blog_click_affiliate'), (data.host = host);
    else if (host.endsWith('confluence-partners.ai')) (name = 'blog_click_confluence'), (data.where = 'body');
    else if (internal && /#newsletter-form/.test(href)) (name = 'blog_click_newsletter'), (data.where = 'body');
    else if (internal && /\/workshop\//.test(path)) (name = 'blog_click_workshop'), (data.where = 'body');
    else if (internal) (name = 'blog_click_internal'), (data.to = path.replace(/^\/[^/]+\/blog\//, '').replace(/\/$/, '') || path);
    else (name = 'blog_click_outbound'), (data.host = host);

    // Links that leave the site also say exactly where they go, what the link says and where it sits (10/11, the author):
    // the domain alone cannot tell one course page from another, or which product an affiliate link is for.
    const leaves = name === 'blog_click_outbound' || name === 'blog_click_affiliate';
    a.addEventListener('click', () => {
      if (!leaves) return track(name, data);
      const p = place(a);
      let to = host;
      try {
        to = (host + new URL(href, location.href).pathname).slice(0, 120); // no query string: it can carry ids
      } catch {}
      const text = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
      const checking = name === 'blog_click_outbound' && SOURCES.test(p.sec);
      track(checking ? 'blog_click_source' : name, { ...data, to, text, ...p });
    });
  });

  // Copying a code block or a prompt (10/12, the author): the copy button is the code-block plugin's own; a reader who selects
  // the text and copies it by hand counts too (how: 'select'). n / of: which block of how many, in reading order. nth: this
  // reader's how-many-th copy on this page view — events are counts, not people, and nth = 1 is "page views with a copy".
  const blocks = bodyEl ? Array.from(bodyEl.querySelectorAll<HTMLElement>('.expressive-code')) : [];
  let nth = 0;
  const copied = (i: number, how: string) => {
    const el = blocks[i];
    const pre = el.querySelector<HTMLElement>('pre');
    let sec = '';
    for (const h of heads) {
      if (h.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) sec = (h.textContent || '').trim();
      else break;
    }
    track('blog_copy_code', { ...base, n: i + 1, of: blocks.length, block: pre?.dataset.language || '', sec: sec.slice(0, 40), how, nth: ++nth });
  };
  blocks.forEach((el, i) => {
    const btn = el.querySelector<HTMLButtonElement>('.copy button');
    if (btn) {
      if (lang.toLowerCase().startsWith('zh')) (btn.title = '複製'), (btn.dataset.copied = '已複製');
      btn.addEventListener('click', () => copied(i, 'button'));
    }
    el.addEventListener('copy', () => copied(i, 'select'));
  });

  // Reading progress marks for this article (ISS-520): 30s, 60s, 3m, half and full of the estimated reading time.
  const progress = startProgress({ body: opts.body, slug });

  // Read to the end: once per page view, when the end marker comes into view.
  // 11/7 (ISS-520, plan §4 E3): only when the reader brought it there. If the end is already on screen when first seen
  // (a restored tab or the back button lands at the bottom; a phone restoring a tab did this 39 times in a week on one
  // article), or arrives before any real input (a restored scroll fires scroll events, so scroll does not count here),
  // it must leave the screen and come back after the reader has used the wheel, touch, a key or the pointer.
  // Known gap: a short article whose end is on screen from the start and never leaves it is never counted.
  const end = opts.end ? document.querySelector(opts.end) : null;
  if (end && 'IntersectionObserver' in window) {
    let armed = false;
    let used = false;
    const use = () => (used = true);
    ['wheel', 'touchmove', 'keydown', 'pointerdown'].forEach((t) => window.addEventListener(t, use, { passive: true, capture: true }));
    const io = new IntersectionObserver((entries) => {
      const seen = entries.some((e) => e.isIntersecting);
      if (!seen) {
        armed = true;
        return;
      }
      if (!armed || !used) {
        armed = false;
        return;
      }
      io.disconnect();
      // secs: how long the page had been open (10/11, kept so old and new numbers can be compared);
      // active: the reader's active time, same rule as page_progress (11/7).
      track('blog_read_end', { ...base, secs: Math.round(performance.now() / 1000), active: progress.active() });
    });
    io.observe(end);
  }
}

/** Which entrance a subscriber came through. Set when a 「訂閱電子報」 link is clicked, read when the form is sent. */
export function rememberNewsletterEntrance() {
  const kind = () => {
    const p = location.pathname;
    if (/^\/[^/]+\/$/.test(p)) return 'home';
    if (/\/blog\/$/.test(p)) return 'blog_list';
    if (/\/blog\/.+/.test(p)) return 'article';
    const m = p.match(/^\/[^/]+\/([^/]+)/);
    return m ? m[1] : 'other';
  };
  document.querySelectorAll<HTMLAnchorElement>('a[href*="#newsletter-form"]').forEach((a) => {
    a.addEventListener('click', () => {
      try {
        sessionStorage.setItem('nl_from', a.closest('header') ? 'nav' : kind());
      } catch {}
    });
  });
}
