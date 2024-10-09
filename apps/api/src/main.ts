import { logHello } from "@repo/types";
import { buildApp } from "./app.js";

async function runApp() {
  const app = await buildApp();

  app.listen({ port: 3000 }, (err) => {
    if (err) {
      logHello();
      app.log.error(err);
      process.exit(1);
    }
  });
}

runApp();
