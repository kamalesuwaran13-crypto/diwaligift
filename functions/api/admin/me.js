import { isAdmin, json } from "../../_lib/auth.js";
export async function onRequestGet({ request, env }) {
  return isAdmin(request, env) ? json({ authenticated: true }) : json({ authenticated: false }, 401);
}
