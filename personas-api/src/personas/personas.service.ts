import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { Persona } from './persona.interface';

@Injectable()
export class PersonasService {
  private personas: Persona[] = [];

  findAll(): Persona[] {
    return this.personas;
  }

  create(dto: CreatePersonaDto): Persona {
    const existe = this.personas.find((p) => p.rut === dto.rut);
    if (existe) {
      throw new ConflictException(`ya existe una persona con rut ${dto.rut}`);
    }
    const persona: Persona = {
      nombre: dto.nombre,
      rut: dto.rut,
      fechaNacimiento: dto.fechaNacimiento,
      ciudad: dto.ciudad,
      gustos: dto.gustos ?? [],
    };
    this.personas.push(persona);
    return persona;
  }

  remove(rut: string): Persona {
    const index = this.personas.findIndex((p) => p.rut === rut);
    if (index === -1) {
      throw new NotFoundException(`no existe una persona con rut ${rut}`);
    }
    const [removed] = this.personas.splice(index, 1);
    return removed;
  }

  reset(): void {
    this.personas = [];
  }
}
