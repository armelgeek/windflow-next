import 'server-only';
import { eq } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema/pages';

export async function deletePage(slug: string) {
  const existingPage = await db.query.pages.findFirst({
    where: eq(pages.id, slug),
  });

  if (!existingPage) {
    throw new Error('Page not found');
  }

  await db
    .delete(pages)
    .where(eq(pages.id, slug));

  return;
}
