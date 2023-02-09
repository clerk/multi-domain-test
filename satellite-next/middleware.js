import { NextResponse } from "next/server";
import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";

export default withClerkMiddleware((req) => {
  return NextResponse.next();
});

export const config = { matcher: "/((?!.*\\.).*)" };
