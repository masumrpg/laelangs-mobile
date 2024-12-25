import { Stack } from "expo-router";
import Header from "@/components/Header";

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: () => <Header text={"Profile"} />,
            }}
        />
    );
}