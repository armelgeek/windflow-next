'use client';

import { useTableParams } from '@/shared/hooks/use-table-params';
import { useProjects } from '@/features/project/hooks/use-project';
import { columns } from '@/features/project/components/organisms/columns';
import { Add } from '@/features/project/components/organisms/add';
import { FlexibleView } from '@/shared/components/molecules/list-view/flexible-view';
import { Project } from '../../config/project.type';
import ProjectCard from '../molecules/project-card';

export default function ProjetList() {
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

      <FlexibleView<Project, unknown>
        columns={columns}
        data={data}
        meta={meta}
        isLoading={isLoading}
        isError={false}
        {...tableProps}

        renderCard={(data, row) => (
          <ProjectCard data={data} row={row}/>
        )}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      />
    </div>
  );
}
