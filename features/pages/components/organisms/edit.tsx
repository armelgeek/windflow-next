'use client';

import { usePage, usePageMutations } from '../../hooks/use-page';
import { EntityForm } from '@/shared/components/molecules/form/add-entity';
import { PageForm } from '../molecules/page-form';
import { PagePayload } from '../../config/page.type';
import { pageKeys } from '../../config/page.key';

interface EditProps {
  slug: string;
  onComplete?: () => void;
}

export function Edit({ slug, onComplete }: EditProps) {
  const { page } = usePage(slug);
  const { updatePage, isUpdating } = usePageMutations();

  const handleSubmit = async (data: PagePayload) => {
    await updatePage({ slug, data });
    onComplete?.();
  };

  if (!page) {
    return null;
  }

  return (
    <EntityForm<PagePayload>
      title="Page"
      initialData={page}
      onSubmit={handleSubmit}
      isSubmitting={isUpdating}
      Form={PageForm}
      queryKey={pageKeys.all}
      mode="edit"
    />
  );
}
