import React from "react";
import { useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader";
import BidPayScreen from "@/feature/auction/components/BidPayScreen";
import { useAuction, useBid, useCreateBid } from "@/feature/auction/hooks/useAuctions";
import { useAddresses } from "@/feature/profile/hooks/useProfiles";
import { BidSchema } from "@/feature/auction/schema";


export default function Index() {
    const { id: auctionIdParam } = useLocalSearchParams();

    const { data: auction, isLoading } = useAuction(auctionIdParam as string);
    const { data: bid, isLoading: isBidLoading } = useBid(auctionIdParam as string);
    const { data: addresses, isLoading: isAddressesLoading } = useAddresses();

    const { mutate, data } = useCreateBid();

    if (isAddressesLoading) return <Loader />;
    if (isBidLoading) return <Loader />;
    if (isLoading || !auction?.data) return <Loader />;

    const handleBid = (data: BidSchema) => {
        mutate({ auctionId: auctionIdParam as string, payload: data });
    };
    console.log(data);

    return <BidPayScreen
        auction={auction.data}
        userBid={bid?.data}
        userAddresses={addresses?.data}
        handleBid={handleBid}
    />;
}