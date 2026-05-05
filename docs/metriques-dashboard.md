# Métriques IA — Dashboard SénSanté

> **Auteur** : Le Pilote — Cheikh Tidiane Diop  
> **Préparé pendant** : Lab IA (v0.5)  
> **Utilisé dans** : Lab Dashboard (v0.6)  
> **Complète** : docs/plan-dashboard.md (Lab v0.2)

---

## 1. Contexte

Avec l'intégration de Groq API (Lab v0.5), chaque consultation peut désormais
générer un diagnostic IA avec 4 champs exploitables :
- `diagnosticIa` : texte du pré-diagnostic
- `confiance` : score entre 0 et 100
- `statut` : `en_attente` ou `termine`
- `urgence` : `faible`, `moyen`, `urgent` (dans la réponse Groq)

Ces données permettent d'enrichir le dashboard avec des métriques IA.

---

## 2. Métriques IA retenues pour le dashboard

### 2.1. KPI supplémentaires (cartes chiffrées)

| KPI | Source | Requête Prisma |
|-----|--------|----------------|
| Diagnostics IA générés | `Consultation` | `count({ where: { diagnosticIa: { not: null } } })` |
| Consultations en attente | `Consultation` | `count({ where: { statut: "en_attente" } })` |
| Taux de complétion IA | Calcul | `(diagnostics / total) * 100` |
| Consultations urgentes | `Consultation` | non stocké en base — voir section 3 |

### 2.2. Graphiques IA

1. **Répartition des niveaux d'urgence** — donut (faible / moyen / urgent)  
   ⚠️ L'urgence n'est pas encore stockée dans la base (voir section 3).

2. **Évolution du taux de confiance moyen** — courbe sur 30 jours  
   Requête : `aggregate({ _avg: { confiance: true } })` groupé par date.

3. **Diagnostics les plus fréquents** — barres horizontales, top 10  
   Nécessite un traitement côté serveur (parsing du texte `diagnosticIa`).

4. **Statut des consultations** — barres empilées (en_attente vs terminé)  
   Directement exploitable depuis le champ `statut`.

---

## 3. Problème identifié — urgence non stockée

Le champ `urgence` est retourné par Groq dans la réponse JSON mais
**n'est pas enregistré dans la base de données** lors de la mise à jour
de la consultation (Lab v0.5, API Route `api/ia/diagnostic`).

Seuls `diagnosticIa`, `confiance` et `statut` sont sauvegardés.

### Solution proposée

Ajouter un champ `urgence` au modèle `Consultation` dans `prisma/schema.prisma` :

```prisma
urgence String? // "faible" | "moyen" | "urgent"
```

Et l'enregistrer dans l'API Route :

```typescript
data: {
  diagnosticIa: resultat.diagnostic,
  confiance: resultat.confiance,
  urgence: resultat.urgence,   // ← ajouter cette ligne
  statut: "termine",
}
```

**À coordonner avec L'Oracle** avant le Lab Dashboard (v0.6).

---

## 4. API Route dashboard mise à jour

Complète le plan initial (`docs/plan-dashboard.md`).
La réponse de `/api/dashboard/stats` doit inclure les données IA :

```json
{
  "kpi": {
    "totalPatients": 0,
    "totalConsultations": 0,
    "diagnosticsIA": 0,
    "consultationsEnAttente": 0,
    "tauxCompletionIA": 0
  },
  "parRegion": [...],
  "parSexe": [...],
  "parAge": [...],
  "consultationsParJour": [...],
  "topMotifs": [...],
  "parUrgence": [
    { "urgence": "faible", "total": 0 },
    { "urgence": "moyen", "total": 0 },
    { "urgence": "urgent", "total": 0 }
  ],
  "confianceMoyenne": 0
}
```

---

## 5. Dépendances mises à jour

| Rôle | Ce dont j'ai besoin |
|------|---------------------|
| L'Oracle | Ajouter le champ `urgence` dans le schéma et l'API diagnostic |
| Le Gardien | Modèle `Consultation` mis à jour avec `urgence` |
| L'Architecte | Migration Prisma après ajout du champ `urgence` |

---

## Référence

- Plan initial dashboard : `docs/plan-dashboard.md` (Lab v0.2)
- Roadmap : v0.5 IA → **v0.6 dashboard** → v0.7 → v1.0