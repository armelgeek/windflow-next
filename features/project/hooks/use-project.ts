'use client';
import { projectService } from '../domain/project.service';
import { Project, ProjectPayload } from '../config/project.type';
import { Filter } from '@/shared/lib/types/filter';
import { useCustomQuery, useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const PROJECT_KEYS = {
  all: ['projects'] as const,
  lists: () => [...PROJECT_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...PROJECT_KEYS.lists(), { filters }] as const,
  details: () => [...PROJECT_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...PROJECT_KEYS.details(), slug] as const,
};

export const useProjects = (filters: Filter) => {
  return useList<Project>(
    PROJECT_KEYS as unknown as { list: (filters: unknown) => readonly unknown[] },
    projectService,
    filters
  );
};


export const useProject = (slug: string) => {
 
  const { data, isLoading } = useDetail<Project>(
    PROJECT_KEYS as unknown as { detail: (slug: string) => readonly unknown[] },
    projectService,
    slug
  );
  if (!slug) return { project: null, isLoading: false };
  
  return {
    project: data,
    isLoading,
  };
};

export const useProjectMutations = () => {
  const mutations = useMutations<Project, ProjectPayload>({
    service: projectService,
    queryKeys: PROJECT_KEYS,
    successMessages: {
      create: 'Projet créé avec succès',
      update: 'Projet mis à jour avec succès',
      delete: 'Projet supprimé avec succès'
    },
    callbacks: {
      onCreateSuccess: () => {

      }
    }
  });

  return {
    createProject: mutations.create,
    updateProject: mutations.update,
    deleteProject: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};

export const useProjectOptions = (params: Filter = { pageSize: 100 }) => {
  const { data, isLoading } = useCustomQuery<{ value: string; label: string }[], Filter>(
    [...PROJECT_KEYS.all, 'options'],
    async (filterParams) => {
      const response = await projectService.list(filterParams);
      return response?.data.map((project) => ({
        value: project.id,
        label: project.name,
      })) || [];
    },
    params,
    {
      staleTime: 5 * 60 * 1000, 
    }
  );

  return {
    options: data || [],
    isLoading,
  };
};