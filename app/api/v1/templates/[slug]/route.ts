import { auth } from "@/auth";
import { deleteTemplate, getTemplate, updateTemplate } from "@/features/templates/domain/use-cases";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
   
    const slug = (await params).slug;

    const data = await getTemplate({ slug: slug });

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
  await updateTemplate({...body, slug});

  return NextResponse.json({ message: 'Project updated successfully' });
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
  await deleteTemplate(slug);

  return NextResponse.json({ message: 'Project deleted successfully' });
}
