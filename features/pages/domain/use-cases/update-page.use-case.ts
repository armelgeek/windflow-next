import 'server-only';

import { eq, sql } from 'drizzle-orm';

import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema/pages';
import { PagePayload } from '../../config/page.type';

export async function updatePage(slug: string, payload: PagePayload) {
  const existingPage = await db.query.pages.findFirst({
    where: eq(pages.slug, slug),
  });

  if (!existingPage) {
    throw new Error('Page not found');
  }

  await db
    .update(pages)
    .set({ ...payload, updatedAt: sql`NOW()` })
    .where(eq(pages.slug, slug));

  return;
}
