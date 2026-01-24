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
 * 1. Manually specified relatedPosts (highest priority)
 * 2. Same category posts
 * 3. Posts with matching tags
 * 4. Sorted by date (newest first)
 */
export function getRelatedPosts({
  currentPost,
  allPosts,
  limit = 3,
}: RelatedPostsOptions): BlogPost[] {
  const currentCategory = currentPost.data.category;
  const currentTags = currentPost.data.tags || [];
  const currentLang = currentPost.data.lang;
  const manualRelated = (currentPost.data as { relatedPosts?: string[] }).relatedPosts || [];

  // Filter out current post and posts in different language
  const otherPosts = allPosts.filter(
    (post) => post.id !== currentPost.id && post.data.lang === currentLang
  );

  // If manual relatedPosts specified, prioritize them
  if (manualRelated.length > 0) {
    const manualPosts: BlogPost[] = [];
    const remainingPosts: BlogPost[] = [];

    // Normalize relatedPosts slugs (remove .md if present)
    const normalizedRelated = manualRelated.map(slug =>
      slug.replace(/\.mdx?$/, '')
    );

    for (const post of otherPosts) {
      const postSlug = post.id.split('/').pop()?.replace(/\.mdx?$/, '') || '';
      if (normalizedRelated.includes(postSlug)) {
        manualPosts.push(post);
      } else {
        remainingPosts.push(post);
      }
    }

    // Sort manual posts by their order in relatedPosts array
    manualPosts.sort((a, b) => {
      const aSlug = a.id.split('/').pop()?.replace(/\.mdx?$/, '') || '';
      const bSlug = b.id.split('/').pop()?.replace(/\.mdx?$/, '') || '';
      return normalizedRelated.indexOf(aSlug) - normalizedRelated.indexOf(bSlug);
    });

    // If we have enough manual posts, return them
    if (manualPosts.length >= limit) {
      return manualPosts.slice(0, limit);
    }

    // Otherwise, fill with auto-selected posts
    const autoSelected = scoreAndSortPosts(currentPost, remainingPosts, limit - manualPosts.length);
    return [...manualPosts, ...autoSelected];
  }

  // No manual posts, use auto-selection
  return scoreAndSortPosts(currentPost, otherPosts, limit);
}

function scoreAndSortPosts(
  currentPost: BlogPost,
  posts: BlogPost[],
  limit: number
): BlogPost[] {
  const currentCategory = currentPost.data.category;
  const currentTags = currentPost.data.tags || [];

  // Score each post based on relevance
  const scoredPosts = posts.map((post) => {
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
