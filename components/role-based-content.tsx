import { useUserRoles } from '@/shared/lib/auth/rbac';

interface RoleBasedContentProps {
  children: React.ReactNode;
  roles: string[];
}

export async function RoleBasedContent({ children, roles }: RoleBasedContentProps) {
  const userRoles = await useUserRoles();
  
  // Vérifie si l'utilisateur a au moins un des rôles requis
  const hasRequiredRole = roles.some(role => userRoles.includes(role));

  if (!hasRequiredRole) {
    return null;
  }

  return <>{children}</>;
}

// Exemple d'utilisation :
// <RoleBasedContent roles={['admin']}>
//   <AdminDashboard />
// </RoleBasedContent>
