import { and, eq } from "drizzle-orm";
import { TemplatePayload } from "../../config/template.type";
import { templatePages, templates } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export async function updateTemplate(payload: TemplatePayload & { templateId: string, userId: string }) {

    const { userId, templateId, title, description, category, image, pages: pageData, isPublic } = payload;

    try {
        const existingTemplate = await db.query.templates.findFirst({
            where: and(
                eq(templates.id, templateId),
                eq(templates.userId, userId)
            ),
        });

        if (!existingTemplate) {
            return;
        }

        return await db.transaction(async (tx) => {
            await tx.update(templates)
                .set({
                    title,
                    description,
                    category,
                    image: image || existingTemplate.image,
                    updatedAt: new Date().toISOString(),
                    isPublic: isPublic !== undefined ? isPublic : existingTemplate.isPublic,
                })
                .where(eq(templates.id, templateId));

            await tx.delete(templatePages)
                .where(eq(templatePages.templateId, templateId));

            for (const page of pageData) {
                await tx.insert(templatePages).values({
                    name: page.name,
                    html: page.html,
                    css: page.css,
                    templateId: templateId,
                });
            }

            const updatedTemplate = await tx.query.templates.findFirst({
                where: eq(templates.id, templateId),
                with: {
                    pages: true,
                },
            });

            return updatedTemplate;
        });
    } catch (error) {
        console.error(`Error updating template ${templateId}:`, error);
        return;
    }
}
