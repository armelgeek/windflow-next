import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { pageService } from '../domain/page.service';
import { PagePayload } from '../config/page.type';

export const PAGE_KEYS = {
  all: ['pages'] as const,
  lists: () => [...PAGE_KEYS.all, 'list'] as const,
  getPagesByProject: (filters: any) => [...PAGE_KEYS.lists(), { filters }] as const,
  list: (filters: any) => [...PAGE_KEYS.lists(), { filters }] as const,
  details: () => [...PAGE_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...PAGE_KEYS.details(), slug] as const,
};

export const usePageLists = (filters: any) => {
  const { data, isLoading } = useQuery({
    queryKey: PAGE_KEYS.getPagesByProject(filters),
    queryFn: () => pageService.pagesByProject(filters),
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

export const usePage = (slug: string) => {
  const { data, isLoading } = useQuery({
    queryKey: PAGE_KEYS.detail(slug),
    queryFn: () => pageService.detail(slug),
    enabled: !!slug,
  });

  return {
    page: data,
    isLoading,
  };
};

export const usePageMutations = () => {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: PAGE_KEYS.lists() });
  };

  const createMutation = useMutation({
    mutationFn: (data: PagePayload & {projectId: string}) => pageService.create(data),
    onSuccess: () => {
      toast.success('Page créée avec succès');
      handleSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: PagePayload & {projectId: string}}) =>
      pageService.update(slug, data),
    onSuccess: () => {
      toast.success('Page mise à jour avec succès');
      handleSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => pageService.remove(slug),
    onSuccess: () => {
      toast.success('Page supprimée avec succès');
      handleSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });


  
  const updateContentMutation = useMutation({
    mutationFn: ({ slug, content }: { slug: string; content: any }) =>
      pageService.updateContent(slug, content),
    onSuccess: () => {
      toast.success('Page mise à jour avec succès');
      handleSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    createPage: createMutation.mutate,
    updatePage: updateMutation.mutate,
    deletePage: deleteMutation.mutate,
    updateContent: updateContentMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUpdatingContent: updateContentMutation.isPending,
  };
};
