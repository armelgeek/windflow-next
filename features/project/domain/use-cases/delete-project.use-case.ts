import 'server-only';
import { eq } from 'drizzle-orm';
import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema/projects';

export async function deleteProject(slug: string) {
  const existingProject = await db.query.projects.findFirst({
    where: eq(projects.slug, slug),
  });

  if (!existingProject) {
    throw new Error('Project not found');
  }

  await db
    .delete(projects)
    .where(eq(projects.slug, slug));

  return;
}
