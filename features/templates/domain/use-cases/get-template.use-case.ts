import { db } from "@/drizzle/db";
import { templates } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getTemplate(payload: {
    templateId: string
}) {
    const { templateId } = payload;

    try {
        const template = await db.query.templates.findFirst({
            where: eq(templates.id, templateId),
            with: {
                pages: true,
            },
        });

        if (!template) {
            return;
        }

        return template;
    } catch (error) {
        console.error(`Error fetching template ${templateId}:`, error);
        return;
    }
}