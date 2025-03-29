import { db } from "@/drizzle/db";
import { templates } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function removeTemplate(payload: {
    userId: string, templateId: string
}) {
    const { userId, templateId } = payload;
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

        await db.delete(templates)
            .where(eq(templates.id, templateId));

        return true;
    } catch (error) {
        console.error(`Error deleting template ${templateId}:`, error);
        return;
    }
}

