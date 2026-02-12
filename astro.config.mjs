// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid'],
    },
    rehypePlugins: [
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
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'zh-TW',
        locales: {
          'zh-TW': 'zh-TW',
          'en': 'en',
        },
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
