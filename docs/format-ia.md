# Format des données pour l'IA — L'Oracle

## Contexte
Ce document décrit le format des symptômes envoyés à l'API Groq
et la structure de la réponse attendue pour le Lab IA (v0.5).

## Format des symptômes (entrée)
Les symptômes sont stockés en JSON dans la table Consultation :
```json
["Fièvre", "Toux", "Fatigue", "Maux de tête"]
```

## Prompt envoyé à Groq## Format de la réponse (sortie)
```json
{
  "diagnostic": "Suspicion de paludisme",
  "confiance": 78,
  "niveau": "urgent",
  "recommandation": "Orienter vers un centre de santé"
}
```

## Champs stockés dans la base de données
- diagnosticIa : string — le diagnostic proposé
- confiance : number — niveau de confiance (0-100)
- statut : "termine" après analyse IA

## Modèle utilisé
- Plateforme : Groq
- Modèle : llama-3.3-70b-versatile
- Testé avec succès le 24 avril 2026
