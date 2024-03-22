// 1. Import utilities from `astro:content`
import { z } from 'astro:content';
export const sectionsSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
})
