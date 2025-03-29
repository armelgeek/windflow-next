import { db } from "@/drizzle/db";
import { templates, userTemplates } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getUserTemplate(payload: {
    userId: string, templateId: string
}) {
    const { userId } = payload;
    
    try {
      const createdTemplates = await db.query.templates.findMany({
        where: eq(templates.userId, userId),
        with: {
          pages: true,
        },
      });
      
      const savedTemplates = await db.query.userTemplates.findMany({
        where: eq(userTemplates.userId, userId),
        with: {
          template: {
            with: {
              pages: true,
            },
          },
        },
      });
      
      const userTemplatesList = [
        ...createdTemplates.map(template => ({
          ...template,
          isCreator: true,
        })),
        ...savedTemplates.map(userTemplate => ({
          ...(typeof userTemplate.template === 'object' && userTemplate.template !== null ? userTemplate.template : {}),
          isCreator: false,
          customName: userTemplate.name || (userTemplate.template as { title: string }).title,
        })),
      ];
      
      return userTemplatesList;
    } catch (error) {
      console.error(`Error fetching templates for user ${userId}:`, error);
      return;
    }
};