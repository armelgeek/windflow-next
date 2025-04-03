'use client';

import { authClient } from '@/auth-client';
import { FlexibleView } from '@/shared/components/molecules/list-view/flexible-view';
import { useTableParams } from '@/shared/hooks/use-table-params';

import { Template } from '../../config/template.type';
import { useTemplates } from '../../hooks/use-template-info';
import TemplateCard from '../molecules/template-card';
import { columns } from '../organisms/columns';

export default function UserTemplateList() {
  const { params, tableProps } = useTableParams();
  const { data: session } = authClient.useSession();
  const { data, meta, isLoading } = useTemplates({ ...params, userId: session?.user.id });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">Gestion des templates</h2>
          <p className="text-muted-foreground">Choississez parmi la selection de template</p>
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
          <TemplateCard
            template={data}
            row={row}
            index={Number(data.id)}
          />
        )}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      />
    </div>
  );
}
