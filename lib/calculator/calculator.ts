import { Activities, Gender } from "@/types/calculator";

export const calculateBMR = (
  gender: Gender | undefined,
  weight: number,
  height: number,
  age: number
) => {
  if (gender === Gender.FEMALE) {
    return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  } else {
    return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  }
};

export const TDDE_CONSTANTS = {
  SEDENTARY: 1.2,
  LIGHT: 1.375,
  MODERATE: 1.55,
  VERY: 1.725,
  EXTREMELY: 1.9,
};

export const calculateTDEE = (bmr: number, activity: Activities) => {
  return bmr * TDDE_CONSTANTS[activity];
};

export const BODY_TYPES_CONSTANTS_PERCENTAGES = {
  ECTOMORPH: {
    PROTEIN: 25,
    CARBOHYDRATE: 55,
    FAT: 20,
  },

  MESOMORPH: {
    PROTEIN: 30,
    CARBOHYDRATE: 40,
    FAT: 30,
  },

  ENDOMORPH: {
    PROTEIN: 40,
    CARBOHYDRATE: 25,
    FAT: 35,
  },
};

export const KCAL_TO_GRAMS_CONSTANTS = {
  PROTEIN: 4,
  CARBOHYDRATE: 4,
  FAT: 9,
};

// Target daily calorie intake (TDCI) = TDEE – (Bodyweight x target weekly fat loss rate x 500*)  *1100 if you use kg
export const WEEKLY_FAT_LOSS_RATE = 0.0075;
export const TDCI_CONSTANT = {
  POUND: 500,
  KILOGRAMS: 1100,
};
