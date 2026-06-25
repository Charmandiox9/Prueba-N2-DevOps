import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonasModule } from './personas/personas.module';
import { Persona } from './personas/persona.interface';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Persona],
      synchronize: true, // crea la tabla automaticamente (no usar en produccion real)
    }),
    PersonasModule,
  ],
})
export class AppModule {}
