# Plan d'authentification — Lab Auth
**Rôle :** Le Bouclier  
**Auteur :** Pide Elodie AWISSOBA  
**Projet :** SénSanté — Tag visé : v0.3

---

## 1. Objectif

Sécuriser l'application SénSanté en ajoutant un système d'authentification complet :
inscription, connexion, sessions et protection des routes. Sans authentification,
n'importe qui peut accéder aux données des patients.

---

## 2. Outil choisi : NextAuth.js

**NextAuth.js** est la bibliothèque d'authentification standard pour les applications Next.js.
Elle gère automatiquement les sessions, les tokens JWT, et les callbacks de connexion.

Installation prévue :
```bash
npm install next-auth @auth/prisma-adapter
```

---

## 3. Étapes prévues

### Étape 1 — Configurer NextAuth
- Créer le fichier `src/app/api/auth/[...nextauth]/route.ts`
- Configurer le provider **Credentials** (email + mot de passe)
- Connecter NextAuth à Prisma via `@auth/prisma-adapter`

### Étape 2 — Modèle Prisma
Ajouter les modèles nécessaires dans `prisma/schema.prisma` :
- `User` (id, email, password, role)
- `Session`
- `Account`

### Étape 3 — Hashage du mot de passe
- Installer `bcryptjs` pour hasher les mots de passe
- Ne jamais stocker un mot de passe en clair dans la base de données

```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### Étape 4 — API Route d'inscription
- Créer `src/app/api/auth/register/route.ts`
- Vérifier que l'email n'existe pas déjà
- Hasher le mot de passe avant insertion

### Étape 5 — Page Login fonctionnelle
- Connecter la page `/login` existante à NextAuth (`signIn()`)
- Gérer les erreurs (mauvais mot de passe, compte inexistant)
- Rediriger vers `/` après connexion réussie

### Étape 6 — Protection des routes
- Créer `middleware.ts` à la racine du projet
- Bloquer l'accès aux pages protégées si non connecté
- Rediriger vers `/login` automatiquement

### Étape 7 — Déconnexion
- Ajouter un bouton "Se déconnecter" dans le Header
- Appeler `signOut()` de NextAuth

---

## 4. Structure des fichiers à créer

```
src/
  app/
    api/
      auth/
        [...nextauth]/
          route.ts       ← Configuration NextAuth
        register/
          route.ts       ← API inscription
  middleware.ts          ← Protection des routes
prisma/
  schema.prisma          ← Ajouter User, Session, Account
```

---

## 5. Flux d'authentification prévu

```
Utilisateur → /login → signIn() → NextAuth vérifie en BDD → Session créée → /
Utilisateur → page protégée sans session → middleware → redirige vers /login
```

---

## 6. Sources consultées

- Documentation officielle NextAuth.js : https://next-auth.js.org
- Prisma Adapter pour NextAuth : https://authjs.dev/reference/adapter/prisma
- Documentation bcryptjs : https://www.npmjs.com/package/bcryptjs
