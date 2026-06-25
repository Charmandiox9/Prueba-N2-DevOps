import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  rut: string;

  @Column({ name: 'fecha_nacimiento' })
  fechaNacimiento: string;

  @Column()
  ciudad: string;

  @Column('text', { array: true, default: [] })
  gustos: string[];
}
