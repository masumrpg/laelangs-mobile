import httpClient from "@/lib/api";
import { CommonResponse } from "@/shared/schema";
import { AuthResponse } from "@/feature/auth/schema";
import { LoginSchema } from "@/feature/login/schema";

export const authService = {
    async login(payload: LoginSchema) {
        try {
            const { data } = await httpClient.post<CommonResponse<AuthResponse>>("/auth/login", payload);
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    async refreshToken(refreshToken: string) {
        console.log("Called");
        try {
            const { data } = await httpClient.post<CommonResponse<AuthResponse>>("/auth/refresh-roken", {
                refreshToken: refreshToken,
            });
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    async logout() {
        try {
            return await httpClient.post("/auth/logout");
        } catch (error) {
            console.error(error);
        }
    },
};