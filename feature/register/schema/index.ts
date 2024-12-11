import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

export type RegisterFormSchema = z.infer<typeof registerSchema>;

export type RegisterSchema = Omit<RegisterFormSchema, "confirmPassword">;