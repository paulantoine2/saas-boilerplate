import z from "zod";
import fp from "fastify-plugin";
import "dotenv/config";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

// -------------
declare module "fastify" {
  interface FastifyInstance {
    env: Env;
  }
}
// -------------

const EnvSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

type Env = z.infer<typeof EnvSchema>;

const envPlugin: FastifyPluginAsyncZod = async (app) => {
  const env = EnvSchema.parse(process.env);

  if (!env) {
    app.log.fatal({
      msg: "Invalid environment variables",
    });
    process.exit(0);
  }

  app.decorate("env", env);
};

export default fp(envPlugin, { name: "env" });
