import { createSelectSchema } from "drizzle-zod";
import { user } from "@repo/db";
import z from "zod";

export const UserSchema = createSelectSchema(user);

export const PublicUserSchema = UserSchema.omit({ password: true });

export type User = z.infer<typeof UserSchema>;
export type PublicUser = z.infer<typeof PublicUserSchema>;
