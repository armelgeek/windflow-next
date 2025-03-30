import { TemplatePayload } from "../../config/template.type";
import { templateUseCase } from "./template.use-case";

export async function createTemplate(payload: TemplatePayload) {
    return templateUseCase.create(payload);
  }
  
  export async function getTemplate(payload: { templateId: string }) {
    return templateUseCase.getById(payload.templateId);
  }
  
  export async function updateTemplate(payload: TemplatePayload & { templateId: string, userId: string }) {
    return templateUseCase.update('', payload);
  }
  
  export async function deleteTemplate(payload: { userId: string, templateId: string }) {
    return templateUseCase.execute('delete', payload);
  }
  
  export async function getTemplates() {
    return templateUseCase.list();
  }
  
  export async function getUserTemplate(payload: { userId: string, templateId: string }) {
    return templateUseCase.execute('getUserTemplates', payload.userId);
  }
  
  export async function removeFromUserTemplate(payload: { userId: string, templateId: string }) {
    return templateUseCase.execute('removeFromUser', payload);
  }
  
  export async function createTemplateAsProject(payload: { name: string, slug: string, userId: string, templateId: string }) {
    return templateUseCase.execute('createAsProject', payload);
  }