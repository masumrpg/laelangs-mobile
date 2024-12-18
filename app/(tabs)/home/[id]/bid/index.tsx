import React, { useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import Loader from "@/components/Loader";
import BidPayScreen from "@/feature/auction/components/BidPayScreen";
import { useAuction, useBidMe, useCreateBid, useCreateBidMe } from "@/feature/auction/hooks/useAuctions";
import { useAddresses, useUserProfile } from "@/feature/profile/hooks/useProfiles";
import { BidSchema } from "@/feature/auction/schema";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useQueryClient } from "@tanstack/react-query";
import { CommonResponse } from "@/shared/schema";
import { Bid } from "@/feature/auction/type";
import { useAuth } from "@/shared/contex/AuthContex";
import { getStorageData, setStorageData } from "@/lib/asyncStorageUtils";

export default function Index() {
    const router = useRouter();
    const { id: auctionIdParam } = useLocalSearchParams();

    const { authData } = useAuth();

    const { data: auction, isLoading } = useAuction(auctionIdParam as string);
    const { data: myBid, isLoading: isBidLoading, refetch: myBidRefetch } = useBidMe(auctionIdParam as string);
    const { mutate: mutateSecondBid, isPending: isSecondBidLoading } = useCreateBidMe();
    const { data: addresses, isLoading: isAddressesLoading, error } = useAddresses();
    const { data: userProfile, isLoading: isUserProfileLoading } = useUserProfile();
    const { mutate, isPending } = useCreateBid();

    const [isRedirecting, setIsRedirecting] = useState(false);


    useEffect(() => {
        async function getDataPayment() {
            const alreadyPaymentNotPay: Bid = await getStorageData(auctionIdParam as string);
            if (alreadyPaymentNotPay?.paymentUrl && !myBid?.data?.totalBid) {
                router.replace(`/home/${auctionIdParam}/bid/${alreadyPaymentNotPay.paymentId}`);
            }
        }

        getDataPayment();
    }, [auctionIdParam, myBid?.data?.totalBid, router]);

    useEffect(() => {
        if (!userProfile?.data) {
            setIsRedirecting(true);
            router.replace("/profile");
        }
    }, [router, userProfile?.data]);

    if (isRedirecting || isAddressesLoading || isBidLoading || isLoading) return <Loader />;
    if (!auction?.data || !authData?.userId) return <Loader />;

    const onRefresh = async () => {
        await myBidRefetch();
    };

    const handleBid = (data: BidSchema) => {
        if (!myBid?.data?.totalBid) {
            mutate({ auctionId: auctionIdParam as string, payload: data }, {
                onSuccess: async (result) => {
                    await myBidRefetch();
                    if (result?.data?.paymentUrl) {
                        await setStorageData(auctionIdParam as string, result.data);
                        router.replace(`/home/${auctionIdParam}/bid/${result.data.paymentId}`);
                    }
                    alert("Berhasil melakukan bid");
                },
                onError: (error) => {
                    alert("Gagal melakukan bid");
                },
            });
        } else {
            const { bidAmount } = data;
            const scondBidData = {
                bidAmount: bidAmount - myBid?.data?.totalBid,
                userId: authData?.userId,
            };

            mutateSecondBid({ auctionId: auctionIdParam as string, payload: scondBidData }, {
                onSuccess: async (result) => {
                    await myBidRefetch();
                    if (result?.data?.paymentUrl) {
                        await setStorageData(auctionIdParam as string, result.data);
                        router.replace(`/home/${auctionIdParam}/bid/${result.data.paymentId}`);
                    }
                    alert("Berhasil menambah bid");
                },
                onError: (error) => {
                    alert("Gagal melakukan bid");
                },
            });
        }
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
