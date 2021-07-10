import Head from 'next/head';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CRM | bineetnaidu.io</title>
        <meta name="description" content="A Personal CRM by Bineet Naidu" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta
          name="keywords"
          content="Bineet Naidu, Bineet, bineetnaidu, crm, CRM, bineet projects"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
