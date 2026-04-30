# SénSanté
Assistant de santé communautaire avec IA.

## Stack technique
- Next.js 14 (App Router)
- Tailwind CSS
- Prisma + PostgreSQL
- Groq API (llama-3.3-70b-versatile)
- NextAuth.js
- Docker Compose

## Installation

### 1. Cloner le projet
```bash
git clone https://github.com/HxHxH404/sensante.git
cd sensante
npm install
```

### 2. Configurer les variables d'environnement
```bash
cp .env.example .env
```
Remplir les valeurs dans `.env` :
- `DATABASE_URL` : URL de votre base PostgreSQL
- `NEXTAUTH_SECRET` : générer avec `openssl rand -base64 32`
- `NEXTAUTH_URL` : `http://localhost:3000` en développement
- `GROQ_API_KEY` : clé API depuis https://console.groq.com

### 3. Initialiser la base de données
```bash
npx prisma db push
```

### 4. Lancer le serveur
```bash
npm run dev
```

## Authentification (NextAuth.js)
- Inscription : `/register`
- Connexion : `/login`
- 3 rôles : `AGENT` — `MEDECIN` — `ADMIN`
- Les mots de passe sont hashés avec bcrypt
- Sessions JWT

## IA (Groq API)
- Modèle : `llama-3.3-70b-versatile`
- Analyse les symptômes et propose un pré-diagnostic
- Clé API à créer sur https://console.groq.com

## Progression
- v0.1 — Layout + navigation
- v0.2 — Patients CRUD
- v0.3 — Authentification
- v0.4 — Consultations
- v0.5 — IA (Groq)
- v0.6 — Dashboard
- v0.7 — Docker
- v1.0 — Livraison

## Équipe
Licence 3 GLSI — ESP/UCAD — 2025–2026
