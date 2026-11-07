// Our own YouTube videos that pages show with YouTubeLite (2026-11-07, ISS-514). One entry per video, so the workshop page
// and the articles that embed it carry the same title, poster and VideoObject markup. An article picks one with the
// frontmatter field `video: <key>`; ArticleLayout puts the player right under the article's last paragraph.

export interface SiteVideo {
  id: string; // YouTube video id
  title: string; // as on YouTube
  description: string; // as on YouTube (its first line)
  poster: string; // our own copy of the YouTube thumbnail, under public/
  uploadDate: string; // YYYY-MM-DD
  duration: string; // ISO 8601, for the markup
  length: string; // m:ss, shown on the poster
}

export const VIDEOS: Record<string, SiteVideo> = {
  // The workshop promo; poster is thumbnail A (the question); duration is the file's own 442.3 s.
  'workshop-promo': {
    id: 'BmYD3RhxTpg',
    title: 'Claude Code 一日實作課程｜用 AI 建你的個人指揮中心',
    description: 'AI 工具學了一堆，事情還是自己扛？這支影片講我怎麼用 Claude Code，把目標、任務、知識交給 AI 一起管。',
    poster: '/images/workshop/promo-video.webp',
    uploadDate: '2026-11-07',
    duration: 'PT7M22S',
    length: '7:22',
  },
};

const AUTHOR = { '@type': 'Person', name: '余文皓', alternateName: 'WenHao Yu', url: 'https://yu-wenhao.com/zh-TW/about/' };

export function videoLd(v: SiteVideo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: v.title,
    description: v.description,
    thumbnailUrl: `https://yu-wenhao.com${v.poster}`,
    uploadDate: v.uploadDate,
    duration: v.duration,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    url: `https://www.youtube.com/watch?v=${v.id}`,
    inLanguage: 'zh-TW',
    author: AUTHOR,
  };
}
