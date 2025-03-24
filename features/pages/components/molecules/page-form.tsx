import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';

import { Page, PagePayload } from '../../config/page.type';
import { PageFormSchema } from '../../config/page.schema';

interface PageFormProps {
  initialData: Pick<Page, 'name'> | null;
  onSubmit: (input: PagePayload) => Promise<void>;
  onSuccess?: () => void;
}

export const PageForm = ({ initialData = null, onSubmit, onSuccess }: PageFormProps) => {
  const { form, handleSubmit, isSubmitting } = useFormHandler<PagePayload>({
    schema: PageFormSchema,
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
            placeholder="Page Name"
            control={form.control}
          />

          <Button type="submit" className="mt-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : initialData ? (
              'Edit Page'
            ) : (
              'Add Page'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}