import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { formatRupiah } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { TextInput } from "react-native";
import { Divider } from "@/components/ui/divider";
import React from "react";
import { Button } from "@/components/ui/button";
import { Auction } from "@/feature/main/schema";

interface BidPayScreenProps {
    auction: Auction;
}

export default function BidPayScreen({ auction }: BidPayScreenProps) {
    return (
        <Box className="flex-1 p-5 bg-white gap-y-4">
            {/* Product Details */}
            <Box className="gap-y-2">
                <Text className="text-2xl text-center font-bold">{auction.productName}</Text>
                <Text
                    className="text-2xl text-center text-primary-500 font-semibold">{formatRupiah(auction.lastPrice.toString())}</Text>
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
                    placeholderTextColor="#888"
                    returnKeyType="done"
                    clearButtonMode="while-editing"
                    style={{
                        minHeight: 50,
                        fontSize: 16,
                        paddingHorizontal: 15,
                    }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}  // Increase touch area
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