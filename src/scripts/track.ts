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

    a.addEventListener('click', () => track(name, data));
  });

  // Read to the end: once per page view, when the end marker comes into view.
  const end = opts.end ? document.querySelector(opts.end) : null;
  if (end && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        track('blog_read_end', base);
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
