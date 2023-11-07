import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../graphql/schema';
import { createContext } from './../../graphql/context';
import Cors from 'micro-cors';

const apolloServer = new ApolloServer({
    context: createContext,
    schema,
});

export const config = {
    api: {
        bodyParser: false,
    },
};
const cors = Cors();
const startServer = apolloServer.start();
export default cors(async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }

    await startServer;
    await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});
