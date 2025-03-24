'use client';

import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { columns } from '@/features/pages/components/organisms/columns';
import { usePages } from '@/features/pages/hooks/use-page';
import { Add } from '@/features/pages/components/organisms/add';
import { useTableParams } from '@/shared/hooks/use-table-params';

export default function Pages({ projectId }: {
  projectId: string
}) {
  const { params, tableProps } = useTableParams();
  const { data, meta, isLoading } = usePages({
    ...params,
    projectId,
  });

  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <h2 className="text-2xl font-bold tracking-tight">Pages</h2>
          <p className="text-muted-foreground">
            Gérez vos pages ici. Vous pouvez créer, modifier et supprimer des pages.
          </p>
        </div>
        <Add projectId={projectId}/>
      </div>

      <DataTable
        columns={columns}
        data={data}
        meta={meta}
        isLoading={isLoading}
        isError={false}
        {...tableProps}
      />
    </div>
  );
}
