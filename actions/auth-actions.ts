"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  LoginSchema,
  NewPasswordSchema,
  RegisterSchema,
  ResetSchema,
} from "@/lib/zod";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";
import { getUserByEmail } from "@/lib/data/user";
import { Account } from "@/lib/types";
import { sendPasswordRestEmail } from "@/lib/email";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getPasswordResetTokenByToken } from "@/lib/data/password-reset-token";

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
  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordRestEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Reset email sent!" };
};

export const newPasswordAction = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validatedField = NewPasswordSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: "Invalid field!" };
  }
  const { password } = validatedField.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await hashPassword(password);
  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: { password: hashedPassword },
  });
  await prisma.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password updated" };
};
