import { pages, projects, templates } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import slugify from "slugify";

export async function createTemplateAsProject(payload: {
    name: string,
    slug: string,
    userId: string,
    templateId: string
}) {
    const { name, userId, templateId } = payload;
    const slug = slugify(payload.name, { lower: true });
    try {
        const template = await db.query.templates.findFirst({
            where: eq(templates.id, templateId),
            with: {
                pages: true,
            },
        }) as { pages: Array<{ name: string; html: string; css: string }> } | null;

        if (!template) {
            return;
        }

        return await db.transaction(async (tx) => {
            const [newProject] = await tx.insert(projects).values({
                name,
                slug,
                userId
            }).returning();

            for await (const templatePage of template.pages) {
                await tx.insert(pages).values({
                    name: templatePage.name,
                    slug: slug,
                    html: templatePage.html,
                    css: templatePage.css,
                    projectId: newProject.id,
                });
            }

            const completeProject = await tx.query.projects.findFirst({
                where: eq(projects.id, newProject.id),
                with: {
                    pages: true,
                },
            });

            return completeProject;
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return;
    }
};
