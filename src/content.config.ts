import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const BLOG_TIMEZONE = "+05:00";

const parseBlogDatetime = (value: string | Date | null | undefined): Date | null => {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value;

  const text = `${value}`.trim();
  if (!text) return null;

  // keep explicit timezone values as-is
  if (text.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(text)) {
    return new Date(text);
  }

  // normalize timezone-less value from Sveltia, assuming local +05:00 by requirement
  const normalized = text.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/)
    ? `${text}${text.endsWith(':00') ? '' : ''}${BLOG_TIMEZONE}`
    : `${text}${BLOG_TIMEZONE}`;

  return new Date(normalized);
};

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.union([z.string(), z.date()]).transform(val => {
        const parsed = parseBlogDatetime(val);
        if (!parsed) throw new Error('pubDatetime required');
        return parsed;
      }),
      modDatetime: z.union([z.string(), z.date()]).optional().nullable().transform(val => {
        if (val === null || val === undefined || val === '') return null;
        return parseBlogDatetime(val);
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