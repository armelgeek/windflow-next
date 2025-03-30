import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { templates } from '@/drizzle/schema';
import { z } from 'zod';
export const TemplateSelectSchema = createSelectSchema(templates);
const TemplatePageSchema = z.object({
  name: z.string().min(1, 'Page name is required'),
  html: z.string().optional().nullable(),
  css: z.string().optional().nullable(),
});
export const TemplateFormSchema = createInsertSchema(templates, {
    title: (s) => s.min(1, 'Name is required.').max(255, 'Title must be at most 255 characters.')
}).pick({
  title: true,
  description: true,
  category: true,
  image: true,
  isPublic: true,
})
.extend({
  pages: z.array(TemplatePageSchema).optional(),
  userId: z.string().optional()
});



export const templateSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  pages: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      slug: z.string(),
      html: z.string().nullable(),
      css: z.string().nullable(),
      content: z.string().nullable(),
      projectId: z.string().nullable(),
    })
  ),
  settings: z.record(z.unknown()),
  isPublic: z.boolean().default(true)
});

