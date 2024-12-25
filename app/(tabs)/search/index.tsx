import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput } from "react-native";
import { Box } from "@/components/ui/box";
import ScreenLayout from "@/components/ScreenLayout";
import PullToRefresh from "@/components/PullToRefresh";
import { Filter } from "lucide-react-native";
import { FlashList } from "@shopify/flash-list";
import { useAuctions } from "@/feature/auction/hooks/useAuctions";
import { Auction } from "@/feature/auction/type";
import Loader from "@/components/Loader";
import { buildFullURL, formatDateToIndonesian, formatRupiah, parseRupiah } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useRouter } from "expo-router";
import { useResponsive } from "@/shared/hooks/useResponsive";
import FilterModal from "@/feature/search/components/FilterModal";
import { useQueryClient } from "@tanstack/react-query";

export default function Index() {
    const queryClient = useQueryClient();
    const { height } = useResponsive();
    const router = useRouter();
    const [filterVisible, setFilterVisible] = useState(false);
    const [filters, setFilters] = useState({
        q: "",
        minPrice: "",
        maxPrice: "",
    });
    const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>([]);

    const { data: auctions, isLoading: isAuctionLoading, refetch } = useAuctions({ size: 100 });

    useEffect(() => {
        if (auctions?.data) {
            const filtered = auctions.data.filter((auction) => {
                return (filters.q ? auction.product.productName.includes(filters.q) : true) &&
                    (filters.minPrice
                        ? auction.lastPrice >= parseRupiah(filters.minPrice)
                        : true) &&
                    (filters.maxPrice
                        ? auction.lastPrice <= parseRupiah(filters.maxPrice)
                        : true);
            });
            setFilteredAuctions(filtered);
        }
    }, [auctions, filters]);

    const onRefresh = async () => {
        await refetch();
    };

    const handleItem = (id: string) => {
        router.push(`/home/${id}`);
    };

    const renderItem = ({ item }: { item: Auction }) => {
        const imageUrl = item.product.images?.[0]?.url
            ? buildFullURL(item.product.images[0].url)
            : null;

        return (
            <Pressable onPress={() => handleItem(item.id)}>
                <Card key={item.id} className="flex-row items-center mb-4 p-4 border border-gray-300 rounded-lg">
                    <Box className={"w-16 h-16 rounded-lg mr-4 overflow-hidden"}>
                        {imageUrl ? (
                            <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
                        ) : (
                            <Box className={"w-16 h-16 rounded-lg mr-4 justify-center items-center p-1"}>
                                <Text>No Image</Text>
                            </Box>
                        )}
                    </Box>
                    <Box className="flex-1">
                        <Text className="text-lg font-bold">{item.product.productName}</Text>
                        <Text className="text-sm">Kelipatan {formatRupiah(item.multiply.toString())}</Text>
                        <Text className="text-gray-500 text-sm">{formatDateToIndonesian(item.dueDate)}</Text>
                    </Box>
                    <Text
                        className="text-lg font-bold text-primary-500">{formatRupiah(item.lastPrice.toString())}</Text>
                </Card>
            </Pressable>
        );
    };

    const applyFilters = () => {
        setFilterVisible(false);
    };

    const clearFilter = (key: string) => {
        setFilters((prev) => ({ ...prev, [key]: "" }));
    };

    return (
        <ScreenLayout>
            <PullToRefresh onRefresh={onRefresh}>
                <Box className="flex-row items-center mb-6 gap-x-4">
                    <TextInput
                        className="flex-1 border border-gray-300 rounded-lg p-4 text-lg"
                        placeholder="Cari produk"
                        value={filters.q}
                        onChangeText={(text) => setFilters((prev) => ({ ...prev, q: text }))}
                    />
                    <Pressable onPress={async () => {
                        setFilterVisible(true);
                        await queryClient.invalidateQueries({ queryKey: ["auctions", filters.q] });
                    }} className="p-4 rounded-lg border border-gray-300">
                        <Filter size={20} color="black" />
                    </Pressable>
                </Box>

                {/* Display active filters */}
                <Box className="flex-row flex-wrap mb-4 gap-2">
                    {Object.entries(filters)
                        .filter(([key, value]) => value)
                        .map(([key, value]) => (
                            <Box key={key} className="flex-row items-center bg-gray-200 px-3 py-1 rounded-full">
                                <Text className="mr-2 text-sm">{`${key}: ${value}`}</Text>
                                <Pressable onPress={() => clearFilter(key)}>
                                    <Text className="text-sm text-red-500">X</Text>
                                </Pressable>
                            </Box>
                        ))}
                </Box>

                {isAuctionLoading || !auctions?.data ? (
                    <Loader />
                ) : (
                    <FlashList
                        data={filteredAuctions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        refreshing={isAuctionLoading}
                        estimatedItemSize={10}
                        ListEmptyComponent={
                            <Box style={{ justifyContent: "center", alignItems: "center", height: height("42%") }}>
                                <Text style={{ fontSize: 18, color: "gray" }}>Tidak ada Lelang</Text>
                            </Box>
                        }
                    />
                )}
                <FilterModal
                    visible={filterVisible}
                    filters={filters}
                    setFilters={setFilters}
                    onApply={applyFilters}
                    onClose={() => setFilterVisible(false)}
                />
            </PullToRefresh>
        </ScreenLayout>
    );
}
