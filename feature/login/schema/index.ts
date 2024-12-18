import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(5, "Username harus minimal 5 karakter").max(50, "Username terlalu panjang"),
    password: z.string().min(8, "Password minimal 8 karakter"),
});

export type LoginSchema = z.infer<typeof loginSchema>;