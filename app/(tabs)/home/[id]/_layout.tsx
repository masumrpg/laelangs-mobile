import { Stack } from "expo-router";
import React from "react";

export default function DetailLayout() {
    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerShown: true,
                headerTitle: "Details",
                headerTitleAlign: "center",
            }}
        />
    );
}