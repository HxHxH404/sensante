import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: "postgresql://postgres:postgres123@localhost:5432/sensante" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.patient.createMany({
    data: [
      { nom: "Sow", prenom: "Aminata", dateNaissance: new Date("1990-03-15"), sexe: "F", region: "Dakar", telephone: "771234567" },
      { nom: "Diallo", prenom: "Moussa", dateNaissance: new Date("1985-07-22"), sexe: "M", region: "Thiès", telephone: "782345678" },
      { nom: "Ndiaye", prenom: "Fatou", dateNaissance: new Date("2001-11-05"), sexe: "F", region: "Saint-Louis", telephone: "763456789" },
      { nom: "Fall", prenom: "Ibrahima", dateNaissance: new Date("1978-01-30"), sexe: "M", region: "Ziguinchor", telephone: "701234567" },
      { nom: "Ba", prenom: "Mariama", dateNaissance: new Date("1995-09-10"), sexe: "F", region: "Kaolack", telephone: "771234568" },
    ],
  });
  console.log("✅ 5 patients de test ajoutés !");
}

main().finally(() => prisma.$disconnect());