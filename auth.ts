import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    //jwt() is executed every time is create or updated the token
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.role = user.role;
      }
      return token;
    },
    // session() is used to add information to token session of user
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  events: {
    // The linkAccount event is fired when an account (OAuth provider: GitHub, Google, Facebook, etc.) is linked to an existing user in your database.
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  pages: {
    signIn: "/login",
  },
});
