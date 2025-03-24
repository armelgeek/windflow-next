import 'server-only';
import { sql } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema/projects';
import type { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';

export async function getProjects(filter: Filter) {
  const searchColumns = ['name'];
  const sortColumns = ['name'];

  const whereClause = {
    search: filter.search
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
      created_at: projects.createdAt,
      updated_at: projects.updatedAt,
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