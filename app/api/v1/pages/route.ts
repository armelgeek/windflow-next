import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { createSearchParams } from '@/shared/domain/base.search-param';
import { createPage, getPages } from '@/features/pages/domain/use-cases';
import { parseAsString } from 'nuqs/server';

export async function GET(request: NextRequest) {
  const searchParams = createSearchParams({
    projectId: parseAsString.withDefault('')
  });
  const filter = searchParams.load(request);

  const data = await getPages(filter);

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const data = await createPage(body);

  return NextResponse.json(data);
}
