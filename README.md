# Personas API

API de personas en **NestJS**.

## Integrantes

- Clerians Márquez | 20.717.942-6
- Daniel Durán | 21.493.398-5


## Estructura

```
personas-api/
  src/
    app.module.ts
    main.ts
    personas/
      dto/create-persona.dto.ts   # validacion con class-validator
      persona.interface.ts
      personas.controller.ts      # endpoints
      personas.service.ts         # servicios
      personas.service.spec.ts    # pruebas unitarias del service
  test/
    app.e2e-spec.ts               -> GET
  Dockerfile                      # imagen de produccion multi-stage
docker-compose.yaml             # orquestacion de 3 servicios
example.env                     # variables de entorno de ejemplo
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

> Ejecutar desde la carpeta `personas-api/`

```bash
cd personas-api
npm install
npm run start:dev     # desarrollo, con recarga automatica
npm test               # pruebas unitarias (Jest)
npm run build           # compila a /dist
npm run start:prod     # corre la version compilada: node dist/main
```
## Docker

La aplicación se ejecuta junto a PostgreSQL y pgAdmin usando Docker Compose.

### Requisitos

- Docker Desktop instalado y corriendo

### Variables de entorno

Copia el archivo de ejemplo y completa los valores:

```bash
cp example.env .env
```

| Variable           | Descripción                        |
|--------------------|------------------------------------|
| `DB_HOST`          | Host de la base de datos (`db`)    |
| `DB_PORT`          | Puerto de PostgreSQL (`5432`)      |
| `DB_USER`          | Usuario de PostgreSQL              |
| `DB_PASSWORD`      | Contraseña de PostgreSQL           |
| `DB_NAME`          | Nombre de la base de datos         |
| `PGADMIN_EMAIL`    | Email de acceso a pgAdmin          |
| `PGADMIN_PASSWORD` | Contraseña de acceso a pgAdmin     |

### Levantar los servicios

```bash
docker compose up --build
```

Esto levanta 3 servicios:

| Servicio  | Descripción                        | URL                          |
|-----------|------------------------------------|------------------------------|
| `app`     | API NestJS                         | http://localhost:3000        |
| `db`      | PostgreSQL 16                      | localhost:5432               |
| `pgadmin` | Visor de base de datos             | http://localhost:5050        |

La tabla `personas` se crea automáticamente al iniciar la app (TypeORM `synchronize: true`).

### Conectar pgAdmin a la base de datos

1. Abre http://localhost:5050 e inicia sesión con `PGADMIN_EMAIL` y `PGADMIN_PASSWORD`
2. Clic derecho en **Servers → Register → Server**
3. En la pestaña **Connection**:
   - Host: `db`
   - Port: `5432`
   - Username: valor de `DB_USER`
   - Password: valor de `DB_PASSWORD`
   - Database: valor de `DB_NAME`

### Detener los servicios

```bash
docker compose down
```