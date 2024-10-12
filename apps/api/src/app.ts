import Fastify, { type FastifyInstance } from "fastify";
import sensible from "@fastify/sensible";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";

import env from "./plugins/env.js";
import { router } from "./router.js";
import drizzle from "./plugins/drizzle.js";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true,
  });

  await app.register(cors, { origin: true, credentials: true });

  app.register(sensible);
  await app.register(env);
  await app.register(drizzle);

  app.register(jwt, { secret: app.env.JWT_SECRET });

  app.register(router);

  return app;
}
