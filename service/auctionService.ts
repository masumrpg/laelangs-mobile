import { Auction } from "@/feature/main/schema";
import httpClient from "@/lib/api";
import { CommonResponse } from "@/shared/schema";

export const auctionService = {
    async getAll() {
        try {
            const { data } = await httpClient.get<CommonResponse<Auction[]>>("/auctions");
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
};