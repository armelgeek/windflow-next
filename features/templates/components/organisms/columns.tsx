'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { Project } from '@/features/project/config/project.type';

import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';
import Link from 'next/link';

export const columns: ColumnDef<Project>[] = [
  {
    id: 'name',
    meta: 'Name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full"><Link href={`/editor/${row.original.slug}`}>{row.original.name}</Link></div>;
    },

  },
  {
    id: 'description',
    meta: 'Description',
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
  },
];
