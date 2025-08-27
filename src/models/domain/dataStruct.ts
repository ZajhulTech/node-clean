// src/interfaces/data.ts

export interface Agente {
  id: number;
  nombre: string;
}

export interface Seguro {
  id: number;
  tipo: string;
}

export interface Comision {
  tipo: string;
  porcentaje: number;
}

export interface Venta {
  id: number;
  agenteId: number;
  seguroId: number;
  monto: number;
  fecha: string; // Using string for date, or you could use Date type if parsing.
}