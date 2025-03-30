import { Filter } from "@/features/auth/config/user.type";
import { PagePayload } from "../../config/page.type";
import { pageUseCase } from "./pages.use-case";


export async function createPage(payload: PagePayload) {
    return pageUseCase.create(payload);
  }
  
  export async function getPage(slug: string) {
    return pageUseCase.getById(slug);
  }
  
  export async function updatePage(slug: string, payload: PagePayload) {
    return pageUseCase.update(slug, payload);
  }
  
  export async function deletePage(slug: string) {
    return pageUseCase.delete(slug);
  }
  
  export async function getPages(filter: Filter) {
    return pageUseCase.list(filter);
  }
  
  export async function getPagesByProject(filter: Filter & { projectId: string }) {
    return pageUseCase.execute('getPagesByProject', filter);
  }
  
  export async function updatePageById(id: string, payload: PagePayload) {
    return pageUseCase.execute('updateById', id, payload);
  }
  
  export async function updateContentPage(slug: string, content: string) {
    return pageUseCase.execute('updateContent', slug, content);
  }