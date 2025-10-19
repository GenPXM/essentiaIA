import AppDataSource from "./data-source";
import { Patient } from "./entities/patient.entity";
import { Appointment } from "./entities/appointment.entity";
import { Hour } from "./entities/hour.entity";
import * as dotenv from "dotenv";

dotenv.config();

async function run() {
  console.log("Iniciando seed do banco de dados...");

  try {

    await AppDataSource.initialize();
    console.log("Conectado ao banco.")
    console.log("🧹 Limpando tabelas...");
    await AppDataSource.query(
      `TRUNCATE TABLE "appointments", "patients", "hours" RESTART IDENTITY CASCADE;`
    );
    console.log("Tabelas limpas.");

    const pRepo = AppDataSource.getRepository(Patient);
    const aRepo = AppDataSource.getRepository(Appointment);
    const hRepo = AppDataSource.getRepository(Hour);

    console.log("👤 Criando pacientes...");
    const p1 = pRepo.create({ name: "João Silva", email: "joao@example.com" });
    const p2 = pRepo.create({ name: "Maria Oliveira", email: "maria@example.com" });
    await pRepo.save([p1, p2]);
    console.log("Pacientes criados!");
    console.log("Criando horários...");
    const hours = [
      { start_time: "09:00", end_time: "09:30", available: true },
      { start_time: "09:30", end_time: "10:00", available: true },
      { start_time: "10:00", end_time: "10:30", available: true },
      { start_time: "10:30", end_time: "11:00", available: true },
      { start_time: "11:00", end_time: "11:30", available: true },
      { start_time: "14:00", end_time: "14:30", available: true },
      { start_time: "14:30", end_time: "15:00", available: true },
      { start_time: "15:00", end_time: "15:30", available: true },
    ];
    const hEntities = hRepo.create(hours);
    await hRepo.save(hEntities);
    console.log("Horários criados!");

    console.log("Criando agendamentos...");
    const a1 = aRepo.create({
      service: "Consulta de rotina",
      datetime: "2025-10-22T09:00:00Z",
      patient: p1,
      hour: hEntities[0],
    });

    const a2 = aRepo.create({
      service: "Retorno médico",
      datetime: "2025-10-22T10:00:00Z",
      patient: p2,
      hour: hEntities[2], 
    });

    await aRepo.save([a1, a2]);
    console.log("Agendamentos criados com sucesso!");

    console.log("Seed finalizado!");
  } catch (err) {
    console.error("Erro ao rodar o seed:", err);
  } finally {
    await AppDataSource.destroy();
    process.exit(0);
  }
}

run();
