import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    category: z.enum(['building-products', 'productivity', 'life-learning']),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['zh-TW', 'en']),
    translationKey: z.string().optional(),
    videoUrl: z.string().optional(),
    featured: z.boolean().default(false),
    relatedPosts: z.array(z.string()).optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
