import 'server-only';

import { eq, sql } from 'drizzle-orm';

import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema/projects';
import { ProjectPayload } from '../../config/project.type';

export async function updateProject(slug: string, payload: ProjectPayload) {
  const existingProject = await db.query.projects.findFirst({
    where: eq(projects.slug, slug),
  });

  if (!existingProject) {
    throw new Error('Project not found');
  }

  await db
    .update(projects)
    .set({ ...payload, updatedAt: sql`NOW()` })
    .where(eq(projects.slug, slug));

  return;
}
