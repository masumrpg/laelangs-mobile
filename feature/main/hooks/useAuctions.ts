import { useQuery, useMutation, UseQueryOptions, UseQueryResult, UseMutationOptions } from "@tanstack/react-query";
import { auctionService } from "@/service/auctionService";
import { AxiosError } from "axios";
import { Auction } from "@/feature/main/schema";
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

// export const useUpdateAuction = (
//     options?: UseMutationOptions<void, AxiosError, { id: string; data: Partial<Auction> }>,
// ) => {
//     return useMutation(async ({ id, data }) => {
//         await auctionService.update(id, data);
//     }, options);
// };
//
// export const useDeleteAuction = (
//     options?: UseMutationOptions<void, AxiosError, string>,
// ) => {
//     return useMutation(async (id) => {
//         await auctionService.delete(id);
//     }, options);
// };
