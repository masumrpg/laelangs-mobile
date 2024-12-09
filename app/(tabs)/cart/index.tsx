import React, { useState } from "react";
import { TextInput, Pressable, View, Image, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react-native";
import { cn, formatRupiah } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";
import { useAuctions } from "@/feature/main/hooks/useAuctions";
import Loader from "@/components/Loader";
import { Auction } from "@/feature/main/schema";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("On Process");
    const tabs = ["On Process", "Success", "Failed"];

    const { data: auction, isLoading } = useAuctions();

    if (isLoading || !auction) return <Loader />;

    const handleBid = (id: string) => {
        router.push(`/cart/${id}`);
    };


    const renderAuctionItem = ({ item }: { item: Auction }) => (
        <TouchableOpacity onPress={() => handleBid(item.auctionId)}>
            <Card
                key={item.auctionId}
                className="flex-row items-center mb-4 p-4 border border-gray-300 rounded-lg"
            >
                {/* Image */}
                <View className={"w-16 h-16 rounded-lg mr-4 overflow-hidden"}>
                    <Image
                        source={{ uri: "https://img.freepik.com/premium-vector/boy-illustration-vector_844724-3009.jpg" }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Details */}
                <Box className="flex-1">
                    <Text className="text-lg font-bold">{item.productName}</Text>
                    <Text className="text-gray-500">{item.location}</Text>
                </Box>

                {/* Highest Bid */}
                <Box className="text-lg font-bold text-primary-500">
                    <Text>
                        {formatRupiah(item.lastPrice.toString())}
                    </Text>
                </Box>
            </Card>
        </TouchableOpacity>
    );

    return (
        <Box className="flex-1 p-5 py-16 bg-white">
            {/* Search Bar */}
            <Box className="flex-row items-center mb-4 gap-x-2">
                <TextInput
                    className="flex-1 border border-gray-300 rounded-lg p-3"
                    placeholder="Search"
                />
                <Pressable className="p-3 rounded-lg border border-gray-300">
                    <Search size={18} color="black" />
                </Pressable>
            </Box>

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
            <FlashList
                data={auction}
                renderItem={renderAuctionItem}
                keyExtractor={(item) => item.auctionId}
                estimatedItemSize={100}
                contentContainerStyle={{ paddingBottom: 16 }}
            />
        </Box>
    );
}
