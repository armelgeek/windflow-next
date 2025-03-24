'use client';

import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { useTableParams } from '@/shared/hooks/use-table-params';
import { useProjects } from '@/features/project/hooks/use-project';
import { columns } from '@/features/project/components/organisms/columns';
import { Add } from '@/features/project/components/organisms/add';

export default function ProjetPage() {
  const { params, tableProps } = useTableParams();
  const { data, meta, isLoading } = useProjects(params);

  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des projets</h2>
          <p className="text-muted-foreground">
            Gérez vos projets ici. Vous pouvez créer, modifier et supprimer des projets.
          </p>
        </div>
        <Add />
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
