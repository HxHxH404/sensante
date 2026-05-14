"use client";

import { useSession } from "next-auth/react";

export default function ProfilPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Mon profil
        </h1>
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Mon profil
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
        <p className="text-gray-600">
          <strong>Nom :</strong> {session?.user?.name || "Non renseigné"}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Email :</strong> {session?.user?.email || "Non renseigné"}
        </p>
        <p className="text-gray-600 mt-2">
          <strong>Rôle :</strong> Agent de santé
        </p>
      </div>
    </div>
  );
}
