import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from '../services/appointments.service';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;
  let mockService = {
    findWithDetails: jest.fn().mockResolvedValue([{ id: 1, paciente: 'João' }]),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [{ provide: AppointmentsService, useValue: mockService }],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
  });

  it('controller deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('findAllDetails deve retornar dados formatados', async () => {
    const result = await controller.findAllDetails();
    expect(result).toEqual([{ id: 1, paciente: 'João' }]);
    expect(mockService.findWithDetails).toHaveBeenCalled();
  });
});
