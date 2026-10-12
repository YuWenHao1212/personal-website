// llms.txt: a plain-text summary of the site for AI readers.
// The top half (who, what, services, products, topics) is written by hand in src/data/llms-head.md.
// The article lists below it are built here from the blog collection, so a new article, a changed title
// or a changed description shows up without anyone editing this file.
// Every published article is listed (no hand-picked subset), grouped by the site's two topics,
// most recently updated first.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';
import head from '../data/llms-head.md?raw';
import { topics, topicNamesEn, topicsOf } from '../i18n/topics';

type Post = CollectionEntry<'blog'>;

const lastTouched = (post: Post) => (post.data.updatedDate ?? post.data.pubDate).getTime();

// One line, so a description with a line break cannot split a list item.
const oneLine = (text: string) => text.replace(/\s+/g, ' ').trim();

function section(heading: string, posts: Post[], site: URL, lang: 'zh-TW' | 'en'): string {
  const lines = [`## ${heading}`, ''];
  for (const topic of topics) {
    // An article with two topics is listed once, under its first.
    const inTopic = posts
      .filter((post) => topicsOf(post.data)[0] === topic)
      .sort((a, b) => lastTouched(b) - lastTouched(a));
    if (inTopic.length === 0) continue;
    lines.push(`### ${topicNamesEn[topic]}`, '');
    for (const post of inTopic) {
      const url = new URL(`/${lang}/blog/${post.id.split('/').pop()}/`, site).href;
      lines.push(`- [${oneLine(post.data.title)}](${url}): ${oneLine(post.data.description)}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

export async function GET(context: APIContext) {
  const site = context.site!;
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  const en = posts.filter((post) => post.data.lang === 'en');
  const zh = posts.filter((post) => post.data.lang === 'zh-TW');

  const body = [
    head.trimEnd(),
    '',
    section('Articles (English)', en, site, 'en'),
    section('Articles (Traditional Chinese)', zh, site, 'zh-TW'),
    '## Sitemap',
    '',
    new URL('/sitemap-index.xml', site).href,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
