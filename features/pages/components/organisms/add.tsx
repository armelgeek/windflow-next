import { PageForm } from '../molecules/page-form';
import { usePageMutations } from '../../hooks/use-page';
import { pageKeys } from '../../config/page.key';
import { PagePayload } from '../../config/page.type';
import { EntityForm } from '@/shared/components/molecules/form/add-entity';

export function Add({ projectId }: { projectId: string }) {
  const { createPage, isCreating } = usePageMutations();

  const handleSubmit = async (data: PagePayload & { projectId: string }) => {
    await createPage({
      ...data,
      projectId: projectId
    });
  };

  return (
    <EntityForm<PagePayload>
      title="Page"
      initialData={null}
      onSubmit={handleSubmit}
      isSubmitting={isCreating}
      Form={PageForm}
      queryKey={pageKeys.all}
      mode="add"
    />
  );
}