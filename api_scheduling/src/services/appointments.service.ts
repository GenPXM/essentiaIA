import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,

    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async findAll() {
    return this.repo.find({ relations: ['patient'] });
  }

  async create(data: { patientId: number; datetime: string; service?: string }) {
    const patient = await this.patientRepo.findOneBy({ id: data.patientId });
    if (!patient) throw new Error('Patient not found');
    const appt = this.repo.create({ datetime: data.datetime, service: data.service, patient });
    return this.repo.save(appt);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true, id };
  }
}
