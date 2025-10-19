import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from './patient.entity';
import { Hour } from './hour.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('appointments')
export class Appointment {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({ example: '2025-10-22T09:00:00Z' })
  @Column({ nullable: true })
  datetime?: string;

  @ApiProperty({ example: 'Consulta odontológica' })
  @Column({ nullable: true })
  service!: string;

  @ManyToOne(() => Patient, (p) => p.appointments, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient!: Patient;

  @ManyToOne(() => Hour, (h) => h.appointments, { eager: true })
  @JoinColumn({ name: 'hour_id' })
  hour!: Hour;
}
