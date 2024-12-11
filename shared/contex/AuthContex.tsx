import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthResponse } from "@/feature/auth/schema";
import { getAuthData, removeAuthData, setAuthData } from "@/lib/secureStoreUtils";
import { startAccessTokenScheduler, stopAccessTokenScheduler } from "@/lib/scheduler";
import { usePathname } from "expo-router";

type AuthContextType = {
    authData: AuthResponse | null;
    isAuthenticated: boolean;
    login: (data: AuthResponse) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    const [authData, setAuthDataState] = useState<AuthResponse | null>(null);
    const [loading, setLoading] = useState(true);

    // FIXME clear accessToken in 4 minute
    useEffect(() => {
        startAccessTokenScheduler();
        return () => stopAccessTokenScheduler();
    }, []);

    useEffect(() => {
        const loadAuthData = async () => {
            const storedData = await getAuthData();
            if (storedData) {
                setAuthDataState(storedData);
            }
            setLoading(false);
        };

        loadAuthData();
    }, [pathname]);

    const login = async (data: AuthResponse) => {
        await setAuthData(data);
        setAuthDataState(data);
    };

    const logout = async () => {
        await removeAuthData();
        setAuthDataState(null);
        // console.log(authData);
        // if (authData) {
        //     const forLogout = authData;
        //     forLogout.accessToken = "";
        //     setAuthDataState(forLogout);
        // }
    };

    return (
        <AuthContext.Provider
            value={{
                authData,
                isAuthenticated: !!authData?.accessToken,
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