import * as SecureStore from "expo-secure-store";
import { AuthResponse } from "@/feature/auth/schema";
import { secureStoreKey } from "@/shared/constant/constants";

export const getAuthData = async (): Promise<AuthResponse> => {
    const storedData = await SecureStore.getItemAsync(secureStoreKey.authData);
    return storedData ? JSON.parse(storedData) : null;
};

export const setAuthData = async (data: AuthResponse) => {
    await SecureStore.setItemAsync(secureStoreKey.authData, JSON.stringify(data));
};

export const removeAuthData = async () => {
    await SecureStore.deleteItemAsync(secureStoreKey.authData);
};