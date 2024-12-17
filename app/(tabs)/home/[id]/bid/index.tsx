import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader";
import BidPayScreen from "@/feature/auction/components/BidPayScreen";
import { useAuction, useBidMe, useCreateBid } from "@/feature/auction/hooks/useAuctions";
import { useAddresses, useUserProfile } from "@/feature/profile/hooks/useProfiles";
import { BidSchema } from "@/feature/auction/schema";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useQueryClient } from "@tanstack/react-query";
import { CommonResponse } from "@/shared/schema";
import { Bid } from "@/feature/auction/type";

export default function Index() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { id: auctionIdParam } = useLocalSearchParams();

    const { data: auction, isLoading } = useAuction(auctionIdParam as string);
    const { data: myBid, isLoading: isBidLoading, refetch: myBidRefetch } = useBidMe(auctionIdParam as string);
    const { data: addresses, isLoading: isAddressesLoading, error } = useAddresses();
    const { data: userProfile, isLoading: isUserProfileLoading } = useUserProfile();
    const { mutate, isPending } = useCreateBid();

    const [isRedirecting, setIsRedirecting] = useState(false);

    const alreadyPaymentNotPay = queryClient.getQueryData<CommonResponse<Bid>>(["payment", auctionIdParam]);

    // useEffect(() => {
    // }, [isUserProfileLoading, router, userProfile, userProfile?.data]);

    useEffect(() => {
        console.log(alreadyPaymentNotPay?.data);
        if (alreadyPaymentNotPay?.data && !myBid?.data?.totalBid) {
            router.replace(`/home/${auctionIdParam}/bid/${alreadyPaymentNotPay.data.paymentId}`);
        }
    }, [alreadyPaymentNotPay, auctionIdParam, myBid?.data?.totalBid, router]);

    if (isRedirecting || isAddressesLoading || isBidLoading || isLoading) return <Loader />;
    if (!auction?.data) return <Loader />;

    if (!userProfile?.data) {
        setIsRedirecting(true);
        router.replace("/profile");
    }

    const onRefresh = async () => {
        await myBidRefetch();
        await onRefresh();
    };

    const handleBid = (data: BidSchema) => {
        mutate({ auctionId: auctionIdParam as string, payload: data }, {
            onSuccess: async (result) => {
                await myBidRefetch();
                if (result?.data?.paymentUrl) {
                    queryClient.setQueryData(["payment", auctionIdParam], result);
                    router.replace(`/home/${auctionIdParam}/bid/${result.data.paymentId}`);
                }
                alert("Berhasil melakukan bid");
            },
            onError: (error) => {
                alert("Gagal melakukan bid");
            },
        });
    };


    return (
        <>
            <BidPayScreen
                auction={auction.data}
                userBid={myBid?.data}
                userAddresses={addresses?.data}
                handleBid={handleBid}
                onRefresh={onRefresh}
                isButtonDisabled={isPending}
            />
        </>
    );
}
