import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

type AuthData = {
    access_token: string;
    refresh_token: string;
    user_id: string;
    merchant_id: string;
};

type AuthContextType = {
    authData: AuthData | null;
    isAuthenticated: boolean;
    login: (data: AuthData) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load auth data from SecureStore on app startup
        const loadAuthData = async () => {
            const storedData = await SecureStore.getItemAsync("authData");
            if (storedData) {
                setAuthData(JSON.parse(storedData));
            }
            setLoading(false);
        };

        loadAuthData();
    }, []);

    const login = async (data: AuthData) => {
        await SecureStore.setItemAsync("authData", JSON.stringify(data));
        setAuthData(data);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("authData");
        setAuthData(null);
    };

    return (
        <AuthContext.Provider
            value={{
                authData,
                isAuthenticated: !!authData,
                login,
                logout,
                loading,
            }}
        >
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
