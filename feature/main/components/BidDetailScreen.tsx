import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn, formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";
import { Auction } from "@/feature/main/schema";
import CarouselImage from "@/components/CarouselImage";
import PullToRefresh from "@/components/PullToRefresh";
import ScreenLayout from "@/components/ScreenLayout";

interface BidScreenProps {
    auction: Auction;
    className?: string;
    handleInitialBid?: () => void;
    handleAdditionalBid?: () => void;
}

export default function BidDetailScreen({ auction, className, handleInitialBid, handleAdditionalBid }: BidScreenProps) {
    const myDummyPrice = 200;

    const tableAuction = [
        ["Kondisi", "Bekas"],
        ["Status", auction.auctionStatus],
        ["Bidding Start", auction.startDate],
        ["Bidding End", auction.dueDate],
        ["Bidding Price Start", formatRupiah(auction.startPrice.toString())],
        ["Bidding Price Higher", formatRupiah(auction.lastPrice.toString())],
        ["Kelipatan Bid", auction.multiply],
        ["Kategori", auction.category],
    ];

    const onRefresh = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 2000);
        });
    };

    return (
        <PullToRefresh onRefresh={onRefresh}>
            <ScreenLayout className={className}>
                <CarouselImage imagesUrl={[
                    "https://cdn1-production-images-kly.akamaized.net/NX24SOQVa3oQ4q0wHe2X-pOfhA0=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4607218/original/083109200_1697021875-PS5_versi_2023.jpg",
                    "https://cdn1-production-images-kly.akamaized.net/NX24SOQVa3oQ4q0wHe2X-pOfhA0=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4607218/original/083109200_1697021875-PS5_versi_2023.jpg",
                    "https://cdn1-production-images-kly.akamaized.net/NX24SOQVa3oQ4q0wHe2X-pOfhA0=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4607218/original/083109200_1697021875-PS5_versi_2023.jpg",
                    "https://cdn1-production-images-kly.akamaized.net/NX24SOQVa3oQ4q0wHe2X-pOfhA0=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4607218/original/083109200_1697021875-PS5_versi_2023.jpg",
                    "https://cdn1-production-images-kly.akamaized.net/NX24SOQVa3oQ4q0wHe2X-pOfhA0=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4607218/original/083109200_1697021875-PS5_versi_2023.jpg",

                ]} />
                <Heading bold size={"xl"}>{auction.productName}</Heading>
                <Box className="flex-row justify-between mb-4">
                    <Text
                        className="text-primary-500 text-2xl font-bold mt-2">{formatRupiah(auction.lastPrice.toString())}</Text>
                    {handleInitialBid && (
                        <Button onPress={handleInitialBid}>
                            <Text className={"text-white"}>Bid Sekarang</Text>
                        </Button>
                    )}
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

                {/*Bidding Status Section */}
                {
                    handleAdditionalBid && (
                        <Box className={cn(
                            myDummyPrice < auction.lastPrice ? "border-red-500" : "border-primary-500",
                            "border rounded-md p-2 py-5 mb-4 gap-y-1.5",
                        )}>
                            <Text className={cn(
                                myDummyPrice < auction.lastPrice ? "text-red-500" : "text-primary-500",
                                "text-center font-bold text-xl",
                            )}>
                                {
                                    myDummyPrice < auction.lastPrice ? "Bidding Lose" : "Anda yang tertinggi"
                                }
                            </Text>
                            <Text
                                className={cn(
                                    myDummyPrice < auction.lastPrice ? "text-red-500" : "text-primary-500",
                                    "text-center font-bold text-2xl",
                                )}
                            >
                                {formatRupiah(myDummyPrice.toString())}
                            </Text>
                            {
                                myDummyPrice < auction.lastPrice && (
                                    <Box className="flex-row justify-around mt-2">
                                        <Button onPress={handleAdditionalBid}>
                                            <Text className="text-white font-bold">Tambah</Text>
                                        </Button>
                                        <Button variant="outline">
                                            <Text className="text-primary-500 font-bold">Refund</Text>
                                        </Button>
                                    </Box>
                                )
                            }
                        </Box>
                    )
                }

                {/* Table Section */}
                <Box className="border border-gray-300 rounded-md mb-4">
                    {tableAuction.map(([key, value], index) => (
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
            </ScreenLayout>
        </PullToRefresh>
    );
}