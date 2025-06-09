import { z } from "zod";

export const userSignupSchema = z.object({
  username: z.string().min(1, "User Name is required!"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contact: z
    .string()
    .min(10, { message: "Contact number must be at least 10 digits" })
    .max(10, "Contact number at most 10 digit"),
});

export type signupInputState = z.infer<typeof userSignupSchema>;

export const userLoginSchema = z.object({

  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  
});

export type loginInputState = z.infer<typeof userLoginSchema>;

