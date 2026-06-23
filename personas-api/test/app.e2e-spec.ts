import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('PersonasController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /personas retorna lista vacia al inicio', async () => {
    const res = await request(app.getHttpServer()).get('/personas');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('flujo completo POST -> GET -> DELETE -> GET', async () => {
    const server = app.getHttpServer();

    await request(server)
      .post('/personas')
      .send({
        nombre: 'Ana Perez',
        rut: '12345678-9',
        fechaNacimiento: '1990-05-10',
        ciudad: 'Santiago',
        gustos: ['empanadas'],
      })
      .expect(201);

    await request(server)
      .post('/personas')
      .send({
        nombre: 'Juan Soto',
        rut: '11111111-1',
        fechaNacimiento: '1985-01-01',
        ciudad: 'Valparaiso',
        gustos: ['ajedrez'],
      })
      .expect(201);

    const getRes1 = await request(server).get('/personas');
    expect(getRes1.body).toHaveLength(2);

    await request(server).delete('/personas/12345678-9').expect(200);

    const getRes2 = await request(server).get('/personas');
    expect(getRes2.body).toHaveLength(1);
    expect(getRes2.body[0].rut).toBe('11111111-1');
  });

  it('POST /personas rechaza datos invalidos', async () => {
    await request(app.getHttpServer())
      .post('/personas')
      .send({ rut: 'abc', ciudad: 'Santiago' })
      .expect(400);
  });
});
