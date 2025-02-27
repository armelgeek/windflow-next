import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { categoryService } from '../domain/category.service';
import { CategoryPayload } from '../config/category.type';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const CATEGORY_KEYS = {
  all: ['categories'] as const,
  lists: () => [...CATEGORY_KEYS.all, 'list'] as const,
  list: (filters: any) => [...CATEGORY_KEYS.lists(), { filters }] as const,
  details: () => [...CATEGORY_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...CATEGORY_KEYS.details(), slug] as const,
};

export const useCategories = (filters: any) => {
  const { data, isLoading } = useQuery({
    queryKey: CATEGORY_KEYS.list(filters),
    queryFn: () => categoryService.list(filters),
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

export const useCategory = (slug: string) => {
  const { data, isLoading } = useQuery({
    queryKey: CATEGORY_KEYS.detail(slug),
    queryFn: () => categoryService.detail(slug),
    enabled: !!slug,
  });

  return {
    category: data,
    isLoading,
  };
};

export const useCategoryMutations = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: CATEGORY_KEYS.lists() });
  };

  const createMutation = useMutation({
    mutationFn: (data: CategoryPayload) => categoryService.create(data),
    onSuccess: () => {
      toast.success('Catégorie créée avec succès');
      handleSuccess();
      router.push('/d/master/category');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: CategoryPayload }) =>
      categoryService.update(slug, data),
    onSuccess: () => {
      toast.success('Catégorie mise à jour avec succès');
      handleSuccess();
      router.push('/d/master/category');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => categoryService.remove(slug),
    onSuccess: () => {
      toast.success('Catégorie supprimée avec succès');
      handleSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    createCategory: createMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
