import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type, Static } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import fp from "fastify-plugin";
import "dotenv/config";

// -------------
declare module "fastify" {
  interface FastifyInstance {
    env: Env;
  }
}
// -------------

const EnvSchema = Type.Object({
  PORT: Type.String(),
  DATABASE_URL: Type.String(),
  JWT_SECRET: Type.String(),
});

type Env = Static<typeof EnvSchema>;

const EnvValidator = TypeCompiler.Compile(EnvSchema);

const envPlugin: FastifyPluginAsyncTypebox = async (app) => {
  const env = process.env;

  if (!EnvValidator.Check(env)) {
    app.log.fatal({
      msg: "Invalid environment variables",
      details: [...EnvValidator.Errors(env)],
    });
    process.exit(0);
  }

  app.decorate("env", env);
};

export default fp(envPlugin, { name: "env" });
