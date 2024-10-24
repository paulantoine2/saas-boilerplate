import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import type { RouteHandlerMethod } from "fastify";

// -------------
declare module "fastify" {
  interface FastifyInstance {
    authenticate: RouteHandlerMethod;
  }
}
declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { id: number; email: string }; // payload type is used for signing and verifying
    user: {
      id: number;
      email: string;
    }; // user type is return type of `request.user` object
  }
}
// -------------

const jwtPlugin: FastifyPluginAsyncZod = async (app) => {
  app.register(jwt, {
    secret: app.env.JWT_SECRET,
    cookie: { cookieName: "token", signed: false },
  });
  app.register(cookie);

  app.decorate("authenticate", async function (request, reply) {
    console.log("authenticating...");
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
};

export default fp(jwtPlugin, { name: "jwt", dependencies: ["env"] });
