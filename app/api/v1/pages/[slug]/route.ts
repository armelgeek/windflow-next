import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { deletePage } from '@/features/pages/domain/use-cases/delete-page.use-case';
import { getPage } from '@/features/pages/domain/use-cases/get-page.use-case';
import { updatePage } from '@/features/pages/domain/use-cases/update-page.use-case';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const data = await getPage(slug);

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = (await params).slug;
  const body = await request.json();
  await updatePage(slug, body);

  return NextResponse.json({ message: 'Page updated successfully' });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const slug = (await params).slug;
  await deletePage(slug);

  return NextResponse.json({ message: 'Page deleted successfully' });
}
