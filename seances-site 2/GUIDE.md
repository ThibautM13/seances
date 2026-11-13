# Mettre en ligne ton appli de séances (gratuit)

Durée : environ 30 minutes. Trois comptes gratuits : Google, GitHub, Netlify.

## Étape 1 : créer la clé YouTube

1. Va sur https://console.cloud.google.com et connecte-toi avec ton compte Google.
2. En haut, clique sur le sélecteur de projet, puis « Nouveau projet ». Nom : `seances`. Crée-le.
3. Menu ☰ → « API et services » → « Bibliothèque ». Cherche **YouTube Data API v3** et clique sur « Activer ».
4. Menu ☰ → « API et services » → « Identifiants » → « Créer des identifiants » → « Clé API ».
5. Copie la clé affichée et garde-la de côté.
6. Clique sur la clé pour la modifier, section « Restrictions relatives aux API » : choisis « Restreindre la clé » et coche uniquement **YouTube Data API v3**. Enregistre.

La clé est un mot de passe : ne la mets jamais dans un fichier ni dans un message public.

## Étape 2 : mettre les fichiers sur GitHub

1. Crée un compte sur https://github.com.
2. Clique sur « + » → « New repository ». Nom : `seances`. Laisse « Public » ou choisis « Private », puis « Create repository ».
3. Sur la page du dépôt, clique sur « uploading an existing file ».
4. Glisse tout le contenu du dossier `seances-site` (le fichier `index.html`, le fichier `netlify.toml` et le dossier `netlify`) dans la fenêtre. Vérifie que le chemin `netlify/functions/video.js` apparaît bien.
5. Clique sur « Commit changes ».

## Étape 3 : publier avec Netlify

1. Crée un compte sur https://app.netlify.com (le plus simple : « Se connecter avec GitHub »).
2. « Add new site » → « Import an existing project » → GitHub → choisis le dépôt `seances`.
3. Ne change aucun réglage de build, puis ouvre « Environment variables » (ou « Add environment variables ») avant de valider.
4. Ajoute une variable : nom **YOUTUBE_API_KEY**, valeur = ta clé copiée à l’étape 1.
5. Clique sur « Deploy ». Au bout d’une minute, Netlify te donne une adresse en `.netlify.app`.

Si tu ajoutes la variable après le déploiement : Deploys → « Trigger deploy » → « Deploy site ».

## Étape 4 : utiliser l’appli

- **Bibliothèque** : colle le lien d’une de tes vidéos, clique sur « Récupérer ». Le nom et les consignes se remplissent, la miniature apparaît à l’enregistrement. Corrige si besoin, puis enregistre.
- **Séance** : ajoute des exercices, règle séries, reps, charge et repos.
- **Aperçu / PDF** : « Copier le lien à envoyer » pour les joueurs (page consultable sur téléphone, sans compte), ou « Exporter en PDF ».

## À savoir

- Ta bibliothèque et tes séances sont enregistrées dans le navigateur que tu utilises. Sur un autre appareil ou navigateur, elles n’apparaissent pas. Garde l’appli sur un seul appareil pour l’instant.
- Le lien partagé contient la séance elle-même : il fonctionne même si tu modifies la bibliothèque ensuite, mais une nouvelle version de la séance nécessite un nouveau lien.
- Les consignes sont tronquées à 300 caractères dans le lien partagé pour qu’il reste d’une taille raisonnable.
- Une vidéo YouTube « privée » ne peut pas être lue par les joueurs. Utilise « non répertoriée » ou « publique ».
