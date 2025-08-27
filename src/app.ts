// src/app.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import demoRoutes from './routes/demoRoutes';

import db from "./infra/sequelize/db";

async function connectDB() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // salir si la DB no conecta
  }
}


const app = express();
app.use(express.json());

app.use('/api', demoRoutes);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
