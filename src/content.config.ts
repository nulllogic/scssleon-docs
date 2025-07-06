import {defineCollection, reference, z} from 'astro:content';

import {glob} from 'astro/loaders';

const docs = defineCollection({
  loader: glob({base: './src/content/docs', pattern: '**/*.mdx'}),
  schema: ({image}) => z.object({
    title: z.string(),
    description: z.string().optional(),

    published_date: z.date().optional(),
    updated_date: z.date().optional(),
  }),
});

const categories = defineCollection({
  loader: glob({base: './src/content/categories', pattern: '**/*.mdx'}),
    schema: ({image}) => z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
  })
});

const sections = defineCollection({
  loader: glob({base: './src/content/sections', pattern: '**/*.mdx'}),
    schema: ({image}) => z.object({
    title: z.string(),
    description: z.string().optional(),
    categories: z.array(reference('categories')).optional(),

    image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
  })
});

export const collections = {docs, sections, categories};