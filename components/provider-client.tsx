'use client';
import React from 'react';

import { cacheExchange, Client, fetchExchange, Provider } from 'urql';

const GRAPHQL_ENDPOINT = `http://localhost:4000/api/graphql`;

const client = new Client({
    url: GRAPHQL_ENDPOINT,
    exchanges: [cacheExchange, fetchExchange],
});
const GraphqlProvider: React.FC<any> = ({ children }) => {
    return <Provider value={client}> {children} </Provider>;
};

export default GraphqlProvider;
