import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { PersonasService } from './personas.service';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Get()
  findAll() {
    return this.personasService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personasService.create(createPersonaDto);
  }

  @Delete(':rut')
  remove(@Param('rut') rut: string) {
    return this.personasService.remove(rut);
  }
}
