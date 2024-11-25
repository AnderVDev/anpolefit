import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/zod";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
// import { nanoid } from "nanoid";
// import { sendVerificationEmail } from "./lib/email";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    Credentials({
      authorize: async (credentials) => {
        const { data, success } = LoginSchema.safeParse(credentials);

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
        if (!user || !user.password) {
          throw new Error("User no found");
        }

        //Verify if the password is correct
        const isValid = await bcrypt.compare(data.password, user.password);

        if (!isValid) {
          throw new Error("User no found");
        }

        //check email
        // if (!user.emailVerified) {
        //   const verifyTokenExits = await prisma.verificationToken.findFirst({
        //     where: {
        //       identifier: user.email,
        //     },
        //   });

        //   if (verifyTokenExits?.identifier) {
        //     await prisma.verificationToken.delete({
        //       where: {
        //         identifier: user.email,
        //       },
        //     });
        //   }

        //   const token = nanoid();

        //   await prisma.verificationToken.create({
        //     data: {
        //       identifier: user.email,
        //       token,
        //       expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        //     },
        //   });

        //   // send verification email
        //   await sendVerificationEmail(user.email, token);

        //   throw new Error("Email send verification");
        // }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
