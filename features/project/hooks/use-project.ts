import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { projectService } from '../domain/project.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Filter } from '@/shared/lib/types/filter';
import { ProjectPayload } from '../config/project.type';

export const PROJECT_KEYS = {
  all: ['projects'] as const,
  lists: () => [...PROJECT_KEYS.all, 'list'] as const,
  list: (filters: any) => [...PROJECT_KEYS.lists(), { filters }] as const,
  details: () => [...PROJECT_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...PROJECT_KEYS.details(), slug] as const,
};

export const useProjects = (filters: any) => {
  const { data, isLoading } = useQuery({
    queryKey: PROJECT_KEYS.list(filters),
    queryFn: () => projectService.list(filters),
    placeholderData: keepPreviousData,
  });

  const pageSize = filters.pageSize || 10;
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  return {
    data: data?.data ?? [],
    meta: {
      total,
      totalPages,
      pageSize,
      page: filters.page || 1
    },
    isLoading,
  };
};

export const useProject = (slug: string ) => {
 
  const { data, isLoading } = useQuery({
    queryKey: PROJECT_KEYS.detail(slug),
    queryFn: () => projectService.detail(slug),
    enabled: !!slug,
  });
  if(!slug) return { project: null, isLoading: false };

  return {
    project: data,
    isLoading,
  };
};

export const useProjectMutations = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.lists() });
  };

  const createMutation = useMutation({
    mutationFn: (data: ProjectPayload) => projectService.create(data),
    onSuccess: () => {
      toast.success('Project créée avec succès');
      handleSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: ProjectPayload }) =>
      projectService.update(slug, data),
    onSuccess: () => {
      toast.success('Project mise à jour avec succès');
      handleSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => projectService.remove(slug),
    onSuccess: () => {
      toast.success('Project supprimée avec succès');
      handleSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    createProject: createMutation.mutate,
    updateProject: updateMutation.mutate,
    deleteProject: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
