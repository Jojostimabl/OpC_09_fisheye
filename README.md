# FishEye

Prototype FishEye construit avec Next.js, Prisma et SQLite. L'application
présente des photographes, leurs médias, un formulaire de contact, une
lightbox, un tri des médias et des likes persistants.

## Prérequis

- Node.js 20.9 ou une version plus récente
- npm

## Installation

Depuis la racine du projet :

```bash
npm install
```

Le projet utilise SQLite. La base locale est configurée dans
`prisma.config.ts` et est créée dans le fichier `dev.db`.

## Initialiser Prisma et la base de données

Générer le client Prisma :

```bash
npx prisma generate
```

Appliquer les migrations existantes :

```bash
npx prisma migrate dev
```

Charger les photographes et les médias de démonstration :

```bash
npx prisma db seed
```

La commande de seed supprime les données existantes avant de réinsérer le jeu
de données présent dans `data/photographer.json` et `data/media.json`.

Pour remettre complètement la base à zéro pendant le développement :

```bash
npx prisma migrate reset
```

Cette dernière commande est destructive : elle supprime les likes et toutes
les modifications locales de la base.

## Lancer le projet

Démarrer le serveur de développement :

```bash
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

## Vérifier la production

Créer le build de production :

```bash
npm run build
```

Lancer le build généré :

```bash
npm run start
```

## Outils utiles

Ouvrir Prisma Studio pour consulter la base locale :

```bash
npx prisma studio
```

Créer une nouvelle migration après une modification de
`prisma/schema.prisma` :

```bash
npx prisma migrate dev --name description_de_la_modification
```

## Organisation

- `app/` : routes Next.js, pages, états de chargement et route API des likes
- `components/` : composants d'interface réutilisables
- `lib/` : client Prisma et fonctions de lecture de la base
- `prisma/` : schéma, migrations et script de seed
- `data/` : données de démonstration utilisées par le seed
- `public/` : images, vidéos et logo
