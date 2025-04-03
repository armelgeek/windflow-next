import { Filter } from "@/features/auth/config/user.type";
import { TemplatePayload } from "../../config/template.type";
import { templateUseCase } from "./template.use-case";

export async function createTemplate(payload: TemplatePayload) {
    return templateUseCase.create(payload);
  }
  
  export async function getTemplate(payload: { slug: string }) {
    return templateUseCase.getById(payload.slug);
  }
  
  export async function updateTemplate(payload: TemplatePayload) {
    return templateUseCase.update(payload.slug || '', payload);
  }
  
  export async function deleteTemplate(slug: string) {
    return templateUseCase.execute('delete', slug);
  }
  
  export async function getTemplates(filter: Filter) {
    return templateUseCase.list(filter);
  }
  export async function getUserTemplates(filter: Filter){
    return templateUseCase.list(filter);
  }
  
  export async function getUserTemplate(payload: { userId: string, templateId: string }) {
    return templateUseCase.execute('getUserTemplates', payload.userId);
  }
  
  export async function removeFromUserTemplate(payload: { userId: string, templateId: string }) {
    return templateUseCase.execute('removeFromUser', payload);
  }
  export async function getOverview() {
    return templateUseCase.execute('getOverview');
  }
  
  export async function createTemplateAsProject(payload: { name: string, slug: string, userId: string, templateId: string }) {
    return templateUseCase.execute('createAsProject', payload);
  }
  