import { Auction, UserBidSummary } from "@/feature/auction/type";
import httpClient from "@/lib/api";
import { CommonResponse, PagingResponse } from "@/shared/schema";
import { BidSchema } from "@/feature/auction/schema";

export const auctionService = {
    async getAll() {
        try {
            const { data } = await httpClient.get<PagingResponse<Auction[]>>("/auctions");
            return data;
        } catch (error) {
            console.error("Failed to getAll Auction", error);
            throw new Error("Failed to getAll Auction, please try again");
        }
    },
    async getOne(id: string) {
        try {
            const { data } = await httpClient.get<CommonResponse<Auction>>("/auctions/" + id);
            return data;
        } catch (error) {
            console.error("Failed to get One Auction", error);
            throw new Error("Failed to getOne Auction, please try again");
        }
    },
    async getBid(id: string) {
        const { data } = await httpClient.get<CommonResponse<UserBidSummary>>(`/auctions/${id}/bid/me`);
        return data;
    },
    async createBid(id: string, payload: BidSchema) {
        try {
            console.log(id, payload);
            const { data } = await httpClient.post<CommonResponse<any>>(`/auctions/${id}/bid`, payload);
            console.log(data);
            return data;
        } catch (error) {
            console.error("Failed to create Bid", error);
            throw new Error("Failed to create Bid, please try again");
        }
    },
};