import { Loader2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ControlledTextInput } from '@/shared/components/molecules/form/ControlledTextInput';
import { useFormHandler } from '@/shared/hooks/use-form-handler';
import { useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

import { Project, ProjectPayload } from '../../config/project.type';
import { ProjectFormSchema } from '../../config/project.schema';
import { useUserTemplates } from '@/features/templates/hooks/use-template-info';
import { Template } from '@/features/templates/config/template.type';
import { useSession } from '@/shared/hooks/use-session-info';

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
}


interface ProjectFormProps {
  initialData: Pick<Project, 'name'> | null;
  onSubmit: (input: ProjectPayload & { templateId?: string }) => Promise<void>;
  onSuccess?: () => void;
}
type TemplatePayload = {
  userId: string;
  search: string;
  setTemplate: (t: Template) => void;
  setOpen: (o: boolean) => void;
}
const UserTemplate = ({ userId, search, setTemplate, setOpen }: TemplatePayload) => {
  const { templates, isLoading } = useUserTemplates(userId);
  if (isLoading) {
    return <div>Loading ...</div>
  }
  return (
    <CommandGroup key={'category'} heading={'category'}>
      {templates.map(template => (
        <CommandItem
          key={template.id}
          value={template.id}
          onSelect={() => {
            setTemplate(template);
            setOpen(false);
          }}
        >
          <div className="flex flex-col">
            <span>{template.title}</span>
            <span className="text-xs text-muted-foreground">
              {template.description}
            </span>
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  )
}
export const ProjectForm = ({ initialData = null, onSubmit, onSuccess }: ProjectFormProps) => {
  const [template, setTemplate] = useState({} as Template);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { data: session } = useSession();
  const { form, handleSubmit, isSubmitting } = useFormHandler<ProjectPayload>({
    schema: ProjectFormSchema,
    initialValues: initialData || {
      name: ''
    },
    onSubmit: async (data) => {
      const payload = initialData
        ? data
        : { ...data, templateId: template.id };

      await onSubmit(payload);
    },
    onSuccess
  });


  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ControlledTextInput
          name="name"
          label="Name"
          placeholder="Project Name"
          control={form.control}
        />

        {!initialData && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Project Template</p>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between text-left font-normal"
                >
                  {template ? (
                    <span className="flex items-center">
                      <span>{template.title}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {template.category}
                      </Badge>
                    </span>
                  ) : (
                    "Select template..."
                  )}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[300px] p-0"
                align="start"
                side="bottom"
                sideOffset={4}
                forceMount
                container={document.body}
                style={{ zIndex: 1000 }}
              >
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder="Search templates..."
                    value={search}
                    onValueChange={setSearch}
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No template found.</CommandEmpty>
                    <ScrollArea className="h-[300px]">
                      {session && <UserTemplate
                        userId={session.user.id}
                        search={search}
                        setTemplate={setTemplate}
                        setOpen={setOpen}
                      />}
                    </ScrollArea>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {template && (
              <p className="text-xs text-muted-foreground">
                {template.description}
              </p>
            )}
          </div>
        )}

        <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              {initialData ? 'Saving...' : 'Creating...'}
            </>
          ) : (
            initialData ? 'Save Project' : 'Create Project'
          )}
        </Button>
      </form>
    </Form>
  );
}