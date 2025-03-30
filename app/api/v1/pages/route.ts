import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { createPage } from '@/features/pages/domain/use-cases/create-page.use-case';
import { getPages } from '@/features/pages/domain/use-cases/get-pages.use-case';
import { createSearchParams } from '@/shared/domain/base.search-param';

export async function GET(request: NextRequest) {
  const searchParams = createSearchParams();
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
