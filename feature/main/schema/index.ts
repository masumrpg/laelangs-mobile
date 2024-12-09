export type Auction = {
    auctionId: string;
    startDate: string;
    dueDate: string;
    startPrice: number;
    lastPrice: number;
    multiply: number;
    auctionStatus: string;
    bidWinner: string;
    productName: string;
    productDescription: string;
    category: string;
    productImage: string[];
    location: string;
}