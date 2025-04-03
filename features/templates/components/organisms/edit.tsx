'use client';

import { EntityForm } from '@/shared/components/molecules/form/add-entity';
import { useTemplate, useTemplateMutations } from '../../hooks/use-template-info';
import { TemplatePayload } from '../../config/template.type';
import { TemplateForm } from '../molecules/template-form';
import { templateKeys } from '../../config/template.key';
interface EditProps {
  slug: string;
  onComplete?: () => void;
}

export function Edit({ slug, onComplete }: EditProps) {
  const { template } = useTemplate(slug);
  const { updateTemplate, isUpdating } = useTemplateMutations();

  const handleSubmit = async (data: TemplatePayload) => {
    await updateTemplate({ slug, data });
    onComplete?.();
  };

  if (!template) {
    return null;
  }

  return (
    <EntityForm<TemplatePayload>
      title="Template"
      initialData={template}
      onSubmit={handleSubmit}
      isSubmitting={isUpdating}
      Form={TemplateForm}
      queryKey={templateKeys.all}
      mode="edit"
    />
  );
}
