import { eq } from 'drizzle-orm';

import { db } from '@/drizzle/db';
import { pages } from '@/drizzle/schema';

export async function getPage(slug: string) {

  const data = await db.query.pages.findFirst({
    where: eq(pages.slug, slug)
  });

  if (!data) {
    throw new Error('Page not found');
  }


  return data;
}
