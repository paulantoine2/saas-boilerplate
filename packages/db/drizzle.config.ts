import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://admin:password@localhost:5432/postgres",
  },
} satisfies Config;
