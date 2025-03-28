import 'server-only';

import { eq } from 'drizzle-orm';
import slugify from 'slugify';

import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema/projects';
import { TemplatePayload } from '../../config/template.type';
import { templatePages, templates } from '@/drizzle/schema';

export async function createTemplate(payload: TemplatePayload) {
    const slug = slugify(payload.title, { lower: true });
    const { userId, title, description, category, image, pages: pageData, settings, isPublic = true } = payload;

    const existingTemplate = await db.query.templates.findFirst({
        where: eq(projects.slug, slug),
    });

    if (existingTemplate) {
        throw new Error('Template with this name already exists');
    }


    return await db.transaction(async (tx) => {
        const [template] = await tx.insert(templates).values({
            title,
            description,
            slug,
            category,
            image,
            userId: userId,
            isPublic,
        }).returning();

        for (const page of pageData) {
            await tx.insert(templatePages).values({
                name: page.name,
                html: page.html,
                css: page.css,
                templateId: template.id,
            });
        }
        const completeTemplate = await tx.query.templates.findFirst({
            where: eq(templates.id, template.id),
            with: {
                pages: true,
            },
        });
        return completeTemplate;
    });
}