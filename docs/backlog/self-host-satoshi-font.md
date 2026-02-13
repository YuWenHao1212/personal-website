# Self-host Satoshi Font

## Background

Currently loading Satoshi via Fontshare CDN in `src/layouts/BaseLayout.astro`:

```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
```

This introduces an external request to `api.fontshare.com` on every page load, adding a DNS lookup + connection + download that blocks text rendering.

---

## Problem

1. **Extra DNS lookup** — browser must resolve `api.fontshare.com` before fetching CSS, then resolve `cdn.fontshare.com` for the woff2 files (2 external origins)
2. **Render-blocking** — `<link rel="stylesheet">` blocks first paint until CSS is downloaded
3. **No preload** — browser discovers woff2 URLs only after parsing the CSS, causing a waterfall
4. **Third-party dependency** — if Fontshare CDN goes down or is slow, text rendering is delayed

---

## Proposed Fix

Download Satoshi woff2 files and self-host from `public/fonts/`:

```
public/fonts/
  satoshi-400.woff2  (~25KB)
  satoshi-500.woff2  (~25KB)
  satoshi-700.woff2  (~25KB)
```

Replace the CDN link with local `@font-face` declarations in `global.css`:

```css
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/satoshi-400.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/satoshi-500.woff2') format('woff2');
  font-weight: 500;
  font-display: swap;
}
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/satoshi-700.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}
```

Add preload hints in `BaseLayout.astro`:

```html
<link rel="preload" href="/fonts/satoshi-400.woff2" as="font" type="font/woff2" crossorigin />
```

---

## Expected Impact

- Eliminate 2 external DNS lookups (fontshare.com CDN)
- Font files served from same origin (Cloudflare/Vercel edge) — faster TTFB
- Browser can preload woff2 immediately instead of waiting for CSS parse
- Total ~75KB self-hosted, no functional change

---

## Reference

freetools.tw already uses self-hosted Satoshi via `next/font/local` with the same approach.

## Priority

Low — performance optimization, not a bug.
