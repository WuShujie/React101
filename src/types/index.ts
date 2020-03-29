export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    gender: string;
    age: number;
    address: string
}

export interface IStoreState {
    users: User[]
}
