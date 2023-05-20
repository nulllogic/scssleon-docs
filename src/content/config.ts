// 1. Import utilities from `astro:content`
import {defineCollection} from 'astro:content';
import {docsSchema} from "../schemas";

// 2. Define a `type` and `schema` for each collection
const docsCollection = defineCollection({
    type: 'content',
    schema: docsSchema,
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
    'docs': docsCollection,
};
