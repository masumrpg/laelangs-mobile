import * as SecureStore from "expo-secure-store";
import { AuthResponse } from "@/feature/auth/schema";

export const getAuthData = async (): Promise<AuthResponse> => {
    const storedData = await SecureStore.getItemAsync("authData");
    return storedData ? JSON.parse(storedData) : null;
};

export const setAuthData = async (data: AuthResponse) => {
    await SecureStore.setItemAsync("authData", JSON.stringify(data));
};

export const removeAuthData = async () => {
    await SecureStore.deleteItemAsync("authData");
};