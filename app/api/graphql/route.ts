import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextApiRequest, NextApiResponse } from 'next';

import { schema } from '../../../nexus/resolvers';

import { prisma } from '../../../prisma';

import type { Context } from '../../../nexus/context';

let apolloServerHandler: (req: any, res: any) => Promise<unknown>;
console.log(prisma);
const getContext: (req: NextApiRequest) => Promise<Context> = async (req) => {
    return {
        prisma,
    };
};

// const getApolloServerHandler = () => {
//     if (!apolloServerHandler) {
//         console.log(1111111111111111111111111111111111);

//         const apolloServer = new ApolloServer({ schema });
//         apolloServerHandler = startServerAndCreateNextHandler<NextApiRequest>(apolloServer, { context: getContext });
//     }
//     return apolloServerHandler;
// };

// // export const config = {
// //     api: {
// //         bodyParser: true,
// //     },
// // };

// export default function graphql(req: NextApiRequest, res: NextApiResponse) {
//     const apolloServerHandler = getApolloServerHandler();
//     console.log(2222222222222);
//     return apolloServerHandler(req, res);
// }
const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler(server, { context: getContext });

export { handler as GET, handler as POST };
