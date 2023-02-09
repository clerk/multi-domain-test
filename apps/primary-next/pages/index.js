import React from "react";
import { clerkClient, getAuth, buildClerkProps } from "@clerk/nextjs/server";

export const getServerSideProps = async ({ req }) => {
  const { userId } = getAuth(req);

  const user = userId ? await clerkClient.users.getUser(userId) : null;
  return { props: { ...buildClerkProps(req, { user }) } };
};

function HomePage(props) {
  const [apiUser, setApiUser] = React.useState(null);
  const ssrUser = props.__clerk_ssr_state?.user;

  React.useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/user");
      const data = await res.json();
      if (data.id) {
        setApiUser(data);
      }
    }
    try {
      getUser();
    } catch (err) {
      console.log("GET /api/user", err);
    }
  }, []);

  return (
    <div>
      <h1>Primary Next.js website</h1>
      <p>All sessions start from here.</p>
      {ssrUser && <p>User from SSR: {ssrUser.id}</p>}
      {apiUser && <p>User from API: {apiUser.id}</p>}
    </div>
  );
}

export default HomePage;
