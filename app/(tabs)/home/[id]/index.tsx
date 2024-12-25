import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Loader from "@/components/Loader";
import BidDetailScreen from "@/feature/auction/components/BidDetailScreen";
import { useAuction, useBidMe } from "@/feature/auction/hooks/useAuctions";

export default function Index() {
    const { id: auctionIdParam } = useLocalSearchParams();
    const router = useRouter();
    const {
        data: auction,
        isLoading: isAuctionLoading,
        refetch: auctionRefetch,
    } = useAuction(auctionIdParam as string);
    const { data: bid, isLoading: isBidLoading, refetch: bidRefetch } = useBidMe(auctionIdParam as string);

    if (isBidLoading) return <Loader />;
    if (isAuctionLoading || !auction?.data) return <Loader />;

    const handleBid = () => {
        router.push(`/home/${auctionIdParam}/bid`);
    };

    const handleAdditionalBid = () => {
        router.push(`/home/${auctionIdParam}/bid`);
    };

    const handleRefresh = async () => {
        await auctionRefetch();
        await bidRefetch();
    };

    return <BidDetailScreen
        auction={auction.data}
        handleInitialBid={handleBid}
        userBid={bid?.data}
        handleAdditionalBid={handleAdditionalBid}
        handleRefresh={handleRefresh}
    />;
};