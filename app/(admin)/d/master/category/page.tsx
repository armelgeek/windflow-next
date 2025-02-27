'use client';

import { Add } from '@/features/category/components/organisms/add';
import { CategoryClientPage } from './page.client';

export default function CategoryPage() {

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">Category</h1>
        <Add />
      </div>
      <CategoryClientPage />
    </div>
  );
}
