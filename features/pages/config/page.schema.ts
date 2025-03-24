import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { pages } from '@/drizzle/schema/pages';

export const PageSelectSchema = createSelectSchema(pages);

export const PageFormSchema = createInsertSchema(pages, {
  name: (s) => s.min(1, 'Name is required.').max(255, 'Name must be at most 255 characters.'),
}).pick({
  name: true,
});
