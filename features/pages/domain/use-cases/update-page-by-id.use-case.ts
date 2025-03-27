import 'server-only';

import { eq, or, sql } from 'drizzle-orm';

import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema/pages';
import { PagePayload } from '../../config/page.type';

export async function updatePageById(id: string, payload: PagePayload) {
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
  .set({ ...payload, updatedAt: sql`NOW()` })
  .where(or(eq(pages.id, id), eq(pages.slug, id)));

  return;
}
