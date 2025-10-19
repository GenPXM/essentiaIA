import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Appointment } from "../entities/appointment.entity";
import { Patient } from "../entities/patient.entity";
import { Hour } from "../entities/hour.entity";
import { CreateAppointmentDto } from "../dtos/create-appointment.dto";
import { UpdateAppointmentDto } from "@/dtos/update-appointment.dto";

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    @InjectRepository(Hour)
    private readonly hourRepo: Repository<Hour>
  ) {}

  async create(data: CreateAppointmentDto) {
    const patient = await this.patientRepo.findOneBy({ id: data.patientId });
    if (!patient) throw new NotFoundException("Paciente não encontrado");

    const hour = await this.hourRepo.findOneBy({ id: data.hourId });
    if (!hour) throw new NotFoundException("Horário não encontrado");

    const appt = this.repo.create({
      datetime: data.datetime,
      service: data.service,
      patient,
      hour,
    });

    return this.repo.save(appt);
  }

  async findWithDetails() {
    const appointments = await this.repo.find({
      relations: ["patient", "hour"],
    });

    return appointments.map((a) => ({
      id: a.id,
      paciente: a.patient?.name ?? "Não informado",
      email: a.patient?.email ?? "-",
      servico: a.service,
      data: a.datetime ? new Date(a.datetime).toLocaleDateString("pt-BR") : "-",
      hora: a.datetime
        ? new Date(a.datetime).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : a.hour
        ? `${a.hour.start_time} - ${a.hour.end_time}`
        : "-",
    }));
  }

  async update(id: number, data: UpdateAppointmentDto) {
    const appt = await this.repo.findOne({
      where: { id },
      relations: ["patient", "hour"],
    });
    if (!appt) throw new NotFoundException("Agendamento não encontrado");

    if (data.patientId) {
      const patient = await this.patientRepo.findOneBy({ id: data.patientId });
      if (!patient) throw new NotFoundException("Paciente não encontrado");
      appt.patient = patient;
    }

    if (data.hourId) {
      const hour = await this.hourRepo.findOneBy({ id: data.hourId });
      if (!hour) throw new NotFoundException("Horário não encontrado");
      appt.hour = hour;
    }

    if (data.service) appt.service = data.service;
    if (data.datetime) appt.datetime = data.datetime;

    return this.repo.save(appt);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("Agendamento não encontrado");
    }
    return { deleted: true, id };
  }
}
