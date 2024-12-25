import { Stack } from "expo-router";
import Header from "@/components/Header";

export default function SearchLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: () => <Header text={"Temukan Lelang"} />,
            }}
        />
    );
}