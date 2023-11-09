import { ChakraProvider } from '@chakra-ui/react';
import { NextUrqlAppContext } from 'next-urql';
import NextApp, { AppProps } from 'next/app';
import '../styles/globals.css';

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

export default MyApp;
