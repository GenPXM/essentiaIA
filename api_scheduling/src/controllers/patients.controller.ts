import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatientsService } from '../services/patients.service';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly service: PatientsService) {}

  @ApiOperation({ summary: 'Lista todos os pacientes' })
  @ApiResponse({ status: 200, description: 'Lista de pacientes retornada com sucesso.' })
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Cria um novo paciente' })
  @ApiResponse({ status: 201, description: 'Paciente criado com sucesso.' })
  @Post()
  async create(@Body() body: { name: string; email?: string }) {
    return this.service.create(body);
  }
}
