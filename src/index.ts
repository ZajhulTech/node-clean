import { suma } from './utils';
import { agentesData, segurosData, comisionesData, ventasData} from '../src/infra/data/seguroDemoData'
import { obtenerReporteVentas } from '../src/userStories/segurosUserStory'
import db from "./infra/sequelize/db";
import dotenv from 'dotenv';
dotenv.config();

const resultado = suma(2, 3);
console.log(`Resultado: ${resultado}`);



/*
SALIDA ESPERADA
[
  {
    mes: "2025-01",
    agente: "Ana López",
    totalVentas: 30000,
    totalComision: 3000
  },
  {
    mes: "2025-02",
    agente: "Carlos Pérez",
    totalVentas: 40000,
    totalComision: 4000
  },
  ...
]
*/
// ventasList: Venta[], agentesList: Agente[],segutoCat:  Seguro[],comisionCat: Comision[])


async function connectDB() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // salir si la DB no conecta
  }
}

connectDB().then(() => {
const report = obtenerReporteVentas(ventasData, agentesData,segurosData, comisionesData);
console.log(JSON.stringify(report,null,2));
});
