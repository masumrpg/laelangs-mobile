import { useLocalSearchParams, useRouter } from "expo-router";
import BidDetailScreen from "@/feature/auction/components/BidDetailScreen";
import { useAuction, useBidMe, useGetAllMyBidAuctions } from "@/feature/auction/hooks/useAuctions";
import Loader from "@/components/Loader";
import React from "react";

export default function Index() {
    const router = useRouter();
    const { id: auctionIdParam } = useLocalSearchParams();

    const {
        data: auction,
        isLoading: isAuctionLoading,
        refetch: auctionRefetch,
    } = useAuction(auctionIdParam as string);

    const { data: bid, isLoading: isBidLoading, refetch: bidRefetch } = useBidMe(auctionIdParam as string);

    if (isBidLoading) return <Loader />;
    if (isAuctionLoading || !auction?.data) return <Loader />;

    const handleAdditionalBid = () => {
        router.push(`/cart/${auctionIdParam}/bid`);
    };

    const handleRefresh = async () => {
        await auctionRefetch();
        await bidRefetch();
    };

    return (
        <BidDetailScreen
            auction={auction.data}
            handleAdditionalBid={handleAdditionalBid}
            userBid={bid?.data}
            handleRefresh={handleRefresh}
        />
    );
}