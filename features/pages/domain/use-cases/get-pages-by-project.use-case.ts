import 'server-only';
import { sql } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema/pages';
import type { Filter } from '@/shared/lib/types/filter';
import { calculatePagination } from '@/shared/lib/utils/calculate-pagination';
import { createPagination } from '@/shared/lib/utils/create-pagination';
import { filterOrderByClause } from '@/shared/lib/utils/filter-order-by-clause';
import { filterWhereClause } from '@/shared/lib/utils/filter-where-clause';

export async function getPagesByProject(filter: Filter & {projectId: string}) {
  const searchColumns = ['name'];
  const sortColumns = ['name'];
  console.log('filter',filter);

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
  console.log('conditions',conditions);
  const data = await db
    .select({
      id: pages.id,
      name: pages.name,
      slug: pages.slug,
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
}