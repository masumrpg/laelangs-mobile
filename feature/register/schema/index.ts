import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(5, "Username minimal 5 karakter").max(50, "Username terlalu panjang"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password harus sama dengan konfirmasi password.",
    path: ["confirmPassword"],
});

export type RegisterFormSchema = z.infer<typeof registerSchema>;

export type RegisterSchema = Omit<RegisterFormSchema, "confirmPassword">;