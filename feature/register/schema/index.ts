import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;