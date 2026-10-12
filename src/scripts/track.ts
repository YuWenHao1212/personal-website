// Event tracking helpers, 10/9 (with the author). One naming rule for new events: page_action_target, e.g. workshop_form_submit;
// which article / which entrance travels as event data, not in the name. Old event names are kept so their history is not cut.
// What each event is for: FLUX Vault → Cockpit/Issues ISS-360 (the event list agreed on 10/9).

/** Fire an Umami event without ever blocking the page. The tracker loads async and may arrive late (cold start), so wait briefly. */
export function track(name: string, data?: Record<string, string | number>) {
  let tries = 0;
  (function go() {
    const u = (window as any).umami;
    // every event carries the page's language (Chinese and English pages share event names)
    if (u?.track) u.track(name, { lang: document.documentElement.lang || '', ...data });
    else if (tries++ < 20) setTimeout(go, 250);
  })();
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
 * `end` is the element that marks "read to the end" (the author block on Chinese pages, the block after the text on English ones).
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

  // Read to the end: once per page view, when the end marker comes into view.
  const end = opts.end ? document.querySelector(opts.end) : null;
  if (end && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        // secs: how long the page had been open when the end came into view (10/11, the author) — a quick scroll to the
        // bottom also counts as read to the end, and this number lets that be told apart later.
        track('blog_read_end', { ...base, secs: Math.round(performance.now() / 1000) });
      }
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
