import { user } from "@repo/db";
import { AuthBodySchema, type PublicUser } from "@repo/types";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const login: FastifyPluginAsyncZod = async (app) => {
  app.post("/login", {
    schema: {
      body: AuthBodySchema,
    },
    handler: async function login(req, res) {
      const result = await app.db.query.user.findFirst({
        where: eq(user.email, req.body.email),
      });

      if (!result) return res.notFound("User not found.");

      if (!bcrypt.compareSync(req.body.password, result.password))
        return res.unauthorized("Incorrect password.");

      const jwt = app.jwt.sign({ email: result.email, id: result.id });

      res
        .setCookie("token", jwt, {
          path: "/",
          httpOnly: true,
          secure: app.env.NODE_ENV === "production",
          sameSite: true,
        })
        .code(200)
        .send({
          email: result.email,
          id: result.id,
          created_at: result.created_at,
        } satisfies PublicUser);
    },
  });
};
