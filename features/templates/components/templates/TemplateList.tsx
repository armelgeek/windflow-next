'use client';

import { useTableParams } from '@/shared/hooks/use-table-params';
import { FlexibleView } from '@/shared/components/molecules/list-view/flexible-view';
import { useTemplates } from '../../hooks/use-template-info';
import { Template } from '../../config/template.type';
import TemplateCard from '../molecules/template-card';
import { columns } from '../organisms/columns';
export default function TemplateList() {
  const { params, tableProps } = useTableParams();
  const { data, meta, isLoading } = useTemplates(params);

  return (
    <div className="space-y-4">
      <div className='flex items-center  mt-20 justify-between'>
        <div className='flex flex-col'>
          <h2 className="text-2xl font-bold tracking-tight">Templates prêts à l'emploi</h2>
          <p className="text-muted-foreground">
            Choississez parmi la selection de template
          </p>
        </div>
      </div>

      <FlexibleView<Template, unknown>
        columns={columns}
        data={data}
        meta={meta}
        isLoading={isLoading}
        isError={false}
        {...tableProps}

        renderCard={(data, row) => (
          <TemplateCard template={data} index={Number(data.id)}/>
        )}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      />
    </div>
  );
}
