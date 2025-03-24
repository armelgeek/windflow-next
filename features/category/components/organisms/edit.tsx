'use client';

import { useState } from 'react';
import { useCategory, useCategoryMutations } from '../../hooks/use-category';
import { EntityForm } from '@/shared/components/molecules/form/add-entity';
import { CategoryForm } from '../molecules/category-form';
import { CategoryPayload } from '../../config/category.type';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { EditIcon } from 'lucide-react';

interface EditProps {
  slug: string;
  onComplete?: () => void;
}

export function Edit({ slug, onComplete }: EditProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { category } = useCategory(slug);
  const { updateCategory } = useCategoryMutations();

  const handleSubmit = async (data: CategoryPayload) => {
    await updateCategory({ slug, data });
    setIsOpen(false);
    onComplete?.();
  };

  if (!category) {
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
        title="Modifier la catégorie"
        description="Modifier les informations de la catégorie"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onSubmit={handleSubmit}
      >
        <CategoryForm defaultValues={category} />
      </EntityForm>
    </>
  );
}
