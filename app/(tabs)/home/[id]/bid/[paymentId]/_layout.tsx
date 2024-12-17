import { Stack } from "expo-router";

export default function PaymentLayout() {

    return (
        <Stack screenOptions={{
            headerShadowVisible: false,
            headerShown: false,
        }} />
    );
}