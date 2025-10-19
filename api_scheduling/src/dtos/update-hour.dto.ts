import { ApiProperty } from '@nestjs/swagger';

export class UpdateHourDto {
  @ApiProperty({ example: true })
  available!: boolean;
}
