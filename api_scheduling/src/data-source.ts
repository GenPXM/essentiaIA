import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { Appointment } from './entities/appointment.entity';
import { Hour } from './entities/hour.entity';
import * as dotenv from 'dotenv';

dotenv.config();
export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Patient, Appointment, Hour],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
