import Fastify from "fastify";
import { add } from "./add.js";

const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

// Run the server!
fastify.listen({ port: 3002 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(add(1, 2));

  console.log(`Server is now listening on ${address}`);
});
