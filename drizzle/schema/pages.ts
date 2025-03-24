import { pgTable,timestamp, uuid,varchar,text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { projects } from "./projects";
export const pages = pgTable(
    'pages',
    {
        id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
        name: varchar('name', { length: 50 }).notNull().unique(),
        slug: varchar('slug', { length: 50 }).notNull().unique(),
        content: text('content'),
        projectId: uuid('project_id').references(() => projects.id),
        createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
    }
);

