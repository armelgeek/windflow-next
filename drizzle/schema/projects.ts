import { pgTable,timestamp, uuid,varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./auth";
export const projects = pgTable(
    'projects',
    {
        id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
        name: varchar('name', { length: 50 }).notNull().unique(),
        slug: varchar('slug', { length: 50 }).notNull().unique(),
        userId: uuid('user_id').references(() => users.id),
        createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { mode: 'string' }).notNull().defaultNow(),
    }
);

