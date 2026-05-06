import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const patients = [
    { nom: "Diallo", prenom: "Fatou", dateNaissance: new Date("1990-03-15"), region: "Dakar", telephone: "771234501" },
    { nom: "Ndiaye", prenom: "Moussa", dateNaissance: new Date("1985-07-22"), region: "Thiès", telephone: "771234502" },
    { nom: "Sarr", prenom: "Aminata", dateNaissance: new Date("2000-01-10"), region: "Dakar", telephone: "771234503" },
    { nom: "Fall", prenom: "Ibrahima", dateNaissance: new Date("1978-11-05"), region: "Saint-Louis", telephone: "771234504" },
    { nom: "Sow", prenom: "Mariama", dateNaissance: new Date("1995-06-30"), region: "Ziguinchor", telephone: "771234505" },

