import { Stack, useLocalSearchParams } from "expo-router";
import { mockData } from "@/data";
import React from "react";
import Loader from "@/components/Loader";

export default function DetailLayout() {
    const { id } = useLocalSearchParams();

    const product = mockData.find((product) => product.id === id);

    return (
        <Stack
            screenOptions={{
                headerShadowVisible: false,
                headerShown: true,
                headerTitle: product ? product.title : "Details",
                headerTitleAlign: "center",
            }}
        />
    );
}