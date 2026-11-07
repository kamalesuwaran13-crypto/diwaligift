# Diwali Gift — Cloudflare Pages + D1

A personalised Diwali greeting website with unique share links and a private admin dashboard showing who created each gift and whom it was sent to.

## Features
- Free normal greeting gifts (no payment or money transfer).
- Creator name, recipient name and custom message.
- Unique shareable gift URL and WhatsApp sharing.
- Festive reveal animation, diyas, stars and confetti.
- Private admin dashboard with totals, search, gift details and delete.
- Cloudflare D1 storage; Cloudflare Pages Functions API.

## Deploy to Cloudflare Pages
1. Create a D1 database named `diwali-gifts`.
2. In the D1 Console, run the SQL in `schema.sql`.
3. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git** and select this repository.
4. Build settings: Framework **None**, build command blank, build output directory **public**.
5. In Pages → Settings → Functions → D1 database bindings, bind variable **DB** to `diwali-gifts`.
6. In Pages → Settings → Variables and Secrets, add:
   - `ADMIN_PASSWORD`: a strong unique admin password.
   - `ADMIN_SESSION_SECRET`: a random secret of at least 32 characters.
7. Deploy. If you add bindings/secrets after the first deployment, redeploy.

## URLs
- Website: `/`
- Admin dashboard: `/admin.html`
- Shared gift: `/?gift=GIFT_ID`

## Privacy and security
Only names and message explicitly entered by the gift creator are stored. The site does not collect phone numbers or identify visitors automatically. Admin records are protected by a signed, HttpOnly, Secure, SameSite=Strict session cookie. Never put secrets in frontend code or commit them to GitHub.

This project creates greetings only. It does not collect or transfer money.
