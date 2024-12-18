import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { buildFullURL, cn, formatDateToIndonesian, formatRupiah } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import PullToRefresh from "@/components/PullToRefresh";
import { Badge, BadgeText } from "@/components/ui/badge";
import ScreenLayout from "@/components/ScreenLayout";
import { useAllTransactions } from "@/feature/transaction/hooks/useTransaction";
import Loader from "@/components/Loader";
import { Transaction, TransactionStatus } from "@/feature/transaction/type";
import { useResponsive } from "@/shared/hooks/useResponsive";

export default function Index() {
    const router = useRouter();
    const { height } = useResponsive();

    const {
        data: transactions,
        isLoading: isLoadingAllTransactions,
        refetch: transactionRefetch,
        isFetching: isFetchingAllTransactions,
    } = useAllTransactions();

    if (isLoadingAllTransactions) return <Loader />;

    const handleTransactionDetail = (id: string) => {
        router.push(`/transaction/${id}`);
    };

    const renderTransactionItem = ({ item }: { item: Transaction }) => {
        const imageUrl = item.images?.[0]?.url
            ? buildFullURL(item.images[0].url)
            : null;

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
                        {imageUrl ? (
                            <Image
                                source={{ uri: imageUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <Box
                                className={"w-16 h-16 rounded-lg mr-4 overflow-hidden justify-center items-center p-1"}
                            >
                                <Text className={"text-center"}>No Image</Text>
                            </Box>
                        )}
                    </Box>

                    {/* Details */}
                    <Box className="flex-1">
                        <Text className="text-lg font-bold">
                            {item.productName}
                        </Text>
                        <Text
                            className={cn(
                                "text-sm",
                            )}
                        >
                            <Badge
                                className="rounded-sm"
                                size="md"
                                variant="solid"
                                action={item.transactionStatus === "DONE" ? "success" : "info"}
                            >
                                <BadgeText>{TransactionStatus.toLabel(item.transactionStatus)}</BadgeText>
                            </Badge>
                        </Text>
                        <Text className="text-gray-500 text-sm">
                            {formatDateToIndonesian(item.transationDate)}
                        </Text>
                    </Box>

                    {/* Amount */}
                    <Text className="text-lg font-bold text-primary-500">
                        {formatRupiah(item.totalPrice.toString())}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    };

    // Handle refresh logic
    const onRefresh = async () => {
        await transactionRefetch();
    };

    return (
        <ScreenLayout>

            {/* Transactions List */}
            <PullToRefresh onRefresh={onRefresh}>
                <FlashList
                    data={transactions?.data}
                    renderItem={renderTransactionItem}
                    keyExtractor={(item) => item.id}
                    estimatedItemSize={100}
                    onRefresh={onRefresh}
                    refreshing={isFetchingAllTransactions}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    ListEmptyComponent={() => (
                        <Box
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                height: height("42%"),
                            }}
                        >
                            <Text style={{ fontSize: 18, color: "gray" }}>Tidak ada Transaksi</Text>
                        </Box>
                    )}
                />
            </PullToRefresh>
        </ScreenLayout>
    );
}
