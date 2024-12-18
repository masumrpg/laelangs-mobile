export enum TransactionStatus {
    ON_PROCESS = "ON_PROCESS",
    ON_SHIPMENT = "ON_SHIPMENT",
    ARRIVED = "ARRIVED",
    ON_RETURN = "ON_RETURN",
    DONE = "DONE"
}

export type UserAddress = {
    id: string;
    address: string;
    city: string;
    district: string;
    phoneNumber: string;
    province: string;
    receiverName: string;
    zipCode: string;
}

export type Transaction = {
    id: string;
    merchantId: string;
    transationDate: string;
    transactionStatus: TransactionStatus;
    resi: string;
    totalPrice: number;
    productName: string;
    images: [{
        id: string;
        url: string;
    }]
    userId: string;
    userAddress: UserAddress;
}

export namespace TransactionStatus {
    export function toLabel(status: TransactionStatus): string {
        switch (status) {
            case TransactionStatus.ON_PROCESS:
                return "Sedang Diproses";
            case TransactionStatus.ON_SHIPMENT:
                return "Dalam Pengiriman";
            case TransactionStatus.ARRIVED:
                return "Sudah Diterima";
            case TransactionStatus.ON_RETURN:
                return "Sedang Dikembalikan";
            case TransactionStatus.DONE:
                return "Selesai";
            default:
                return "Status Tidak Dikenal";
        }
    }
}