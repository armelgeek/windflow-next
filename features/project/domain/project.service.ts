import type { Project, ProjectPayload } from '@/features/project/config/project.type';
import { createSearchParams } from '@/shared/domain/base.search-param';
import { BaseServiceImpl } from '@/shared/domain/base.service';
import { API_ENDPOINTS } from '@/shared/lib/config/api';
import type { Filter } from '@/shared/lib/types/filter';

const searchParams = createSearchParams();
export class ProjectServiceImpl extends BaseServiceImpl<Project, ProjectPayload> {
  protected endpoints = API_ENDPOINTS.projects;
   protected serializeParams(filter: Filter): string {
        return searchParams.serialize(filter);
  }
}
export const projectService = new ProjectServiceImpl();