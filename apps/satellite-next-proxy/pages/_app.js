import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import Layout from "../components/Layout";

let proxyUrl = process.env.NEXT_PUBLIC_CLERK_PROXY_URL;

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider isSatellite proxyUrl={proxyUrl} {...pageProps}>
      <Head>
        <title>Satellite Next.js app with proxy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}
