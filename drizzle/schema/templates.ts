import { sql } from "drizzle-orm";
import { varchar,uuid, text, timestamp,boolean, jsonb } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const templates = pgTable(
    'templates',
    {
      id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
      title: varchar('title', { length: 100 }).notNull(),
      slug: varchar('slug', { length: 50 }).notNull().unique(),
      description: text('description'),
      category: varchar('category', { length: 50 }),
      image: text('image'),
      userId: uuid('user_id').references(() => users.id),
      isPublic: boolean('is_public').default(true), 
      createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
      updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
    }
  );
  
  export const templatePages = pgTable(
    'template_pages',
    {
      id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
      name: varchar('name', { length: 50 }).notNull(),
      html: text('html'),
      css: text('css'),
      templateId: uuid('template_id')
        .notNull()
        .references(() => templates.id, { onDelete: 'cascade' }),
      createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
      updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
    }
  );

  export const userTemplates = pgTable(
    'user_templates',
    {
      id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
      userId: uuid('user_id').references(() => users.id),
      templateId: uuid('template_id')
        .notNull()
        .references(() => templates.id),
      name: varchar('name', { length: 100 }),
      description: text('description'),
      category: varchar('category', { length: 50 }),
      title: varchar('title', { length: 100 }),
      settings: jsonb('settings'), 
      createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
      updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
    }
  );