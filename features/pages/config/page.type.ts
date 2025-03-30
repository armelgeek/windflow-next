import { z } from 'zod';

import { PageFormSchema, PageSelectSchema } from './page.schema';
import { PaginatedResponse } from '@/shared/lib/types/pagination';

export type Page = z.infer<typeof PageSelectSchema>;

export type PagePayload = z.infer<typeof PageFormSchema>;

export type PaginatedPage = PaginatedResponse<Page>;