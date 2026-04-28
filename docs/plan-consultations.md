# Plan — Formulaire de Consultation

**Projet :** SénSanté
**Auteur :** Le Médecin
**Tag visé :** v0.4 (consultations)

## 1. Champs du formulaire de consultation

| Champ | Type | Obligatoire | Description |
|---|---|---|---|
| patientId | Nombre | Oui | Lien vers le patient |
| date | Date | Oui | Date de la consultation |
| motif | Texte court | Oui | Raison de la consultation |
| symptomes | Texte long | Oui | Description des symptômes |
| tension | Texte | Non | Tension artérielle |
| temperature | Nombre | Non | Température en degré C |
| diagnostic | Texte long | Non | Diagnostic du médecin |
| traitement | Texte long | Non | Traitement prescrit |

## 2. Format des symptômes

Texte libre dans un textarea. Exemple :
Fièvre depuis 3 jours, frissons, maux de tête.

## 3. Étapes prévues

1. Ajouter le modèle Consultation dans schema.prisma
2. Créer API Route consultations (GET + POST)
3. Créer ConsultationForm.tsx
4. Créer la page consultations
