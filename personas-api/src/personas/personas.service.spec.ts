import { ConflictException, NotFoundException } from '@nestjs/common';
import { PersonasService } from './personas.service';

describe('PersonasService', () => {
  let service: PersonasService;

  beforeEach(() => {
    service = new PersonasService();
  });

  it('inicia con la lista vacia', () => {
    expect(service.findAll()).toEqual([]);
  });

  it('agrega una persona con gustos', () => {
    const persona = service.create({
      nombre: 'Ana Perez',
      rut: '12345678-9',
      fechaNacimiento: '1990-05-10',
      ciudad: 'Santiago',
      gustos: ['empanadas', 'ajedrez'],
    });
    expect(persona).toMatchObject({
      nombre: 'Ana Perez',
      rut: '12345678-9',
      gustos: ['empanadas', 'ajedrez'],
    });
    expect(service.findAll()).toHaveLength(1);
  });

  it('agrega una persona sin gustos y deja la lista vacia', () => {
    const persona = service.create({
      nombre: 'Pedro Diaz',
      rut: '33333333-3',
      fechaNacimiento: '1995-07-07',
      ciudad: 'Temuco',
    });
    expect(persona.gustos).toEqual([]);
  });

  it('lanza ConflictException si el rut ya existe', () => {
    service.create({
      nombre: 'Ana Perez',
      rut: '12345678-9',
      fechaNacimiento: '1990-05-10',
      ciudad: 'Santiago',
    });
    expect(() =>
      service.create({
        nombre: 'Otra Persona',
        rut: '12345678-9',
        fechaNacimiento: '1991-01-01',
        ciudad: 'Talca',
      }),
    ).toThrow(ConflictException);
  });

  it('elimina una persona existente por rut', () => {
    service.create({
      nombre: 'Maria Lopez',
      rut: '22222222-2',
      fechaNacimiento: '1992-03-03',
      ciudad: 'Concepcion',
    });
    const removed = service.remove('22222222-2');
    expect(removed.rut).toBe('22222222-2');
    expect(service.findAll()).toHaveLength(0);
  });

  it('lanza NotFoundException si el rut no existe', () => {
    expect(() => service.remove('99999999-9')).toThrow(NotFoundException);
  });
});
