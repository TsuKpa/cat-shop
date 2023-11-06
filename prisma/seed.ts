import { PrismaClient } from '@prisma/client';
import { userData } from './data';

const prisma = new PrismaClient();

async function createDumpData() {
    await prisma.user.createMany({
        data: userData,
    });
    console.log('Created dump data!');
}

createDumpData()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
