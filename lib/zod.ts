import {
  Activities,
  BodyTypes,
  Expectations,
  Gender,
} from "@/types/calculator";
import { object, string, number, nativeEnum, coerce } from "zod";
//------------------> Authentication Schemas <-------------------//
export const LoginSchema = object({
  email: string({
    required_error: "username is required",
  }).email("Invalid email address"),
  password: string({
    required_error: "password is required",
  }),
});

export const RegisterSchema = object({
  name: string({ required_error: "Name is required" }).min(
    2,
    "Name must be at least 2 characters long"
  ),
  email: string({ required_error: "Email is required" }).email(
    "Invalid email address"
  ),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  passwordVerified: string({ required_error: "Please confirm your password" }),
}).refine((data) => data.password === data.passwordVerified, {
  path: ["passwordVerified"], // Highlight the confirm password field in case of error
  message: "Passwords do not match",
});

export const ResetSchema = object({
  email: string({
    required_error: "username is required",
  }).email("Invalid email address"),
});

export const NewPasswordSchema = object({
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  passwordVerified: string({ required_error: "Please confirm your password" }),
}).refine((data) => data.password === data.passwordVerified, {
  path: ["passwordVerified"], // Highlight the confirm password field in case of error
  message: "Passwords do not match",
});

//------------------> Calculator Schemas <-------------------//

export const StepOneSchema = object({
  gender: nativeEnum(Gender, { message: "Must select a Gender" }),
  age: number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number greater than 10",
  })
    .min(10, { message: "Age must be at least 10" })
    .max(90, { message: "Age must be at most 90" }),
  metrics: object({
    weight: coerce
      .number({ required_error: "Weight is required" })
      .min(20, { message: "Weight must be at least 20 kg" })
      .max(500, { message: "Weight must be at most 500 kg" }),
    height: coerce
      .number({ required_error: "Height is required" })
      .min(50, { message: "Height must be at least 50 cm" })
      .max(300, { message: "Height must be at most 300 cm" }),
  }),
  activity: nativeEnum(Activities, {
    message: "Must select an Activity",
  }),
});

export const StepTwoSchema = object({
  expectation: nativeEnum(Expectations, {
    message: "Must select an Expectation Body",
  }),
});

export const StepThreeSchema = object({
  bodyType: nativeEnum(BodyTypes, {
    message: "Must select a Body Type",
  }),
});

export const NutritionSchema = object({
  userId: string({ required_error: "Name is required" }).min(1),
  proteinKcal: number()
    .int()
    .nonnegative("Protein calories must be non-negative"),
  proteinGrams: number()
    .int()
    .nonnegative("Protein grams must be non-negative"),
  carbKcal: number()
    .int()
    .nonnegative("Carbohydrate calories must be non-negative"),
  carbGrams: number()
    .int()
    .nonnegative("Carbohydrate grams must be non-negative"),
  fatKcal: number().int().nonnegative("Fat calories must be non-negative"),
  fatGrams: number().int().nonnegative("Fat grams must be non-negative"),
});
