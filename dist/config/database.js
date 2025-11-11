"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const environment = process.env.NODE_ENV || "development";
const config = {
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
        pool: { min: 2, max: 10 },
        migrations: { tableName: "knex_migrations" },
    },
    production: {
        client: "pg",
        connection: {
            connectionString: process.env.POSTGRESQL_ADDON_URI,
            ssl: { rejectUnauthorized: false },
        },
        pool: { min: 1, max: 2 },
    },
};
const db = (0, knex_1.default)(config[environment]);
(async () => {
    try {
        await db.raw("select 1+1 as result");
        console.log("Conectado correctamente a PostgreSQL (Clever Cloud)");
    }
    catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
})();
exports.default = db;
//# sourceMappingURL=database.js.map