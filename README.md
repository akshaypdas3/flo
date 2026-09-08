# Flo - Personal Money Flow Tracker

## The Story Behind Flo

For someone on a fixed salary, tracking expenses is straightforward. Money comes in on a schedule, bills go out, and the math is simple.

For a business owner or freelancer, it's a different story.

Income isn't fixed. Some months it's one big client. Other months it's several small ones. On top of that there are insurance premiums, policy renewals, vendor payments, and a dozen other recurring commitments that don't follow a neat calendar. Life gets busy and things slip. A missed bill here, a forgotten renewal there.

This came up over tea with my uncle, who runs his own business. He said he had no good way to track any of it - not just where the money was going, but when things were due. Insurance. Policies. Annual payments. The things that sneak up on you.

He asked if I could build something for it. Not an enterprise finance tool. Just something that made his life easier.

That conversation became Flo.

---

## What Flo Does

Flo is a Progressive Web App (PWA) for tracking personal money flow. It's built especially for people whose income and expenses aren't neatly predictable.

- **Expense tracking** — Log and categorize what you spend
- **Income tracking** — Record income from multiple sources, whenever it comes in
- **Commitments** — Track recurring obligations like insurance, policies, subscriptions, and bills, with reminders so nothing gets missed
- **Vouchers** — Keep track of credits, refunds, and redeemable amounts
- **Push notifications** — Get reminded before commitments are due
- **Offline-first PWA** — Works on your phone like a native app, even without internet

---

## Setup

Flo runs on [Supabase](https://supabase.com) for its backend. You'll need a Supabase project to get started.

### 1. Clone and configure

Open `index.html` and replace the placeholder values near the top of the `<script>` section:

```js
const SUPABASE_URL      = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Get these from your Supabase project dashboard under **Settings → API**.

### 2. Set up push notifications (optional)

If you want web push reminders, generate a VAPID key pair and replace:

```js
const VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY';
```

### 3. Set your invite code

Signups can be gated with an invite code. Change this:

```js
const INVITE_CODE = 'YOUR_INVITE_CODE';
```

Or set `SIGNUPS_OPEN = true` to allow open registration.

### 4. Add your logo

In `index.html`, find the `auth-logo` div in the auth screen and drop in your own logo image.

### 5. Deploy

Host the files anywhere static — Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc. The app is a single `index.html` with a service worker (`sw.js`) and PWA manifest (`manifest.json`).

---

## Stack

- Vanilla HTML, CSS, JavaScript (no build step)
- [Supabase](https://supabase.com) — auth and database
- Service Worker with Web Push for notifications
- PWA manifest for installability on mobile

---

## Note

Flo was built for personal use. It's a simple, focused tool — not a full accounting platform. Built during a notice period over tea.
