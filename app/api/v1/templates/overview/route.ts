import { getOverview } from '@/features/templates/domain/use-cases';
import { NextResponse } from 'next/server';

export async function GET() {
    const data = await getOverview();
    return NextResponse.json(data);
}
