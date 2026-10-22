import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PreslerOS Privacy Policy",
  description: "How PreslerOS, the Presler family's private app, uses Google account data.",
  alternates: { canonical: "/presleros/privacy" },
  robots: { index: false, follow: false },
};

// Linked from the PreslerOS Google sign-in (OAuth consent screen), which requires a public privacy policy.
export default function PreslerOSPrivacy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24 text-paper">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">PreslerOS</p>
      <h1 className="mt-4 font-serif text-5xl leading-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-faint">Last updated October 22, 2026</p>

      <div className="mt-12 space-y-8 leading-relaxed text-mute">
        <p>
          PreslerOS is a private app for the Presler household: shared to-dos, groceries and travel plans. It is not
          offered to the public.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg text-paper">What it reads from Google</h2>
          <p>
            With your permission, PreslerOS reads your Gmail (read-only) to find booking emails such as flight, hotel
            and rental car confirmations, and adds those bookings to the household&apos;s shared trips. It looks only at
            recent messages whose subjects suggest a booking.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-paper">How it&apos;s used</h2>
          <p>
            The text of a matching email is sent to Anthropic&apos;s Claude API to pick out booking details (dates,
            times, places and confirmation codes), which are stored in the household&apos;s private PreslerOS
            database. PreslerOS never sends, deletes or changes email, never shares or sells your data, and never uses
            it for advertising.
          </p>
          <p>
            PreslerOS&apos;s use and transfer of information received from Google APIs adheres to the{" "}
            <a className="text-accent underline underline-offset-4" href="https://developers.google.com/terms/api-services-user-data-policy">
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-paper">Removing access</h2>
          <p>
            You can revoke PreslerOS&apos;s access at any time at{" "}
            <a className="text-accent underline underline-offset-4" href="https://myaccount.google.com/permissions">
              myaccount.google.com/permissions
            </a>
            . Questions: <a className="text-accent underline underline-offset-4" href="https://presler.me">presler.me</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
