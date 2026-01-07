import type { Lang } from './ui';

export const categories = ['ai-tech', 'entrepreneurship', 'productivity', 'thoughts-life'] as const;

export type Category = typeof categories[number];

export const categoryNames: Record<Category, Record<Lang, string>> = {
  'ai-tech': {
    'zh-TW': 'AI & 科技',
    'en': 'AI & Tech',
  },
  'entrepreneurship': {
    'zh-TW': '創業筆記',
    'en': 'Entrepreneurship',
  },
  'productivity': {
    'zh-TW': '生產力',
    'en': 'Productivity',
  },
  'thoughts-life': {
    'zh-TW': '思考與生活',
    'en': 'Thoughts & Life',
  },
};

export function getCategoryName(category: Category, lang: Lang): string {
  return categoryNames[category]?.[lang] || category;
}

export function getCategorySlug(category: Category): string {
  return category;
}
