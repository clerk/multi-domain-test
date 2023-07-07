import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix";
import Header from "~/components/Header";

declare global {
  interface Window {
    ENV: {
      CLERK_JS: string;
      CLERK_PUBLISHABLE_KEY: string;
      CLERK_PROXY_URL: string;
      CLERK_IS_SATELLITE: string;
      SIGN_IN_URL: string;
      HOME_URL: string;
    };
  }
}

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(
    args,
    ({ request }) => {
      const { user } = request;
      console.log("User:", user);
      return json({
        message: `Hello from the root loader :)`,
        ENV: getBrowserEnvironment(),
        user,
      });
    },
    {
      loadUser: true,
      proxyUrl:
        typeof window !== "undefined"
          ? window.ENV.CLERK_PROXY_URL
          : process.env.CLERK_PROXY_URL,
    }
  );
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Satellite Remix app behind proxy",
  viewport: "width=device-width,initial-scale=1",
});

export const CatchBoundary = ClerkCatchBoundary();

function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
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

function getBrowserEnvironment() {
  const env = process.env;

  return {
    CLERK_JS: env.CLERK_JS,
    CLERK_PUBLISHABLE_KEY: env.CLERK_PUBLISHABLE_KEY,
    CLERK_PROXY_URL: env.CLERK_PROXY_URL,
    CLERK_IS_SATELLITE: env.CLERK_IS_SATELLITE,
    SIGN_IN_URL: env.SIGN_IN_URL,
    HOME_URL: env.HOME_URL,
  };
}

export default ClerkApp(App, {
  proxyUrl:
    typeof window !== "undefined"
      ? window.ENV.CLERK_PROXY_URL
      : process.env.CLERK_PROXY_URL,
});
