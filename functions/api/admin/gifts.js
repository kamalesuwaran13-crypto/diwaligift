import { isAdmin, json } from "../../_lib/auth.js";
export async function onRequestGet({ request, env }) {
  if (!await isAdmin(request, env)) return json({ error: "Please sign in." }, 401);
  if (!env.DB) return json({ error: "D1 database is not connected." }, 503);
  const result = await env.DB.prepare("SELECT id, creator_name, recipient_name, message, created_at FROM gifts ORDER BY created_at DESC LIMIT 1000").all();
  return json({ gifts: result.results || [] });
}
