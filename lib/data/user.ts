import { prisma } from "../prisma";
import { User } from "../types";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) return null
    return user
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error) {
    console.error(error);
    return null;
  }
};
