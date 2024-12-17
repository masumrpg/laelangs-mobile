import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, TextInput, Text, View, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Box } from "@/components/ui/box";
import { MapPin, Search } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { useRouter } from "expo-router";
import { globalColors } from "@/shared/constant/constants";
import LottieView from "lottie-react-native";
import timeAnimation from "@/assets/lottie/time.json";
import { useAuctions } from "@/feature/auction/hooks/useAuctions";
import Loader from "@/components/Loader";
import { Auction } from "@/feature/auction/type";
import { buildFullURL, formatDateToIndonesian, formatRupiah } from "@/lib/utils";
import { useResponsive } from "@/shared/hooks/useResponsive";
import PullToRefresh from "@/components/PullToRefresh";
import { useAddresses, useUserProfile } from "@/feature/profile/hooks/useProfiles";

export default function Index() {
    const router = useRouter();
    const { height } = useResponsive();

    const [page, setPage] = useState(1);
    const [auctionData, setAuctionData] = useState<Auction[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const { data: auctions, isLoading, isFetching, refetch: auctionsRefetch } = useAuctions({ page, size: 10 });
    const { data: userProfile, isLoading: isUserProfileLoading } = useUserProfile();
    const { data: userAddresses, isLoading: isAddressesLoading } = useAddresses();

    useEffect(() => {
        console.log(auctions?.paging);
        console.log(auctionData.length);
        if (auctions?.data) {
            setAuctionData((prevData) => [...prevData, ...auctions.data]);
        }
    }, [auctions]);

    if (isLoading || isUserProfileLoading || isAddressesLoading) return <Loader />;

    const handleItem = (id: string) => {
        router.push(`/home/${id}`);
    };

    const renderItem = ({ item }: { item: Auction }) => {
        const imageUrl = item.product.images?.[0]?.url
            ? buildFullURL(item.product.images[0].url)
            : null;

        return (
            <TouchableOpacity onPress={() => handleItem(item.id)}>
                <Card key={item.id} className="flex-row items-center mb-4 p-4 border border-gray-300 rounded-lg">
                    <Box className={"w-16 h-16 rounded-lg mr-4 overflow-hidden"}>
                        {imageUrl ? (
                            <Image
                                source={{ uri: imageUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        ) : (
                            <Box className={"w-16 h-16 rounded-lg justify-center items-center p-1"}>
                                <Text className={"text-center"}>No Image</Text>
                            </Box>
                        )}
                    </Box>
                    <Box className="flex-1">
                        <Text className="text-lg font-bold">
                            {item.product.productName}
                        </Text>
                        <Text className="text-sm">
                            Kelipatan {formatRupiah(item.multiply.toString())}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                            {formatDateToIndonesian(item.dueDate)}
                        </Text>
                    </Box>
                    <Text className="text-lg font-bold text-primary-500">
                        {formatRupiah(item.lastPrice.toString())}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    };

    const handleEndReached = async () => {
        if (isFetchingMore || (auctions?.data.length ?? 0) < 10) return;
        setIsFetchingMore(true);
        setPage((prevPage) => prevPage + 1);
        setIsFetchingMore(false);
    };

    const onRefresh = async () => {
        setAuctionData([]); // Reset data saat refresh
        setPage(1);
        await auctionsRefetch();
    };

    return (
        <Box className="flex-1 bg-white">
            {/* Header Section */}
            <Box
                className="pt-16 px-5"
                style={{
                    height: height("25%"), // Tetapkan tinggi header sekitar 25% layar
                    backgroundColor: globalColors.secondaryColor,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    rowGap: 20,
                    overflow: "hidden",
                }}
            >
                <Box className="items-end">
                    <LottieView
                        style={{
                            marginTop: -50,
                            width: 300,
                            height: 300,
                            position: "absolute",
                        }}
                        source={timeAnimation}
                        autoPlay
                        loop
                    />
                </Box>
                <Box>
                    <Heading bold size={"xl"}>
                        {userProfile?.data?.firstName ?? "Halo Laelangers"}
                    </Heading>
                    <Box className={"flex flex-row gap-x-1 items-center"}>
                        <Text className={"w-fit text-lg font-semibold"}>
                            {userAddresses?.data?.[0]?.address ?? "Alam Semesta"}
                        </Text>
                        <MapPin size={10} color={"black"} />
                    </Box>
                </Box>
                <TouchableOpacity onPress={() => router.push("/(tabs)/search")}>
                    <Box className="flex-row items-center bg-white/50 rounded-xl p-3 py-1">
                        <TextInput
                            placeholder="Temukan Barangmu"
                            className="flex-1 mr-2 text-base text-gray-700"
                            autoCapitalize="none"
                            editable={false}
                        />
                        <Search size={20} color="black" />
                    </Box>
                </TouchableOpacity>
            </Box>

            {/* Content Section */}
            <Box className="flex-1 px-5 pb-16">
                <Heading size={"lg"} bold className="my-4 px-3">
                    Bid Barang Kesukaanmu Sekarang!
                </Heading>
                <PullToRefresh onRefresh={onRefresh}>
                    <FlashList
                        data={auctionData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        estimatedItemSize={100}
                        onEndReached={handleEndReached}
                        onEndReachedThreshold={0.5}
                        refreshing={isFetching}
                        contentContainerStyle={{ paddingBottom: 16 }}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            isFetchingMore ? (
                                <ActivityIndicator size="small" color="#000" />
                            ) : null
                        }
                        ListEmptyComponent={
                            <Box
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: height("42%"),
                                }}
                            >
                                <Text style={{ fontSize: 18, color: "gray" }}>Tidak ada Lelang</Text>
                            </Box>
                        }
                    />
                </PullToRefresh>
            </Box>
        </Box>

    );
}
