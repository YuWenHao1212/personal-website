import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

interface RelatedPostsOptions {
  currentPost: BlogPost;
  allPosts: BlogPost[];
  limit?: number;
}

/**
 * Get related posts based on category and tags
 * Priority:
 * 1. Same category posts
 * 2. Posts with matching tags
 * 3. Sorted by date (newest first)
 */
export function getRelatedPosts({
  currentPost,
  allPosts,
  limit = 3,
}: RelatedPostsOptions): BlogPost[] {
  const currentCategory = currentPost.data.category;
  const currentTags = currentPost.data.tags || [];
  const currentLang = currentPost.data.lang;

  // Filter out current post and posts in different language
  const otherPosts = allPosts.filter(
    (post) => post.id !== currentPost.id && post.data.lang === currentLang
  );

  // Score each post based on relevance
  const scoredPosts = otherPosts.map((post) => {
    let score = 0;

    // Same category = high score
    if (post.data.category === currentCategory) {
      score += 10;
    }

    // Matching tags = additional score
    const postTags = post.data.tags || [];
    const matchingTags = currentTags.filter((tag) => postTags.includes(tag));
    score += matchingTags.length * 2;

    // Newer posts get slight boost
    const daysDiff = Math.abs(
      (currentPost.data.pubDate.getTime() - post.data.pubDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (daysDiff < 30) score += 1;

    return { post, score };
  });

  // Sort by score (descending), then by date (newest first)
  scoredPosts.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime();
  });

  // Return top N posts
  return scoredPosts.slice(0, limit).map((item) => item.post);
}
