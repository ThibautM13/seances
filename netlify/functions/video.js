// Reçoit ?url=<lien YouTube> et renvoie le titre et la description de la vidéo.
// La clé API reste côté serveur (variable d’environnement YOUTUBE_API_KEY).
const rep = (code, obj) => ({
  statusCode: code,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(obj),
});

// Garde les lignes utiles : retire liens, hashtags et lignes vides.
function nettoyer(texte) {
  return (texte || "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !/https?:\/\//i.test(l) && !l.startsWith("#"))
    .join("\n")
    .slice(0, 600);
}

exports.handler = async (event) => {
  const url = (event.queryStringParameters || {}).url || "";
  const m = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/);
  if (!m) return rep(400, { error: "Lien YouTube non reconnu" });

  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return rep(500, { error: "Clé API manquante côté serveur" });

  try {
    const r = await fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + m[1] + "&key=" + key
    );
    const d = await r.json();
    const s = d.items && d.items[0] && d.items[0].snippet;
    if (!s) return rep(404, { error: "Vidéo introuvable" });
    return rep(200, { id: m[1], title: s.title, description: nettoyer(s.description) });
  } catch (e) {
    return rep(500, { error: "Erreur lors de l’appel à YouTube" });
  }
};
