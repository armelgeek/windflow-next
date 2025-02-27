'use client';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CategoryPayload } from '../../config/category.type';
import { CategoryForm } from '../molecules/category-form';
import { useCategoryMutations } from '../../hooks/use-category';
import { categoryKeys } from '../../config/category.key';

export function Add() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);

  const { createCategory, isCreating } = useCategoryMutations();

  const handleSubmit = async (input: CategoryPayload) => {
    await createCategory(input);
    setIsOpen(false);
    queryClient.invalidateQueries({ queryKey: categoryKeys.all });
  };

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <SheetTrigger asChild>
        <Button>
          <Plus
            className="-ms-1 me-2"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Add Category
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w w-full md:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Add Category</SheetTitle>
          <SheetDescription>Click save when you&#39;re done.</SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <CategoryForm
            initialData={null}
            onSubmit={handleSubmit}
            isSubmitting={isCreating}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
