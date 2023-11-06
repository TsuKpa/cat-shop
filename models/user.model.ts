export interface User {
    id: string;
    email: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted: boolean;
}

export type UserCreate = Omit<User, 'createdAt' | 'updatedAt'>;
export type UserUpdate = Partial<User>;
