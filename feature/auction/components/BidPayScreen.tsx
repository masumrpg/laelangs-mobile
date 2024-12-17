import { Box } from "@/components/ui/box";
import { cn, formatRupiah } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Auction, UserBidSummary } from "@/feature/auction/type";
import PullToRefresh from "@/components/PullToRefresh";
import ScreenLayout from "@/components/ScreenLayout";
import { Text } from "react-native";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectBackdrop,
    SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper,
    SelectInput, SelectItem,
    SelectPortal, SelectSectionHeaderText,
    SelectTrigger,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react-native";
import { ProfileAddressesResponse } from "@/feature/profile/type";
import { BidSchema } from "@/feature/auction/schema";
import { useAuth } from "@/shared/contex/AuthContex";
import AddressForm from "@/feature/profile/components/AddressForm";

interface BidPayScreenProps {
    auction: Auction;
    userBid?: UserBidSummary;
    userAddresses?: ProfileAddressesResponse[];
    className?: string;
    handleBid: (data: BidSchema) => void;
    onRefresh?: () => void;
    isButtonDisabled?: boolean;
}


export default function BidPayScreen(
    {
        auction,
        userBid,
        userAddresses,
        className,
        handleBid,
        onRefresh,
        isButtonDisabled,
    }: BidPayScreenProps) {
    const [availableBid, setAvailableBid] = useState<number>(auction.lastPrice + auction.multiply);
    const [bidData, setBidData] = useState<BidSchema>();
    const [selectedAddress, setSelectedAddress] = useState<string>("");
    const [selectedCourier, setSelectedCourier] = useState<string>("");
    const [isNotReadyToBid, setIsNotReadyToBid] = useState(true);

    const { authData } = useAuth();
    const courierList = ["jne"];


    const userAddress = userAddresses?.find(address => address.id === selectedAddress);


    useEffect(() => {
        if (selectedAddress !== "" && selectedCourier !== "" && authData?.userId && userAddress) {
            setBidData({
                courier: selectedCourier,
                bidAmount: availableBid,
                addressId: selectedAddress,
            });
            setIsNotReadyToBid(false);
        }
    }, [authData?.userId, availableBid, selectedAddress, selectedCourier, userAddress]);
    

    const addBid = () => {
        setAvailableBid((prevState) => prevState + auction.multiply);
    };

    const decreaseBid = () => {
        setAvailableBid((prevState) => prevState - auction.multiply);
    };

    const handleSubmit = () => {
        if (bidData) {
            handleBid(bidData);
        }
    };

    const handleRefresh = async () => {
        if (onRefresh) onRefresh();
    };


    return (
        <ScreenLayout className={className}>
            <PullToRefresh onRefresh={handleRefresh}>
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
                        Bid Sekarang
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

                    {
                        userBid &&
                        (
                            <Badge
                                action={userBid.totalBid < auction.lastPrice ? "error" : "success"}
                                size={"lg"} className={"flex-row justify-center items-center rounded-lg"}>
                                <Text className={"text-center"}>Bid anda </Text>
                                <Text
                                    className={cn(
                                        "text-center",
                                    )}
                                >{userBid.totalBid < auction.lastPrice ? "kalah " : "menang "}</Text>
                                <Text
                                    className={cn(
                                        userBid.totalBid < auction.lastPrice ? "text-red-500" : "text-primary-500",
                                        "text-center",
                                    )}
                                >{formatRupiah(userBid.totalBid.toString())}</Text>
                            </Badge>
                        )
                    }

                    {/* Courier */}
                    <Box className="flex-col">
                        <Heading bold className="text-gray-500 mb-3">
                            Nama Kurir
                        </Heading>
                        <Divider className="my-0.5" />
                        <Box className="flex-col gap-y-2">
                            <Select onValueChange={value => setSelectedCourier(value)}>
                                <SelectTrigger className={"w-48 items-center mb-4 border-transparent"}>
                                    <SelectInput
                                        className={"h-20 placeholder:text-black"}
                                        textContentType={"name"}
                                        placeholder={"Pilih Kurir"}
                                    />
                                    <ChevronDown size={16} color="black" />
                                </SelectTrigger>
                                <SelectPortal>
                                    <SelectBackdrop />
                                    <SelectContent>
                                        <SelectDragIndicatorWrapper>
                                            <SelectDragIndicator />
                                        </SelectDragIndicatorWrapper>
                                        <SelectSectionHeaderText
                                            className="text-gray-600 font-bold text-center text-xl">Pilih
                                            Kurir</SelectSectionHeaderText>
                                        {
                                            courierList.map((courier, index) => (
                                                <SelectItem key={index} label={courier.toUpperCase()} value={courier} />
                                            ))
                                        }
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                        </Box>
                    </Box>

                    {/* Addressess */}
                    <Box className="flex-col mb-4">
                        <Heading bold className="text-gray-500 mb-3">
                            Pilih Alamat
                        </Heading>
                        <Divider className="my-0.5" />
                        {
                            userAddresses?.length !== 0 ?
                                (
                                    <Box className="flex-col gap-y-2">
                                        <Select onValueChange={value => setSelectedAddress(value)}>
                                            <SelectTrigger className={"w-48 items-center mb-4 border-transparent"}>
                                                <SelectInput
                                                    className={"h-20 placeholder:text-black"}
                                                    textContentType={"name"}
                                                    placeholder={"Pilih Alamat"}
                                                />
                                                <ChevronDown size={16} color="black" />
                                            </SelectTrigger>
                                            <SelectPortal>
                                                <SelectBackdrop />
                                                <SelectContent>
                                                    <SelectDragIndicatorWrapper>
                                                        <SelectDragIndicator />
                                                    </SelectDragIndicatorWrapper>
                                                    <SelectSectionHeaderText
                                                        className="text-gray-600 font-bold text-center text-xl">Pilih
                                                        Alamat</SelectSectionHeaderText>
                                                    {
                                                        userAddresses?.map((address) => (
                                                            <SelectItem key={address.id}
                                                                        label={`${address.address}, ${address.receiverName}`}
                                                                        value={address.id} />
                                                        ))
                                                    }
                                                </SelectContent>
                                            </SelectPortal>
                                        </Select>
                                    </Box>
                                ) : (
                                    <Box className="mt-4">
                                        <AddressForm
                                            buttonText={"Tambah Alamat"} />
                                    </Box>
                                )
                        }
                    </Box>


                    {/* Submit Button */}
                    <Button onPress={handleSubmit} isDisabled={isButtonDisabled || isNotReadyToBid}>
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
            </PullToRefresh>
        </ScreenLayout>
    );
}