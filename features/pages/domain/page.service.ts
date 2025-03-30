import type { Page, PagePayload, PaginatedPage } from '@/features/pages/config/page.type';
import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseService, BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';
import { parseAsString } from 'nuqs';
import { ApiResponse } from '@/shared/lib/types/http';

const pagesSearch = createSearchParams({
  projectId: parseAsString.withDefault(''),
});

export interface PageService extends BaseService<Page, PagePayload> {
  pagesByProject: (filter: Filter) => Promise<PaginatedPage>;
  updateById: (id: string, payload: PagePayload) => Promise<ApiResponse<Page>>;
  updateContent: (slug: string, content: Record<string, unknown>) => Promise<ApiResponse<Page>>;
}

export class PageServiceImpl extends BaseServiceImpl<Page, PagePayload> implements PageService {
  protected endpoints = API_ENDPOINTS.pages;
  
  protected serializeParams(filter: Filter): string {
    return pagesSearch.serialize(filter);
  }
  
  async pagesByProject(filter: Filter): Promise<PaginatedPage> {
    const queryString = this.serializeParams(filter);
    return this.get<PaginatedPage>(this.endpoints.pagesByProject(queryString));
  }
  
  async updateById(id: string, payload: PagePayload): Promise<ApiResponse<Page>> {
    return this.put<ApiResponse<Page>>(this.endpoints.updateById(id), payload);
  }
  
  async updateContent(slug: string, content: Record<string, unknown>): Promise<ApiResponse<Page>> {
    return this.put<ApiResponse<Page>>(this.endpoints.updateContent(slug), { content });
  }
}

export const pageService = new PageServiceImpl();