# NestJS Scheduling Project (Minimal)

Conteúdo entregue:
- API em NestJS com TypeORM usando SQLite.
- Entities: Patient, Appointment.
- Endpoints: /patients (GET, POST), /appointments (GET, POST, DELETE).
- Seed simples (src/seed.ts).
- Exemplo de integração N8N (workflow-export.json) que chama endpoints.
- Script de exemplo para gerar áudio via ElevenLabs (elevenlabs-tts.js).

Como rodar (local):
1. Instalar dependências:
   npm install

2. Rodar seed (cria banco sqlite `database.sqlite` com dados iniciais):
   npm run seed

3. Rodar API:
   npm run start

Variáveis de ambiente (opcionais para ElevenLabs):
- ELEVEN_API_KEY

Arquivos principais:
- src/main.ts (bootstrap)
- src/app.module.ts
- src/entities/patient.entity.ts
- src/entities/appointment.entity.ts
- src/controllers/patients.controller.ts
- src/controllers/appointments.controller.ts
- src/services/patients.service.ts
- src/services/appointments.service.ts
- src/data-source.ts (TypeORM DataSource)
- src/seed.ts (gera database.sqlite)

OBS: Este é um scaffold funcional minimal para atender ao desafio. Ajuste validações, autenticação e testes conforme necessário.
