import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });
async function main() {
  const patients = [
    { nom: "Diallo", prenom: "Fatou", dateNaissance: new Date("1990-03-15"), region: "Dakar", telephone: "771234501", sexe: "F" },
    { nom: "Ndiaye", prenom: "Moussa", dateNaissance: new Date("1985-07-22"), region: "Thies", telephone: "771234502", sexe: "M" },
    { nom: "Sarr", prenom: "Aminata", dateNaissance: new Date("2000-01-10"), region: "Dakar", telephone: "771234503", sexe: "F" },
    { nom: "Fall", prenom: "Ibrahima", dateNaissance: new Date("1978-11-05"), region: "Saint-Louis", telephone: "771234504", sexe: "M" },
    { nom: "Sow", prenom: "Mariama", dateNaissance: new Date("1995-06-30"), region: "Ziguinchor", telephone: "771234505", sexe: "F" },
    { nom: "Ba", prenom: "Oumar", dateNaissance: new Date("1982-09-18"), region: "Thies", telephone: "771234506", sexe: "M" },
    { nom: "Diop", prenom: "Rokhaya", dateNaissance: new Date("1998-04-25"), region: "Dakar", telephone: "771234507", sexe: "F" },
    { nom: "Mbaye", prenom: "Cheikh", dateNaissance: new Date("1970-12-03"), region: "Kaolack", telephone: "771234508", sexe: "M" },
    { nom: "Gueye", prenom: "Aissatou", dateNaissance: new Date("1993-08-14"), region: "Dakar", telephone: "771234509", sexe: "F" },
    { nom: "Diouf", prenom: "Abdoulaye", dateNaissance: new Date("1988-02-28"), region: "Saint-Louis", telephone: "771234510", sexe: "M" },
  ];
  for (const p of patients) {
    await prisma.patient.create({ data: p });
    console.log("Cree : " + p.prenom + " " + p.nom + " - " + p.region);
  }
  console.log("10 patients crees (Le Gardien)");
}
main().catch(console.error).finally(() => prisma.$disconnect());
