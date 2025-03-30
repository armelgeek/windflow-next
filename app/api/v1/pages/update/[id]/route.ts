import { auth } from "@/auth";
import { updatePageById } from "@/features/pages/domain/use-cases";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = (await params).id;
  const body = await request.json();
  await updatePageById(id, body);

  return NextResponse.json({ message: 'Page updated successfully' });
}
