import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader";
import BidPayScreen from "@/feature/auction/components/BidPayScreen";
import { useAuction, useBidMe, useCreateBid } from "@/feature/auction/hooks/useAuctions";
import { useAddresses, useUserProfile } from "@/feature/profile/hooks/useProfiles";
import { BidSchema } from "@/feature/auction/schema";

export default function Index() {
    const router = useRouter();
    const { id: auctionIdParam } = useLocalSearchParams();

    const { data: auction, isLoading } = useAuction(auctionIdParam as string);
    const { data: bid, isLoading: isBidLoading, refetch: myBidRefetch } = useBidMe(auctionIdParam as string);
    const { data: addresses, isLoading: isAddressesLoading, error } = useAddresses();
    const { data: userProfile, isLoading: isUserProfileLoading } = useUserProfile();
    const { mutate } = useCreateBid();

    const [isRedirecting, setIsRedirecting] = useState(false);

    // useEffect(() => {
    // }, [isUserProfileLoading, router, userProfile, userProfile?.data]);

    if (isRedirecting || isAddressesLoading || isBidLoading || isLoading) return <Loader />;
    if (!auction?.data) return <Loader />;

    if (!userProfile?.data) {
        setIsRedirecting(true);
        router.replace("/profile");
    }

    console.log(bid);
    console.log(error);

    const onRefresh = async () => {
        await myBidRefetch();
        await onRefresh();
    };

    const handleBid = (data: BidSchema) => {
        mutate({ auctionId: auctionIdParam as string, payload: data }, {
            onSuccess: async (data) => {
                await myBidRefetch();
                console.log(data);
                alert("Berhasil melakukan bid");
            },
            onError: (error) => {
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
            onRefresh={onRefresh}
        />
    );
}
