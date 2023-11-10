export interface User {
    id: number;
    email: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted: boolean;
}

export type UserCreateForm = Omit<User, 'createdAt' | 'updatedAt'>;
export type UserUpdate = Pick<User, 'name' | 'email'> & { id?: number };
