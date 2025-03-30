import { Filter } from '@/features/auth/config/user.type';
import type { Template, TemplatePayload } from '@/features/templates/config/template.type';
import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseService, BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import { ApiResponse } from '@/shared/lib/types/http';

export interface TemplateService extends BaseService<Template, TemplatePayload> {
  byUsers(userId: string): Promise<Template[]>;
  removeFromUser(userId: string, templateId: string): Promise<ApiResponse>;
  use(name: string, templateId: string, userId: string): Promise<ApiResponse>;
}

const templateSearch = createSearchParams();

export class TemplateServiceImpl extends BaseServiceImpl<Template, TemplatePayload> implements TemplateService {
  protected endpoints = API_ENDPOINTS.templates;

  protected serializeParams(filter: Filter): string {
    return templateSearch.serialize(filter);
  }

  async byUsers(userId: string): Promise<Template[]> {
    return this.get<Template[]>(this.endpoints.byUsers(userId));
  }

  async removeFromUser(userId: string, templateId: string): Promise<ApiResponse> {
    return this.delete<ApiResponse>(this.endpoints.removeFromUser(userId, templateId));
  }

  async use(name: string, templateId: string, userId: string): Promise<ApiResponse> {
    return this.post<ApiResponse>(this.endpoints.use, {  name, templateId, userId });
  }
}

export const templateService = new TemplateServiceImpl();