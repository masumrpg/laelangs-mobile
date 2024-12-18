import React, { useState } from "react";
import { Image, Pressable, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { buildFullURL, cn, formatRupiah } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { useGetAllMyBidAuctions } from "@/feature/auction/hooks/useAuctions";
import Loader from "@/components/Loader";
import { AuctionStatus, UserBidDetails } from "@/feature/auction/type";
import { useRouter } from "expo-router";
import ScreenLayout from "@/components/ScreenLayout";
import PullToRefresh from "@/components/PullToRefresh";

export default function Index() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Menang");
    const tabs = ["Menang", "Kalah"];

    const { data: myBidAuctions, isLoading: isMyBidAuctions, refetch: myBidRefetch } = useGetAllMyBidAuctions();

    if (isMyBidAuctions) return <Loader />;

    const filteredAuctions = myBidAuctions?.data?.filter(myBidAuction => {
        if (activeTab === "Menang") {
            // return auction.auctionStatus === "Menang";
            return "Menang";
        } else {
            // return auction.auctionStatus === "Kalah";
            return "Kalah";
        }
    });

    const handleBid = (id: string) => {
        router.push(`/cart/${id}`);
    };

    const onRefresh = async () => {
        await myBidRefetch();
    };

    const renderAuctionItem = ({ item }: { item: UserBidDetails }) => {
        const imageUrl = item.auction.product.images?.[0]?.url
            ? buildFullURL(item.auction.product.images[0].url)
            : null;

        return (
            <TouchableOpacity onPress={() => handleBid(item.auction.id)}>
                <Card
                    key={item.auction.id}
                    className="flex-row items-center mb-4 p-4 border border-gray-300 rounded-lg"
                >
                    {/* Image */}
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
                        <Text className="text-lg font-bold">{item.auction.product.productName}</Text>
                        <Text className="text-gray-500">{AuctionStatus.toLabel(item.auction.auctionStatus)}</Text>
                    </Box>

                    {/* Highest Bid */}
                    <Box className="text-lg font-bold text-primary-500">
                        <Text className="text-lg font-bold text-primary-500">
                            {formatRupiah(item.auction.lastPrice.toString())}
                        </Text>
                    </Box>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenLayout className="">
            {/* Tabs */}
            <Box className="flex-row mb-4 gap-x-3">
                {tabs.map((tab) => (
                    <Pressable
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        className={`flex-1 py-2 px-4 rounded-lg ${
                            activeTab === tab ? "bg-primary-500" : "border border-gray-300"
                        }`}
                    >
                        <Text
                            className={cn(
                                activeTab === tab ? "text-white" : "text-gray-600",
                                "text-center",
                            )}
                        >
                            {tab}
                        </Text>
                    </Pressable>
                ))}
            </Box>

            {/* Auction Items */}
            <PullToRefresh onRefresh={onRefresh}>
                <FlashList
                    data={myBidAuctions?.data}
                    renderItem={renderAuctionItem}
                    keyExtractor={(item) => item.auction.id}
                    estimatedItemSize={100}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    ListEmptyComponent={() => (
                        <Text className="text-center text-gray-500 mt-4">
                            Tidak ada lelang dalam kategori ini
                        </Text>
                    )}
                />
            </PullToRefresh>
        </ScreenLayout>
    );
}