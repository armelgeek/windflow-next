import { pageService } from '../domain/page.service';
import { Page, PagePayload, PaginatedPage } from '../config/page.type';
import { Filter } from '@/shared/lib/types/filter';
import { useCustomQuery, useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';
import { keepPreviousData } from '@tanstack/react-query';

export const PAGE_KEYS = {
  all: ['pages'] as const,
  lists: () => [...PAGE_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...PAGE_KEYS.lists(), { filters }] as const,
  details: () => [...PAGE_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...PAGE_KEYS.details(), slug] as const,
  byProject: (filters: Filter) => [...PAGE_KEYS.all, 'byProject', { filters }] as const,
};


export const usePages = (filters: Filter) => {
  return useList<Page>(
    PAGE_KEYS,
    pageService,
    filters
  );
};

export const usePagesByProject = (filters: Filter) => {
  const { data, isLoading } = useCustomQuery<PaginatedPage, Filter>(
    PAGE_KEYS.byProject(filters),
    (filterParams) => pageService.pagesByProject(filterParams),
    filters,
    { placeholderData: keepPreviousData }
  );

  const pageSize = filters.pageSize || 10;
  const total = data?.meta?.pagination?.total ?? 0;
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
  const { data, isLoading } = useDetail<Page>(
    PAGE_KEYS as unknown as { detail: (slug: string) => readonly unknown[] },
    pageService,
    slug
  );

  return {
    page: data,
    isLoading,
  };
};


export const usePageMutations = () => {

  const config = {
    service: pageService,
    queryKeys: PAGE_KEYS
  };

  const {
    create, update, remove,
    isCreating, isUpdating, isDeleting,
    useCustomMutation, invalidate
  } = useMutations<Page, PagePayload & { projectId: string }>(config);

  const updateByIdMutation = useCustomMutation(
    ({ id, data }: { id: string; data: PagePayload }) => pageService.updateById(id, data),
    {
      onSuccessMessage: 'Page mise à jour avec succès',
      invalidateQueries: [
        PAGE_KEYS.lists()
      ]
    }
  );

  const updateContentMutation = useCustomMutation(
    ({ slug, content }: {
      slug: string;
      content: Record<string, unknown>
    }) => pageService.updateContent(slug, content),
    {
      onSuccessMessage: 'Contenu mis à jour avec succès',
      invalidateQueries: [
        PAGE_KEYS.lists(),
        PAGE_KEYS.details()
      ]
    }
  );

  return {
    createPage: create,
    updatePage: update,
    deletePage: remove,
    isCreating,
    isUpdating,
    isDeleting,
    updateByIdMutation: updateByIdMutation.mutate,
    updateContent: updateContentMutation.mutate,
    isUpdatingById: updateByIdMutation.isPending,
    isUpdatingContent: updateContentMutation.isPending,
    invalidatePageQueries: () => invalidate(PAGE_KEYS.all)
  };
};