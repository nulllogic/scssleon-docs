import {defineCollection, reference, z} from 'astro:content';

import {glob} from 'astro/loaders';

const docs = defineCollection({
  loader: glob({base: './src/content/docs', pattern: '**/*.mdx'}),
  schema: ({image}) => z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string(reference('categories')),
    published_date: z.date().optional(),
    updated_date: z.date().optional(),
  }),
});

const sections = defineCollection({
    loader: glob({base: './src/content/sections', pattern: '**/*.mdx'}),
    schema: ({image}) => z.object({
        title: z.string(),
        description: z.string().optional(),
        categories: z.array(reference('section_category')).optional(),
        image: z
            .object({
                url: image(),
                alt: z.string(),
            })
            .optional(),
    })
});

const section_category = defineCollection({
  loader: glob({base: './src/content/category/sections', pattern: '**/*.mdx'}),
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

const components_category = defineCollection({
    loader: glob({base: './src/content/category/components', pattern: '**/*.mdx'}),
    schema: ({image}) => z.object({
        title: z.string(),
        description: z.string().optional(),
        position: z.number(),
        image: z
            .object({
                url: image(),
                alt: z.string(),
            })
            .optional(),
    })
});

export const collections = {docs, sections, section_category, components_category};