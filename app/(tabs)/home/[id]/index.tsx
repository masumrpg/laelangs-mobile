import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Loader from "@/components/Loader";
import BidDetailScreen from "@/feature/auction/components/BidDetailScreen";
import { useAuction } from "@/feature/auction/hooks/useAuctions";

export default function Index() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { data: auction, isLoading } = useAuction(id as string);

    if (isLoading || !auction?.data) {
        return <Loader />;
    }

    const handleBid = () => {
        router.push(`/home/${id}/bid`);
    };

    // TODO buat untuk nyocokin bid kita dengan id bid yang diklik
    return <BidDetailScreen auction={auction.data} handleInitialBid={handleBid} />;
};