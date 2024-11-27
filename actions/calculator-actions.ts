"use server"
import { prisma } from "@/lib/prisma";
import { NutritionSchema } from "@/lib/zod";
import { z } from "zod";

const checkUserExists = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    include: { accounts: true },
  });
};

export const addMacrosAction = async (
  values: z.infer<typeof NutritionSchema>
) => {
  try {
    const validatedField = NutritionSchema.safeParse(values);
    if (!validatedField.success) {
      return { error: "Invalid input data" };
    }
    const {
      userId,
      proteinKcal,
      proteinGrams,
      carbKcal,
      carbGrams,
      fatKcal,
      fatGrams,
    } = validatedField.data;

    const existingUser = await checkUserExists(userId);
    if (!existingUser) {
      return { error: "User not found!" };
    }

    await prisma.userNutritionProfiles.create({
      data: {
        userId,
        proteinKcal,
        proteinGrams,
        carbKcal,
        carbGrams,
        fatKcal,
        fatGrams,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "An unexpected error occurred" };
  }
};
