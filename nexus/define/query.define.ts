import { queryType } from 'nexus';

export const Query = queryType({
    definition(t) {
        t.list.field('allUsers', {
            type: 'User',
            resolve: (_parent, _args, ctx) => {
                return ctx.prisma.user.findMany({
                    where: {
                        isDeleted: false,
                    },
                    orderBy: { createdAt: 'desc' },
                });
            },
        });
    },
});
