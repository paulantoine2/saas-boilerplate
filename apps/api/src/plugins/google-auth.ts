// First install these packages:
// npm install @fastify/oauth2 googleapis

import { OAuth2Client } from "google-auth-library";
import { FastifyInstance } from "fastify";
import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import fp from "fastify-plugin";
import oauth2 from "@fastify/oauth2";
import { user } from "@repo/db";
import axios from "axios";
import type { PublicUser, User } from "@repo/types";

// Add this interface to your types
interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

const plugin: FastifyPluginAsyncZod = async (app) => {
  await app.register(oauth2, {
    name: "oauth2Google",
    credentials: {
      client: {
        id: app.env.GOOGLE_CLIENT_ID,
        secret: app.env.GOOGLE_CLIENT_SECRET,
      },
      auth: oauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: "/auth/google",
    callbackUri: app.env.GOOGLE_CALLBACK_URL,
    scope: ["profile", "email"],
  });

  // Google sign-in callback handler
  app.get("/auth/google/callback", async function googleCallback(req, res) {
    try {
      // Exchange the code for tokens
      const tokenResponse =
        await app.oauth2Google?.getAccessTokenFromAuthorizationCodeFlow(req);

      if (!tokenResponse)
        return res.internalServerError("Failed to authenticate with Google");

      const googleUser = await axios.get<GoogleUser>(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.token.access_token}`,
          },
        }
      );

      if (!googleUser.data.verified_email)
        return res.badRequest("Email not verified");

      let found_user: User | undefined = await app.db.query.user.findFirst({
        where: eq(user.email, googleUser.data.email),
      });

      if (!found_user) {
        const inserted = await app.db
          .insert(user)
          .values({
            email: googleUser.data.email,
            password: "google_signin",
          })
          .returning();

        found_user = inserted[0];

        if (!found_user) {
          return res.internalServerError("Failed to create user");
        }
      }

      const jwt = app.jwt.sign({ email: found_user.email, id: found_user.id });

      res
        .setCookie("token", jwt, {
          path: "/",
          httpOnly: true,
          secure: app.env.NODE_ENV === "production",
          sameSite: true,
        })
        .redirect(app.env.FRONT_BASE_URL + "/profile");
    } catch (error) {
      app.log.error(error);
      return res.internalServerError("Failed to authenticate with Google");
    }
  });
};

export default fp(plugin, {
  name: "google-auth",
  dependencies: ["env", "drizzle", "jwt"],
});
