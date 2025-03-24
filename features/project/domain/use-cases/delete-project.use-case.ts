import 'server-only';
import { eq } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema/pages';

export async function deleteProject(slug: string) {
  const existingProject = await db.query.pages.findFirst({
    where: eq(pages.slug, slug),
  });

  if (!existingProject) {
    throw new Error('Project not found');
  }

  await db
    .delete(pages)
    .where(eq(pages.slug, slug));

  return;
}
