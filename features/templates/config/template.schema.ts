import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { templates } from '@/drizzle/schema';
export const TemplateSelectSchema = createSelectSchema(templates);

export const TemplateFormSchema = createInsertSchema(templates, {
    title: (s) => s.min(1, 'Name is required.').max(255, 'Title must be at most 255 characters.'),
}).pick({
  title: true,
});
