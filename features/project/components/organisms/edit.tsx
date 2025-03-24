'use client';

import { useState } from 'react';
import { useProject, useProjectMutations } from '../../hooks/use-project';
import { EntityForm } from '@/shared/components/molecules/form/add-entity';
import { ProjectForm } from '../molecules/project-form';
import { ProjectPayload } from '../../config/project.type';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { EditIcon } from 'lucide-react';

interface EditProps {
  slug: string;
  onComplete?: () => void;
}

export function Edit({ slug, onComplete }: EditProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { project } = useProject(slug);
  const { updateProject } = useProjectMutations();

  const handleSubmit = async (data: ProjectPayload) => {
    await updateProject({ slug, data });
    setIsOpen(false);
    onComplete?.();
  };

  if (!project) {
    return null;
  }

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <EditIcon size={16} className="mr-2" />
        Edit
      </DropdownMenuItem>
      <EntityForm
        title="Modifier la projet"
        description="Modifier les informations de la projet"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
      >
        <ProjectForm defaultValues={project} />
      </EntityForm>
    </>
  );
}
