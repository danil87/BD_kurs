export interface IUser {
    id?: number;
    username: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    is_superuser?: boolean;
    token: string;
}

export type User = {
    username: string;
    password: string;
}