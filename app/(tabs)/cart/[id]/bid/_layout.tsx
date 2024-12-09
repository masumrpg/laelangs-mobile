import { Stack } from "expo-router";

export default function BidLayout() {
    return (
        <Stack screenOptions={{
            headerShadowVisible: false,
            headerShown: false,
        }} />
    );
}