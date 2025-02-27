import { createRole, assignRoleToUser } from '../shared/lib/auth/rbac';
import { authClient } from '@/auth-client';

async function createAdmin(email: string, password: string) {
    try {
        const name = 'Administrator';
        const {data: user} = await authClient.signUp.email({
            name,
            email,
            password
        });
        
        if (!user) {
            throw new Error("Échec de la création de l'utilisateur");
        }
        
        try {
            await createRole('admin', 'Administrateur système');
        } catch (error) {
            console.log('Le rôle existe probablement déjà:', error);
        }
        
        await assignRoleToUser(user.user.id, 'admin'); 
        
        console.log('Administrateur créé avec succès !');
        console.log('Email:', email);
        console.log('ID:', user.user.id);
    } catch (error) {
        console.error('Erreur lors de la création de l\'administrateur:', error);
        process.exit(1);
    }
}

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
    console.log('Usage: npm run create-admin -- <email> <password>');
    console.log('Example: npm run create-admin -- admin@example.com MySecurePassword123');
    process.exit(1);
}

createAdmin(email, password);