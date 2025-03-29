import { db } from "@/drizzle/db";
import { templates } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function removeTemplate(payload: {
    templateId: string
}) {
    const { templateId } = payload;
    try {
        const allTemplates = await db.query.templates.findMany({
            where: eq(templates.isPublic, true),
            with: {
                pages: true,
            },
        });

        return allTemplates;
    } catch (error) {
        console.error("Error fetching templates:", error);
        return;
    }
};