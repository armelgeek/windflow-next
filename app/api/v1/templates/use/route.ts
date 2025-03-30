import { auth } from "@/auth";
import { createTemplateAsProject } from "@/features/templates/domain/use-cases";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = await createTemplateAsProject(body);

    return NextResponse.json(data);
}