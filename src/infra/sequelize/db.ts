// src/infra/sequelize/db.ts
import { Sequelize } from 'sequelize';
// @ts-ignore
import initModels from './init-models.js';

// Crear instancia de Sequelize con variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    dialect: 'mssql',
    port: Number(process.env.DB_PORT) || 1433,
    dialectOptions: { options: { encrypt: true, trustServerCertificate: true } },
  }
);

// Inicializar modelos
const db = initModels(sequelize);

// Añadir Sequelize y la instancia
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
