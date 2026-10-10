// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import expressiveCode from 'astro-expressive-code';
import rehypeMermaid from 'rehype-mermaid';
import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';

// Build slug → lastmod map from blog frontmatter (updatedDate ?? pubDate) so the
// sitemap can tell Google which posts changed and when. Filename = URL slug.
function buildBlogLastmodMap() {
  const map = new Map();
  for (const lang of ['zh-TW', 'en']) {
    const dir = path.resolve(`./src/content/blog/${lang}`);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!/\.(md|mdx)$/.test(file)) continue;
      const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
      const date =
        raw.match(/^updatedDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1] ??
        raw.match(/^pubDate:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
      if (date) map.set(`/${lang}/blog/${file.replace(/\.(md|mdx)$/, '')}/`, date);
    }
  }
  return map;
}
const blogLastmod = buildBlogLastmodMap();

// All links in blog content open in new tab to avoid interrupting reading
function rehypeAllLinksNewTab() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties?.href) {
        node.properties.target = '_blank';
        node.properties.rel = 'noopener noreferrer';
      }
    });
  };
}

// 10/10: ✅ / ❌ / ⚠️ are colour emoji — the one thing on an article page outside its two colours. In the published
// HTML they become one-colour marks (styled in src/styles/reading.css, .mk); the Markdown files keep the emoji.
const MARKS = { '✅': ['✓', 'y', '可以'], '✔': ['✓', 'y', '可以'], '❌': ['✕', 'n', '不行'], '✖': ['✕', 'n', '不行'], '⚠': ['!', 'w', '注意'] };
const MARK_RE = /([✅✔❌✖⚠])\uFE0F?/gu;
function rehypeMarks() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index == null || ['code', 'pre', 'script', 'style'].includes(parent.tagName)) return;
      if (!/[✅✔❌✖⚠]/u.test(node.value)) return;
      const out = [];
      let last = 0;
      for (const m of node.value.matchAll(MARK_RE)) {
        if (m.index > last) out.push({ type: 'text', value: node.value.slice(last, m.index) });
        const [glyph, kind, label] = MARKS[m[1]];
        out.push({ type: 'element', tagName: 'span', properties: { className: ['mk', `mk-${kind}`], role: 'img', ariaLabel: label }, children: [{ type: 'text', value: glyph }] });
        last = m.index + m[0].length;
      }
      if (last < node.value.length) out.push({ type: 'text', value: node.value.slice(last) });
      parent.children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      rehypeAllLinksNewTab,
      rehypeMarks,
      [rehypeMermaid, {
        strategy: 'img-svg',
        mermaidConfig: {
          theme: 'base',
          themeVariables: {
            primaryColor: '#FAF8F5',
            primaryTextColor: '#1A1A1A',
            primaryBorderColor: '#CA8A04',
            lineColor: '#666666',
            secondaryColor: '#F5F1EB',
            tertiaryColor: '#FEF9C3',
          },
        },
      }],
    ],
  },
  site: 'https://yu-wenhao.com',
  trailingSlash: 'always',
  integrations: [
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      // 10/10: square corners, no shadow, no window dots, the site's own night colour — the page is all hairlines and right angles elsewhere.
      defaultProps: { frame: 'none' },
      styleOverrides: {
        borderRadius: '0',
        codeBackground: '#14100e',
        frames: { frameBoxShadowCssValue: 'none' },
      },
    }),
    tailwind(),
    sitemap({
      // Unlisted student-only pages (sonice/studio-a/taichung) must stay out of
      // the sitemap — they rely on noindex, and the sitemap would announce them.
      filter: (page) =>
        // 10/9: the public workshop page (/zh-TW/workshop/) is listed now; /workshop/thanks, /workshop-setup* and /admin/workshop stay out.
        (!page.includes('/workshop') || /\/zh-TW\/workshop\/$/.test(page)) &&
        !page.includes('/thank-you') && // 10/9: nothing for a search engine on a thank-you page (the page is noindex too)
        !page.includes('/admin') &&
        !page.includes('/partner') &&
        !page.includes('/flux-upgrade') && // 10/10: the page is noindex; it was the one such page still announced here
        !page.includes('/sonice/') &&
        !page.includes('/studio-a/') &&
        !page.includes('/taichung/'),
      i18n: {
        defaultLocale: 'zh-TW',
        locales: {
          'zh-TW': 'zh-TW',
          'en': 'en',
        },
      },
      // Stamp blog posts with lastmod from frontmatter; other pages stay unstamped
      // (a blanket build-date lastmod would be inaccurate and ignored by Google).
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const lastmod = blogLastmod.get(pathname);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
    mdx(),
  ],
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
