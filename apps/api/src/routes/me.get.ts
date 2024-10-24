import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const me: FastifyPluginAsyncZod = async (app) => {
  app.get("/me", {
    handler: async function me(
      req,
      res
    ): Promise<{ email: string; id: number }> {
      return req.user;
    },
  });
};
