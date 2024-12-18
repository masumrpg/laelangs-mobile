import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn, formatDateToIndonesian, formatRupiah } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";
import { Auction, AuctionStatus, ProductCategory, UserBidSummary } from "@/feature/auction/type";
import CarouselImage from "@/components/CarouselImage";
import PullToRefresh from "@/components/PullToRefresh";
import ScreenLayout from "@/components/ScreenLayout";
import {
    Accordion, AccordionContent, AccordionContentText,
    AccordionHeader, AccordionIcon,
    AccordionItem,
    AccordionTitleText,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MinusIcon, PlusIcon } from "lucide-react-native";

interface BidScreenProps {
    auction: Auction;
    userBid?: UserBidSummary;
    className?: string;
    handleInitialBid?: () => void;
    handleAdditionalBid?: () => void;
    handleRefresh?: () => void;
}

export default function BidDetailScreen({
                                            auction,
                                            userBid,
                                            className,
                                            handleInitialBid,
                                            handleAdditionalBid,
                                            handleRefresh,
                                        }: BidScreenProps) {
    const tableAuction = [
        ["Status", AuctionStatus.toLabel(auction.auctionStatus)],
        ["Bidding Start", formatDateToIndonesian(auction.startDate)],
        ["Bidding End", formatDateToIndonesian(auction.dueDate)],
        ["Bidding Price Start", formatRupiah(auction.startPrice.toString())],
        ["Bidding Price Higher", formatRupiah(auction.lastPrice.toString())],
        ["Kelipatan Bid", formatRupiah(auction.multiply.toString())],
        ["Kategori", ProductCategory.toLabel(auction.product.productCategory)],
    ];

    const onRefresh = async () => {
        if (handleRefresh) handleRefresh();
    };


    return (
        <PullToRefresh onRefresh={onRefresh}>
            <ScreenLayout className={cn(className)}>
                <CarouselImage images={auction.product.images} />
                <Heading bold size={"xl"}>{auction.product.productName}</Heading>
                <Box className="flex-row justify-between mb-4">
                    <Text
                        className="text-primary-500 text-2xl font-bold mt-2">{formatRupiah(auction.lastPrice.toString())}</Text>
                    {handleInitialBid && (userBid === null || undefined) && (
                        <Button onPress={handleInitialBid}>
                            <Text className={"text-white"}>Bid Sekarang</Text>
                        </Button>
                    )}
                </Box>

                {/* Title Section */}
                <Accordion variant="unfilled" className="my-3">
                    <AccordionItem value="item-1">
                        <AccordionHeader>
                            <AccordionTrigger>
                                {({ isExpanded }) => {
                                    return (
                                        <>
                                            <AccordionTitleText>
                                                Bid Barang Kesukaanmu Sekarang!
                                            </AccordionTitleText>
                                            {isExpanded ? (
                                                <AccordionIcon as={MinusIcon} />
                                            ) : (
                                                <AccordionIcon as={PlusIcon} />
                                            )}
                                        </>
                                    );
                                }}
                            </AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                            <AccordionContentText>
                                Temukan berbagai barang menarik yang bisa kamu miliki dengan harga terbaik!
                                Segera ikuti lelang dan bid barang impianmu sebelum orang lain melakukannya.
                                Jangan lewatkan kesempatan untuk mendapatkan barang berkualitas dengan harga terjangkau.
                            </AccordionContentText>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                {/* Bidding Status Section */}
                {
                    handleAdditionalBid && userBid && (
                        <Box className={cn(
                            userBid.totalBid < auction.lastPrice ? "border-red-500" : "border-primary-500",
                            "border rounded-md p-2 py-5 mb-4 gap-y-1.5",
                        )}>
                            <Text className={cn(
                                userBid.totalBid < auction.lastPrice ? "text-red-500" : "text-primary-500",
                                "text-center font-bold text-xl",
                            )}>
                                {
                                    userBid.totalBid < auction.lastPrice ? "Bidding Lose" : "Anda yang tertinggi"
                                }
                            </Text>
                            <Text
                                className={cn(
                                    userBid.totalBid < auction.lastPrice ? "text-red-500" : "text-primary-500",
                                    "text-center font-bold text-2xl",
                                )}
                            >
                                {formatRupiah(userBid.totalBid.toString())}
                            </Text>
                            {
                                userBid.totalBid < auction.lastPrice && (
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

                {/* Pelelang Information Section */}
                {/*<Box className="border border-gray-300 rounded-md mb-4 p-4">*/}
                {/*    <Heading size="lg" className="mb-2">Informasi Pelelang</Heading>*/}
                {/*    <Box className="flex-row justify-between mb-2">*/}
                {/*        <Text className="text-gray-600">Nama Pelelang</Text>*/}
                {/*        <Text className="font-medium">Joko</Text>*/}
                {/*    </Box>*/}
                {/*    <Box className="flex-row justify-between mb-2">*/}
                {/*        <Text className="text-gray-600">Kontak</Text>*/}
                {/*        <Text className="font-medium">Kontak</Text>*/}
                {/*    </Box>*/}
                {/*    <Box className="flex-row justify-between">*/}
                {/*        <Text className="text-gray-600">Alamat</Text>*/}
                {/*        <Text className="font-medium">Alamat Seler</Text>*/}
                {/*    </Box>*/}
                {/*</Box>*/}

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
