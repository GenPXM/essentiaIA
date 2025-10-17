import { DataSource } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { Appointment } from './entities/appointment.entity';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.join(__dirname, '..', 'database.sqlite'),
  entities: [Patient, Appointment],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
