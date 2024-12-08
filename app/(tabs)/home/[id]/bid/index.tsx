import React from "react";
import { TextInput } from "react-native";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader";
import { mockData } from "@/data";
import { formatRupiah } from "@/lib/utils";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

export default function Index() {
    const { id } = useLocalSearchParams();
    const product = mockData.find((product) => product.id === id);

    // Show loader if product is not found
    if (!product) {
        return <Loader />;
    }

    return (
        <Box className="flex-1 p-5 bg-white gap-y-4">
            {/* Product Details */}
            <Box className="gap-y-2">
                <Text className="text-2xl font-bold">{product.title}</Text>
                <Text className="text-2xl text-primary-500 font-semibold">{formatRupiah(product.bid)}</Text>
            </Box>

            {/* Bid Form */}
            <Card className="w-full max-w-md p-6 shadow-lg rounded-lg gap-y-5 border-2 border-primary-500">
                <Heading bold size="xl" className="text-center text-gray-500">
                    Bid Anda
                </Heading>

                <TextInput
                    className="mb-4 border border-primary-500 rounded-lg p-3"
                    placeholder="Rp. 0"
                    keyboardType="numeric"
                />

                {/* Payment Methods */}
                <Box className="flex-col mb-4">
                    <Heading bold className="text-gray-500 mb-5">
                        Metode Pembayaran
                    </Heading>
                    <Divider className="my-0.5" />
                    <Box className="flex-col gap-y-2">
                        {["Qris", "Gopay", "Shopee Pay"].map((method) => (
                            <React.Fragment key={method}>
                                <Text className="text-gray-500">{method}</Text>
                                <Divider className="my-0.5" />
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>

                {/* Submit Button */}
                <Button>
                    <Text className="text-white">Bid Sekarang</Text>
                </Button>
            </Card>

            {/* Note Section */}
            <Box className="bg-gray-100 p-3 rounded-md">
                <Text className="text-gray-600 text-sm">
                    <Text className="font-bold">Note:</Text> Customer wajib membaca
                    deskripsi keadaan barang terlebih dahulu.
                </Text>
            </Box>
        </Box>
    );
}
