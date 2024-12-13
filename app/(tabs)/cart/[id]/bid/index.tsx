import { useLocalSearchParams } from "expo-router";
import { useAuction } from "@/feature/auction/hooks/useAuctions";
import Loader from "@/components/Loader";
import BidPayScreen from "@/feature/auction/components/BidPayScreen";
import React from "react";

export default function Index() {
    const { id } = useLocalSearchParams();
    const { data: auction, isLoading } = useAuction(id as string);

    if (isLoading || !auction) return <Loader />;


    return <BidPayScreen auction={auction} />;
}