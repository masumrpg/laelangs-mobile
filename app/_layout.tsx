import FontAwesome from "@expo/vector-icons/FontAwesome";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { AuthProvider } from "@/shared/contex/AuthContex";
import { StatusBar } from "expo-status-bar";
import { ThemeProviderRoot, useTheme } from "@/components/ui/theme-provider/ThemeProviderRoot";
import { ThemeProvider } from "@react-navigation/core";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";


export {
    ErrorBoundary,
} from "expo-router";

SplashScreen.preventAutoHideAsync();

configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});


export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    const queryClient = new QueryClient();

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <GluestackUIProvider mode="light">
            <ThemeProviderRoot>
                <QueryClientProvider client={queryClient}>
                    <RootLayoutContent />
                </QueryClientProvider>
            </ThemeProviderRoot>
        </GluestackUIProvider>
    );
}

function RootLayoutContent() {
    const { theme } = useTheme();

    // FIXME hanya untuk clear onboard
    // useEffect(() => {
    //     AsyncStorage.clear();
    // }, []);
    return (
        <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
            <StatusBar style={theme === "light" ? "dark" : "light"} />
            <AuthProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </AuthProvider>
        </ThemeProvider>
    );
}