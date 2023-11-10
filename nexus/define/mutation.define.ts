import { intArg, mutationType, stringArg } from 'nexus';

export const Mutation = mutationType({
    definition(t) {
        t.field('createUser', {
            type: 'User',
            args: {
                name: stringArg(),
                email: stringArg(),
            },
            async resolve(_parent, _args: any, ctx) {
                const user = await ctx.prisma.user.create({
                    data: {
                        name: _args.name,
                        email: _args.email,
                    },
                });
                return user;
            },
        });

        t.field('updateUser', {
            type: 'User',
            args: {
                id: intArg(),
                name: stringArg(),
                email: stringArg(),
            },
            async resolve(_parent, _args: any, ctx) {
                const user = await ctx.prisma.user.update({
                    where: {
                        id: _args.id,
                    },
                    data: {
                        name: _args.name,
                        email: _args.email,
                    },
                });
                return user;
            },
        });

        t.field('deleteUser', {
            type: 'User',
            args: {
                id: intArg(),
            },
            async resolve(_parent, _args: any, ctx) {
                const user = await ctx.prisma.user.update({
                    where: {
                        id: _args.id,
                    },
                    data: {
                        isDeleted: true,
                    },
                });
                return user;
            },
        });
    },
});
