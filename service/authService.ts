import httpClient, { httpClientPublic } from "@/lib/api";
import { CommonResponse } from "@/shared/schema";
import { AuthResponse } from "@/feature/auth/schema";
import { LoginSchema } from "@/feature/login/schema";
import { type RegisterSchema } from "@/feature/register/schema";

export const authService = {
    async login(payload: LoginSchema) {
        try {
            const { data } = await httpClientPublic.post<CommonResponse<AuthResponse>>("/auth/login", payload);
            return data;
        } catch (error) {
            console.error("Failed to login: ", error);
            throw new Error("Failed to login, please try again");
        }
    },
    async register(payload: RegisterSchema) {
        try {
            const { data } = await httpClientPublic.post<CommonResponse<null>>("/users", payload);
            return data;
        } catch (error) {
            console.error("Failed to register: ", error);
            throw new Error("Failed to register, please try again");
        }
    },
    async refreshToken(refreshToken: string) {
        try {
            const { data } = await httpClientPublic.post<CommonResponse<AuthResponse>>("/auth/refresh-token", {
                refreshToken: refreshToken,
            });
            return data;
        } catch (error) {
            console.error("Failed to get refresh token: ", error);
            throw new Error("Failed to get RefreshToken, please try again");
        }
    },
    async logout() {
        try {
            const { data } = await httpClient.post<CommonResponse<any>>("/auth/logout");
            return data;
        } catch (error) {
            console.error("Failed to logout: ", error);
            throw new Error("Failed to logout, please try again");
        }
    },
};