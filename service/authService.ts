import httpClient, { httpClientPublic } from "@/lib/api";
import { CommonResponse } from "@/shared/schema";
import { AuthResponse } from "@/feature/auth/schema";
import { LoginSchema } from "@/feature/login/schema";
import { type RegisterSchema } from "@/feature/register/schema";

export const authService = {
    async login(payload: LoginSchema) {
        const { data } = await httpClientPublic.post<CommonResponse<AuthResponse>>("/auth/login", payload);
        return data;
    },
    async register(payload: RegisterSchema) {
        const { data } = await httpClientPublic.post<CommonResponse<null>>("/users", payload);
        return data;
    },
    async refreshToken(refreshToken: string) {
        const { data } = await httpClientPublic.post<CommonResponse<AuthResponse>>("/auth/refresh-token", {
            refreshToken: refreshToken,
        });
        return data;
    },
    async logout() {
        const { data } = await httpClient.post<CommonResponse<any>>("/auth/logout");
        return data;
    },
};