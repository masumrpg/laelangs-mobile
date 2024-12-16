import { useMutation, UseMutationOptions, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { auctionService } from "@/service/auctionService";
import { AxiosError } from "axios";
import { Auction, UserBidSummary } from "@/feature/auction/type";
import { CommonResponse, PagingResponse } from "@/shared/schema";
import { BidSchema } from "@/feature/auction/schema";

export const useAuctions = (
    params?: {
        page?: number;
        size?: number;
        sortBy?: string;
        q?: string;
        minPrice?: number;
        maxPrice?: number;
        category?: string;
        dueDate?: string;
    },
    options?: UseQueryOptions<PagingResponse<Auction[]>, AxiosError>,
): UseQueryResult<PagingResponse<Auction[]>, AxiosError> => {
    return useQuery<PagingResponse<Auction[]>, AxiosError>({
        queryKey: ["auctions", params],
        queryFn: async () => {
            return await auctionService.getAll(params);
        },
        ...options,
    });
};

export const useAuction = (
    id: string,
    options?: UseQueryOptions<CommonResponse<Auction>, AxiosError>,
): UseQueryResult<CommonResponse<Auction>, AxiosError> => {
    return useQuery<CommonResponse<Auction>, AxiosError>({
        queryKey: ["auctions", id],
        queryFn: async () => await auctionService.getOne(id),
        ...options,
    });
};

export const useBidMe = (
    auctionId: string,
    options?: UseQueryOptions<CommonResponse<UserBidSummary>, AxiosError>,
): UseQueryResult<CommonResponse<UserBidSummary>, AxiosError> => {
    return useQuery<CommonResponse<UserBidSummary>, AxiosError>({
        queryKey: ["auctions", "bid", auctionId],
        queryFn: async () => await auctionService.getBidMe(auctionId),
        ...options,
    });
};

export const useCreateBid = (
    options?: UseMutationOptions<CommonResponse<any>, AxiosError, { auctionId: string; payload: BidSchema }>,
) => {
    return useMutation({
            mutationKey: ["auctions", "bid"],
            mutationFn: async ({ auctionId, payload }) => await auctionService.createBid(auctionId, payload),
            ...options,
        },
    );
};

