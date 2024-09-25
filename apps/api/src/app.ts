import Fastify, { type FastifyInstance } from "fastify";
import sensible from "@fastify/sensible";
import jwt from "@fastify/jwt";
import { router } from "./router.js";
import env from "./plugins/env.js";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true,
  });

  app.register(sensible);
  await app.register(env);
  app.register(jwt, { secret: app.env.JWT_SECRET });

  app.register(router);

  return app;
}
