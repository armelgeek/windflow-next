'use client';

import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
import { useTemplateMutations } from '../../hooks/use-template-info';
import { templateKeys } from '../../config/template.key';

interface DeleteProps {
  slug: string;
  onComplete?: () => void;
}

export function Delete({ slug, onComplete }: DeleteProps) {
  const { deleteTemplate } = useTemplateMutations();

  return (
    <EntityDelete
      entityId={slug}
      entityName="Template"
      deleteService={async (id: string) => await deleteTemplate(id)}
      queryKey={templateKeys.all}
      onActionComplete={onComplete}
    />
  );
}
