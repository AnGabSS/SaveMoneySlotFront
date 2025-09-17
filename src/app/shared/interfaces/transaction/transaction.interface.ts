export interface Transaction {
    id: number;
    description: string;
    value: number;
    category: string;
    createdAt: Date;
    user: String;
}