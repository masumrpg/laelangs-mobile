// enum

import { string } from "zod";

export enum AuctionStatus {
    ONGOING = "ONGOING",
    ENDED = "ENDED",
}

export enum ProductCategory {
    FASHION = "FASHION",
    ELECTRONICS = "ELECTRONICS",
    PHONE = "PHONE",
    COMPUTER = "COMPUTER",
    GADGETS = "GADGETS",
    OTHERS = "OTHERS",
}

// type

export type Product = {
    id: string;
    productName: string;
    description: string;
    productCategory: ProductCategory;
    weight: number;
    images?: [
        {
            id: string;
            url: string;
        }
    ];
}

export type Auction = {
    id: string;
    startDate: string;
    dueDate: string;
    startPrice: number;
    lastPrice: number;
    multiply: number;
    auctionStatus: AuctionStatus;
    bidWinner: string;
    product: Product;
}

export type UserBidSummary = {
    userId: string;
    totalBid: number;
}

// enum function

export namespace AuctionStatus {
    export function toLabel(status: AuctionStatus): string {
        switch (status) {
            case AuctionStatus.ONGOING:
                return "Sedang Berjalan";
            case AuctionStatus.ENDED:
                return "Berakhir";
            default:
                return "Status Tidak Dikenal"; // Fallback jika status tidak dikenali
        }
    }
}

export namespace ProductCategory {
    export function toLabel(category: ProductCategory): string {
        switch (category) {
            case ProductCategory.FASHION:
                return "Fashion";
            case ProductCategory.ELECTRONICS:
                return "Elektronik";
            case ProductCategory.PHONE:
                return "Telepon";
            case ProductCategory.COMPUTER:
                return "Komputer";
            case ProductCategory.GADGETS:
                return "Gadget";
            case ProductCategory.OTHERS:
                return "Lainnya";
            default:
                return "Kategori Tidak Dikenal";
        }
    }
}