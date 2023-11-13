export interface Bill {
    id: number;
    time: number;
    itemName: string;
    userId: number;
    amount: number;
}

export type BillCreateForm = Omit<Bill, 'id' | 'time'>;
