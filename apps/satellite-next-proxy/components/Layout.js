import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import css from "./Layout.module.css";

const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL;

export default function Layout({ children }) {
  const [redirectUrl, setRedirectUrl] = React.useState("");

  React.useEffect(() => {
    setRedirectUrl(window.location.host);
  }, []);

  return (
    <div className={css.wrapper}>
      <header className={css.header}>
        <div className={css.nav}>
          <Link href="/" className={css.homeLink}>
            Home
          </Link>
          <Link href="/about" className={css.navLink}>
            About
          </Link>
        </div>
        <div>
          <SignedOut>
            <Link href={`${signInUrl}?redirect_url=https://${redirectUrl}`}>
              Sign in
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/user"
              afterSignOutUrl="/"
              afterSignOutAll="/"
              afterSignOutOneUrl="/"
            />
          </SignedIn>
        </div>
      </header>
      <main className={css.main}>{children}</main>
    </div>
  );
}
