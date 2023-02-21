import { SignedIn, SignedOut, UserButton } from "@clerk/remix";
import { Link } from "@remix-run/react";

const signInPath =
  typeof window !== "undefined"
    ? window.ENV.SIGN_IN_URL
    : process.env.SIGN_IN_URL;
const homePath =
  typeof window !== "undefined" ? window.ENV.HOME_URL : process.env.HOME_URL;

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <div>
        <Link to="/" className="logo">
          <span className="appName">Remix app</span>
        </Link>
      </div>
      <div>
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
