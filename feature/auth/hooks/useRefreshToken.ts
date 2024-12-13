import { useAuth } from "@/shared/contex/AuthContex";
import { authService } from "@/service/authService";
import { useRouter } from "expo-router";

export const useRefreshToken = () => {
    const { login, logout } = useAuth();
    const router = useRouter();
    const refreshingToken = async (refreshToken: string) => {
        try {
            const response = await authService.refreshToken(refreshToken);
            if (response.data) {
                await login(response.data);
                router.replace("/home");
                return response;
            }
        } catch (error) {
            console.error(error);
            await logout();
            router.replace("/auth/login");
        }
    };

    return { refreshingToken };
};