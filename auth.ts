import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { getUserById } from "./lib/data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id);
    //   if(!existingUser || !existingUser.emailVerified){
    //     return false
    //   }

    //   return true;
    // },
    //jwt() is executed every time is create or updated the token
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      // User is available during sign-in
      token.role = existingUser.role;
      return token;
    },
    // session() is used to add information to token session of user
    async session({ session, token }) {
      // console.log({ sessionToken: token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
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
