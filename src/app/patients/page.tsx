"use client";

import { useEffect, useState } from "react";

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  region: string;
  telephone: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  async function charger() {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    charger();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Patients</h1>

      {loading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : patients.length === 0 ? (
        <p className="text-gray-500">Aucun patient enregistré.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-400"
            >
              <h3 className="font-bold text-gray-800">
                {p.prenom} {p.nom}
              </h3>
              <p className="text-sm text-gray-500">{p.region}</p>
              <p className="text-sm text-gray-500">{p.telephone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
