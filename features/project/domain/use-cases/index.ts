import { Filter } from "@/features/auth/config/user.type";
import { ProjectPayload } from "../../config/project.type";
import { projectUseCase } from "./project.use-case";

export async function createProject(payload: ProjectPayload) {
    return projectUseCase.create(payload);
}

export async function getProject(slug: string) {
    return projectUseCase.getById(slug);
}

export async function updateProject(slug: string, payload: ProjectPayload) {
    return projectUseCase.update(slug, payload);
}
export async function deleteProject(slug: string) {
    return projectUseCase.delete(slug);
}

export async function getProjects(filter: Filter) {
    return projectUseCase.list(filter);
}