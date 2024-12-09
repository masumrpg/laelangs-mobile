import { Stack } from "expo-router";

export default function DetailCartLayout() {
    return <Stack
        screenOptions={{
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTitle: "Detail Lelang",
        }}
    />;
}