import { auth } from '@/auth';
import { assignRoleToUser, createRole } from '@/shared/lib/auth/rbac';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await auth.getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Créer le rôle admin s'il n'existe pas déjà
    try {
      await createRole('admin', 'Administrateur système');
    } catch (error) {
      // Le rôle existe probablement déjà
      console.log('Role may already exist:', error);
    }

    // Assigner le rôle admin à l'utilisateur actuel
    await assignRoleToUser(session.user.id, 'admin');

    return NextResponse.json({ 
      message: 'Successfully assigned admin role',
      userId: session.user.id 
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
