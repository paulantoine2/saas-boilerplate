import postgres from "postgres";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import fp from "fastify-plugin";
import { schema, type DbSchema } from "@repo/db";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

// -------------
declare module "fastify" {
  interface FastifyInstance {
    db: PostgresJsDatabase<DbSchema>;
  }
}
// -------------

const drizzlePlugin: FastifyPluginAsyncZod = async (app) => {
  const connection = postgres(app.env.DATABASE_URL);

  app.decorate("db", drizzle(connection, { schema }));

  app.addHook("onClose", async () => {
    await connection.end();
  });
};

export default fp(drizzlePlugin, { name: "drizzle", dependencies: ["env"] });
