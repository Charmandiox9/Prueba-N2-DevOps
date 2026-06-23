import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  @MinLength(1)
  nombre: string;

  @IsString()
  @Matches(/^\d{7,8}-[\dkK]$/, {
    message: 'rut debe tener formato 12345678-9',
  })
  rut: string;

  @IsDateString()
  fechaNacimiento: string;

  @IsString()
  @MinLength(1)
  ciudad: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gustos?: string[];
}
