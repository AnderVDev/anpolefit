import { Activities, Gender } from "@/types/calculator";
import { object, string, number, nativeEnum } from "zod";
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
  age: 
    number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number greater than 10",
    })
    .min(10, { message: "Must be greater than 10" })
    .max(90, { message: "Must be less than 90" }),
  metrics: object({
    weight: number({ required_error: "Weight is required" }).positive(),
    height: number({ required_error: "Height is required" }).positive(),
  }),
  activity: nativeEnum(Activities, {
    message: "Must select an Activity",
  }),
});