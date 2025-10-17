import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Delete, 
  Param, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppointmentsService } from '../services/appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  @ApiOperation({ summary: 'Lista todos os agendamentos' })
  @ApiResponse({ status: 200, description: 'Lista de agendamentos retornada com sucesso.' })
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Cria um novo agendamento' })
  @ApiResponse({ status: 201, description: 'Agendamento criado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token JWT ausente ou inválido.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: { patientId: number; datetime: string; service?: string },
    @Request() req: any,
  ) {
    return this.service.create(body);
  }

  @ApiOperation({ summary: 'Remove um agendamento pelo ID' })
  @ApiResponse({ status: 200, description: 'Agendamento removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado.' })
  @ApiResponse({ status: 401, description: 'Token JWT ausente ou inválido.' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
