import { prisma } from "../prisma";

interface PasswordResetToken {
  id: string; // ObjectId, stored as a string
  email: string;
  token: string; // unique token
  expires: Date; // DateTime, ISO string format
}

export const getPasswordResetTokenByToken = async (
  token: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (
  email: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });
    return passwordResetToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
