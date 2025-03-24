'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { Page } from '@/features/pages/config/page.type';

import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';

export const columns: ColumnDef<Page>[] = [
  {
    id: 'name',
    meta: 'Name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('name')}</div>;
    },
  },
  {
    id: 'actions',
    maxSize: 75,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
