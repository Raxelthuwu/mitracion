"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const modles_1 = require("../models/modles");
exports.services = {
    //Verifica si existe un usuario con el correo y contraseña dados.
    async verificarUsuarioService(email, password) {
        try {
            const user = await modles_1.Models.verificarUsuario(email, password);
            if (user) {
                return {
                    status: 200,
                    message: "success",
                };
            }
            else {
                return {
                    status: 400,
                    message: "data no found",
                };
            }
        }
        catch (error) {
            console.error("Error en verificarUsuarioService:", error);
            return {
                status: 500,
                message: "internal server error",
            };
        }
    },
    // Inserta un nuevo migrante en la base de datos.
    async insertarMigranteService(data) {
        try {
            const result = await modles_1.Models.insertarMigrante(data);
            return {
                status: 201,
                message: result.message,
            };
        }
        catch (error) {
            console.error("Error en insertarMigranteService:", error);
            return {
                status: 500,
                message: "internal server error",
            };
        }
    },
    //Actualiza los datos de un migrante existente
    async actualizarMigranteService(documento, data) {
        try {
            const result = await modles_1.Models.actualizarMigrante(documento, data);
            return {
                status: 200,
                message: result.message,
            };
        }
        catch (error) {
            if (error.message === "not found") {
                return {
                    status: 404,
                    message: "data not found",
                };
            }
            else {
                return {
                    status: 500,
                    message: "internal server error",
                };
            }
        }
    },
    //Elimina un migrante de la base de datos
    async eliminarMigranteService(documento) {
        try {
            const result = await modles_1.Models.eliminarMigrante(documento);
            return {
                status: 200,
                message: result.message,
            };
        }
        catch (error) {
            if (error.message === "not found") {
                return {
                    status: 404,
                    message: "data not found",
                };
            }
            else {
                return {
                    status: 500,
                    message: "internal server error",
                };
            }
        }
    },
};
//# sourceMappingURL=services.js.map