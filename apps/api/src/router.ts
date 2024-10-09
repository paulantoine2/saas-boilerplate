import {
  Type,
  type FastifyPluginAsyncTypebox,
} from "@fastify/type-provider-typebox";
import { user } from "@repo/db";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export const router: FastifyPluginAsyncTypebox = async (app) => {
  app.post("/auth/register", {
    schema: {
      body: Type.Object({
        email: Type.String(),
        password: Type.String(),
      }),
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

  app.post("/auth/login", {
    schema: {
      body: Type.Object({
        email: Type.String(),
        password: Type.String(),
      }),
    },
    handler: async function login(
      req,
      res
    ): Promise<{ user: { email: string }; jwt: string }> {
      const result = await app.db.query.user.findFirst({
        where: eq(user.email, req.body.email),
      });

      if (!result) return res.notFound("User not found.");

      if (!bcrypt.compareSync(req.body.password, result.password))
        return res.unauthorized("Incorrect password.");

      const jwt = app.jwt.sign(
        { email: result.email, id: result.id },
        { expiresIn: "24h", sub: `user_${result.id}` }
      );

      return { user: { email: result.email }, jwt };
    },
  });
};
