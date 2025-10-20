import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointment } from '../entities/appointment.entity';
import { Patient } from '../entities/patient.entity';
import { Hour } from '../entities/hour.entity';
import { Repository } from 'typeorm';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let appointmentRepo: Repository<Appointment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: { find: jest.fn(), save: jest.fn(), delete: jest.fn() },
        },
        {
          provide: getRepositoryToken(Patient),
          useValue: { findOneBy: jest.fn() },
        },
        {
          provide: getRepositoryToken(Hour),
          useValue: { findOneBy: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    appointmentRepo = module.get(getRepositoryToken(Appointment));
  });

  it('service deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar lista formatada (findWithDetails)', async () => {
    jest.spyOn(appointmentRepo, 'find').mockResolvedValue([
      {
        id: 1,
        service: 'Consulta',
        datetime: '2025-10-22T10:00:00.000Z',
        patient: { name: 'João', email: 'joao@teste.com' },
        hour: null,
      } as any,
    ]);

    const response = await service.findWithDetails();
    expect(response[0]).toEqual({
      id: 1,
      paciente: 'João',
      email: 'joao@teste.com',
      servico: 'Consulta',
      data: expect.any(String),
      hora: expect.any(String),
    });
  });
});
