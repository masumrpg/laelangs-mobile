import { Stack } from "expo-router";
import HomeSearch from "@/feature/home/components/HomeSearch";

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}