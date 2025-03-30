import { getUserTemplates } from '@/features/templates/domain/use-cases';
import { createSearchParams } from "@/shared/domain/base.search-param";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const searchParams = createSearchParams();
    const filter = searchParams.load(request);
    const data = await getUserTemplates(filter);
    return NextResponse.json(data);
}
