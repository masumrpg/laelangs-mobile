import "~/global.css";
import { SplashScreen, Stack, Tabs } from "expo-router";
import * as React from "react";
import ThemeContainer from "~/components/ThemeContainer";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "~/contex/AuthContex";

export {
    ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    // untuk clear onboard
    // useEffect(() => {
    //     AsyncStorage.clear();
    // }, []);
    return (
        <ThemeContainer>
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </AuthProvider>
        </ThemeContainer>
    );
}
