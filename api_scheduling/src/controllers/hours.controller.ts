import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HoursService } from '../services/hours.service';
import { UpdateHourDto } from '../dtos/update-hour.dto';

@ApiTags('Hours')
@Controller('hours')
export class HoursController {
  constructor(private readonly service: HoursService) {}

  @ApiOperation({ summary: 'Lista todos os horários disponíveis' })
  @ApiResponse({ status: 200, description: 'Lista de horários retornada com sucesso.' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Atualiza a disponibilidade de um horário' })
  @ApiResponse({ status: 200, description: 'Disponibilidade atualizada com sucesso.' })
  @Patch(':id')
  toggle(@Param('id') id: number, @Body() body: UpdateHourDto) {
    return this.service.toggleAvailability(id, body);
  }
}
