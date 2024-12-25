import { Stack } from "expo-router";
import Header from "@/components/Header";

export default function TransactionLayout() {
    return (
        <Stack screenOptions={{
            headerShown: true,
            header: () => <Header text={"Riwayat Lelang"} />,
        }} />
    );
}