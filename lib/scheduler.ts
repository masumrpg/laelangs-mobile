import { AuthResponse } from "@/feature/auth/schema";
import { getAuthData, setAuthData } from "@/lib/secureStoreUtils";
import { authService } from "@/service/authService";

export const startAccessTokenScheduler = () => {
    if (global.accessTokenScheduler) {
        clearInterval(global.accessTokenScheduler);
    }

    global.accessTokenScheduler = setInterval(async () => {
        console.log("Scheduler: Deleting accessToken from Secure Storage...");

        const storedData = await getAuthData();

        if (storedData) {
            const authData: AuthResponse = storedData;
            const { data } = await authService.refreshToken(authData.refreshToken);

            if (data) {
                await setAuthData(data);
            }
            console.log("Scheduler: accessToken renewed.");
        } else {
            console.log("Scheduler: No auth data found.");
        }
    }, 240000); // 4 minutes in milliseconds
};

export const stopAccessTokenScheduler = () => {
    if (global.accessTokenScheduler) {
        clearInterval(global.accessTokenScheduler);
        console.log("Scheduler stopped.");
    }
};
