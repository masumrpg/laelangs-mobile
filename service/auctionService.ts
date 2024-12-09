import axios from "axios";
import { Auction } from "@/feature/main/schema";

const BASE_API_MENU = "https://6755c33011ce847c992b14af.mockapi.io/api/v1/auctions";

export const auctionService = {
    async getAll() {
        try {
            const { data } = await axios.get<Auction[]>(BASE_API_MENU);
            return data;
        } catch (error) {
            console.error("Failed to getAll Auction", error);
            throw new Error("Failed to getAll Auction, please try again");
        }
    },
    async getOne(id: string) {
        try {
            const { data } = await axios.get<Auction>(`${BASE_API_MENU}/${id}`);
            return data;
        } catch (error) {
            console.error("Failed to get One Auction", error);
            throw new Error("Failed to getOne Auction, please try again");
        }
    },
};