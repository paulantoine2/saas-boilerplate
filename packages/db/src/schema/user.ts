import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
});
