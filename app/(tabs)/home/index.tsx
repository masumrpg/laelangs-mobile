import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Box } from "@/components/ui/box";

type Item = {
    id: string;
    title: string;
    location: string;
    bid: string;
};

const mockData: Item[] = [
    { id: "1", title: "Supraks dilelang guyss", location: "Location", bid: "180.000" },
    { id: "2", title: "Lamborgini dilelang guyss", location: "Location", bid: "180.000" },
    { id: "3", title: "Lamborgini dilelang guyss", location: "Location", bid: "180.000" },
    { id: "4", title: "Lamborgini dilelang guyss", location: "Location", bid: "180.000" },
    { id: "5", title: "Lamborgini dilelang guyss", location: "Location", bid: "180.000" },
];

export default function Index() {
    const renderItem = ({ item }: { item: Item }): JSX.Element => (
        <Box className="flex-row items-center bg-white rounded-lg p-4 mb-4 shadow-sm">
            <Image
                // source={{ uri: item.image }}
                source={{ uri: "https://via.placeholder.com/400x150.png?text=Banner+Placeholder" }}
                className="w-16 h-16 rounded-md mr-4"
                resizeMode="cover"
            />
            <Box className="flex-1">
                <Text className="font-bold text-base mb-1">{item.title}</Text>
                <Text className="text-gray-500 text-sm mb-1">{item.location}</Text>
                <Text className="text-black font-semibold text-sm">Bid Tertinggi {item.bid}</Text>
            </Box>
        </Box>
    );

    return (
        <Box className="flex-1 px-5 pt-4 bg-gray-100">
            {/* Search Bar */}
            {/*<View className="flex-row items-center bg-white rounded-lg p-3 mb-4">*/}
            {/*    <TextInput*/}
            {/*        placeholder="Search"*/}
            {/*        className="flex-1 mr-2 text-base text-gray-700"*/}
            {/*        autoCapitalize="none"*/}
            {/*    />*/}
            {/*    <Ionicons name="search-outline" size={24} color="black" />*/}
            {/*</View>*/}

            {/* Banner */}
            <Image
                source={{ uri: "https://via.placeholder.com/400x150.png?text=Banner+Placeholder" }}
                className="h-36 rounded-lg mb-4"
                resizeMode="cover"
            />

            {/* Section Title */}
            <Text className="text-lg font-bold mb-4">Bid Barang Kesukaanmu Sekarang!</Text>

            {/* Filter Dropdown */}
            <TouchableOpacity className="flex-row items-center mb-4">
                <Text className="text-base mr-2">Electronic</Text>
                <Ionicons name="chevron-down-outline" size={16} color="black" />
            </TouchableOpacity>

            {/* Item List */}
            <FlashList
                data={mockData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                estimatedItemSize={120}
                contentContainerStyle={{ paddingBottom: 16 }}
                showsVerticalScrollIndicator={false}
            />
        </Box>
    );
}
