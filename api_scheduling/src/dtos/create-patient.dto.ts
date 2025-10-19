import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Maria Oliveira' })
  name!: string;

  @ApiProperty({ example: 'maria@gmail.com', required: false })
  email?: string;
}
