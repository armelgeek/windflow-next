import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';
import { TemplatePayload } from '../../config/template.type';
import { TemplateFormSchema } from '../../config/template.schema';
import { ControlledTextareaInput } from '@/shared/components/molecules/form/ControlledTextareaInput';
import { ControlledSwitch } from '@/shared/components/molecules/form/ControlledSwitch';

interface TemplateFormProps {
    initialData: Pick<TemplatePayload, 'title'> | null
    onSubmit: (input: TemplatePayload) => Promise<void>;
    onSuccess?: () => void;
}

export const TemplateForm = ({ initialData = null, onSubmit, onSuccess }: TemplateFormProps) => {
    const { form, handleSubmit, isSubmitting } = useFormHandler<TemplatePayload>({
        schema: TemplateFormSchema,
        initialValues: {
            title: initialData?.title || '',
            description: '',
            category: '',
            image: '',
            settings: {},
            isPublic: false
        },
        onSubmit,
        onSuccess
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <ControlledTextInput
                        name="title"
                        label="Name"
                        placeholder="Template Name"
                        control={form.control}
                    />
                    <ControlledTextInput
                        name="category"
                        label="Category"
                        placeholder="Category Name"
                        control={form.control}
                    />
                    <ControlledSwitch
                        name="isPublic"
                        label={"Public"}
                        control={form.control}
                    />

                    <ControlledTextareaInput
                        name="description"
                        label="Déscription"
                        placeholder="Template Description"
                        control={form.control}
                    />



                    <Button type="submit" className="mt-2" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        ) : initialData ? (
                            'Edit Template'
                        ) : (
                            'Add Template'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}