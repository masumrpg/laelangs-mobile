import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { formatRupiah } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Auction } from "@/feature/auction/schema";
import PullToRefresh from "@/components/PullToRefresh";
import ScreenLayout from "@/components/ScreenLayout";

interface BidPayScreenProps {
    auction: Auction;
    className?: string;
}


export default function BidPayScreen({ auction, className }: BidPayScreenProps) {
    const paymentMethodList = ["Qris", "Gopay", "Shopee Pay"];
    const [availableBid, setAvailableBid] = useState<number>(auction.lastPrice + auction.multiply);


    const onRefresh = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    };

    const addBid = () => {
        setAvailableBid((prevState) => prevState + auction.multiply);
    };

    const decreaseBid = () => {
        setAvailableBid((prevState) => prevState - auction.multiply);
    };

    const handleBid = async () => {

    };


    return (
        <PullToRefresh onRefresh={onRefresh}>
            <ScreenLayout className={className}>
                {/* Product Details */}
                <Box className="gap-y-2">
                    <Text className="text-2xl text-center font-bold">{auction.product.productName}</Text>
                    <Text className="text-center">Penawaran Tertinggi</Text>
                    <Text
                        className="text-2xl text-center text-primary-500 font-semibold">{formatRupiah(auction.lastPrice.toString())}</Text>
                </Box>

                {/* Bid Form */}
                <Card className="w-full max-w-md p-6 shadow-lg rounded-lg gap-y-5 border-2 border-primary-500 mt-5">
                    <Heading bold size="xl" className="text-center text-gray-500">
                        Bid Anda
                    </Heading>

                    <Heading bold size={"xl"} className="color-primary-500 text-center">
                        {formatRupiah(availableBid.toString())}
                    </Heading>

                    <Box className="flex flex-row justify-center items-center gap-x-20">
                        <Button onPress={decreaseBid}
                                isDisabled={availableBid === auction.lastPrice + auction.multiply}>
                            <Text className="text-white ">
                                Kurangi
                            </Text>
                        </Button>
                        <Button>
                            <Text onPress={addBid} className="text-white ">
                                Tambah
                            </Text>
                        </Button>

                    </Box>

                    {/* Payment Methods */}
                    <Box className="flex-col mb-4">
                        <Heading bold className="text-gray-500 mb-5">
                            Metode Pembayaran
                        </Heading>
                        <Divider className="my-0.5" />
                        <Box className="flex-col gap-y-2">
                            {paymentMethodList.map((method) => (
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
                <Box className="bg-gray-100 p-3 mt-5 rounded-md">
                    <Text className="text-gray-600 text-sm">
                        <Text className="font-bold">Note:</Text> Customer wajib membaca
                        deskripsi keadaan barang terlebih dahulu.
                    </Text>
                </Box>
            </ScreenLayout>
        </PullToRefresh>
    );
}