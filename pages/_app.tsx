import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import { withUrqlClient, NextUrqlAppContext } from 'next-urql';
import fetch from 'isomorphic-unfetch';
import NextApp, { AppProps } from 'next/app';
// the URL to /api/graphql
const GRAPHQL_ENDPOINT = `http://localhost:3000/api/graphql`;
import { dedupExchange, cacheExchange, fetchExchange, ssrExchange } from 'urql';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
MyApp.getInitialProps = async (ctx: NextUrqlAppContext) => {
    const appProps = await NextApp.getInitialProps(ctx);
    return { ...appProps };
};

export default withUrqlClient(
    (ssrExchange) => ({
        url: GRAPHQL_ENDPOINT,
        fetch,
        //for cache update
        exchanges: [dedupExchange, cacheExchange, ssrExchange, fetchExchange],
    }),
    { ssr: true }
)(
    // @ts-ignore
    MyApp
);
