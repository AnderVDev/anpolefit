import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./lib/zod";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error("Invalid credentials");
        }
        //Verify if the user exist in the database
        const user = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

        // User no found
        if (!user ||  !user.password) {
          throw new Error("User no found");
        }

        //Verify if the password is correct
        const isValid = await bcrypt.compare(data.password, user.password);

        if(!isValid){
          throw new Error("User no found");
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
