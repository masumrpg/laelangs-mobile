export interface BidSchema {
    bidAmount: number;
    userId: string;
    courier: string;
    addressRequest: {
        address: string;
        province: string;
        city: string;
        subDistrict: string;
        ward: string;
        postalCode: string;
        recipientName: string;
        phoneNumber: string;
    };
}