import { Agente, Seguro, Comision, Venta } from '../../models/domain/dataStruct';

export const agentesData: Agente[] = [
  { id: 1, nombre: "Ana López" },
  { id: 2, nombre: "Carlos Pérez" },
  { id: 3, nombre: "María García" },
];

export const segurosData: Seguro[] = [
  { id: 1, tipo: "Auto" },
  { id: 2, tipo: "Vida" },
  { id: 3, tipo: "Hogar" },
  
];

export const comisionesData:Comision[] = [
  { tipo: "Auto", porcentaje: 0.05 }, // 5%
  { tipo: "Vida", porcentaje: 0.10 }, // 10%
  { tipo: "Hogar", porcentaje: 0.08 }, // 🔹 Comisión para Hogar (8%)
];

export const ventasData:Venta[] = [
  { id: 1, agenteId: 1, seguroId: 1, monto: 10000, fecha: "2025-01-15" },
  { id: 2, agenteId: 1, seguroId: 2, monto: 20000, fecha: "2025-01-20" },
  { id: 3, agenteId: 2, seguroId: 1, monto: 15000, fecha: "2025-02-05" },
  { id: 4, agenteId: 3, seguroId: 2, monto: 30000, fecha: "2025-02-18" },
  { id: 5, agenteId: 2, seguroId: 2, monto: 25000, fecha: "2025-02-25" },

   // Nuevas ventas para probar más filtros:
  { id: 6, agenteId: 1, seguroId: 3, monto: 18000, fecha: "2025-03-03" },
  { id: 7, agenteId: 3, seguroId: 1, monto: 12000, fecha: "2025-03-15" },
  { id: 8, agenteId: 4, seguroId: 3, monto: 50000, fecha: "2025-03-20" },
  { id: 9, agenteId: 4, seguroId: 2, monto: 22000, fecha: "2025-04-01" },
  { id: 10, agenteId: 2, seguroId: 1, monto: 17000, fecha: "2025-04-10" },
  { id: 11, agenteId: 5, seguroId: 1, monto: 8000, fecha: "2025-04-15" },
  { id: 12, agenteId: 5, seguroId: 3, monto: 60000, fecha: "2025-05-05" },
  { id: 13, agenteId: 3, seguroId: 3, monto: 45000, fecha: "2025-05-12" },
  { id: 14, agenteId: 1, seguroId: 2, monto: 35000, fecha: "2025-05-20" },
  { id: 15, agenteId: 4, seguroId: 1, monto: 9000, fecha: "2025-06-01" },
  { id: 16, agenteId: 2, seguroId: 3, monto: 40000, fecha: "2025-06-15" },
  { id: 17, agenteId: 1, seguroId: 1, monto: 15500, fecha: "2025-06-28" },
  { id: 18, agenteId: 5, seguroId: 2, monto: 27000, fecha: "2025-07-03" },
  { id: 19, agenteId: 4, seguroId: 3, monto: 33000, fecha: "2025-07-15" },
  { id: 20, agenteId: 3, seguroId: 1, monto: 21000, fecha: "2025-07-25" }
];