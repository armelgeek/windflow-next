import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { projects } from '@/drizzle/schema/projects';
import { z } from 'zod';

export const ProjectSelectSchema = createSelectSchema(projects);

export const ProjectFormSchema = createInsertSchema(projects, {
  name: (s) => s.min(1, 'Name is required.').max(255, 'Name must be at most 255 characters.'),
}).pick({
  name: true,
  updatedAt: true
}).extend({
  templateId: z.string().optional()
});
