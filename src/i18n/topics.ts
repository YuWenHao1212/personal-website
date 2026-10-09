// 10/9, with the author: the site sorts articles into two topics instead of the three old categories (Chinese first, English the same day).
// Before: AI 實戰 (building-products) / 效率系統 (productivity) / 人生思考 (life-learning).
// A post's `topics` frontmatter wins; without it the old category decides (so nothing is ever without a topic).
// Old filter links (?category=building-products …) keep working through `legacyToTopic`.
export const topics = ['ai-practice', 'growth'] as const;
export type Topic = (typeof topics)[number];

export const topicNames: Record<Topic, string> = {
  'ai-practice': 'AI 與實作',
  growth: '效率與成長',
};

// 10/9, with the author: the English site takes the same two topics. Each English article carries the topics of its
// Chinese counterpart; the two without one (ai-second-brain, non-us-resident-llc-guide) were placed by Claude, as drafts.
export const topicNamesEn: Record<Topic, string> = {
  'ai-practice': 'AI in Practice',
  growth: 'Productivity & Growth',
};

export const topicNamesFor = (lang: 'zh-TW' | 'en') => (lang === 'en' ? topicNamesEn : topicNames);

export const legacyToTopic: Record<string, Topic> = {
  'building-products': 'ai-practice',
  productivity: 'growth',
  'life-learning': 'growth',
};

export function topicsOf(data: { topics?: Topic[]; category: string }): Topic[] {
  return data.topics?.length ? data.topics : [legacyToTopic[data.category] ?? 'growth'];
}
