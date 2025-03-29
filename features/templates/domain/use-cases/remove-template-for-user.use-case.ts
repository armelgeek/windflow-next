import { db } from "@/drizzle/db";
import { userTemplates } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";

export async function removeFromUserTemplate(payload: {
    userId: string, templateId: string
}) {
    const { userId, templateId } = payload;
    try {
        await db.delete(userTemplates)
            .where(and(
                eq(userTemplates.userId, userId),
                eq(userTemplates.templateId, templateId)
            ));

        return true;
    } catch (error) {
        console.error(`Error removing template ${templateId} from user ${userId}:`, error);
        return;
    }
}