// 1. Import utilities from `astro:content`
import {z, defineCollection} from 'astro:content';

const docsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
    }),
});

const examplesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        category: z.string().optional(),
    })
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
    'docs': docsCollection,
    'examples': examplesCollection
};