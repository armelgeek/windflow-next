import { sql } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export async function up(db) {
  await db.schema.createTable('roles')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultRandom())
    .addColumn('name', 'text', (col) => col.notNull().unique())
    .addColumn('description', 'text')
    .addColumn('created_at', 'timestamp', (col) => col.defaultNow())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultNow())
    .execute();

  await db.schema.createTable('user_roles')
    .addColumn('user_id', 'uuid', (col) => 
      col.references('users.id', { onDelete: 'cascade' }))
    .addColumn('role_id', 'uuid', (col) => 
      col.references('roles.id', { onDelete: 'cascade' }))
    .addColumn('created_at', 'timestamp', (col) => col.defaultNow())
    .execute();

  // Création des rôles par défaut
  await db.insert(roles).values([
    { name: 'admin', description: 'Administrateur système' },
    { name: 'user', description: 'Utilisateur standard' },
  ]).execute();
}

export async function down(db) {
  await db.schema.dropTable('user_roles').execute();
  await db.schema.dropTable('roles').execute();
}
