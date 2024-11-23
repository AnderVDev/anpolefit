"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema, RegisterSchema, ResetSchema } from "@/lib/zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { getUserByEmail } from "@/lib/data/user";
import { Account } from "@/lib/types";


// Utility: Hash password
const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Utility: Check if user exists
const checkUserExists = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
    include: { accounts: true },
  });
};

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  try {
    const { email, password } = values;
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message || "Authentication failed" };
    }
    return { error: "An unexpected error occurred" };
  }
};

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  try {
    const validatedField = RegisterSchema.safeParse(values);
    if (!validatedField.success) {
      return { error: "Invalid input data" };
    }

    const { email, password, name } = validatedField.data;
    // Check if user exists
    const existingUser = await checkUserExists(email);

    if (existingUser) {
      const hasOAuthAccount = existingUser.accounts.some(
        (account: Account) => account.type === "oauth"
      );

      return hasOAuthAccount
        ? {
            error:
              "To confirm your identity, sign in with the same account you used originally.",
          }
        : { error: "User already exists" };
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message || "Authentication failed" };
    }
    return { error: "An unexpected error occurred" };
  }
};

export const resetAction = async (values: z.infer<typeof ResetSchema>) => {
  const validatedField = ResetSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedField.data;
  const existingUser = await getUserByEmail(email);
  if(!existingUser){
    return { error:"Email not found!"};
  }


  //TODO: GENERATE token & send email
  return { success:"Reset email sent!"};
};
