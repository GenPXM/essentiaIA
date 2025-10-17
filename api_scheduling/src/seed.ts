import AppDataSource from './data-source';
import { Patient } from './entities/patient.entity';
import { Appointment } from './entities/appointment.entity';
import * as bcrypt from 'bcryptjs';

async function run() {
  await AppDataSource.initialize();
  const pRepo = AppDataSource.getRepository(Patient);
  const aRepo = AppDataSource.getRepository(Appointment);

  const pass1 = await bcrypt.hash('senha123', 10);
  const pass2 = await bcrypt.hash('senha456', 10);

  const p1 = pRepo.create({ name: 'João Silva', email: 'joao@example.com', password: pass1 });
  const p2 = pRepo.create({ name: 'Maria Oliveira', email: 'maria@example.com', password: pass2 });
  await pRepo.save([p1, p2]);

  const a1 = aRepo.create({ datetime: new Date().toISOString(), service: 'Consulta geral', patient: p1 });
  const a2 = aRepo.create({ datetime: new Date(Date.now()+3600*1000).toISOString(), service: 'Retorno', patient: p2 });
  await aRepo.save([a1,a2]);

  console.log('Seed finished. DB path:', (AppDataSource.options as any).database);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
