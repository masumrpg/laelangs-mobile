import { useQuery, useMutation, UseQueryOptions, UseQueryResult, UseMutationOptions } from "@tanstack/react-query";
import { auctionService } from "@/service/auctionService";
import { AxiosError } from "axios";
import { Auction } from "@/feature/auction/schema";
import { CommonResponse } from "@/shared/schema";

export const useAuctions = (
    options?: UseQueryOptions<CommonResponse<Auction[]>, AxiosError>,
): UseQueryResult<CommonResponse<Auction[]>, AxiosError> => {
    return useQuery<CommonResponse<Auction[]>, AxiosError>({
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

export const useCreateBid = (
    options?: UseMutationOptions<CommonResponse<any>, AxiosError, { id: string; bidAmount: number }>,
) => {
    return useMutation({
            mutationKey: ["auctions", "bid"],
            mutationFn: async ({ id, bidAmount }) => await auctionService.createBid(id, { bidAmount }),
            ...options,
        },
    );
};
