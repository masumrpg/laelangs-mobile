import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { PagingResponse } from "@/shared/schema";
import { AxiosError } from "axios";
import { Bank, Category } from "@/feature/config/type";
import { configService } from "@/service/configService";

export const useBanks = (
    options?: UseQueryOptions<PagingResponse<Bank[]>, AxiosError>,
): UseQueryResult<PagingResponse<Bank[]>, AxiosError> => {
    return useQuery<PagingResponse<Bank[]>, AxiosError>({
        queryKey: ["config", "banks"],
        queryFn: async () => await configService.getAllBanks(),
        ...options,
    });
};

export const useCategories = (
    options?: UseQueryOptions<PagingResponse<Category[]>, AxiosError>,
): UseQueryResult<PagingResponse<Category[]>, AxiosError> => {
    return useQuery<PagingResponse<Category[]>, AxiosError>({
        queryKey: ["config", "banks"],
        queryFn: async () => await configService.getAllCategories(),
        ...options,
    });
};