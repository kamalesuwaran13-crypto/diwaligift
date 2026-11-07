# Diwali Wishes — Cloudflare Pages + D1
A personalised Diwali greeting site with gift creation, private share links and a password-protected admin dashboard.

## Cloudflare Pages deployment
- Framework preset: **None**
- Build command: leave blank
- Build output directory: `. ` (enter `.`, without a space)
- Root directory: repository root
- Deploy using **Git integration** so the `functions/` directory is compiled as Pages Functions.

## Required bindings and secrets
In Pages > Settings > Functions:
- D1 database binding variable: `DB` → select database `diwali-gifts`

In Pages > Settings > Variables and Secrets (Production):
- Secret `ADMIN_PASSWORD`: your chosen admin password
- Secret `ADMIN_SESSION_SECRET`: a separate random secret with at least 32 random bytes

Redeploy after changing bindings or secrets.

## Database
The `schema.sql` file creates the `gifts` table and indexes. Run it once in the D1 console. The migration copy is in `migrations/0001_create_gifts.sql`.

## URLs
- Home: `/`
- Admin: `/admin.html`
- Gift: `/gift.html?id=<gift-id>`

The admin password is checked only by the server. Sessions use a signed, HttpOnly, Secure, SameSite=Strict cookie.

## Notes
The empty `assets/` folder is not required; the design is implemented in `styles.css`.