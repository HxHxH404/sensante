"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PatientCard from "@/components/PatientCard";
import PatientForm from "@/components/PatientForm";

interface Patient {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: string;
  telephone: string | null;
  adresse: string | null;
  region: string;
}

export default function PatientsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  async function chargerPatients() {
    const res = await fetch("/api/patients");
    if (!res.ok) {
      router.push("/login");
      return;
    }
    const data = await res.json();
    setPatients(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    if (status === "authenticated") {
      chargerPatients();

