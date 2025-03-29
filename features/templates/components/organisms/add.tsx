import { EntityForm } from '@/shared/components/molecules/form/add-entity';
import { useTemplateMutations } from '../../hooks/use-template-info';
import { TemplatePayload } from '../../config/template.type';
import { Page } from '@/features/pages/config/page.type';
import { TemplateForm } from '../molecules/template-form';
import { templateKeys } from '../../config/template.key';

export function Add({ pages }: { pages: Page[] }) {
  const { createTemplate, isCreating } = useTemplateMutations();

  const handleSubmit = async (data: TemplatePayload) => {
    await createTemplate({
      ...data,
      pages
    });
  };

  return (
    <EntityForm<TemplatePayload>
      title="Template"
      buttonLabel='Save as template'
      buttonVariant = 'ghost'
      className = "max-w-md"
      initialData={null}
      onSubmit={handleSubmit}
      isSubmitting={isCreating}
      Form={TemplateForm}
      queryKey={templateKeys.all}
      mode="add"
    />
  );
}