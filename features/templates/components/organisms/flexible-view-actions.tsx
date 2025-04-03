'use client';

import { Row } from '@tanstack/react-table';

import { Delete } from './delete';
import { Edit } from './edit';
import { Template } from '../../config/template.type';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function FlexibleViewActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const template = row.original as Template;

  return (
    <div className="flex space-x-2">
      <div className="flex flex-1 items-center justify-center rounded bg-slate-800 px-0.5 py-1 text-center text-sm font-medium text-white  transition">
        <Edit slug={template.slug} />
      </div>
      <div  className="p-1 text-gray-500 hover:text-red-500 rounded hover:bg-gray-100 transition">
        <Delete slug={template.slug} />
      </div>
      
    </div>
  );
}
