import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(50, "Username is too long"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;