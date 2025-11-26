import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    urlSlug: z.string().optional(), // Custom URL slug (URL-friendly version of title)
    date: z.preprocess((val) => {
      // Convert Date objects to YYYY-MM-DD strings
      if (val instanceof Date) {
        return val.toISOString().split('T')[0];
      }
      // If it's already a string, return as-is
      if (typeof val === 'string') {
        return val;
      }
      // Fallback: convert to string
      return String(val);
    }, z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional()),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional().default(true),
    description: z.string().optional(),
    canonical_url: z.string().url().optional(),
  }),
});

const signatures = defineCollection({
  type: 'content',
  schema: z.object({
    current: z.boolean().default(false),
  }),
});

export const collections = { blog, signatures };

