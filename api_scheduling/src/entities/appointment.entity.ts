import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  datetime!: string;

  @Column({ nullable: true })
  service!: string;

  @ManyToOne(() => Patient, p => p.appointments, { eager: true })
  patient!: Patient;
}
