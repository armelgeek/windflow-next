'use client';

import { useState } from 'react';

import { useCategory, useCategoryMutations } from '../../hooks/use-category';
import { CategoryForm } from '../molecules/category-form';
import { LoadingSpinner } from '@/shared/components/atoms/loading-spinner';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface EditProps {
  slug: string;
  isOpenDropdown: boolean;
  setIsOpenDropdown: (open: boolean) => void;
}

export function Edit({ slug, setIsOpenDropdown }: EditProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { category, isLoading } = useCategory(slug);
  const { updateCategory, isUpdating } = useCategoryMutations();

  const handleSubmit = async (input: any) => {
    await updateCategory({ slug, data: input });
    setIsOpen(false);
    setIsOpenDropdown(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!category) {
    return <div>Catégorie non trouvée</div>;
  }

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <SheetTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Edit</DropdownMenuItem>
      </SheetTrigger>
      <SheetContent className="max-w w-full md:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>Click save when you&#39;re done.</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Modifier la catégorie</h3>
              <p className="text-sm text-muted-foreground">
                Modifiez les informations de la catégorie
              </p>
            </div>
            <CategoryForm 
              initialData={category}
              onSubmit={handleSubmit}
              isSubmitting={isUpdating}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
