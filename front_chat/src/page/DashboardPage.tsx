import React, { useEffect, useState, type ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Table from "../components/Table";
import { AppointmentsService } from "../services/appointmentsService";
import { PatientService } from "../services/patientsService";

interface Appointment {
  id: number;
  paciente: string;
  email: string;
  servico: string;
  data: string;
  hora: string;
}

interface Patient {
  id: number;
  name: string;
  email?: string;
}

const DashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  const loadData = async () => {
    const [appointmentsData, patientsData] = await Promise.all([
      AppointmentsService.getAll(),
      PatientService.getAll(),
    ]);
    setAppointments(appointmentsData);
    setPatients(patientsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (row: Record<string, ReactNode>) => {
    const id = Number(row.id);
    if (confirm(`Excluir agendamento #${id}?`)) {
      await AppointmentsService.delete(id);
      loadData();
    }
  };

  const patientsTableData: Record<string, ReactNode>[] = patients.map((p) => ({
    id: p.id,
    name: p.name,
    email: p.email ?? "-",
  }));

  const appointmentsTableData: Record<string, ReactNode>[] = appointments.map(
    (a) => ({
      id: a.id,
      paciente: a.paciente,
      email: a.email,
      servico: a.servico,
      data: a.data,
      hora: a.hora,
    })
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Header title="Acompanhamento de Agendamentos" />

        <h3 className="text-xl font-semibold mt-6 mb-2">Pacientes</h3>
        <Table columns={["id", "name", "email"]} data={patientsTableData} />

        <h3 className="text-xl font-semibold mt-6 mb-2">Agendamentos</h3>
        <Table
          columns={["id", "paciente", "email", "servico", "data", "hora"]}
          data={appointmentsTableData}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
