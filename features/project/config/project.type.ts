import { z } from 'zod';

import { ProjectFormSchema, ProjectSelectSchema } from './project.schema';
import { PaginatedResponse } from '@/shared/lib/types/pagination';

export type Project = z.infer<typeof ProjectSelectSchema>;

export type ProjectPayload = z.infer<typeof ProjectFormSchema>;

export type PaginatedProject = PaginatedResponse<Project>;
