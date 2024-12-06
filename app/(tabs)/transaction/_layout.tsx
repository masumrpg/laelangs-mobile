import { Stack } from "expo-router";
import HomeSearch from "@/feature/home/components/home-search";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerTitle: () => <HomeSearch /> }}
            />
        </Stack>
    );
}