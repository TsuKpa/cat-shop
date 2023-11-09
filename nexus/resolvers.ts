import { objectType, queryType, mutationType, makeSchema } from 'nexus';
import { User } from 'nexus-prisma';

const Query = queryType({
    definition(t) {
        t.list.field('allUsers', {
            type: 'User',
            resolve(_parent, _args, ctx) {
                return ctx.prisma.user.findMany({});
            },
        });
        // t.crud.user();
        // t.crud.users();
    },
});

const Mutation = mutationType({
    definition(t) {
        t.field('bigRedButton', {
            type: 'String',
            async resolve(_parent, _args, ctx) {
                const { count } = await ctx.prisma.user.deleteMany({});
                return `${count} user(s) destroyed. Thanos will be proud.`;
            },
        });

        // t.crud.createOneUser();
        // t.crud.deleteOneUser();
        // t.crud.deleteManyUser();
        // t.crud.updateOneUser();
        // t.crud.updateManyUser();
    },
});

const UserModel = objectType({
    name: User.$name,
    description: User.$description,
    definition(t) {
        t.field(User.id);
        t.field(User.name);
        t.field(User.email);
        t.field(User.isDeleted);
    },
});

// const typegen_path = path.join(process.cwd(), 'generated', 'nexus-typegen.d.ts');
// const schema_path = path.join(process.cwd(), 'generated', 'schema.graphql');

export const schema = makeSchema({
    types: [Query, UserModel, Mutation],
    outputs: {
        typegen: __dirname + '/generated/nexus-typegen.d.ts',
        schema: __dirname + '/generated/schema.graphql',
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
});
