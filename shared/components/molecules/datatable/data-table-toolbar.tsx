'use client';

import { Table } from '@tanstack/react-table';

import { DataTableViewOptions } from '@/shared/components/molecules/datatable/data-table-view-options';
import { DebouncedInput } from '@/components/ui/debounced-input';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <DebouncedInput
            placeholder="Search ..."
            value={table.getState().globalFilter ?? ''}
            onChange={(value) => table.setGlobalFilter(value)}
            className="h-8 w-[150px] ps-9 lg:w-[250px]"
          />

        </div>
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
