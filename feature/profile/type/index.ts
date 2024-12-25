export type ProfileAddressesResponse = {
    id: string;
    address: string;
    province: string;
    city: string;
    district: string;
    zipCode: string;
    receiverName: string;
    phoneNumber: string;
}

export type UserProfile = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: number;
    birthDate: string;
    image: {
        id: string;
        url: string;
    };
}