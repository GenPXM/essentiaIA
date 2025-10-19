import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('hours')
export class Hour {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: '09:00' })
  @Column({ type: 'varchar', length: 5 })
  start_time!: string;

  @ApiProperty({ example: '09:30' })
  @Column({ type: 'varchar', length: 5 })
  end_time!: string;

  @ApiProperty({ example: true })
  @Column({ default: true })
  available!: boolean;

  @OneToMany(() => Appointment, (appt) => appt.hour)
  appointments!: Appointment[];
}
