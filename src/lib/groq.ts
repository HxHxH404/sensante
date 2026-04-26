// src/lib/groq.ts — L'Oracle
// Configuration du client Groq pour le diagnostic IA
// Sera complété dans le Lab IA (v0.5)

// Modèle utilisé : llama-3.3-70b-versatile
// Documentation : https://console.groq.com/docs

export const GROQ_MODEL = "llama-3.3-70b-versatile";
export const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// TODO (Lab IA — v0.5) :
// 1. Implémenter la fonction analyserSymptomes(symptomes: string[])
// 2. Appeler l'API Groq avec les symptômes
// 3. Parser la réponse et retourner diagnosticIa + confiance + niveau
