import { add } from "@repo/types/add";
import { buildApp } from "./app.js";

async function runApp() {
  const app = await buildApp();

  add(1, 2);

  app.listen({ port: 3000 }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}

runApp();
