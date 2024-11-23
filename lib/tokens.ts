import { nanoid } from "nanoid";
import { prisma } from "./prisma";
import { getPasswordResetTokenByEmail } from "./data/password-reset-token";

export const generatePasswordResetToken = async (email: string) => {
  const token = nanoid();
  const expires = new Date(Date.now() + 1000 * 60 * 60);

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }
  const passwordRestToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordRestToken;
};
