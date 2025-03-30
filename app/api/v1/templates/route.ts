import { auth } from "@/auth";
import { createTemplate, deleteTemplate, getTemplates, updateTemplate } from "@/features/templates/domain/use-cases";
import { createSearchParams } from "@/shared/domain/base.search-param";
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

export async function GET(request: Request) {
    const searchParams = createSearchParams();
    const filter = searchParams.load(request);
    const data = await getTemplates(filter);
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