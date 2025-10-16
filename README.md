# TypeScript Express Backend — PostgreSQL + Zod + Docker

## Présentation

Ce projet est un backend **TypeScript** moderne basé sur **Express**, connecté à une base **PostgreSQL** via **pg**, et validant toutes les données avec **Zod**.  
L’architecture est découpée de manière claire en **services**, **contrôleurs** et **routes**, et la base de données tourne dans un conteneur **Docker**.

---

## Fonctionnalités principales

- **TypeScript + ESM** (NodeNext)
- **Express** pour la gestion des routes
- **Zod** pour la validation des schémas et des entrées utilisateurs
- **PostgreSQL** (via Docker)
- Architecture claire : `routes → controllers → services → db`
- **Helmet**, **CORS**, **Morgan** pour la sécurité et les logs
- Scripts de **migration** et de **seed** automatiques
- Validation stricte + gestion des erreurs centralisée

---

## Structure du projet

```sh
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── .env
└── src
├── app.ts
├── server.ts
├── db/
│ ├── pool.ts
│ └── migrate.ts
├── schemas/
│ └── user.schema.ts
├── lib/
│ └── validate.ts
├── services/
│ └── user.service.ts
├── controllers/
│ └── user.controller.ts
└── routes/
├── user.routes.ts
└── index.ts
```


---

## Prérequis

- **Node.js** ≥ 20  
- **npm** ≥ 9  
- **Docker** + **Docker Compose**

---

## Installation

```bash
# 1. Cloner le repo
git clone <repo-url>
cd ts-backend

# 2. Installer les dépendances
npm install

# 3. Démarrer PostgreSQL via Docker
docker compose up -d
```

## Configuration
Créer un fichier `.env` à la racine :
```bash
DATABASE_URL=postgres://postgres:postgres@localhost:5432/ts_backend
PORT=3000
NODE_ENV=development
```
> Si le backend tourne dans Docker, remplacer `localhost` par `postgres` dans `DATABASE_URL`.

## Commandes utiles
| Commande             | Description                                           |
| -------------------- | ----------------------------------------------------- |
| `npm run dev`        | Démarre le serveur en mode développement              |
| `npm run build`      | Compile le code TypeScript                            |
| `npm start`          | Lance le serveur compilé                              |
| `npm run db:migrate` | Exécute la migration et le seed de la base PostgreSQL |

## Endpoints disponibles
| Méthode    | Endpoint         | Description                                   |
| ---------- | ---------------- | --------------------------------------------- |
| **GET**    | `/`              | Vérifie que l’API est en ligne                |
| **GET**    | `/api/users`     | Liste tous les utilisateurs                   |
| **GET**    | `/api/users/:id` | Récupère un utilisateur par ID                |
| **POST**   | `/api/users`     | Crée un nouvel utilisateur *(validé par Zod)* |
| **DELETE** | `/api/users/:id` | Supprime un utilisateur                       |

## Tests rapides
Lancer le serveur
```bash
npm run dev
```

Tester avec `curl`
```bash
curl http://localhost:3000/api/users
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","name":"John"}'
```

## Stack technique
| Outil                      | Rôle                                 |
| -------------------------- | ------------------------------------ |
| **TypeScript**             | Typage statique et structure du code |
| **Express**                | Framework web                        |
| **Zod**                    | Validation des données               |
| **pg**                     | Client PostgreSQL                    |
| **Docker**                 | Base de données isolée               |
| **Helmet / CORS / Morgan** | Sécurité & logs                      |

## Sécurité & bonnes pratiques
- Validation stricte de toutes les entrées (Zod)
- Middleware global d’erreur
- Headers sécurisés (Helmet)
- CORS activé (configurable)
- Variables sensibles dans `.env`
- Requêtes SQL paramétrées (`$1, $2, …`)

## Étapes du projet (résumé)
- Initialisation du projet et configuration TypeScript
- Mise en place du squelette Express
- Création de la base PostgreSQL sous Docker
- Migration et seed automatique
- Validation Zod + services, contrôleurs et routes
- Structure finale Express + gestion des erreurs
- Tests et endpoints fonctionnels

## Déploiement
- Compiler : npm run build
- Lancer : npm start
- Pour un déploiement Dockerisé complet, ajouter un service `api` au `docker-compose.yml` avec le `DATABASE_URL` adapté.

## Auteur
Projet pédagogique réalisé pour apprendre TypeScript + Express + PostgreSQL pas à pas,
avec une architecture claire et maintenable.

## Amélioration futures
- Auth JWT 
- Tests
- CI/CD
- Déploiement Cloud