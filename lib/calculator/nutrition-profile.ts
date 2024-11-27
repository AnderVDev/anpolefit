import { prisma } from "../prisma";

export const getNutritionProfileByUserId = async (userId: string) => {
  try {
    return await prisma.userNutritionProfiles.findUnique({ where: { userId } });
  } catch (error) {
    return error;
  }
};
