import 'server-only';
import { and, eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { templates, templatePages, projects, pages, userTemplates } from '@/drizzle/schema';
import { Template, TemplatePayload } from '../../config/template.type';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { Filter } from '@/shared/lib/types/filter';
import { Page } from '@/features/pages/config/page.type';
export class TemplateOperations {
  async create(payload: TemplatePayload): Promise<Template> {
    const slug = slugify(payload.title, { lower: true });
    const { userId, title, description, category, image, pages: pageData, isPublic = true } = payload;

    const existingTemplate = await db.query.templates.findFirst({
      where: eq(templates.slug, slug),
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
        isPublic,
        userId: userId
      }).returning();

      for (const page of pageData) {
        if (!page.name) {
          throw new Error('Page data is incomplete');
        }
        await tx.insert(templatePages).values({
          name: page.name ?? '',
          html: page.html ?? '',
          css: page.css ?? '',
          templateId: template.id,
        });
      }

      return template;
    });
  }

  async getById(slug: string): Promise<Template & {pages: Page[]}> {
    try {
      const template = await db.query.templates.findFirst({
        where: and(
          eq(templates.slug, slug!),
          eq(templates.isPublic, true)
        )
      });

      if (!template) {
        throw new Error('Template not found');
      }
      const tps = await db.query.templatePages.findMany({
        where: eq(templatePages.templateId, template.id)
      });
      return {
        ...template,
        pages: tps.map(page => ({
          ...page,
          slug: '', 
          content: null, 
          projectId: null,
        }))
      };
    } catch (error) {
      console.error(`Error fetching template:`, error);
      throw error;
    }
  }


  async update(id: string, payload: TemplatePayload): Promise<Template> {
    const { templateId, title, description, category, image, pages: pageData, isPublic } = payload;

    try {
      const existingTemplate = await db.query.templates.findFirst({
        where: eq(templates.id, id),
      });

      if (!existingTemplate) {
        throw new Error('Template not found or you do not have permission to update it');
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
          .where(eq(templates.id, templateId!));

        await tx.delete(templatePages)
          .where(eq(templatePages.templateId, templateId!));

        for (const page of pageData) {
          await tx.insert(templatePages).values({
            name: page.name ?? '',
            html: page.html ?? '',
            css: page.css ?? '',
            templateId: templateId!,
          });
        }

        const updatedTemplate = await tx.query.templates.findFirst({
          where: eq(templates.id, templateId!),
          with: {
            pages: true,
          },
        });

        return updatedTemplate!;
      });
    } catch (error) {
      console.error(`Error updating template ${templateId}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    const [userId, templateId] = id.split(':');

    try {
      const existingTemplate = await db.query.templates.findFirst({
        where: and(
          eq(templates.id, templateId),
          eq(templates.userId, userId)
        ),
      });

      if (!existingTemplate) {
        throw new Error('Template not found or you do not have permission to delete it. Ensure the id is in the format "userId:templateId".');
      }

      await db.delete(templates)
        .where(eq(templates.id, templateId));

      return { message: 'Template deleted successfully' };
    } catch (error) {
      console.error(`Error deleting template ${templateId}:`, error);
      throw error;
    }
  }


  async list(filter: Filter) {
    const searchColumns = ['title'];
    const sortColumns = ['name', 'createdAt', 'status'];

    const whereClause = {
      search: filter.search,
      isPublic: true
    };
    const conditions = filterWhereClause(searchColumns, whereClause);
    const sort = filterOrderByClause(sortColumns, filter.sortBy, filter.sortDir);

    const [{ count }] = await db
      .select({
        count: sql<number>`count(*)`,
      })
      .from(templates)
      .where(conditions);

    const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
    const pagination = createPagination(count, currentPage, itemsPerPage, offset);

    const data = await db
      .select({
        id: templates.id,
        title: templates.title,
        image: templates.image,
        description: templates.description,
        slug: templates.slug,
        userId: templates.userId,
        createdAt: templates.createdAt,
        updatedAt: templates.updatedAt,
      })
      .from(templates)
      .where(conditions)
      .orderBy(sort)
      .limit(itemsPerPage)
      .offset(offset);

    return {
      data,
      meta: {
        pagination,
      },
    };
  }


  async getUserTemplates(userId: string): Promise<Array<Template & { isCreator: boolean; customName?: string }>> {
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
          customName: template.title,
        })),
        ...savedTemplates.map(userTemplate => {
          const template = typeof userTemplate.template === 'object' && userTemplate.template !== null
            ? userTemplate.template
            : {};
          return {
            ...template,
            isCreator: false,
            customName: userTemplate.name || (template as { title: string }).title,
          };
        }),
      ] as Array<Template & { isCreator: boolean; customName?: string }>;

      return userTemplatesList;
    } catch (error) {
      console.error(`Error fetching templates for user ${userId}:`, error);
      throw error;
    }
  }


  async removeFromUser(payload: { userId: string, templateId: string }): Promise<{ message: string }> {
    const { userId, templateId } = payload;

    try {
      await db.delete(userTemplates)
        .where(and(
          eq(userTemplates.userId, userId),
          eq(userTemplates.templateId, templateId)
        ));

      return { message: 'Template removed from user successfully' };
    } catch (error) {
      console.error(`Error removing template ${templateId} from user ${userId}:`, error);
      throw error;
    }
  }

  async createAsProject(payload: { name: string, userId: string, templateId: string }): Promise<unknown> {
    const { name, userId, templateId } = payload;
    const slug = slugify(payload.name, { lower: true });

    try {
      const template = await db.query.templates.findFirst({
        where: eq(templates.id, templateId)
      });

      if (!template) {
        throw new Error('Template not found');
      }

      const tps = await db.query.templatePages.findMany({
        where: eq(templatePages.templateId, templateId)
      });

      return await db.transaction(async (tx) => {
        const [newProject] = await tx.insert(projects).values({
          name,
          slug,
          userId
        }).returning();

        for (const templatePage of tps) {
          await tx.insert(pages).values({
            name: templatePage.name,
            slug: slug,
            html: templatePage.html,
            css: templatePage.css,
            projectId: newProject.id,
          });
        }

        return true;
      });
    } catch (error) {
      console.error('Error creating project from template:', error);
      throw error;
    }
  }
  async getOverview(): Promise<Array<Template>> {
    try {
      const allTemplates = await db.query.templates.findMany({
        where: and(eq(templates.isPublic, true)),
        limit: 4
      });

      return allTemplates;
    } catch (err) {
      console.error(`Error on get overview`);
      throw err;
    }
  }
}