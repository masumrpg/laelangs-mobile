import Header from "@/components/Header";
import { Stack } from "expo-router";
import React from "react";

export default function DetailLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: () => <Header text={"Detail Lelang"} />,
            }}
        />
    );
}