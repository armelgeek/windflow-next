import { ApiResponse } from '@/shared/lib/types/http';
import { PaginatedResponse } from '@/shared/lib/types/pagination';
import { Filter } from '@/shared/lib/types/filter';
import { API_URL } from '@/shared/lib/config/api';

export interface ResourceEndpoints {
  base: string;
  list: (qs: string) => string;
  create: string;
  detail: (slug: string) => string;
  update: (slug: string) => string;
  delete: (slug: string) => string;
  [key: string]: unknown;
}

export interface BaseService<T, TPayload> {
  list(filter: Filter): Promise<PaginatedResponse<T>>;
  detail(slug: string): Promise<T>;
  create(payload: TPayload): Promise<ApiResponse<T>>;
  update(slug: string, payload: TPayload): Promise<ApiResponse<T>>;
  remove(slug: string): Promise<ApiResponse>;
}

export abstract class BaseServiceImpl<T, TPayload> implements BaseService<T, TPayload> {
  protected abstract endpoints: ResourceEndpoints;

  protected abstract serializeParams(filter: Filter): string;

  protected async fetchData<R>(url: string, options: RequestInit): Promise<R> {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 
          `Request failed with status ${response.status}: ${response.statusText}`
        );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
      }
    }
    
    return response.json();
  }

  async list(filter: Filter): Promise<PaginatedResponse<T>> {
    const queryString = this.serializeParams(filter);
    return this.fetchData<PaginatedResponse<T>>(
      this.endpoints.list(queryString),
      { method: 'GET' }
    );
  }

  async detail(slug: string): Promise<T> {
    return this.fetchData<T>(
      this.endpoints.detail(slug),
      { method: 'GET' }
    );
  }

  async create(payload: TPayload): Promise<ApiResponse<T>> {
    return this.fetchData<ApiResponse<T>>(
      this.endpoints.create,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
  }

  async update(slug: string, payload: TPayload): Promise<ApiResponse<T>> {
    return this.fetchData<ApiResponse<T>>(
      this.endpoints.update(slug),
      {
        method: 'PUT',
        body: JSON.stringify(payload),
      }
    );
  }

  async remove(slug: string): Promise<ApiResponse> {
    return this.fetchData<ApiResponse>(
      this.endpoints.delete(slug),
      { method: 'DELETE' }
    );
  }
  
  protected handleApiError(error: unknown): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Une erreur inconnue est survenue');
  }
}