import { json } from "../_lib/auth.js";
function clean(value, max) {
  return String(value ?? "").trim().replace(/[<>]/g, "").slice(0, max);
}
function newId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(12)), b => b.toString(16).padStart(2, "0")).join("");
}
export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: "The gift database is not connected yet." }, 503);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }
  const creator = clean(body.creator, 60);
  const recipient = clean(body.recipient, 60);
  const message = clean(body.message, 500);
  if (!creator || !recipient || !message) return json({ error: "Please complete all fields." }, 400);
  if (creator.length < 2 || recipient.length < 2 || message.length < 3) return json({ error: "Please enter valid names and a message." }, 400);
  const id = newId();
  const createdAt = new Date().toISOString();
  try {
    await env.DB.prepare("INSERT INTO gifts (id, creator_name, recipient_name, message, created_at) VALUES (?, ?, ?, ?, ?)")
      .bind(id, creator, recipient, message, createdAt).run();
    return json({ id, createdAt }, 201);
  } catch {
    return json({ error: "Could not save the gift. Please check the D1 setup." }, 500);
  }
}
export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ error: "Gift database is not configured." }, 503);
  const id = new URL(request.url).searchParams.get("id") || "";
  if (!/^[a-f0-9]{24}$/.test(id)) return json({ error: "Gift not found." }, 404);
  const gift = await env.DB.prepare("SELECT id, creator_name, recipient_name, message, created_at FROM gifts WHERE id = ?").bind(id).first();
  if (!gift) return json({ error: "Gift not found." }, 404);
  return json(gift);
}
