import React, { useEffect, useState } from "react";
import { Image, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { mockData } from "@/data";
import Loader from "@/components/Loader";
import { formatRupiah } from "@/lib/utils";

const ProductDetail: React.FC = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const product = mockData.find((product) => product.id === id);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }


    if (!product) {
        return <Loader />;
    }

    const handleBid = () => {
        router.push(`/home/${id}/bid`);
    };

    return (
        <ScrollView className={"bg-white"}>
            <Box className="flex-1 p-5">
                {/* Image Section */}
                <Box className="p-0 m-0 mb-4 shadow-xl overflow-hidden rounded-xl">
                    <Image
                        source={{ uri: "https://st4.depositphotos.com/1001599/39398/v/450/depositphotos_393981302-stock-illustration-auction-house-concept-vector-illustration.jpg" }}
                        className="h-56"
                        resizeMode="cover"
                    />
                </Box>
                <Heading bold size={"xl"}>{product?.title}</Heading>
                <Box className="flex-row justify-between mb-4">
                    <Text className="text-primary-500 text-2xl font-bold mt-2">{formatRupiah(product.bid)}</Text>
                    <Button onPress={handleBid}>
                        <Text className={"text-white"}>Bid Sekarang</Text>
                    </Button>
                </Box>

                {/* Title Section */}
                <Box className="mb-4">
                    <Text className="font-bold mb-1">
                        Bid Barang Kesukaanmu Sekarang!
                    </Text>
                    <Text className="text-gray-600 text-sm">
                        Jika Anda ingin menggunakan Dictionary dengan kunci yang unik, Anda
                        bisa menyimpan ID sebagai kunci utama dan Dictionary properti karyawan
                        sebagai nilainya:
                    </Text>
                </Box>

                {/* Bidding Status Section */}
                {/*<Box className="border border-red-500 rounded-md p-2 mb-4">*/}
                {/*    <Text className="text-red-500 text-center font-bold">Bidding Lose</Text>*/}
                {/*    <Text className="text-red-500 text-center font-bold text-2xl">2.500</Text>*/}
                {/*    <Box className="flex-row justify-around mt-2">*/}
                {/*        <TouchableOpacity onPress={handleBid} className="bg-green-500 rounded-md px-4 py-2">*/}
                {/*            <Text className="text-white font-bold">Add Bidding</Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*        <TouchableOpacity className="bg-gray-500 rounded-md px-4 py-2">*/}
                {/*            <Text className="text-white font-bold">Refund</Text>*/}
                {/*        </TouchableOpacity>*/}
                {/*    </Box>*/}
                {/*</Box>*/}

                {/* Table Section */}
                <Box className="border border-gray-300 rounded-md mb-4">
                    {[
                        ["Kondisi", "Bekas"],
                        ["Bidding Start", "4 Desember 2024"],
                        ["Bidding End", "14 Desember 2024"],
                        ["Bidding Price Start", "2.000"],
                        ["Bidding Price Higher", "2.500"],
                        ["Kelipatan Index", "500"],
                        ["Size", "Small"],
                        ["Kategori", "Pakaian"],
                    ].map(([key, value], index) => (
                        <Box
                            key={index}
                            className={`flex-row justify-between p-2 ${
                                index % 2 === 0 ? "bg-gray-100" : ""
                            }`}
                        >
                            <Text className="text-gray-600">{key}</Text>
                            <Text className="text-black font-medium">{value}</Text>
                        </Box>
                    ))}
                </Box>

                {/* Note Section */}
                <Box className="bg-gray-100 p-3 rounded-md">
                    <Text className="text-gray-600 text-sm">
                        <Text className="font-bold">Note:</Text> Customer wajib membaca
                        deskripsi keadaan barang terlebih dahulu.
                    </Text>
                </Box>
            </Box>
        </ScrollView>
    );
};

export default ProductDetail;