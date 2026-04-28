# Plan Auth — Lab v0.3

## Technologie choisie
NextAuth.js

## Étapes prévues
1. Installer NextAuth : npm install next-auth
2. Créer src/app/api/auth/[...nextauth]/route.ts
3. Configurer le provider credentials (email + mot de passe)
4. Protéger les routes avec middleware
5. Connecter avec la base de données (table User dans Prisma)

## Pages concernées
- /login — formulaire de connexion