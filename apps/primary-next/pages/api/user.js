import { getAuth } from "@clerk/nextjs/server";

export default function handler(req, res) {
  const { userId } = getAuth(req);
  return res.status(200).json({ id: userId });
}
