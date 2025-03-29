import {  useMutation, useQueryClient  } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TemplatePayload } from '../config/template.type';
import { templateService } from '../domain/template.service';

export const TEMPLATES_KEYS = {
  all: ['templates'] as const,
  lists: () => [...TEMPLATES_KEYS.all, 'list'] as const,
  
};


export const useTemplateMutations = () => {
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: TEMPLATES_KEYS.lists() });
  };

  const createMutation = useMutation({
    mutationFn: (data: TemplatePayload) => templateService.create(data),
    onSuccess: () => {
      toast.success('Template créée avec succès');
      handleSuccess();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });


  return {
    createTemplate: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
};
