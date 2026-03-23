import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.union([z.string(), z.date()]).transform(val => {
        if (typeof val === 'string') {
          if (!val.includes('+') && !val.endsWith('Z')) {
            return new Date(val + '+05:00');
          }
          return new Date(val);
        }
        return val;
      }),
      modDatetime: z.union([z.string(), z.date()]).optional().nullable().transform(val => {
        if (!val || val === '') return null;
        if (typeof val === 'string') {
          if (!val.includes('+') && !val.endsWith('Z')) {
            return new Date(val + '+05:00');
          }
          return new Date(val);
        }
        return val as Date;
      }),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default([]),
      ogImage: z.string().or(image()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

export const collections = { blog };