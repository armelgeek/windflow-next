import type { Template, TemplatePayload } from '@/features/templates/config/template.type';
import { API_ENDPOINTS, API_URL } from '@/shared/lib/config/api';

export interface TemplateService {
  create(payload: TemplatePayload): Promise<Template>;
}

export class TemplateServiceImpl implements TemplateService {
  private async fetchData<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return response.json();
  }

  async create(payload: TemplatePayload): Promise<Template> {
    return this.fetchData<Template>(`${API_URL}${API_ENDPOINTS.templates.create}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}
export const templateService = new TemplateServiceImpl();