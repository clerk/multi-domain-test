import { SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Link } from "@remix-run/react";

const signInPath =
  typeof window !== "undefined"
    ? window.ENV.CLERK_SIGN_IN_URL
    : process.env.CLERK_SIGN_IN_URL;
const homePath =
  typeof window !== "undefined"
    ? window.ENV.CLERK_HOME_URL
    : process.env.CLERK_HOME_URL;

export default function Header() {
  return (
    <header className="header">
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.svg" width="32" height="32" alt="Logo" />
          <span className="appName">Your application</span>
        </Link>
      </div>
      <div className="right">
        <SignedOut>
          <a
            href={`${signInPath}?redirect_url=${homePath}`}
            target="_blank"
            rel="noreferrer"
          >
            Sign in
          </a>
        </SignedOut>
        <SignedIn>
          <UserButton userProfileUrl="/user" afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
