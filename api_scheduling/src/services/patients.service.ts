import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from '../dtos/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly repo: Repository<Patient>,
  ) {}

  async findAll() {
    return this.repo.find();
  }

  async create(data: CreatePatientDto) {
    const patient = this.repo.create(data);
    return this.repo.save(patient);
  }
}
