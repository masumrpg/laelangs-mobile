import React from "react";
import { Image, TouchableOpacity, ScrollView, TextInput, Text, ImageBackground } from "react-native";
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
import { useAuctions } from "@/feature/main/hooks/useAuctions";
import Loader from "@/components/Loader";
import { Auction } from "@/feature/main/schema";
import { formatRupiah } from "@/lib/utils";
import { useResponsive } from "@/shared/hooks/useResponsive";

const backgroundPattern = "https://www.transparenttextures.com/patterns/cubes.png"; // URL motif background

export default function Index() {
    const router = useRouter();
    const { height } = useResponsive();
    const { data: auctions, isLoading } = useAuctions();

    if (isLoading || !auctions) {
        return <Loader />;
    }

    const renderItem = ({ item }: { item: Auction }) => (
        <TouchableOpacity
            className="shadow-sm "
            onPress={() => router.push(`/home/${item.auctionId}`)}
        >
            <Card variant="elevated" className="flex-row items-center p-4 mb-4 rounded-xl bg-orange-200">
                <Image
                    source={{ uri: "https://cdn1-production-images-kly.akamaized.net/NX24SOQVa3oQ4q0wHe2X-pOfhA0=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4607218/original/083109200_1697021875-PS5_versi_2023.jpg" }}
                    className="w-16 h-16 rounded-md mr-4"
                    resizeMode="cover"
                />
                <Box className="flex-1">
                    <Text className="font-bold text-base mb-1">{item.productName}</Text>
                    <Text className="text-gray-500 text-sm mb-1">{item.auctionStatus}</Text>
                    <Text className="text-black font-semibold text-sm">Bid
                        Tertinggi {formatRupiah(item.lastPrice.toString())}</Text>
                </Box>
            </Card>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={{ uri: backgroundPattern }}
            style={{ flex: 1 }}
            resizeMode="repeat"
        >
            <ScrollView className={"bg-primary-500"}>
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
                        data={auctions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.auctionId}
                        estimatedItemSize={120}
                        contentContainerStyle={{ paddingBottom: 16 }}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        // numColumns={2}
                    />
                </Box>
            </ScrollView>
        </ImageBackground>
    );
}
