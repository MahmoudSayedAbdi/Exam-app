import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";
import { JSON_HEADER } from "./lib/constant/api.constant";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: APIResponse<LoginResponse> = await response.json();

        // Throw an auth error if the login has failed
        if ("code" in payload) {
          throw new Error(payload.message);
        }

        // Return the user to be encoded using JWT callback
        return {
          id: payload.user._id,
          user: payload.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // If the user exists it was a successful login attempt, so save the new user data in the cookies
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      // Decode the user data from the token cookie and store it in the session object
      session.user = token.user;

      return session;
    },
  },
};