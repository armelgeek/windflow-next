import { eq } from 'drizzle-orm';

import { db } from '@/drizzle/db';
import { projects } from '@/drizzle/schema';

export async function getProject(slug: string) {

  const data = await db.query.projects.findFirst({
    where: eq(projects.slug, slug)
  });

  if (!data) {
    throw new Error('Project not found');
  }


  return data;
}
