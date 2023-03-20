import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix";
import styles from "~/styles/shared.css";
import Header from "~/components/Header";
import { json } from "@remix-run/node";
import * as console from "console";

declare global {
  interface Window {
    ENV: {
      CLERK_JS: string;
      CLERK_PUBLISHABLE_KEY: string;
      CLERK_SIGN_IN_URL: string;
      CLERK_HOME_URL: string;
      CLERK_DOMAIN: string;
      CLERK_IS_SATELLITE: string;
    };
  }
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export function links() {
  return [
    { rel: "stylesheet", href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css" },
    { rel: "stylesheet", href: styles },
  ];
}

function getBrowserEnvironment() {
  const env = process.env;

  return {
    CLERK_JS: env.CLERK_JS,
    CLERK_PUBLISHABLE_KEY: env.CLERK_PUBLISHABLE_KEY,
    CLERK_SIGN_IN_URL: env.CLERK_SIGN_IN_URL,
    CLERK_HOME_URL: env.CLERK_HOME_URL,
    CLERK_DOMAIN: env.CLERK_DOMAIN,
    CLERK_IS_SATELLITE: env.CLERK_IS_SATELLITE,
  };
}

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(
    args,
    ({ request }) => {
      const { userId, sessionId, getToken } = request.auth;
      console.log("Root loader auth:", { userId, sessionId, getToken });
      // return { message: `Hello from the root loader :)` };
      return json({
        message: `Hello from the root loader :)`,
        ENV: getBrowserEnvironment(),
      });
    },
    {
      loadUser: true,
      isSatellite: true,
      domain: (url) => url.host
      // domain: typeof window !== "undefined" ? window.ENV.CLERK_DOMAIN : process.env.CLERK_DOMAIN,
    } as const
  );
};

function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App, {
  // @ts-ignore
  isSatellite: true,
  domain: typeof window !== "undefined" ? window.ENV.CLERK_DOMAIN : process.env.CLERK_DOMAIN,
});

export const CatchBoundary = ClerkCatchBoundary();
