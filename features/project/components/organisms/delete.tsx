'use client';

import { useProjectMutations } from '../../hooks/use-project';
import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
import { projectKeys } from '../../config/project.key';

interface DeleteProps {
  slug: string;
  onComplete?: () => void;
}

export function Delete({ slug, onComplete }: DeleteProps) {
  const { deleteProject } = useProjectMutations();

  return (
    <EntityDelete
      entityId={slug}
      entityName="Project"
      deleteService={async (id: string) => await deleteProject(id)}
      queryKey={projectKeys.all}
      onActionComplete={onComplete}
    />
  );
}
