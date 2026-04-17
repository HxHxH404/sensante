export default function Sidebar() {
  return (
    <aside className="bg-white w-64 min-h-screen shadow-md p-6 flex flex-col gap-4">
      <nav className="flex flex-col gap-2">
        <a href="#" className="text-teal-700 font-semibold hover:bg-teal-50 px-3 py-2 rounded-lg">
          Tableau de bord
        </a>
        <a href="#" className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
          Patients
        </a>
        <a href="#" className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
          Consultations
        </a>
        <a href="#" className="text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
          Alertes IA
        </a>
      </nav>
    </aside>
  );
}
