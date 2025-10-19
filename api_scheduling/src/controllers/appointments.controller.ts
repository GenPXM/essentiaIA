import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AppointmentsService } from "../services/appointments.service";
import { CreateAppointmentDto } from "../dtos/create-appointment.dto";
import { UpdateAppointmentDto } from "@/dtos/update-appointment.dto";

@ApiTags("Appointments")
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly service: AppointmentsService) {}

  // @ApiOperation({ summary: 'Lista todos os agendamentos' })
  // @ApiResponse({ status: 200, description: 'Lista de agendamentos retornada com sucesso.' })
  // @Get()
  // findAll() {
  //   return this.service.findAll();
  // }

  @ApiOperation({
    summary: "Lista agendamentos com dados de paciente e horário",
  })
  @ApiResponse({ status: 200 })
  @Get()
  async findAllDetails() {
    return this.service.findWithDetails();
  }

  @ApiOperation({ summary: "Cria um novo agendamento" })
  @ApiResponse({ status: 201, description: "Agendamento criado com sucesso." })
  @Post()
  create(@Body() body: CreateAppointmentDto) {
    return this.service.create(body);
  }

  @ApiOperation({ summary: "Edita um agendamento pelo ID" })
  @Patch(":id")
  update(@Param("id") id: number, @Body() body: UpdateAppointmentDto) {
    return this.service.update(id, body);
  }
  @ApiOperation({ summary: "Remove um agendamento pelo ID" })
  @ApiResponse({
    status: 200,
    description: "Agendamento removido com sucesso.",
  })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.service.remove(id);
  }
}
