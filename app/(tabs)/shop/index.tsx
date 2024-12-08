import React, { useState } from "react";
import { TextInput, Pressable, View, Image, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react-native";
import { formatRupiah } from "@/lib/utils";
import { FlashList } from "@shopify/flash-list";

export default function Index() {
    const [activeTab, setActiveTab] = useState("On Process");

    const auctionItems = [
        {
            id: 1,
            title: "Abdul dilelang guyss",
            location: "location",
            highestBid: 180000,
        },
        {
            id: 2,
            title: "Abdul dilelang guyss",
            location: "location",
            highestBid: 180000,
        },
    ];

    const tabs = ["On Process", "Success", "Failed"];

    const renderAuctionItem = ({ item }: { item: typeof auctionItems[0] }) => (
        <TouchableOpacity onPress={() => console.log("Auction Item", item)}>
            <Card
                key={item.id}
                className="flex-row items-center mb-4 p-4 border border-gray-300 rounded-lg"
            >
                {/* Image Placeholder */}
                <View className="w-16 h-16 bg-gray-200 rounded-lg mr-4" />

                {/* Details */}
                <Box className="flex-1">
                    <Text className="text-lg font-bold">{item.title}</Text>
                    <Text className="text-gray-500">{item.location}</Text>
                </Box>

                {/* Highest Bid */}
                <Text className="text-lg font-bold text-primary-500">
                    {formatRupiah(item.highestBid.toString())}
                </Text>
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
                            className={`text-center ${
                                activeTab === tab ? "text-white" : "text-gray-600"
                            }`}
                        >
                            {tab}
                        </Text>
                    </Pressable>
                ))}
            </Box>

            {/* Auction Items */}
            <FlashList
                data={auctionItems}
                renderItem={renderAuctionItem}
                keyExtractor={(item) => item.id.toString()}
                estimatedItemSize={100}
                contentContainerStyle={{ paddingBottom: 16 }}
            />
        </Box>
    );
}
