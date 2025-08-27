import db from '../../infra/sequelize/db';
import { Op } from "sequelize";
const Product = db.products;


export async function obtenerProductos() {
  try {
    const productos = await Product.findAll({
      where: {
        price: {
          [Op.gte]: 20 // 👈 price >= 20
        }
      }

    });

    const productosPlain = productos.map((p: any) => p.get({ plain: true }));

    return productosPlain;
    //console.log(productos); // devuelve array de objetos
  } catch (err) {
    console.error(err);
  }
}
