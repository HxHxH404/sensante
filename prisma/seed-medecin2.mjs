import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({ connectionString: "postgresql://postgres:passer123@localhost:5432/sensante" });
const prisma = new PrismaClient({ adapter });
async function main() {
  const consultations = [
    { patientId: 1, symptomes: ["Fievre", "Toux"], notes: "Infection respiratoire", date: new Date("2026-01-10") },
    { patientId: 1, symptomes: ["Douleur abdominale"], notes: "Douleurs abdominales", date: new Date("2026-01-22") },
    { patientId: 2, symptomes: ["Maux de tete"], notes: "Maux de tete et fatigue", date: new Date("2026-02-05") },
    { patientId: 2, symptomes: ["Diarrhee", "Fatigue"], notes: "Troubles digestifs", date: new Date("2026-02-18") },
    { patientId: 3, symptomes: ["Fievre"], notes: "Fievre 38.5C", date: new Date("2026-03-03") },
    { patientId: 3, symptomes: ["Essoufflement", "Fievre"], notes: "Difficultes respiratoires", date: new Date("2026-03-15") },
    { patientId: 1, symptomes: ["Eruption cutanee"], notes: "Eruption generalisee", date: new Date("2026-04-02") },
    { patientId: 2, symptomes: ["Douleur thoracique"], notes: "Douleurs thoraciques", date: new Date("2026-04-20") },
    { patientId: 3, symptomes: ["Diarrhee", "Vertiges"], notes: "Troubles digestifs", date: new Date("2026-05-01") },
    { patientId: 1, symptomes: ["Douleur abdominale"], notes: "Douleurs multiples", date: new Date("2026-05-06") },
  ];
  for (const c of consultations) {
    await prisma.consultation.create({ data: { patientId: c.patientId, userId: 1, symptomes: c.symptomes, notes: c.notes, statut: "en_attente", date: c.date } });
    console.log("Consultation creee pour patient ID " + c.patientId);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
