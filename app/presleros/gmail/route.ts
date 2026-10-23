// Google sends people here after they link a Gmail account to PreslerOS from a texted link (presler.me is the
// app's authorized domain). It only forwards Google's one-time code to the PreslerOS cloud, which finishes the link.
const CALLBACK = "https://grocery-list.noah-bad.workers.dev/v1/gmail/callback";

export function GET(request: Request) {
  const { search } = new URL(request.url);
  return new Response(null, { status: 302, headers: { location: `${CALLBACK}${search}`, "cache-control": "no-store", "referrer-policy": "no-referrer" } });
}
