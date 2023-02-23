import { NextResponse } from "next/server";
import { withClerkMiddleware } from "@clerk/nextjs/server";

const clerkFapi = process.env.CLERK_FAPI;
const domain = process.env.NEXT_PUBLIC_CLERK_DOMAIN;
const proxyUrl = process.env.NEXT_PUBLIC_CLERK_PROXY_URL;
const clerkSecretKey = process.env.CLERK_SECRET_KEY;
const relativeProxyUrl = process.env.NEXT_PUBLIC_RELATIVE_CLERK_PROXY_URL;

export default withClerkMiddleware((req) => {
  const { search, pathname } = req.nextUrl;

  if (pathname.startsWith(relativeProxyUrl)) {
    const url = new URL(pathname.replace(relativeProxyUrl, ""), clerkFapi);
    url.search = search;

    const headers = new Headers(req.headers);
    headers.set("clerk-proxy-url", proxyUrl);
    headers.set("clerk-secret-key", clerkSecretKey);
    console.log(pathname, url.toString(), headers.get("clerk-proxy-url"));
    const response = NextResponse.rewrite(url, {
      request: {
        headers,
      },
    });
    return response;
  }

  return NextResponse.next();
});

export const config = { matcher: "/((?!_next|favicon.ico).*)" };
