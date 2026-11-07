import { isAdmin, json } from "../../../_lib/auth.js";
export async function onRequestDelete({ request, env, params }) {
  if (!await isAdmin(request, env)) return json({ error: "Please sign in." }, 401);
  if (!env.DB) return json({ error: "D1 database is not connected." }, 503);
  const id = String(params.id || "");
  if (!/^[a-f0-9]{24}$/.test(id)) return json({ error: "Invalid gift ID." }, 400);
  await env.DB.prepare("DELETE FROM gifts WHERE id = ?").bind(id).run();
  return json({ ok: true });
}
