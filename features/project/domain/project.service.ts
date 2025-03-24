import { serializeSearchParams } from '@/features/project/config/project.param';
import type { Project, ProjectPayload, PaginatedProject } from '@/features/project/config/project.type';
import { API_ENDPOINTS, API_URL } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';

export interface ProjectService {
  list(filter: Filter): Promise<PaginatedProject>;
  detail(slug: string): Promise<Project>;
  create(payload: ProjectPayload): Promise<Project>;
  update(slug: string, payload: ProjectPayload): Promise<{ message: string }>;
  remove(slug: string): Promise<{ message: string }>;
}

export class ProjectServiceImpl implements ProjectService {
  private async fetchData<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return response.json();
  }

  async list(filter: Filter): Promise<PaginatedProject> {
    const serialize = serializeSearchParams(filter);
    const endpoint = API_ENDPOINTS.projects.list(serialize);
    return this.fetchData<PaginatedProject>(`${API_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
  }

  async detail(slug: string): Promise<Project> {
    return this.fetchData<Project>(`${API_URL}${API_ENDPOINTS.projects.detail(slug)}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
  }

  async create(payload: ProjectPayload): Promise<Project> {
    return this.fetchData<Project>(`${API_URL}${API_ENDPOINTS.projects.create}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async update(slug: string, payload: ProjectPayload): Promise<{ message: string }> {
    return this.fetchData<{ message: string }>(`${API_URL}${API_ENDPOINTS.projects.update(slug)}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  }

  async remove(slug: string): Promise<{ message: string }> {
    return this.fetchData<{ message: string }>(`${API_URL}${API_ENDPOINTS.projects.delete(slug)}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    });
  }
}
export const projectService = new ProjectServiceImpl();