import { auth } from "@/auth";
import { createTemplate } from "@/features/templates/domain/use-cases/create-template.use-case";
import { updateTemplate } from "@/features/templates/domain/use-cases/update-template.use-case";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { deleteTemplate } from "@/features/templates/domain/use-cases/delete-template.use-case";
import { getTemplates } from "@/features/templates/domain/use-cases/get-templates.use-case";

export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = await createTemplate({ ...body, userId: session.user.id });

    return NextResponse.json(data);
}



export async function PUT(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
        return NextResponse.json({ error: 'Template ID is required' }, { status: 400 });
    }

    const data = await updateTemplate({ id, ...updateData, userId: session.user.id });

    return NextResponse.json(data);
}

export async function GET() {
    const data = await getTemplates();
    return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
        return NextResponse.json({ error: 'Template ID is required' }, { status: 400 });
    }

    const data = await deleteTemplate({ templateId: id, userId: session.user.id });

    return NextResponse.json(data);
}