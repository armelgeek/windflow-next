import 'server-only';

import { eq } from 'drizzle-orm';
import slugify from 'slugify';

import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema/projects';
import { ProjectPayload } from '../../config/project.type';

export async function createProject(payload: ProjectPayload) {
  const slug = slugify(payload.name, { lower: true });

  const existingProject = await db.query.categories.findFirst({
    where: eq(projects.slug, slug),
  });

  if (existingProject) {
    throw new Error('Project with this name already exists');
  }

  const [project] = await db
    .insert(projects)
    .values({ ...payload, slug })
    .returning();

  return project;
}
