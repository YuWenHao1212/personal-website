import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'en' && data.draft !== true);

  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: 'Yu-Wen Hao | Blog',
    description: 'Articles on AI, entrepreneurship, productivity & life',
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/en/blog/${post.id.split('/').pop()}/`,
      categories: [post.data.category, ...(post.data.tags || [])],
    })),
    customData: `<language>en</language>`,
  });
}
