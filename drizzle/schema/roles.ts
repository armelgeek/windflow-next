import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './auth';
import { relations } from 'drizzle-orm';

export const roles = pgTable('roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userRoles = pgTable('user_roles', {
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  roleId: uuid('role_id').references(() => roles.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));
