export interface User {
    id: number;
    username: string;
    email:string;
    active: boolean;
    join_date? : string;
    following?: boolean;
}