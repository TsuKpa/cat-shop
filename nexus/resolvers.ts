import { makeSchema } from 'nexus';
import { Mutation, Query, UserModel } from './define';

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
