# Plan IA — L'Oracle

## Objectif
Intégrer l'API Groq (Llama 3) dans SénSanté pour analyser les symptômes
des patients et proposer un pré-diagnostic automatique.

## Compte Groq
- Plateforme : https://console.groq.com
- Modèle utilisé : llama-3.3-70b-versatile
- Clé API : stockée dans .env (variable GROQ_API_KEY)

## Test curl réussi
Commande testée :
curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "llama-3.3-70b-versatile", "messages": [...]}'

Réponse obtenue : "Le patient présente des symptômes qui pourraient être
liés à une infection respiratoire, telle qu'une grippe ou une pneumonie."

## Format des symptômes envoyés à l'IA
Les symptômes sont un tableau JSON stocké dans la base de données :
["Fièvre", "Toux", "Fatigue"]

Ce tableau sera envoyé à Groq sous forme de prompt :
"Le patient présente les symptômes suivants : Fièvre, Toux, Fatigue.
Propose un pré-diagnostic et une recommandation en 2 phrases."

## Réponse attendue de l'IA
- diagnosticIa : string (ex: "Suspicion de paludisme")
- confiance : number (ex: 78)
- niveau : string (urgent | modere | faible)

## Étapes prévues (Lab IA — v0.5)
1. Créer src/lib/groq.ts avec la configuration du client Groq
2. Créer l'API Route src/app/api/ia/route.ts (POST)
3. Appeler Groq avec les symptômes de la consultation
4. Stocker le diagnostic dans la base de données
5. Afficher le résultat dans la page Consultations

## Variables d'environnement nécessaires
GROQ_API_KEY="votre-clé-api-groq"
