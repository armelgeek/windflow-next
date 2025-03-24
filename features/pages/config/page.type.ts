import { z } from 'zod';

import { PageFormSchema, PageSelectSchema } from './page.schema';
import type { Pagination } from '@/shared/lib/types/pagination';

export type Page = z.infer<typeof PageSelectSchema>;

export type PagePayload = z.infer<typeof PageFormSchema>;

export interface PaginatedPage {
  data: Page[];
  meta: {
    pagination?: Pagination;
  };
}
