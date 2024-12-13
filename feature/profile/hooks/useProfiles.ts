import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { CommonResponse } from "@/shared/schema";
import { AxiosError } from "axios";
import { ProfileAddressesResponse } from "@/feature/profile/type";
import { profileService } from "@/service/profileService";

export const useAddresses = (
    options?: UseQueryOptions<CommonResponse<ProfileAddressesResponse[]>, AxiosError>,
): UseQueryResult<CommonResponse<ProfileAddressesResponse[]>, AxiosError> => {
    return useQuery<CommonResponse<ProfileAddressesResponse[]>, AxiosError>({
        queryKey: ["addresses"],
        queryFn: async () => await profileService.getAllAddress(),
        ...options,
    });
};

export const useAddress = (
    id: string,
    options?: UseQueryOptions<CommonResponse<ProfileAddressesResponse>, AxiosError>,
): UseQueryResult<CommonResponse<ProfileAddressesResponse>, AxiosError> => {
    return useQuery<CommonResponse<ProfileAddressesResponse>, AxiosError>({
        queryKey: ["addresses", id],
        queryFn: async () => await profileService.getAddress(id),
        ...options,
    });
};