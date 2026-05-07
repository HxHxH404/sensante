import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";
dotenv.config();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const consultations = [
    { patientId: 11, userId: 1, symptomes: "Fièvre, Toux", notes: "Infection respiratoire", date: new Date("2026-01-10") },
    { patientId: 12, userId: 1, symptomes: "Douleur abdominale", notes: "Douleurs abdominales", date: new Date("2026-01-22") },
    { patientId: 13, userId: 1, symptomes: "Maux de tête", notes: "Maux de tête et fatigue", date: new Date("2026-02-05") },
    { patientId: 14, userId: 1, symptomes: "Diarrhée, Fatigue", notes: "Troubles digestifs", date: new Date("2026-02-18") },
    { patientId: 15, userId: 1, symptomes: "Fièvre", notes: "Fièvre 38.5C", date: new Date("2026-03-03") },
    { patientId: 16, userId: 1, symptomes: "Essoufflement, Fièvre", notes: "Difficultés respiratoires", date: new Date("2026-03-15") },
    { patientId: 17, userId: 1, symptomes: "Éruption cutanée", notes: "Éruption généralisée", date: new Date("2026-04-02") },
    { patientId: 18, userId: 1, symptomes: "Douleur thoracique", notes: "Douleurs thoraciques", date: new Date("2026-04-20") },
    { patientId: 19, userId: 1, symptomes: "Diarrhée, Vertiges", notes: "Troubles digestifs", date: new Date("2026-05-01") },
    { patientId: 20, userId: 1, symptomes: "Douleur abdominale", notes: "Douleurs multiples", date: new Date("2026-05-06") },
  ];
  for (const c of consultations) {
    await prisma.consultation.create({ data: { patientId: c.patientId, userId: c.userId, symptomes: c.symptomes, notes: c.notes, statut: "en_attente", date: c.date } });
    console.log("Consultation créée pour patient ID " + c.patientId);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());