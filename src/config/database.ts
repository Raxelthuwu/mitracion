import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const environment = process.env.NODE_ENV || "development";

const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      host: process.env.POSTGRESQL_ADDON_HOST,
      user: process.env.POSTGRESQL_ADDON_USER,
      password: process.env.POSTGRESQL_ADDON_PASSWORD,
      database: process.env.POSTGRESQL_ADDON_DB,
      port: Number(process.env.POSTGRESQL_ADDON_PORT),
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
    console.log("Conectado correctamente a PostgreSQL (Clever Cloud)");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

export default db;
