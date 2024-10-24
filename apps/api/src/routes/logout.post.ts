import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const logout: FastifyPluginAsyncZod = async (app) => {
  app.post("/logout", {
    handler: async function login(req, res) {
      res
        .setCookie("token", "", {
          path: "/",
          httpOnly: true,
          secure: app.env.NODE_ENV === "production",
          sameSite: true,
          expires: new Date(0),
        })
        .code(200)
        .send();
    },
  });
};
