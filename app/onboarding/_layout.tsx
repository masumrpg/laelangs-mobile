import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";
import * as React from "react";

export default function OnboardingLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }} />
        </Stack>
    );
}