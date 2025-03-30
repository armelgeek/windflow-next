import { ProjectForm } from '../molecules/project-form';
import { useProjectMutations } from '../../hooks/use-project';
import { projectKeys } from '../../config/project.key';
import { ProjectPayload } from '../../config/project.type';
import { EntityForm } from '@/shared/components/molecules/form/add-entity';

export function Add() {
  const { createProject, isCreating } = useProjectMutations();

  const handleSubmit = async (data: ProjectPayload) => {
    await createProject(data);
  };

  return (
    <EntityForm<ProjectPayload>
      title="Project"
      initialData={null}
      onSubmit={handleSubmit}
      isSubmitting={isCreating}
      Form={ProjectForm}
      queryKey={projectKeys.all}
      mode="add"
        className = "max-w-md"
    />
  );
}