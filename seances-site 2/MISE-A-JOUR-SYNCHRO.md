# Activer la synchronisation de ta bibliothèque

Une seule fois, environ 15 minutes. Aucun nouveau compte : tout passe par Netlify et GitHub, que tu utilises déjà.

Après ça, ta bibliothèque, tes séances et tes dossiers sont enregistrés en ligne. Tu les retrouves sur ton téléphone, ton ordinateur ou une tablette, et un nettoyage du navigateur ne les efface plus.

## Étape 1 : choisir ton code d’accès et l’ajouter dans Netlify

Ce code protège tes données : sans lui, personne ne peut lire ni modifier ta bibliothèque, même en connaissant l’adresse du site.

1. Choisis un code de 8 caractères minimum, que tu n’utilises pas ailleurs. Une phrase courte fonctionne bien.
2. Dans Netlify, ouvre ton projet, puis **Project configuration** → **Environment variables**.
3. Clique sur **Add a variable** (ou « Add environment variable »), puis crée la variable :
   - **Key** : `APP_CODE`
   - **Value** : ton code
   - Coche **Contains secret values**
   - Laisse **All scopes** et **Same value for all deploy contexts**
4. Clique sur **Create variable**.

Cette étape ne déclenche pas de mise en ligne et ne coûte aucun crédit.

## Étape 2 : mettre à jour GitHub en une seule fois

Il faut tout déposer **dans la même validation**, pour ne déclencher qu’une seule mise en ligne (15 crédits Netlify).

1. Décompresse le fichier `seances-site.zip` sur ton ordinateur. Tu obtiens un dossier `seances-site`.
2. Sur GitHub, ouvre ton dépôt `seances`, puis **Add file** → **Upload files**.
3. Ouvre le dossier `seances-site`, sélectionne **tout son contenu** (`index.html`, `netlify.toml`, `package.json` et le dossier `netlify`) et glisse-le dans la zone.
4. Vérifie dans la liste que tu vois bien `netlify/functions/data.mjs` et `netlify/functions/video.js`.
5. Clique sur **Commit changes**.

Les fichiers qui existent déjà sont remplacés. Le script `video.js` est inchangé.

Si ton navigateur n’accepte pas le glisser-déposer du dossier `netlify`, dis-moi : on le fera autrement, sans multiplier les mises en ligne.

## Étape 3 : attendre la mise en ligne

1. Dans Netlify, ouvre l’onglet **Deploys**. Le dernier déploiement doit passer à **Published** en deux minutes environ.
2. S’il passe à **Failed**, ouvre-le et copie-moi les dernières lignes du journal. Un échec ne consomme pas de crédits.

## Étape 4 : activer la synchronisation dans l’appli

1. Ouvre ton site et touche **Réglages** dans la barre du bas.
2. Dans **Synchronisation**, saisis ton code et touche **Activer**.
3. Sur l’appareil où se trouve déjà ta bibliothèque, elle est envoyée en ligne automatiquement. Le statut passe à **À jour**.
4. Sur chaque autre appareil, fais la même chose : saisis le code, et la bibliothèque s’affiche.

Ensuite, chaque modification est envoyée toute seule, quelques secondes après. Quand tu rouvres l’appli sur un autre appareil, elle récupère la dernière version.

## À savoir

- **Hors ligne** : l’appli continue de fonctionner. Tes modifications sont gardées sur l’appareil et envoyées dès que le réseau revient. Un bandeau t’indique l’état.
- **Deux versions différentes** : si tu modifies la bibliothèque sur deux appareils avant qu’ils se synchronisent, l’appli te demande laquelle garder. L’autre est remplacée, donc choisis celle qui contient ton travail le plus récent.
- **Un nouvel appareil qui a déjà des données** : l’appli te demande aussi de choisir, au lieu d’écraser quoi que ce soit en silence.
- **Sauvegarde** : dans **Réglages** → **Sauvegarde**, **Exporter** télécharge un fichier avec toute ta bibliothèque, et **Importer** la restaure. Fais-en une de temps en temps, par exemple après une grosse session d’ajouts.
- **Les liens envoyés aux joueurs** ne changent pas : ils n’ont pas besoin du code, et les joueurs ne voient que la séance qu’on leur envoie.
- **Données stockées** : ta bibliothèque contient des prénoms de joueurs. Elle est enregistrée dans la base de données de ton projet Netlify, protégée par ton code. Ne partage ce code qu’avec les personnes qui doivent modifier la bibliothèque.
- **Changer le code** : modifie la valeur de `APP_CODE` dans Netlify, relance un déploiement (Deploys → Trigger deploy), puis saisis le nouveau code sur chaque appareil. L’appli demande le nouveau code quand l’ancien est refusé.
