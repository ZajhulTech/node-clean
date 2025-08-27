// src/infra/sequelize/db.ts
import { Sequelize } from 'sequelize';
// @ts-ignore
import initModels from './init-models.js';
import dotenv from 'dotenv';
dotenv.config();
// Crear instancia de Sequelize con variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME || '', 
  process.env.DB_USER || '', 
  process.env.DB_PASS || '', 
  {

    dialect: 'mssql',
    port: Number(process.env.DB_PORT) || 1433,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    // 👇 Aquí usa server, NO host
    host: process.env.DB_HOST, 
    // server: process.env.DB_HOST, 
  }
);

// Inicializar modelos
const db = initModels(sequelize);

// Añadir Sequelize y la instancia
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
