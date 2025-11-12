import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const environment = process.env.NODE_ENV || "development";

const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 1, max: 2},
    migrations: { tableName: "knex_migrations" },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.POSTGRESQL_ADDON_URI,
      ssl: { rejectUnauthorized: false },
    },
    pool: { min: 1, max: 2},
  },
};

const db = knex(config[environment]);

(async () => {
  try {
    await db.raw("select 1+1 as result");
    console.log("Conectado correctamente a PostgreSQL.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

export default db;
