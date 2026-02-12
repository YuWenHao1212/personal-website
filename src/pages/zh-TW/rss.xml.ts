import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => data.lang === 'zh-TW' && data.draft !== true);

  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: '郝宇文 | Blog',
    description: '關於 AI、創業、生產力與人生的文章',
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/zh-TW/blog/${post.id.split('/').pop()}/`,
      categories: [post.data.category, ...(post.data.tags || [])],
    })),
    customData: `<language>zh-TW</language>`,
  });
}
