import { templateService } from '../domain/template.service';
import { Template, TemplatePayload } from '../config/template.type';
import { Filter } from '@/shared/lib/types/filter';
import { useList, useDetail, useCustomQuery, useMutations, useCustomMutation } from '@/shared/lib/react-query/query-hooks';
import { PROJECT_KEYS } from '@/features/project/hooks/use-project';
import { Page } from '@/features/pages/config/page.type';

export const TEMPLATE_KEYS = {
  all: ['templates'] as const,
  lists: () => [...TEMPLATE_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...TEMPLATE_KEYS.lists(), { filters }] as const,
  details: () => [...TEMPLATE_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...TEMPLATE_KEYS.details(), slug] as const,
  byUser: (userId: string) => [...TEMPLATE_KEYS.all, 'byUser', userId] as const,
  overview: () => [...TEMPLATE_KEYS.all,  'overview'] as const,
};

export const useTemplates = (filters: Filter) => {
  return useList<Template>(
    TEMPLATE_KEYS as unknown as { list: (filters: unknown) => readonly unknown[] },
    templateService,
    filters
  );
};




export const useTemplate = (slug: string) => {
  const { data, isLoading } = useDetail<Template>(
    TEMPLATE_KEYS as unknown as { detail: (slug: string) => readonly unknown[] },
    templateService,
    slug
  );

  return {
    template: data,
    isLoading,
  };
};

export const useUserTemplates = (userId: string) => {
  const { data, isLoading } = useCustomQuery<Template[], string>(
    TEMPLATE_KEYS.byUser(userId),
    (id: string) => templateService.byUsers(id),
    userId,
    { enabled: !!userId }
  );

  return {
    templates: data?.data ?? [],
    isLoading,
  };
};

export const useGetTemplateOverview = () => {
  const { data, isLoading } = useCustomQuery<Template[], string>(
    TEMPLATE_KEYS.overview(),
    () => templateService.getOverview(),
    '',
    { enabled: true }
  );

  return {
    templates: data ?? [],
    isLoading,
  };
};


export const useTemplateMutations = () => {
  
  const mutations = useMutations<Template, TemplatePayload>({
    service: templateService,
    queryKeys: TEMPLATE_KEYS,
    successMessages: {
      create: 'Template créé avec succès',
      update: 'Template mis à jour avec succès',
      delete: 'Template supprimé avec succès'
    },
    callbacks: {
      onCreateSuccess: () => {

      }
    }
  });

  const useTemplateMutation = useCustomMutation(
    ({ name, templateId, userId }: { name:string, templateId: string, userId: string }) => 
      templateService.use(name, templateId, userId),
    {
      onSuccessMessage: 'Template appliqué avec succès',
      invalidateQueries: [PROJECT_KEYS.lists()]
    }
  );

  const removeFromUserMutation = useCustomMutation(
    ({ userId, templateId }: { userId: string, templateId: string }) => 
      templateService.removeFromUser(userId, templateId),
    {
      onSuccessMessage: 'Template retiré de l\'utilisateur avec succès',
     // invalidateQueries: (payload: { userId: string }) => [TEMPLATE_KEYS.byUser(payload.userId)]
    }
  );

  return {
    createTemplate: mutations.create,
    updateTemplate: mutations.update,
    deleteTemplate: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
    createAsProject: useTemplateMutation.mutate,
    removeTemplateFromUser: removeFromUserMutation.mutate,
    isApplyingTemplate: useTemplateMutation.isPending,
    isRemovingFromUser: removeFromUserMutation.isPending,
    invalidateTemplateQueries: mutations.invalidate(TEMPLATE_KEYS.all)
  };
};
