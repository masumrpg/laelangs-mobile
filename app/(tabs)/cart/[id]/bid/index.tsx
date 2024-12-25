import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuction, useBidMe, useCreateBid } from "@/feature/auction/hooks/useAuctions";
import Loader from "@/components/Loader";
import BidPayScreen from "@/feature/auction/components/BidPayScreen";
import React, { useEffect, useState } from "react";
import { useAddresses, useUserProfile } from "@/feature/profile/hooks/useProfiles";
import { BidSchema } from "@/feature/auction/schema";

export default function Index() {
    const router = useRouter();
    const { id: auctionIdParam } = useLocalSearchParams();

    const { data: auction, isLoading } = useAuction(auctionIdParam as string);
    const { data: bid, isLoading: isBidLoading } = useBidMe(auctionIdParam as string);
    const { data: addresses, isLoading: isAddressesLoading } = useAddresses();
    const { data: userProfile, isLoading: isUserProfileLoading } = useUserProfile();
    const { mutate } = useCreateBid();

    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (!isUserProfileLoading && !userProfile) {
            setIsRedirecting(true);
            router.replace("/profile");
        }
    }, [isUserProfileLoading, router, userProfile, userProfile?.data]);

    if (isRedirecting || isAddressesLoading || isBidLoading || isLoading) return <Loader />;
    if (!auction?.data) return <Loader />;

    const handleBid = (data: BidSchema) => {
        mutate({ auctionId: auctionIdParam as string, payload: data }, {
            onSuccess: () => {
                alert("Berhasil melakukan bid");
            },
            onError: () => {
                alert("Gagal melakukan bid");
            },
        });
    };

    return (
        <BidPayScreen
            auction={auction.data}
            userBid={bid?.data}
            userAddresses={addresses?.data}
            handleBid={handleBid}
        />
    );
}