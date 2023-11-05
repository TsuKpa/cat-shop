export interface ITask {
    id: number;
    status: Status;
    content: string;
}

export enum Status {
    DOING = 'DOING',
    COMPLETED = 'COMPLETED',
}

export type onChangeStatusType = (checked: boolean | null, id: number, isDeleted?: boolean) => void;
