import { Stack } from "expo-router";
import { Heading } from "@/components/ui/heading";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerTitle: () => <Heading>Transaction</Heading> }}
            />
        </Stack>
    );
}