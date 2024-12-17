import { Auction, Bid, UserBidSummary } from "@/feature/auction/type";
import httpClient from "@/lib/api";
import { CommonResponse, PagingResponse } from "@/shared/schema";
import { BidSchema } from "@/feature/auction/schema";

export const auctionService = {
    async getAll(params?: {
        page?: number;
        size?: number;
        sortBy?: string;
        query?: string;
        minPrice?: number;
        maxPrice?: number;
        category?: string;
        dueDate?: string;
    }) {
        const { data } = await httpClient.get<PagingResponse<Auction[]>>("/auctions", { params });
        return data;
    },
    async getAllMyAuction() {
        const { data } = await httpClient.get<PagingResponse<any[]>>("/auctions/bid/me");
        return data;
    },
    async getOne(id: string) {
        const { data } = await httpClient.get<CommonResponse<Auction>>("/auctions/" + id);
        return data;
    },
    async getBidMe(id: string) {
        const { data } = await httpClient.get<CommonResponse<UserBidSummary>>(`/auctions/${id}/bid/me`);
        return data;
    },
    async createBid(id: string, payload: BidSchema) {
        const { data } = await httpClient.post<CommonResponse<Bid>>(`/auctions/${id}/bid`, payload);
        return data;
    },
};