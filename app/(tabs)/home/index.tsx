import React from "react";
import { Image, TouchableOpacity, TextInput, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Box } from "@/components/ui/box";
import {
    Select,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
    SelectInput,
    SelectItem,
    SelectPortal,
    SelectTrigger,
} from "@/components/ui/select";
import { ChevronDown, MapPin, Search } from "lucide-react-native";
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
import { useQueryClient } from "@tanstack/react-query";

export default function Index() {
    const router = useRouter();
    const { height } = useResponsive();
    const { data: auctions, isLoading, isFetching } = useAuctions();
    const queryClient = useQueryClient();

    if (isLoading || !auctions?.data) return <Loader />;

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
                    {/* Product Image or Placeholder */}
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

                    {/* Product Details */}
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

                    {/* Price */}
                    <Text className="text-lg font-bold text-primary-500">
                        {formatRupiah(item.lastPrice.toString())}
                    </Text>
                </Card>
            </TouchableOpacity>
        );
    };

    const onRefresh = async () => {
        try {
            await queryClient.invalidateQueries({
                queryKey: ["auctions"],
            });
        } catch (error) {
            console.error("Failed to refresh auctions:", error);
        }
    };

    return (
        <PullToRefresh onRefresh={onRefresh}>
            <Box
                className="pt-16 px-5"
                style={{
                    flex: 1,
                    height: height("30%"),
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
                        autoPlay={true}
                        loop={true}
                    />
                </Box>

                <Box>
                    <Heading bold size={"xl"}>Ma'sum</Heading>
                    <Box className={"flex flex-row gap-x-1 items-center"}>
                        <Text className={"w-fit text-lg font-semibold"}>Jawa Tengah, Kebumen</Text>
                        <MapPin size={10} color={"black"} />
                    </Box>
                </Box>

                <Box className="flex-row items-center bg-white/50 rounded-xl p-3 py-1">
                    <TextInput
                        placeholder="Search"
                        className="flex-1 mr-2 text-base text-gray-700"
                        autoCapitalize="none"
                    />
                    <Search size={20} color="black" />
                </Box>
            </Box>
            <Box className="flex-1 px-5 pb-16">
                {/* Banner */}
                <Box className="p-0 m-0 -mt-10 mb-4 shadow-xl overflow-hidden rounded-xl">
                    <Image
                        source={{ uri: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg" }}
                        className="h-40"
                        resizeMode="cover"
                    />
                </Box>

                {/* Section Title */}
                <Heading size={"lg"} bold={true} className="mb-4 px-3">
                    Bid Barang Kesukaanmu Sekarang!
                </Heading>

                {/* Filter Dropdown */}
                <Select>
                    <SelectTrigger className={"w-48 items-center mb-4 border-transparent"}>
                        <SelectInput
                            className={"h-20 placeholder:text-black"}
                            textContentType={"name"}
                            placeholder={"Pilih Kategori"}
                        />
                        <ChevronDown size={16} color="black" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Fashion"} value={"Fashion"} />
                            <SelectItem label={"Kendaraan"} value={"Kendaraan"} />
                        </SelectContent>
                    </SelectPortal>
                </Select>

                {/* Item List */}
                <FlashList
                    data={auctions.data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    estimatedItemSize={10}
                    onRefresh={onRefresh}
                    refreshing={isFetching}
                    contentContainerStyle={{
                        paddingBottom: 16,
                    }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                height: height("42%"),
                            }}
                        >
                            <Text style={{ fontSize: 18, color: "gray" }}>Tidak ada Lelang</Text>
                        </View>
                    }
                />
            </Box>
        </PullToRefresh>
    );
}
