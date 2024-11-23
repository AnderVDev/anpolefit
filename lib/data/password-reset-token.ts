import { prisma } from "../prisma";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    return passwordResetToken;
  } catch (error) {
    return error;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
      const passwordResetToken = await prisma.passwordResetToken.findFirst({
        where: { email },
      });
      return passwordResetToken;
    } catch (error) {
      return error;
    }
  };
