import { WebView } from "react-native-webview";
import React, { useEffect } from "react";
import { Redirect, router, useLocalSearchParams, useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { Bid } from "@/feature/auction/type";
import Loader from "@/components/Loader";
import { CommonResponse } from "@/shared/schema";
import ScreenLayout from "@/components/ScreenLayout";

export default function Index() {
    const queryClient = useQueryClient();
    const { id: auctionId } = useLocalSearchParams();

    const paymentData = queryClient.getQueryData<CommonResponse<Bid>>(["payment", auctionId]);

    if (!paymentData?.data) return <Loader />;

    return (
        <ScreenLayout className="pt-28 px-0 pb-0">
            <WebView
                style={{ flex: 1 }}
                source={{ uri: paymentData.data.paymentUrl }}
            />
        </ScreenLayout>
    );
}
