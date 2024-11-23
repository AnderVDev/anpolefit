import { object, string } from "zod";

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