import { auth } from '@/auth';
import { db } from '@/drizzle/db';
import { roles, userRoles } from '@/drizzle/schema/roles';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function getUserRoles(userId: string) {
  const userRolesList = await db.query.userRoles.findMany({
    where: eq(userRoles.userId, userId),
    with: {
      role: true,
    },
  });
  return userRolesList.map((ur) => ur.role.name);
}

export function hasRole(requiredRoles: string[]) {
  return async (request: NextRequest) => {
    const session = await auth.sessionStorage.getSession(request);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userRolesList = await getUserRoles(session.user.id);
    
    const hasRequiredRole = requiredRoles.some(role => 
      userRolesList.includes(role)
    );

    if (!hasRequiredRole) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.next();
  };
}

// Hook pour utiliser les rôles dans les composants React
export async function useUserRoles() {
  const session = await auth.getSession();
  if (!session) return [];
  
  return getUserRoles(session.user.id);
}

// Fonction pour ajouter un rôle à un utilisateur
export async function assignRoleToUser(userId: string, roleName: string) {
  const role = await db.query.roles.findFirst({
    where: eq(roles.name, roleName),
  });

  if (!role) throw new Error(`Role ${roleName} not found`);

  await db.insert(userRoles).values({
    userId,
    roleId: role.id,
  });
}

// Fonction pour créer un nouveau rôle
export async function createRole(name: string, description?: string) {
  return db.insert(roles).values({
    name,
    description,
  });
}
