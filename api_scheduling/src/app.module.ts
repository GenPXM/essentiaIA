import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Patient } from './entities/patient.entity';
import { Hour } from './entities/hour.entity';
import { AppointmentsController } from './controllers/appointments.controller';
import { PatientsController } from './controllers/patients.controller';
import { HoursController } from './controllers/hours.controller';
import { AppointmentsService } from './services/appointments.service';
import { PatientsService } from './services/patients.service';
import { HoursService } from './services/hours.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      entities: [Appointment, Patient, Hour],
      synchronize: true,
      logging: false,
    }),
    TypeOrmModule.forFeature([Appointment, Patient, Hour]),
  ],
  controllers: [AppointmentsController, PatientsController, HoursController],
  providers: [AppointmentsService, PatientsService, HoursService],
})
export class AppModule {}
