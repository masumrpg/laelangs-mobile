import { WebView } from "react-native-webview";
import React, { useEffect, useState } from "react";
import { Redirect, router, useLocalSearchParams, useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { Bid } from "@/feature/auction/type";
import Loader from "@/components/Loader";
import ScreenLayout from "@/components/ScreenLayout";
import { getStorageData } from "@/lib/asyncStorageUtils";

export default function Index() {
    const [paymentUrl, setPaymentUrl] = useState<string>("");
    const { id: auctionId } = useLocalSearchParams();

    useEffect(() => {
        async function getDataPayment() {
            const alreadyPaymentNotPay: Bid = await getStorageData(auctionId as string);
            setPaymentUrl(alreadyPaymentNotPay?.paymentUrl);
            if (!alreadyPaymentNotPay?.paymentUrl) {
                router.replace(`/home/${auctionId}/bid`);
            }
        }

        getDataPayment();
    }, [auctionId]);

    return (
        <ScreenLayout className="pt-28 px-0 pb-0">
            <WebView
                style={{ flex: 1 }}
                source={{ uri: paymentUrl }}
            />
        </ScreenLayout>
    );
}
