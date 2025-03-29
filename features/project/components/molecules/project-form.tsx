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

interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
}

const PROJECT_TEMPLATES: ProjectTemplate[] = [
  { id: 'empty', name: 'Empty Project', description: 'Start from scratch', category: 'Basic' },
  { id: 'basic-web', name: 'Basic Web', description: 'Simple web project', category: 'Web' },
  { id: 'react-app', name: 'React Application', description: 'React.js starter', category: 'Web' },
  { id: 'vue-app', name: 'Vue Application', description: 'Vue.js starter', category: 'Web' },
  { id: 'api-node', name: 'Node.js API', description: 'REST API with Node', category: 'Backend' },
  { id: 'api-python', name: 'Python API', description: 'REST API with Python', category: 'Backend' },
  { id: 'mobile-react', name: 'React Native', description: 'Mobile app with React Native', category: 'Mobile' },
  { id: 'mobile-flutter', name: 'Flutter App', description: 'Mobile app with Flutter', category: 'Mobile' },
];


interface ProjectFormProps {
  initialData: Pick<Project, 'name'> | null;
  onSubmit: (input: ProjectPayload & { templateId?: string }) => Promise<void>;
  onSuccess?: () => void;
}

export const ProjectForm = ({ initialData = null, onSubmit, onSuccess }: ProjectFormProps) => {
  const [templateId, setTemplateId] = useState('empty');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const selectedTemplate = PROJECT_TEMPLATES.find(t => t.id === templateId);
  
  const { form, handleSubmit, isSubmitting } = useFormHandler<ProjectPayload>({
    schema: ProjectFormSchema,
    initialValues: initialData || {
      name: ''
    },
    onSubmit: async (data) => {
      const payload = initialData 
        ? data 
        : { ...data, templateId };
      
      await onSubmit(payload);
    },
    onSuccess
  });

  const filteredTemplates = search 
    ? PROJECT_TEMPLATES.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase()) || 
        t.description.toLowerCase().includes(search.toLowerCase())
      )
    : PROJECT_TEMPLATES;

  // Group templates by category
  const groupedTemplates: Record<string, ProjectTemplate[]> = {};
  filteredTemplates.forEach(template => {
    if (!groupedTemplates[template.category]) {
      groupedTemplates[template.category] = [];
    }
    groupedTemplates[template.category].push(template);
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
                  {selectedTemplate ? (
                    <span className="flex items-center">
                      <span>{selectedTemplate.name}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {selectedTemplate.category}
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
                      {Object.keys(groupedTemplates).map(category => (
                        <CommandGroup key={category} heading={category}>
                          {groupedTemplates[category].map(template => (
                            <CommandItem
                              key={template.id}
                              value={template.id}
                              onSelect={() => {
                                setTemplateId(template.id);
                                setOpen(false);
                              }}
                            >
                              <div className="flex flex-col">
                                <span>{template.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {template.description}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      ))}
                    </ScrollArea>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            {selectedTemplate && (
              <p className="text-xs text-muted-foreground">
                {selectedTemplate.description}
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