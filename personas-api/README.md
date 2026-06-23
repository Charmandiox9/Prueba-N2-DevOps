# personas-api-nest

Misma API de personas (almacenamiento en memoria), reescrita con **NestJS**.

## Estructura

```
src/
  app.module.ts
  main.ts
  personas/
    dto/create-persona.dto.ts   # validacion con class-validator
    persona.interface.ts
    personas.controller.ts      # GET /personas, POST /personas, DELETE /personas/:rut
    personas.service.ts         # almacenamiento en memoria (arreglo)
    personas.service.spec.ts    # pruebas unitarias del service
test/
  app.e2e-spec.ts               # pruebas e2e: flujo POST -> GET -> DELETE -> GET
```

## Endpoints

Igual que la versión Express: `GET /personas`, `POST /personas`, `DELETE /personas/:rut`.
El body de POST se valida automáticamente con `class-validator` (`CreatePersonaDto`):

```json
{
  "nombre": "Ana Perez",
  "rut": "12345678-9",
  "fechaNacimiento": "1990-05-10",
  "ciudad": "Santiago",
  "gustos": ["empanadas", "ajedrez"]
}
```

## Comandos

```bash
npm install
npm run start:dev     # desarrollo, con recarga automatica
npm test               # pruebas unitarias (Jest)
npm run test:e2e       # pruebas end-to-end (Jest + Supertest sobre la app real)
npm run build           # compila a /dist (necesario antes de desplegar)
npm run start:prod     # corre la version compilada: node dist/main
```

## Notas para Azure App Service

- Azure ejecuta por defecto `npm install` y luego `npm start`. El script
  `start` de Nest (`nest start`) **no** es apto para produccion.
- Configura en el portal: **App Service -> Configuration -> General settings
  -> Startup Command** -> `npm run start:prod` (o `node dist/main.js`).
- Asegurate de que la version de Node del App Service coincida (Node 20 LTS),
  y que el runtime stack al crear el App Service sea Linux + Node 20.
- El workflow `azure-deploy.yml` ya compila (`npm run build`) antes de
  desplegar, asi que `dist/` llega listo al servidor.
