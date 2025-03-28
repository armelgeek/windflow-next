'use client';

import { useProject, useProjectMutations } from '../../hooks/use-project';
import { EntityForm } from '@/shared/components/molecules/form/add-entity';
import { ProjectForm } from '../molecules/project-form';
import { ProjectPayload } from '../../config/project.type';
import { projectKeys } from '../../config/project.key';

interface EditProps {
  slug: string;
  onComplete?: () => void;
}

export function Edit({ slug, onComplete }: EditProps) {
  const { project } = useProject(slug);
  const { updateProject, isUpdating } = useProjectMutations();

  const handleSubmit = async (data: ProjectPayload) => {
    await updateProject({ slug, data });
    onComplete?.();
  };

  if (!project) {
    return null;
  }

  return (
    <EntityForm<ProjectPayload>
      title="Project"
      initialData={project}
      onSubmit={handleSubmit}
      isSubmitting={isUpdating}
      Form={ProjectForm}
      queryKey={projectKeys.all}
      mode="edit"
    />
  );
}
