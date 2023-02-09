function handler(req, res) {
  const sid = "sess_" + String(Math.random()).replace(".", "");

  const expires = new Date();
  expires.setDate(expires.getDate() + 1);
  res.setHeader("set-cookie", [
    `sid=${sid}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    `Expires=${expires.toUTCString()}`,
    "SameSite=none",
  ]);
  res.json({ sid });
}

export default handler;
