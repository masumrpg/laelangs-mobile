import { z } from "zod";


const birthDateRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

export const userProfileSchema = z.object({
    firstName: z.string().min(3, "Nama depan minimal 3 karakter"),
    lastName: z.string().min(3, "Nama belakang minimal 3 karakter"),
    gender: z.enum(["Male", "Female"], { message: "Gender hanya boleh 'Male' atau 'Female'" }),
    birthDate: z
        .string()
        .regex(birthDateRegex, { message: "Tanggal lahir harus dalam format yyyy-MM-dd" })
        .refine((dateString) => {
            const birthDate = new Date(dateString);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const isBirthdayPassed =
                today.getMonth() > birthDate.getMonth() ||
                (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
            return age > 18 || (age === 18 && isBirthdayPassed); // Validasi usia minimal 18 tahun
        }, { message: "Pengguna harus berusia minimal 18 tahun" }),
    image: z.instanceof(File).optional(),
});

export type UserProfileSchema = z.infer<typeof userProfileSchema>;


export const addressSchema = z.object({
    address: z.string().min(5, "Alamat minimal 5 karakter!"),
    province: z.string().min(5, "Provinsi minimal 5 karakter!"),
    city: z.string().min(4, "Kota minimal 4 karakter!"),
});