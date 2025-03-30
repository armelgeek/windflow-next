import { NextRequest, NextResponse } from 'next/server';
import { createSearchParams } from '@/shared/domain/base.search-param';
import { getPagesByProject } from '@/features/pages/domain/use-cases';

export async function GET(request: NextRequest) {
  const searchParams = createSearchParams();
  const filter = searchParams.load(request);
  const data = await getPagesByProject(filter);

  return NextResponse.json(data);
}
