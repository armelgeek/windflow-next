import 'server-only';
import { Template, TemplatePayload } from '../../config/template.type';
import { UseCase } from '@/shared/lib/use-cases';
import {  TemplateOperations } from './template.op';
import { TemplateFormSchema } from '../../config/template.schema';
const op = new TemplateOperations();

export const templateUseCase = new UseCase<Template, TemplatePayload, unknown>({
    name: 'Template',
    schema: TemplateFormSchema,
    operations: {
        create: op.create.bind(op),
        getById: op.getById.bind(op),
        update: op.update.bind(op),
        delete: op.delete.bind(op),
        list: op.list.bind(op),
        getUserTemplates: op.getUserTemplates.bind(op),
        removeFromUser: op.removeFromUser.bind(op),
        createAsProject: op.createAsProject.bind(op),
        getOverview: op.getOverview.bind(op)
      }
});
