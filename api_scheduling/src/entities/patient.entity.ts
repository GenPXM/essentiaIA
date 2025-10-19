import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('patients')
export class Patient {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @ApiProperty({ example: 'João Silva' })
  @Column()
  name!: string;

  @ApiProperty({ example: 'joao@email.com', required: false })
  @Column({ nullable: true, unique: false })
  email?: string;

  @OneToMany(() => Appointment, (a) => a.patient)
  appointments!: Appointment[];
}
