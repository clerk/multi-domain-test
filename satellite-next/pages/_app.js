import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import Layout from "../components/Layout";

let domain = process.env.NEXT_PUBLIC_CLERK_DOMAIN;

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider isSatellite domain={domain} {...pageProps}>
      <Head>
        <title>Satellite Next.js app</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}
