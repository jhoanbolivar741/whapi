import { sql } from "drizzle-orm/sql/sql";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todo = sqliteTable("todo", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  isCompleted: int({ mode: "boolean" }).default(false),
  createdAt: text().notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text()
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});
