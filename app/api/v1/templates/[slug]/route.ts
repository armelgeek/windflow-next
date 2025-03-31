import { auth } from "@/auth";
import { getTemplate } from "@/features/templates/domain/use-cases";
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