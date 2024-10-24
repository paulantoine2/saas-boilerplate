import { user } from "@repo/db";
import { AuthBodySchema } from "@repo/types";

import bcrypt from "bcryptjs";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const register: FastifyPluginAsyncZod = async (app) => {
  app.post("/register", {
    schema: {
      body: AuthBodySchema,
    },
    handler: async function register(
      req,
      res
    ): Promise<{ user: { email: string }; jwt: string }> {
      try {
        const email = req.body.email;
        const result = await app.db
          .insert(user)
          .values({
            email,
            password: bcrypt.hashSync(req.body.password),
          })
          .returning({ insertedId: user.id });

        const id = result[0].insertedId;

        const jwt = app.jwt.sign(
          { email, id },
          { expiresIn: "24h", sub: `user_${id}` }
        );

        return { user: { email }, jwt };
      } catch (err) {
        if (
          err instanceof Error &&
          "code" in err &&
          err.code === "ER_DUP_ENTRY"
        )
          return res.conflict("User already exists.");
        throw err;
      }
    },
  });
};
