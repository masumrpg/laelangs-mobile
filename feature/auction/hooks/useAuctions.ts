import { useQuery, useMutation, UseQueryOptions, UseQueryResult, UseMutationOptions } from "@tanstack/react-query";
import { auctionService } from "@/service/auctionService";
import { AxiosError } from "axios";
import { Auction, UserBidSummary } from "@/feature/auction/type";
import { CommonResponse, PagingResponse } from "@/shared/schema";
import { BidSchema } from "@/feature/auction/schema";

export const useAuctions = (
    options?: UseQueryOptions<PagingResponse<Auction[]>, AxiosError>,
): UseQueryResult<PagingResponse<Auction[]>, AxiosError> => {
    return useQuery<PagingResponse<Auction[]>, AxiosError>({
        queryKey: ["auctions"],
        queryFn: async () => await auctionService.getAll(),
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

export const useBid = (
    auctionId: string,
    options?: UseQueryOptions<CommonResponse<UserBidSummary>, AxiosError>,
): UseQueryResult<CommonResponse<UserBidSummary>, AxiosError> => {
    return useQuery<CommonResponse<UserBidSummary>, AxiosError>({
        queryKey: ["auctions", "bid", auctionId],
        queryFn: async () => await auctionService.getBid(auctionId),
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

