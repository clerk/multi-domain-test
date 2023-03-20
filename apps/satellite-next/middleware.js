import { NextResponse } from "next/server";
import { withClerkMiddleware } from "@clerk/nextjs/server";

export default withClerkMiddleware(() => {
  return NextResponse.next();
}, {
  isSatellite: true,
  domain: url => url.host
});

export const config = { matcher: "/((?!.*\\.).*)" };
