# Plan Dashboard — SénSanté

> **Auteur** : Le Pilote
> **Tag visé** : v0.6 (dashboard)
> **Statut** : Document de planification — préparé pendant le Lab Patients (v0.2)
> **Dépend de** : v0.2 patients, v0.4 consultations, v0.5 IA

---

## 1. Objectif

Offrir une **vue d'ensemble** de l'activité de SénSanté : combien de patients, combien
de consultations, où, quand, et que dit l'IA ? Le dashboard est la **page d'accueil
décisionnelle** de l'application — celle qu'on ouvre en premier pour savoir ce qui se
passe.

Il ne crée pas de données : il **agrège** ce que les autres rôles produisent
(patients, consultations, diagnostics IA).

## 2. Public cible

Le dashboard s'adresse **aux soignants et au responsable de structure** qui utilisent
SénSanté. Une seule vue commune au départ ; une séparation soignant / admin pourra être
ajoutée après v1.0 si le besoin se confirme.

## 3. Métriques retenues

### 3.1. KPI en haut de page (cartes chiffrées)

| KPI                              | Source                       | Requête Prisma                           |
| -------------------------------- | ---------------------------- | ---------------------------------------- |
| Total patients                   | `Patient`                    | `prisma.patient.count()`                 |
| Total consultations              | `Consultation` (v0.4)        | `prisma.consultation.count()`            |
| Consultations cette semaine      | `Consultation`               | `count()` avec filtre `createdAt >= ...` |
| Diagnostics IA générés           | `Consultation` (v0.5)        | `count({ where: { iaDiagnostic: ... }})` |

### 3.2. Graphiques

1. **Répartition des patients par région** — barres horizontales (14 régions du
   Sénégal). Utile pour voir la couverture géographique.
2. **Répartition par sexe** — donut (F / M). Lisible et rapide.
3. **Pyramide des âges** — barres par tranche (0–17, 18–34, 35–59, 60+). L'âge est
   calculé depuis `dateNaissance` côté serveur.
4. **Évolution des consultations dans le temps** — courbe par jour sur les 30 derniers
   jours. Permet de repérer les pics d'activité.
5. **Top motifs / symptômes** — barres horizontales, top 10. Dépend du format choisi
   par Le Médecin pour les symptômes (à coordonner).

### 3.3. Métriques *non retenues* pour la v0.6

- Carte du Sénégal coloriée par densité de patients : intéressant mais demande une
  bibliothèque cartographique → reporté après v1.0.
- Taux de fiabilité de l'IA : pas de feedback utilisateur prévu en v1.0 → pas
  mesurable.

## 4. Choix techniques

### 4.1. Bibliothèque de graphiques : **Recharts**

Justification :

- Écrite pour React → s'intègre naturellement dans les composants Next.js du projet.
- API déclarative simple, cohérente avec le style React déjà utilisé dans le lab
  (`PatientForm`, `PatientsPage`).
- Léger et suffisant pour les 5 graphiques prévus — pas besoin d'une artillerie
  comme D3.
- Style facilement adaptable avec Tailwind (déjà présent dans le projet).

Installation prévue :

```bash
npm install recharts
```

### 4.2. Récupération des données

- Une **API Route unique** `GET /api/dashboard/stats` qui renvoie un objet JSON
  contenant tous les KPI et données agrégées en un seul appel.
- Évite 5 fetchs séparés et facilite l'état de chargement côté client.
- Toutes les agrégations se font côté serveur via Prisma (`count`, `groupBy`).

Esquisse de la réponse :

```json
{
  "kpi": {
    "totalPatients": 0,
    "totalConsultations": 0,
    "consultationsCetteSemaine": 0,
    "diagnosticsIA": 0
  },
  "parRegion": [{ "region": "Dakar", "total": 0 }, ...],
  "parSexe": [{ "sexe": "F", "total": 0 }, { "sexe": "M", "total": 0 }],
  "parAge": [{ "tranche": "0-17", "total": 0 }, ...],
  "consultationsParJour": [{ "date": "2026-04-01", "total": 0 }, ...],
  "topMotifs": [{ "motif": "...", "total": 0 }, ...]
}
```

### 4.3. Page

- Fichier : `src/app/dashboard/page.tsx`
- `"use client"` car les graphiques Recharts sont interactifs.
- `useEffect` au chargement pour appeler `/api/dashboard/stats`, sur le même modèle
  que la page Patients du Lab v0.2.

## 5. Wireframe (structure de page)

```
+--------------------------------------------------------------+
|  Dashboard                                                   |
+--------------------------------------------------------------+
|  [Patients]  [Consultations]  [Cette semaine]  [Diag IA]    |  <- 4 cartes KPI
+--------------------------------------------------------------+
|                                                              |
|  Évolution des consultations (30 derniers jours)             |  <- ligne, pleine largeur
|  ────────────────────────────────                            |
|                                                              |
+----------------------------+---------------------------------+
|                            |                                 |
|  Patients par région       |  Répartition par sexe           |
|  (barres horizontales)     |  (donut)                        |
|                            |                                 |
+----------------------------+---------------------------------+
|                            |                                 |
|  Pyramide des âges         |  Top motifs / symptômes         |
|  (barres)                  |  (barres horizontales, top 10)  |
|                            |                                 |
+----------------------------+---------------------------------+
```

Sur mobile : tout passe en une seule colonne (Tailwind `grid-cols-1 md:grid-cols-2`).

## 6. Étapes d'implémentation (lab v0.6)

1. Installer Recharts.
2. Créer `src/app/api/dashboard/stats/route.ts` (GET) — agrégations Prisma.
3. Créer la page `src/app/dashboard/page.tsx` avec les 4 cartes KPI + état de
   chargement.
4. Ajouter chaque graphique un par un, en testant à chaque étape.
5. Ajouter le lien "Dashboard" dans le layout principal (coordination avec
   L'Architecte).
6. Commit + push + PR.

## 7. Dépendances avec les autres rôles

| Rôle           | Ce dont j'ai besoin                                              |
| -------------- | ---------------------------------------------------------------- |
| Le Gardien     | Modèle `Patient` finalisé (déjà fait en v0.2). ✓                 |
| Le Médecin     | Modèle `Consultation` + format des symptômes/motifs (v0.4).      |
| L'Oracle       | Champ stockant le diagnostic IA dans `Consultation` (v0.5).      |
| Le Bouclier    | Authentification active : le dashboard doit être protégé (v0.3). |
| L'Architecte   | Lien "Dashboard" dans le menu / layout principal.                |

## 8. Risques et questions ouvertes

- **Format des symptômes** : tableau de chaînes ? texte libre ? Le top motifs dépend
  de cette décision (à clarifier avec Le Médecin avant v0.4).
- **Performance** : pour quelques centaines de patients, les `count` et `groupBy`
  sont instantanés. Si on dépasse 100 000 lignes plus tard, prévoir des index ou un
  cache — pas un problème en v1.0.
- **Vide initial** : à la livraison, la base sera quasi vide. Prévoir des messages
  "Aucune donnée pour l'instant" plutôt que des graphiques vides moches.

---

## Référence

- Roadmap : v0 → v0.1 → v0.2 → v0.3 → v0.4 → v0.5 → **v0.6 (dashboard)** → v0.7 → v1.0
- Recharts : https://recharts.org
- Lab Patients (v0.2) : sert de modèle pour la structure page + API Route + fetch.
