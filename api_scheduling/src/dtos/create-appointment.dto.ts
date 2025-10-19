import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1, description: 'ID do paciente' })
  patientId!: number;

  @ApiProperty({ example: 2, description: 'ID do horário' })
  hourId!: number;

  @ApiProperty({ example: '2025-10-22T09:00:00Z' })
  datetime!: string;

  @ApiProperty({ example: 'Consulta de rotina', required: false })
  service?: string;
}
