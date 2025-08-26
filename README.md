
### 1. Inizializar Proyecto
mkdir proyecto-node-ts
cd proyecto-node-ts
npm init -y

### 2. Instalar dependencias

# TypeScript y herramientas
npm install typescript ts-node @types/node --save-dev


# Librerías comunes (ej. Express)
npm install express
npm install @types/express --save-dev

# 3. Inizializar Typesscript
npx tsc --init
´´´
    {
    "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
    },
    "include": ["src/**/*"]
    }
´´´

# 6. Ejecutar Proyecto

# Opción 1: Usar ts-node (directo)
npx ts-node src/index.ts

# Opción 2: Compilar y ejecutar con Node

npx tsc
node dist/index.js


# 7. Scripts Útiles en package.json

{
"scripts": {
"start": "ts-node src/index.ts",
"build": "tsc",
"serve": "node dist/index.js"
}
}

# 8. Tips Rápidos

# Usar strict: true en tsconfig para seguridad de tipos.

# Instalar @types de cualquier librería para compatibilidad TS.

# Mantener src/ para TS y dist/ para JS compilado.

# Considerar nodemon con ts-node para desarrollo:

npm install nodemon --save-dev
npx nodemon --watch src --exec "ts-node src/index.ts"


📦 proyecto-node
 ┣ 📂 src
 ┃ ┣ 📂 routes        # Define las rutas/endpoints de la API
 ┃ ┣ 📂 controllers   # Reciben las peticiones HTTP y llaman a los servicios
 ┃ ┣ 📂 userStories   # Reglas de negocio
 ┃ ┣ 📂 services      # llamadas a servicios externos
 ┃ ┣ 📂 models        # Modelos de datos, esquemas y objetos
 ┃ ┣ 📂 infra         # Infraestructura: datos de prueba, bases de datos, APIs externas, ORMs
 ┃ ┗ app.js           # Entry point del proyecto, inicializa Express y middlewares
 ┣ .env                # Variables de entorno
 ┣ package.json        # Configuración de npm y dependencias
 ┗ README.md           # Documentación del proyecto





 ejercicio para sacar bonos de agentes de seguros

 tener la bases o tablas de las ventas de los agentes, para sacar las ventas que han tenido

 SaulDuenas_SQLLogin_1;
 pwd=elmasmejor


 ----------------------

 Sequelize

 1️⃣ Instalación
 Instala Sequelize, CLI y el driver de SQL Server:

2️⃣ Inicializar Sequelize
npx sequelize-cli init
npm install sequelize sequelize-cli
npm install tedious



 3️⃣ Configurar la conexión
 ´´´
 {
  "development": {
    "username": "tu_usuario",
    "password": "tu_password",
    "database": "nombre_db",
    "host": "localhost",
    "dialect": "mssql",
    "dialectOptions": {
      "options": {
        "encrypt": true,
        "trustServerCertificate": true
      }
    }
  }
}
´´´

# 4️⃣ Instalar sequelize-auto
npm install -g sequelize-auto
# 5️⃣ Generar modelos (Database-First)
 sequelize-auto -o "./models" -d demo_control -h localhostdemo_control.mssql.somee.com -u SaulDuenas_SQLLogin_1 -x elmasmejor -e mssql


