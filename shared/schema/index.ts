export type CommonResponse<T> = {
    status: number;
    message: string;
    data?: T;
}

export type PagingResponse<T> = {
    status: number;
    message: string;
    data?: T[];
    paging?: any;
}