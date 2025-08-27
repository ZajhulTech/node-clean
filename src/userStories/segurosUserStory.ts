
// import { agentesData, segurosData, comisionesData, ventasData} from '../infra/data/seguroDemoData'
import { Agente, Seguro, Comision, Venta } from '../models/domain/dataStruct';

import { obtenerProductos } from '../infra/repository/productRepository'

interface Detail {
    tipo:number,
    monto:number,
    comision: number
}

interface Reporte {
  [key: string]: {
    mes: string,
    agente: string,
    totalVentas: number;
    totalComisiones: number;
    detalle?: Array<Detail>;
  };
}

// agentesList: Agente[],segutoCat:  Seguro[],comisionCat: Comision[],
export async function obtenerReporteVentas(ventasList: Venta[], agentesList: Agente[],segutoCat:  Seguro[],comisionCat: Comision[]) {


    const Products = await obtenerProductos();

    console.log("Products");
    console.log(Products);

    let result:Reporte = {};

    let result2:Array<Reporte> ;

    const dateFilter = new Date('2025-03-01'); 
    const mes = dateFilter.getMonth() + 1; 
    const anio = dateFilter.getFullYear();
    // filtro en duro
    const VentasMesAnio = ventasList.filter((item) =>{
      const internalDate = new Date(item.fecha);
      const mes1 = internalDate.getMonth() + 1; 
      const anio1 = internalDate.getFullYear();

      return mes === mes1 && anio === anio1;
    
    } );


    VentasMesAnio.forEach( itemV => {
    //  console.log(itemV);

        const agenteMod = agentesList.find(v => v.id === itemV.agenteId );
        const seguroItem = segutoCat.find(v => v.id === itemV.seguroId );
        const comisionItem = comisionCat.find(v => v.tipo === seguroItem?.tipo);

        // Calcular comisión
        const comisionAgente = itemV.monto * (comisionItem?.porcentaje ?? 0);

        // Obtener mes (YYYY-MM)
        const mes = itemV.fecha.slice(0, 7);

        const key = `${mes}-${agenteMod?.nombre ?? ""}`;

        if (!result[key]) {
            
            result[key] = {
                mes,
                agente: agenteMod?.nombre ?? "",
                totalVentas: 0,
                totalComisiones: 0,
                detalle: []
            };
        
        }

        const detailData: Detail = {
            tipo:seguroItem?.id ?? 0,
            monto: itemV.monto,
            comision: comisionAgente
        };

        result[key].detalle?.push(detailData);
        result[key].totalVentas += itemV.monto; 
        result[key].totalComisiones += comisionAgente; 
        
    } );

    return Object.values(result);
}