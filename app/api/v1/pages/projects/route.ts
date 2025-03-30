import { NextRequest, NextResponse } from 'next/server';
import { getPagesByProject } from '@/features/pages/domain/use-cases/get-pages-by-project.use-case';
import { createSearchParams } from '@/shared/domain/base.search-param';

export async function GET(request: NextRequest) {
  const searchParams = createSearchParams();
  const filter = searchParams.load(request);
  const data = await getPagesByProject(filter);

  return NextResponse.json(data);
}
