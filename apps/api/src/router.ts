import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { login } from "./routes/login.post";
import { register } from "./routes/register.post";
import { me } from "./routes/me.get";
import { logout } from "./routes/logout.post";

export const router: FastifyPluginAsyncZod = async (app) => {
  app.register(authRouter, { prefix: "/auth" });
  app.register(appRouter);
};

const authRouter: FastifyPluginAsyncZod = async (app) => {
  app.register(login);
  app.register(register);
};

const appRouter: FastifyPluginAsyncZod = async (app) => {
  app.addHook("onRequest", app.authenticate);
  app.register(me);
  app.register(logout);
};
