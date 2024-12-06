import { z } from "zod";

export const homeSearchSchema = z.object({
    search: z.string().min(3, "Minimum 3 character").max(50, "Username is too long"),
});

export type HomeSearchSchema = z.infer<typeof homeSearchSchema>;