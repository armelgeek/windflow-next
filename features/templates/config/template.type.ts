import { z } from 'zod';

import { TemplateSelectSchema } from './template.schema';
import type { Pagination } from '@/shared/lib/types/pagination';
import { Page } from '@/features/pages/config/page.type';

export type Template = z.infer<typeof TemplateSelectSchema>;

export type TemplatePayload = {
    userId?: string;
    title: string;
    description: string;
    category: string;
    image: string;
    pages: Page[];
    settings: Record<string, unknown>;
    isPublic: boolean;
};

export interface PaginatedTemplate {
  data: Template[];
  meta: {
    pagination?: Pagination;
  };
}
