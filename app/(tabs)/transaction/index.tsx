import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { cn, formatRupiah } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import PullToRefresh from "@/components/PullToRefresh";
import { Badge, BadgeText } from "@/components/ui/badge";
import ScreenLayout from "@/components/ScreenLayout";

const tabs = ["All", "Success", "Failed"] as const;
type TabType = typeof tabs[number];

const tabLabels: Record<TabType, string> = {
    All: "Semua",
    Success: "Berhasil",
    Failed: "Gagal",
};

interface Transaction {
    id: string;
    productName: string;
    status: "Success" | "Failed";
    date: string;
    amount: number;
}

const mockTransactions: Transaction[] = [
    {
        id: "1",
        productName: "Vintage Camera",
        status: "Success",
        date: "12 Dec 2023",
        amount: 500000,
    },
    {
        id: "2",
        productName: "Antique Watch",
        status: "Success",
        date: "10 Dec 2023",
        amount: 750000,
    },
    {
        id: "3",
        productName: "Classic Motorcycle",
        status: "Failed",
        date: "8 Dec 2023",
        amount: 25000000,
    },
];

export default function Index() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>("All");
    const filteredTransactions =
        activeTab === "All"
            ? mockTransactions
            : mockTransactions.filter(
                (transaction) =>
                    transaction.status.toLowerCase() ===
                    activeTab.toLowerCase(),
            );

    const handleTransactionDetail = (id: string) => {
        router.push(`/transaction/${id}`);
    };

    const renderTransactionItem = ({ item }: { item: Transaction }) => {
        return (
            <TouchableOpacity
                onPress={() => handleTransactionDetail(item.id)}
            >
                <Card
                    key={item.id}
                    className="flex-row items-center mb-4 p-4 border border-gray-300 rounded-lg"
                >
                    {/* Product Image Placeholder */}
                    <Box className={"w-16 h-16 rounded-lg mr-4 overflow-hidden"}>
                        <Image
                            source={{
                                uri: "https://img.freepik.com/premium-vector/boy-illustration-vector_844724-3009.jpg",
                            }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </Box>

                    {/* Details */}
                    <Box className="flex-1">
                        <Text className="text-lg font-bold">
                            {item.productName}
                        </Text>
                        <Text
                            className={cn(
                                "text-sm",
                                item.status === "Success" ? "text-green-500" : "text-red-500",
                            )}
                        >
                            <Badge
                                className="rounded-sm"
                                size="md"
                                variant="solid"
                                action={item.status === "Success" ? "success" : "error"}
                            >
                                <BadgeText>{item.status}</BadgeText>
                            </Badge>
                        </Text>
                        <Text className="text-gray-500 text-sm">
                            {item.date}
                        </Text>
                    </Box>

                    {/* Amount */}
                    <Text className="text-lg font-bold text-primary-500">
                        {/*{formatRupiah(item.amount.toString())}*/}
                        {item.amount}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    };

    // Handle refresh logic
    const onRefresh = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    };

    return (
        <PullToRefresh onRefresh={onRefresh}>
            <ScreenLayout>
                {/* Tabs */}
                <Box className="flex-row mb-4 gap-x-3">
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`flex-1 py-2 px-4 rounded-lg ${
                                activeTab === tab
                                    ? "bg-primary-500"
                                    : "border border-gray-300"
                            }`}
                        >
                            <Text
                                className={cn(
                                    activeTab === tab
                                        ? "text-white"
                                        : "text-gray-600",
                                    "text-center",
                                )}
                            >
                                {tabLabels[tab]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </Box>

                {/* Transactions List */}
                <FlashList
                    data={filteredTransactions}
                    renderItem={renderTransactionItem}
                    keyExtractor={(item) => item.id}
                    estimatedItemSize={100}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    ListEmptyComponent={() => (
                        <Box className="items-center justify-center mt-10">
                            <Text className="text-gray-500">
                                Tidak ada transaksi
                            </Text>
                        </Box>
                    )}
                />
            </ScreenLayout>
        </PullToRefresh>
    );
}
