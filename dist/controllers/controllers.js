"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const services_1 = require("../services/services");
exports.Controllers = {
    //1. Verificación de usuario
    async verificarUsuarioController(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "email and password are required",
                });
            }
            const result = await services_1.services.verificarUsuarioService(email, password);
            return res.status(result.status).json(result);
        }
        catch (error) {
            console.error("Error en verificarUsuarioController:", error);
            return res.status(500).json({
                status: 500,
                message: "internal server error",
            });
        }
    },
    //2. Inserción de nuevo migrante
    async insertarMigranteController(req, res) {
        try {
            const data = req.body;
            // Validación básica
            const requiredFields = [
                "nombre_completo",
                "documento",
                "edad",
                "genero",
                "nacionalidad",
                "pais_origen",
                "fecha_llegada",
                "correo",
                "numero_telefonico",
                "motivo_migracion",
            ];
            const missing = requiredFields.filter((f) => !data[f]);
            if (missing.length > 0) {
                return res.status(400).json({
                    status: 400,
                    message: `missing fields: ${missing.join(", ")}`,
                });
            }
            const result = await services_1.services.insertarMigranteService(data);
            return res.status(result.status).json(result);
        }
        catch (error) {
            console.error("Error en insertarMigranteController:", error);
            return res.status(500).json({
                status: 500,
                message: "internal server error",
            });
        }
    },
};
//# sourceMappingURL=controllers.js.map