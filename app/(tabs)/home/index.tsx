import React from "react";
import { Text, Image, TouchableOpacity, ScrollView, View, TextInput, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Box } from "@/components/ui/box";
import {
    Select,
    SelectBackdrop,
    SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper,
    SelectIcon,
    SelectInput, SelectItem,
    SelectPortal,
    SelectTrigger,
} from "@/components/ui/select";
import { ChevronDown, House } from "lucide-react-native";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { useRouter } from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

type Item = {
    id: string;
    title: string;
    location: string;
    bid: string;
    image: string;
};

const mockData: Item[] = [
    {
        id: "1",
        title: "Supraks dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
    {
        id: "2",
        title: "Lamborgini dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
    {
        id: "3",
        title: "Lamborgini dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
    {
        id: "4",
        title: "Lamborgini dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
    {
        id: "5",
        title: "Lamborgini dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
    {
        id: "6",
        title: "Lamborgini dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
    {
        id: "7",
        title: "Lamborgini dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
    {
        id: "8",
        title: "Lamborgini dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
    {
        id: "9",
        title: "Lamborgini dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
    {
        id: "10",
        title: "Lamborgini dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
    {
        id: "11",
        title: "Lamborgini dilelang guyss",
        location: "Location",
        bid: "180.000",
        image: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    },
];

const bannerImages = [
    "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
    "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg",
];

export default function Index() {
    const router = useRouter();

    const renderItem = ({ item }: { item: Item }) => (
        <TouchableOpacity
            onPress={() => router.push(`/home/${item.id}`)}
        >
            <Card variant="elevated" className="flex-row items-center p-4 mb-4 rounded-xl shadow-sm">
                <Image
                    source={{ uri: item.image }}
                    className="w-16 h-16 rounded-md mr-4"
                    resizeMode="cover"
                />
                <Box className="flex-1">
                    <Text className="font-bold text-base mb-1">{item.title}</Text>
                    <Text className="text-gray-500 text-sm mb-1">{item.location}</Text>
                    <Text className="text-black font-semibold text-sm">Bid Tertinggi {item.bid}</Text>
                </Box>
            </Card>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
            <Box className="flex-1 px-5 pt-12">
                {/*Search Bar*/}
                <Box className="flex-row items-center bg-white rounded-xl p-3 mb-4">
                    <TextInput
                        placeholder="Search"
                        className="flex-1 mr-2 text-base text-gray-700"
                        autoCapitalize="none"
                    />
                    <Ionicons name="search-outline" size={24} color="black" />
                </Box>

                {/*Banner */}
                <Card className="p-0 m-0 mb-4 shadow-xl overflow-hidden rounded-xl">
                    <Image
                        source={{ uri: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg" }}
                        className="h-40"
                        resizeMode="cover"
                    />
                </Card>

                {/* Scrollable Banner */}
                {/*<ScrollView*/}
                {/*    horizontal*/}
                {/*    pagingEnabled*/}
                {/*    showsHorizontalScrollIndicator={false}*/}
                {/*    className="mb-4"*/}
                {/*>*/}
                {/*    {bannerImages.map((image, index) => (*/}
                {/*        <Card*/}
                {/*            key={index}*/}
                {/*            style={{*/}
                {/*                margin: 0,*/}
                {/*                padding: 0,*/}
                {/*                width: wp("90%"),*/}
                {/*                height: hp("17%"),*/}
                {/*                borderRadius: 20,*/}
                {/*                overflow: "hidden",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <Image*/}
                {/*                source={{ uri: image }}*/}
                {/*                style={{*/}
                {/*                    width: wp("90%"),*/}
                {/*                    height: "100%",*/}
                {/*                }}*/}
                {/*                resizeMode="cover"*/}
                {/*            />*/}
                {/*        </Card>*/}
                {/*    ))}*/}
                {/*</ScrollView>*/}

                {/* Section Title */}
                <Heading size={"lg"} bold={true} className="mb-4 px-3">Bid Barang Kesukaanmu Sekarang!</Heading>

                {/* Filter Dropdown */}
                <Select>
                    <SelectTrigger className={"w-48 items-center mb-4 border-transparent"}>
                        <SelectInput className={"h-20"}
                                     textContentType={"name"}
                                     placeholder={"Pilih Kategori"} />
                        <ChevronDown size={16} color="black" />
                    </SelectTrigger>
                    <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                            <SelectDragIndicatorWrapper>
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"asdasdasdasdasd"} value={"asdasdasdasdasdasd"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                            <SelectItem label={"Electronic"} value={"Electronic"} />
                        </SelectContent>
                    </SelectPortal>
                </Select>

                {/* Item List */}
                <FlashList
                    data={mockData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    estimatedItemSize={120}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            </Box>
        </ScrollView>
    );
}
