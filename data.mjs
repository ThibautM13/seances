// Enregistre et relit la bibliothèque (exercices, séances, dossiers) dans la base de données Netlify.
// Accès protégé par un code (variable d'environnement APP_CODE).
// GET  -> { rev, data }
// PUT  -> { baseRev, data } ; refusé (409) si une version plus récente existe déjà.
import { getStore } from "@netlify/blobs";

const json = (status, obj) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

function same(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

const valid = (d) =>
  d && typeof d === "object" && Array.isArray(d.lib) && Array.isArray(d.sessions) && Array.isArray(d.folders);

export default async (req) => {
  const secret = process.env.APP_CODE;
  if (!secret) return json(500, { error: "Le code d’accès n’est pas configuré sur Netlify (variable APP_CODE)." });
  if (!same(req.headers.get("x-code") || "", secret)) {
    await new Promise((r) => setTimeout(r, 800)); // ralentit les essais au hasard
    return json(401, { error: "Code d’accès incorrect." });
  }

  const store = getStore({ name: "seances", consistency: "strong" });
  const entry = await store.getWithMetadata("state", { type: "json" });
  const curRev = entry ? entry.data.rev : 0;

  if (req.method === "GET") {
    return json(200, { rev: curRev, data: entry ? entry.data.data : null });
  }

  if (req.method === "PUT") {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return json(400, { error: "Requête invalide." });
    }
    if (!valid(body.data)) return json(400, { error: "Données invalides." });
    if (JSON.stringify(body.data).length > 4000000) return json(413, { error: "Données trop volumineuses." });

    if (body.baseRev !== curRev) {
      return json(409, { rev: curRev, data: entry ? entry.data.data : null });
    }
    const res = await store.setJSON(
      "state",
      { rev: curRev + 1, data: body.data },
      entry ? { onlyIfMatch: entry.etag } : { onlyIfNew: true }
    );
    if (!res.modified) {
      const now = await store.getWithMetadata("state", { type: "json" });
      return json(409, { rev: now ? now.data.rev : 0, data: now ? now.data.data : null });
    }
    return json(200, { rev: curRev + 1 });
  }

  return json(405, { error: "Méthode non autorisée." });
};
