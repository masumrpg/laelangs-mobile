import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageData = async (key: string) => {
    try {
        const storedData = await AsyncStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
        console.error("Failed to get auth data", error);
        return null;
    }
};

export const setStorageData = async (key: string, data: any): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Failed to set auth data", error);
    }
};

export const removeStorageData = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Failed to remove auth data", error);
    }
};

export const getAllKeysStorageData = async () => {
    try {
        return await AsyncStorage.getAllKeys();
    } catch (error) {
        console.error("Failed to set auth data", error);
    }
};

export const deleteAllStorageData = async (): Promise<void> => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error("Failed to set auth data", error);
    }
};