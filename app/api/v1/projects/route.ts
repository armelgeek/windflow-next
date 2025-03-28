import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { createProject } from '@/features/project/domain/use-cases/create-project.use-case';
import { getProjects } from '@/features/project/domain/use-cases/get-projects.use-case';
import { loadSearchParams } from '@/features/project/config/project.param';

export async function GET(request: NextRequest) {
  const filter = loadSearchParams(request);
  const data = await getProjects(filter);

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
  const data = await createProject({...body, userId: session.user.id});

  return NextResponse.json(data);
}
