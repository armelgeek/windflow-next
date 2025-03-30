import { ProjectForm } from '../molecules/project-form';
import { useProjectMutations } from '../../hooks/use-project';
import { projectKeys } from '../../config/project.key';
import { ProjectPayload } from '../../config/project.type';
import { EntityForm } from '@/shared/components/molecules/form/add-entity';
import { authClient } from '@/auth-client';
import { useTemplateMutations } from '@/features/templates/hooks/use-template-info';

export function Add() {
  const { data: session } = authClient.useSession();
  const { createProject, isCreating } = useProjectMutations();
  const { createAsProject } = useTemplateMutations();
  const handleSubmit = async (data: ProjectPayload) => {
    if (data.templateId != null && typeof data.templateId != 'undefined') {
      await createAsProject({
        name: data.name,
        templateId: data.templateId,
        userId: session?.user?.id
      })
    }else{
      await createProject(data);
    }
  
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
      className="max-w-md"
    />
  );
}