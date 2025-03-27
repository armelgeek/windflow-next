import { serializeSearchParams } from '@/features/pages/config/page.param';
import type { Page, PagePayload, PaginatedPage } from '@/features/pages/config/page.type';
import { API_ENDPOINTS, API_URL } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';

export interface PageService {
  list(filter: Filter): Promise<PaginatedPage>;
  detail(slug: string): Promise<Page>;
  create(payload: PagePayload): Promise<Page>;
  update(slug: string, payload: PagePayload): Promise<{ message: string }>;
  remove(slug: string): Promise<{ message: string }>;
  updateContent: (slug: string, content: Record<string, unknown>) => Promise<{ message: string }>;
}

export class PageServiceImpl implements PageService {
  private async fetchData<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return response.json();
  }

  async list(filter: Filter): Promise<PaginatedPage> {
    const serialize = serializeSearchParams(filter);
    const endpoint = API_ENDPOINTS.pages.list(serialize);
    return this.fetchData<PaginatedPage>(`${API_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
  }
  async pagesByProject(filter: Filter): Promise<PaginatedPage> {
    const serialize = serializeSearchParams(filter);
    const endpoint = API_ENDPOINTS.pages.pagesByProject(serialize);
    return this.fetchData<PaginatedPage>(`${API_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
  }
  

  async detail(slug: string): Promise<Page> {
    return this.fetchData<Page>(`${API_URL}${API_ENDPOINTS.pages.detail(slug)}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
  }

  async create(payload: PagePayload): Promise<Page> {
    return this.fetchData<Page>(`${API_URL}${API_ENDPOINTS.pages.create}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async update(slug: string, payload: PagePayload): Promise<{ message: string }> {
    return this.fetchData<{ message: string }>(`${API_URL}${API_ENDPOINTS.pages.update(slug)}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  }
  async updateById(id: string, payload: PagePayload): Promise<{ message: string }> {
    return this.fetchData<{ message: string }>(`${API_URL}${API_ENDPOINTS.pages.updateById(id)}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  }
  

  async remove(slug: string): Promise<{ message: string }> {
    return this.fetchData<{ message: string }>(`${API_URL}${API_ENDPOINTS.pages.delete(slug)}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    });
  }
  async updateContent(slug: string, content: Record<string, unknown>): Promise<{ message: string }> {
    return this.fetchData<{ message: string }>(`${API_URL}${API_ENDPOINTS.pages.updateContent(slug)}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify({
        content
      }),
    });
  }
}
export const pageService = new PageServiceImpl();