// 1. Import utilities from `astro:content`
import { z } from 'astro:content';
export const examplesSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  group: z.string().optional(),
})
