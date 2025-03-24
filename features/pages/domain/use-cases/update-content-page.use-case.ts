import 'server-only';

import { eq, sql } from 'drizzle-orm';

import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema/pages';

export async function updateContentPage(slug: string, content: string) {
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

  return;
}
