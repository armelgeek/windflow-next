import { NextRequest, NextResponse } from 'next/server';
import { loadSearchParams } from '@/features/pages/config/page.param';
import { getPagesByProject } from '@/features/pages/domain/use-cases/get-pages-by-project.use-case';

export async function GET(request: NextRequest) {
  const filter = loadSearchParams(request);
  const data = await getPagesByProject(filter);

  return NextResponse.json(data);
}
