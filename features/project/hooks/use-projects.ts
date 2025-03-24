import { useQuery } from '@tanstack/react-query';

import { ProjectServiceImpl } from '../domain/project.service';
import { projectKeys } from '../config/project.key';
import { Filter } from '@/features/auth/config/user.type';

export const useProjects = (params: Filter) => {
  const { data: projects, isLoading } = useQuery({
    queryKey: projectKeys.all,
    queryFn: async () => {
      const response = await new ProjectServiceImpl().list(params);
      return response?.data.map((project) => ({
        value: project.id,
        label: project.name,
      })) as never[];
    },
  });

  return {
    projects: projects || [],
    isLoading,
  };
};
