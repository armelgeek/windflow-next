import 'server-only';
import { eq, sql } from 'drizzle-orm';
import slugify from 'slugify';
import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema/projects';
import { pages } from '@/drizzle/schema/pages';
import { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';
import { UseCase } from '@/shared/lib/use-cases';
import { Project, ProjectPayload } from '../../config/project.type';
import { ProjectFormSchema } from '../../config/project.schema';


export const projectUseCase = new UseCase<Project, ProjectPayload, unknown>({
    name: 'Project',
    schema: ProjectFormSchema,
    operations: {
        async create(data: ProjectPayload) {
            const slug = slugify(data.name, { lower: true });
            const existingProject = await db.query.projects.findFirst({
                where: eq(projects.slug, slug),
            });

            if (existingProject) {
                throw new Error('Project with this name already exists');
            }
            return await db.transaction(async (tx) => {
                const [project] = await tx
                    .insert(projects)
                    .values({ ...data, slug })
                    .returning();

                await tx
                    .insert(pages)
                    .values({
                        name: "Home",
                        slug: `${slug}-home`,
                        html: "",
                        css: "",
                        content: "",
                        projectId: project.id
                    })
                return project;
            })
        },

        async getById(slug: string) {
            const project = await db.query.projects.findFirst({
                where: eq(projects.slug, slug)
            });
            return project ?? null;
        },

        async update(slug: string, data: ProjectPayload) {
            await db
                .update(projects)
                .set({ ...data, updatedAt: sql`NOW()` })
                .where(eq(projects.slug, slug));

            return { message: 'Project updated successfully' };
        },

        async delete(slug: string) {
            const projectData = await db.query.projects.findFirst({
                where: eq(projects.slug, slug)
            });

            if (!projectData) {
                throw new Error('Project not found');
            }

            const relatedPages = await db.query.pages.findMany({
                where: eq(pages.projectId, projectData.id)
            });

            if (relatedPages.length > 0) {
                throw new Error('Cannot delete project with associated pages');
            }

            await db
                .delete(projects)
                .where(eq(projects.slug, slug));

            return { message: 'Project deleted successfully' };
        },

        async list(filter: Filter) {
            const searchColumns = ['name', 'description'];
            const sortColumns = ['name', 'createdAt', 'status'];

            const whereClause = {
                search: filter.search,
                status: filter.status,
                userId: filter.userId
            };
            const conditions = filterWhereClause(searchColumns, whereClause);
            const sort = filterOrderByClause(sortColumns, filter.sortBy, filter.sortDir);

            const [{ count }] = await db
                .select({
                    count: sql<number>`count(*)`,
                })
                .from(projects)
                .where(conditions);

            const { currentPage, itemsPerPage, offset } = calculatePagination(filter.page, filter.pageSize);
            const pagination = createPagination(count, currentPage, itemsPerPage, offset);

            const data = await db
                .select({
                    id: projects.id,
                    name: projects.name,
                    slug: projects.slug,
                    userId: projects.userId,
                    createdAt: projects.createdAt,
                    updatedAt: projects.updatedAt,
                })
                .from(projects)
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
    }
});
