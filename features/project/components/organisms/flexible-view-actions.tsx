'use client';

import { Row } from '@tanstack/react-table';

import { Project } from '../../config/project.type';
import { Delete } from './delete';
import { Edit } from './edit';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function FlexibleViewActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const category = row.original as Project;

  return (
    <div className="flex space-x-2">
      <div className="flex flex-1 items-center justify-center rounded bg-slate-800 px-0.5 py-1 text-center text-sm font-medium text-white  transition">
        <Edit slug={category.slug} />
      </div>
      <div  className="p-1 text-gray-500 hover:text-red-500 rounded hover:bg-gray-100 transition">
        <Delete slug={category.slug} />
      </div>
      
    </div>
  );
}
