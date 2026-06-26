import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { Persona } from './persona.interface';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly repo: Repository<Persona>,
  ) {}

  findAll(): Promise<Persona[]> {
    return this.repo.find();
  }

  async create(dto: CreatePersonaDto): Promise<Persona> {
    const existe = await this.repo.findOneBy({ rut: dto.rut });
    if (existe) {
      throw new ConflictException(`ya existe una persona con rut ${dto.rut}`);
    }
    const persona = this.repo.create({
      nombre: dto.nombre,
      rut: dto.rut,
      fechaNacimiento: dto.fechaNacimiento,
      ciudad: dto.ciudad,
      gustos: dto.gustos ?? [],
    });
    return this.repo.save(persona);
  }

  async remove(rut: string): Promise<Persona> {
    const persona = await this.repo.findOneBy({ rut });
    if (!persona) {
      throw new NotFoundException(`no existe una persona con rut ${rut}`);
    }
    await this.repo.remove(persona);
    return persona;
  }
}
