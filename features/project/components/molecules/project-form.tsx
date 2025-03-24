import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { Project, ProjectPayload } from '../../config/project.type';
import { ProjectFormSchema } from '../../config/project.schema';

interface ProjectFormProps {
  initialData: Pick<Project, 'name'> | null;
  onSubmit: (input: ProjectPayload) => Promise<void>;
  onSuccess?: () => void;
}

export const ProjectForm = ({ initialData = null, onSubmit, onSuccess }: ProjectFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<ProjectPayload>({
    schema: ProjectFormSchema,
    initialValues: initialData || {
      name: ''
    },
    onSubmit,
    onSuccess
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <ControlledTextInput
            name="name"
            label="Name"
            placeholder="Project Name"
            control={form.control}
          />

          <Button type="submit" className="mt-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Edit Project'
            ) : (
              'Add Project'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}