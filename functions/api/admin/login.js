import { createSession, json, sessionCookie } from "../../_lib/auth.js";
export async function onRequestPost({ request, env }) {
  if (!env.ADMIN_PASSWORD || !env.ADMIN_SESSION_SECRET) return json({ error: "Admin secrets are not configured in Cloudflare." }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }
  if (typeof body.password !== "string" || body.password !== env.ADMIN_PASSWORD) return json({ error: "Incorrect password." }, 401);
  const token = await createSession(env.ADMIN_SESSION_SECRET);
  return json({ ok: true }, 200, { "set-cookie": sessionCookie(token) });
}
