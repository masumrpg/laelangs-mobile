import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { PortalHost } from "@rn-primitives/portal";

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

export default function ThemeContainer({ children }: { children: React.ReactNode }) {
    const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            const theme = await AsyncStorage.getItem("theme");
            if (Platform.OS === "web") {
                // Adds the background color to the html element to prevent white background on overscroll.
                document.documentElement.classList.add("bg-background");
            }
            if (!theme) {
                await AsyncStorage.setItem("theme", colorScheme);
                setIsColorSchemeLoaded(true);
                return;
            }
            const colorTheme = theme === "dark" ? "dark" : "light";
            if (colorTheme !== colorScheme) {
                setColorScheme(colorTheme);
                await setAndroidNavigationBar(colorTheme);
                setIsColorSchemeLoaded(true);
                return;
            }
            await setAndroidNavigationBar(colorTheme);
            setIsColorSchemeLoaded(true);
        })().finally(() => {
            SplashScreen.hideAsync();
        });
    }, []);

    if (!isColorSchemeLoaded) {
        return null;
    }
    return (
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            {children}
            <PortalHost />
        </ThemeProvider>
    );
}