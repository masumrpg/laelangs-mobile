import { Stack } from "expo-router";
import { globalColors } from "@/shared/constant/constants";

export default function TransactionLayout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: globalColors.secondaryColor,
            },
        }} />
    );
}