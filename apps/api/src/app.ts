import Fastify, { type FastifyInstance } from "fastify";
import sensible from "@fastify/sensible";
import cors from "@fastify/cors";

import env from "./plugins/env.js";
import { router } from "./router.js";
import drizzle from "./plugins/drizzle.js";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import jwt from "./plugins/jwt.js";
import googleAuth from "./plugins/google-auth.js";

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: true,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(cors, { origin: true, credentials: true });

  app.register(sensible);
  await app.register(env);
  await app.register(drizzle);
  await app.register(jwt);

  app.register(googleAuth);
  app.register(router);

  return app;
}
