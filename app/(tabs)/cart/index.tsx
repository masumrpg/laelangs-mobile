import React, { useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
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

    const {
        data: myBidAuctions,
        isLoading: isMyBidAuctions,
        refetch: myBidRefetch,
        isError: isAuctionError,
    } = useGetAllMyBidAuctions();

    useEffect(() => {
        const interval = setInterval(() => {
            myBidRefetch();
        }, 15000); // 15 detik

        return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
    }, [myBidRefetch]);

    if (isMyBidAuctions) return <Loader />;

    if (isAuctionError) {
        return (
            <ScreenLayout>
                <Text className="text-center text-red-500 mt-4">
                    Terjadi kesalahan saat memuat data. Silakan coba lagi.
                </Text>
            </ScreenLayout>
        );
    }

    const onGoingBid = myBidAuctions?.data?.filter(
        (bid) => bid.auction.auctionStatus === AuctionStatus.ONGOING,
    );

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
                    className={cn(
                        item.totalBid >= item.auction.lastPrice ? "border-primary-500" : "border-red-500",
                        "flex-row items-center mb-4 p-4 border rounded-lg")}
                >
                    {/* Gambar Produk */}
                    <Box className="w-16 h-16 rounded-lg mr-4 overflow-hidden">
                        {imageUrl ? (
                            <Image
                                source={{ uri: imageUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <Box className="w-16 h-16 rounded-lg justify-center items-center bg-gray-200">
                                <Text className="text-center">No Image</Text>
                            </Box>
                        )}
                    </Box>

                    {/* Detail Produk */}
                    <Box className="flex-1">
                        <Text className="text-lg font-bold">
                            {item.auction.product.productName}
                        </Text>
                        <Text className="text-gray-500">
                            Bid anda {formatRupiah(item.totalBid.toString())}
                        </Text>
                    </Box>

                    {/* Harga Bid Tertinggi */}
                    <Box>
                        <Text className={cn(
                            item.totalBid >= item.auction.lastPrice ? "text-primary-500" : "text-red-500",
                            "text-lg font-bold",
                        )}>
                            {formatRupiah(item.auction.lastPrice.toString())}
                        </Text>
                    </Box>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenLayout>
            {/* FlashList untuk Bid Ongoing */}
            <PullToRefresh onRefresh={onRefresh}>
                <FlashList
                    data={onGoingBid}
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
