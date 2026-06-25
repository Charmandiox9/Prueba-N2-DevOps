import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './persona.interface';
import { PersonasController } from './personas.controller';
import { PersonasService } from './personas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Persona])],
  controllers: [PersonasController],
  providers: [PersonasService],
})
export class PersonasModule {}