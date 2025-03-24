'use client';

import { usePageMutations } from '../../hooks/use-page';
import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
import { pageKeys } from '../../config/page.key';

interface DeleteProps {
  slug: string;
  onComplete?: () => void;
}

export function Delete({ slug, onComplete }: DeleteProps) {
  const { deletePage } = usePageMutations();

  return (
    <EntityDelete
      entityId={slug}
      entityName="Page"
      deleteService={async (id: string) => await deletePage(id)}
      queryKey={pageKeys.all}
      onActionComplete={onComplete}
    />
  );
}
