import { NextUrqlAppContext } from 'next-urql';
import NextApp, { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
MyApp.getInitialProps = async (ctx: NextUrqlAppContext) => {
    const appProps = await NextApp.getInitialProps(ctx);
    return { ...appProps };
};

export default MyApp;
