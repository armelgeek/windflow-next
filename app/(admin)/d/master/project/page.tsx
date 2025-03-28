'use client';

import { useTableParams } from '@/shared/hooks/use-table-params';
import { useProjects } from '@/features/project/hooks/use-project';
import { columns } from '@/features/project/components/organisms/columns';
import { Add } from '@/features/project/components/organisms/add';
import { FlexibleView } from '@/shared/components/molecules/list-view/flexible-view';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DataTableRowActions } from '@/features/project/components/organisms/data-table-row-actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

      <FlexibleView
        columns={columns}
        data={data}
        meta={meta}
        isLoading={isLoading}
        isError={false}
        {...tableProps}

        renderCard={(data, row) => (
          <Card className="flex flex-col h-full">
            <CardHeader className="flex flex-row items-start justify-between">
              <h3 className="text-lg font-semibold">{data.name}</h3>
              <DataTableRowActions row={row} />
            </CardHeader>
            <CardContent>
              <p>{data.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/editor/${data.slug}`}>Ouvrir</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      />
    </div>
  );
}
