import { hasRole } from '@/shared/lib/auth/rbac';
import { NextResponse } from 'next/server';

export const GET = hasRole(['admin'])(async (req) => {
  return NextResponse.json({ message: 'Admin only content' });
});
