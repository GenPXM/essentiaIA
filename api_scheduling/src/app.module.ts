import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Appointment } from './entities/appointment.entity';
import { PatientsController } from './controllers/patients.controller';
import { AppointmentsController } from './controllers/appointments.controller';
import { PatientsService } from './services/patients.service';
import { AppointmentsService } from './services/appointments.service';
import { AppDataSource } from './data-source';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TtsController } from './tts/tts.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...(AppDataSource.options as any), isGlobal: true }),
    TypeOrmModule.forFeature([Patient, Appointment]),
    AuthModule,
  ],
  controllers: [PatientsController, AppointmentsController,TtsController],
  providers: [PatientsService, AppointmentsService],
})
export class AppModule {}
