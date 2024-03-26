// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';
import { docsSchema, examplesSchema } from "../schemas";

// 2. Define a `type` and `schema` for each collection
const docsCollection = defineCollection({
  type: 'content',
  schema: docsSchema,
});

const examplesCollection = defineCollection({
  type: 'content',
  schema: examplesSchema
})

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'docs': docsCollection,
  'examples': examplesCollection
};