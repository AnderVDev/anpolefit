"use server";
import { getNutritionProfileByUserId } from "@/lib/calculator/nutrition-profile";
import { prisma } from "@/lib/prisma";
import { NutritionSchema } from "@/lib/zod";
import { z } from "zod";



const checkUserExists = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: { accounts: true },
    });
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw new Error("Failed to verify user existence.");
  }
};

export const addMacrosAction = async (
  values: z.infer<typeof NutritionSchema>
) => {
  try {
    // Validate the input using Zod schema
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

    // Check if the user exists in the database
    const existingUser = await checkUserExists(userId);
    if (!existingUser) {
      return { error: "User not found!" };
    }

    const existingNutritionProfile = await getNutritionProfileByUserId(userId);

    if (existingNutritionProfile) {
      // Update the existing nutrition profile
      await prisma.userNutritionProfiles.update({
        where: {
          id: existingNutritionProfile.id,
        },
        data: {
          proteinKcal,
          proteinGrams,
          carbKcal,
          carbGrams,
          fatKcal,
          fatGrams,
        },
      });
    } else {
      // Create a new nutrition profile
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
    }

    return { success: true, message: "Nutrition data saved successfully." };
  } catch (error) {
    console.log(error);
    // Handle specific database errors

    return { error: "An unexpected error occurred." };
  }
};

export const getNutritionProfileCurrentUser = async (userId: string) => {
  try {
    // Check if the user exists in the database
    const existingUser = await checkUserExists(userId);
    if (!existingUser) {
      return { error: "User not found!" };
    }

    const existingNutritionProfile = await getNutritionProfileByUserId(userId);

    if (!existingNutritionProfile) {
      return { error: "Invalid Nutrition Profile." };
    }

    return {
      success: true,
      message: "Nutrition retrieved successfully.",
      data: existingNutritionProfile,
    };
  } catch (error) {
    console.error("Error checking Nutrition Profile:", error);
    throw new Error("Failed to verify Nutrition Profile.");
  }
};
