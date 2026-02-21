import type { Lang } from './ui';

export const categories = ['building-products', 'productivity', 'life-learning'] as const;

export type Category = typeof categories[number];

export const categoryNames: Record<Category, Record<Lang, string>> = {
  'building-products': {
    'zh-TW': 'AI 實戰',
    'en': 'AI in Practice',
  },
  'productivity': {
    'zh-TW': '效率系統',
    'en': 'Productivity',
  },
  'life-learning': {
    'zh-TW': '人生思考',
    'en': 'Life & Learning',
  },
};

export function getCategoryName(category: Category, lang: Lang): string {
  return categoryNames[category]?.[lang] || category;
}

export function getCategorySlug(category: Category): string {
  return category;
}
