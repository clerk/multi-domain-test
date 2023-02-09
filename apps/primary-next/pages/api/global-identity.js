function handler(req, res) {
  const { redirectUrl } = req.query;
  const url = new URL(redirectUrl);

  const headers = new Headers(req.headers);
  const clientId = headers.get("x-client-id");

  url.searchParams.set("cid", clientId);

  res.redirect(302, url.toString());
}

export default handler;
