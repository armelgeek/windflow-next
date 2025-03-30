import 'server-only';
import { eq, or, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { z } from 'zod';
import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema/pages';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { PageFormSchema } from '../../config/page.schema';
import { Page, PagePayload } from '../../config/page.type';


export const pageUseCase = new UseCase<Page, PagePayload, unknown>({
  name: 'Page',
  schema: PageFormSchema,
  operations: {
    async create(data: PagePayload) {
      const slug = slugify(data.name, { lower: true });
      
      const [page] = await db
        .insert(pages)
        .values({ ...data, slug })
        .returning();
        
      return page;
    },
    
    async getById(slug: string) {
      const data = await db.query.pages.findFirst({
        where: eq(pages.slug, slug)
      });
      
      if (!data) {
        throw new Error('Page not found');
      }
      
      return data;
    },
    
    async update(slug: string, data: PagePayload) {
      const existingPage = await db.query.pages.findFirst({
        where: eq(pages.slug, slug),
      });
      
      if (!existingPage) {
        throw new Error('Page not found');
      }
      
      await db
        .update(pages)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(eq(pages.slug, slug));
      
      return { message: 'Page updated successfully' };
    },
    
    async delete(slug: string) {
      const existingPage = await db.query.pages.findFirst({
        where: eq(pages.id, slug),
      });
      
      if (!existingPage) {
        throw new Error('Page not found');
      }
      
      await db
        .delete(pages)
        .where(eq(pages.id, slug));
      
      return { message: 'Page deleted successfully' };
    },
    
    async list(filter: Filter) {
      const searchColumns = ['name'];
      const sortColumns = ['name'];
      
      const whereClause = {
        search: filter.search,
        projectId: filter.projectId
      };
      
      const conditions = filterWhereClause(searchColumns, whereClause);
      const sort = filterOrderByClause(sortColumns, filter.sortBy, filter.sortDir);
      
      const [{ count }] = await db
        .select({
          count: sql<number>`count(*)`,
        })
        .from(pages)
        .where(conditions);
        
      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);
      
      const data = await db
        .select({
          id: pages.id,
          name: pages.name,
          slug: pages.slug,
          createdAt: pages.createdAt,
          updatedAt: pages.updatedAt,
          html: pages.html,
          css: pages.css,
          content: pages.content,
          projectId: pages.projectId,
        })
        .from(pages)
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
    },
    async getPagesByProject(filter: Filter & { projectId: string }) {
      const searchColumns = ['name'];
      const sortColumns = ['name'];
      
      const whereClause = {
        search: filter.search,
        projectId: filter.projectId
      };
      
      const conditions = filterWhereClause(searchColumns, whereClause);
      const sort = filterOrderByClause(sortColumns, filter.sortBy, filter.sortDir);
      
      const [{ count }] = await db
        .select({
          count: sql<number>`count(*)`,
        })
        .from(pages)
        .where(conditions);
        
      const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
      const pagination = createPagination(count, currentPage, itemsPerPage, offset);
      
      const data = await db
        .select({
          id: pages.id,
          name: pages.name,
          slug: pages.slug,
          content: pages.content,
          project_id: pages.projectId,
          html: pages.html,
          css: pages.css,
          created_at: pages.createdAt,
          updated_at: pages.updatedAt,
        })
        .from(pages)
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
    },
    
    async updateById(id: string, data: PagePayload) {
      const existingPage = await db.query.pages.findFirst({
        where: or(
          eq(pages.id, id),
          eq(pages.slug, id)
        ),
      });
      
      if (!existingPage) {
        throw new Error('Page not found');
      }
      
      await db
        .update(pages)
        .set({ ...data, updatedAt: sql`NOW()` })
        .where(or(eq(pages.id, id), eq(pages.slug, id)));
      
      return { message: 'Page updated successfully' };
    },
    
    async updateContent(slug: string, content: any) {
      const existingPage = await db.query.pages.findFirst({
        where: eq(pages.slug, slug),
      });
      
      if (!existingPage) {
        throw new Error('Page not found');
      }
      
      await db
        .update(pages)
        .set({ content, updatedAt: sql`NOW()` })
        .where(eq(pages.slug, slug));
      
      return { message: 'Page content updated successfully' };
    }
  }
});
