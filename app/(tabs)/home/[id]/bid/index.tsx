import React from "react";
import { useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader";
import BidPayScreen from "@/feature/auction/components/BidPayScreen";
import { useAuction } from "@/feature/auction/hooks/useAuctions";

export default function Index() {
    const { id } = useLocalSearchParams();
    const { data: auction, isLoading } = useAuction(id as string);

    if (isLoading || !auction?.data) return <Loader />;


    return <BidPayScreen auction={auction.data} />;
}