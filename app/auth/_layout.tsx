import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";
import * as React from "react";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="login"
                options={{ headerShown: false }} />
            <Stack.Screen
                name="register"
                options={{ headerShown: false }} />
        </Stack>
    );
}