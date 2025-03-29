import { auth } from "@/auth";
import { getTemplate } from "@/features/templates/domain/use-cases/get-template.use-case";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: 'Template ID is required' }, { status: 400 });
    }

    const data = await getTemplate({ templateId: id });

    return NextResponse.json(data);
}