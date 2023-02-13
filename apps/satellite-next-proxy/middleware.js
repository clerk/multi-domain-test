import { NextResponse } from "next/server";
import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";

const clerkFapi = process.env.CLERK_FAPI;
const domain = process.env.NEXT_PUBLIC_CLERK_DOMAIN;
const proxyUrl = process.env.NEXT_PUBLIC_CLERK_PROXY_URL;
let xClerkProxyUrl = proxyUrl;
if (!proxyUrl.startsWith("https://")) {
  xClerkProxyUrl = new URL(
    proxyUrl,
    `https://${domain.replace(/^clerk\./, "")}`
  ).toString();
}
const clerkSecretKey = process.env.CLERK_SECRET_KEY;

export default withClerkMiddleware((req) => {
  if (req.nextUrl.pathname.startsWith(proxyUrl)) {
    const path = req.nextUrl.pathname.replace(proxyUrl, "");
    const url = new URL(path, clerkFapi);
    url.search = req.nextUrl.search;
    const response = NextResponse.rewrite(url);
    response.headers.set("clerk-proxy-url", xClerkProxyUrl);
    response.headers.set("clerk-secret-key", clerkSecretKey);
    return response;
  }

  return NextResponse.next();
});

export const config = { matcher: "/((?!.*\\.).*)" };
