import { z } from "zod";
import { PublicUserSchema } from "./user";

export const AuthBodySchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(5, "Required"),
});

export const AuthResponseSchema = z.object({
  user: PublicUserSchema,
  token: z.string(),
});

export type AuthBody = z.infer<typeof AuthBodySchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
