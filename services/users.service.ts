import { User, UserUpdate } from '@/models';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class UserService {
    /**
     * @returns List users with no deleted status
     */
    public static async getUserList(): Promise<User[]> {
        const users = await prisma.user.findMany({
            where: {
                isDeleted: false,
            },
            orderBy: { createdAt: 'desc' },
        });
        return users;
    }

    /**
     * @description Create a new user
     */
    public static async createNewUser(user: Pick<UserUpdate, 'email' | 'name'>): Promise<void> {
        await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                isDeleted: false,
            },
        });
    }

    /**
     * @description Update a user
     */
    public static async updateUser(id: number, user: UserUpdate): Promise<void> {
        await prisma.user.update({
            where: {
                id,
            },
            data: user,
        });
    }
}
