import { prisma } from "../prisma";
interface NutritionProfileProps {
  id: string;
  userId: string;
  proteinKcal: number;
  proteinGrams: number;
  carbKcal: number;
  carbGrams: number;
  fatKcal: number;
  fatGrams: number;
  createdAt: Date; // ISO date string
  updatedAt: Date; // ISO date string
};

export const getNutritionProfileByUserId = async (userId: string): Promise<NutritionProfileProps | null> => {
  try {
    const profile = await prisma.userNutritionProfiles.findUnique({ where: { userId } });
    if(!profile){
      return null
    }
    return profile; // This can be either NutritionProfileProps or null
  } catch (error) {
    // Optionally log or handle the error
    console.error(error);
    return null; // Or handle the error based on your use case
  }
};