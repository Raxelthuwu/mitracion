"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.services = void 0;
const modles_1 = require("../models/modles");
exports.services = {
    async verificarUsuarioService(email, password) {
        try {
            const user = await modles_1.Models.verificarUsuario(email, password);
            if (user) {
                return {
                    status: 200,
                    message: "success",
                    data: user
                };
            }
            else {
                return {
                    status: 404,
                    message: "data no found",
                    data: null
                };
            }
        }
        catch (error) {
            console.error("Error en verificarUsuarioService:", error);
            return {
                status: 500,
                message: "internal server error",
                data: null
            };
        }
    },
    async insertarMigranteService(data) {
        try {
            const result = await modles_1.Models.insertarMigrante(data);
            return {
                status: 201,
                message: result.message,
                data: data
            };
        }
        catch (error) {
            console.error("Error en insertarMigranteService:", error);
            return {
                status: 500,
                message: "internal server error",
                data: null
            };
        }
    },
    async obtenerMigrantePorDocumentoService(documento) {
        try {
            const migrante = await modles_1.Models.obtenerMigrantePorDocumento(documento);
            if (migrante) {
                return {
                    status: 200,
                    data: {
                        fullname: migrante.nombre_completo,
                        document: migrante.documento,
                        age: migrante.edad,
                        gender: migrante.genero,
                        nacionality: migrante.nacionalidad,
                        originCountry: migrante.pais_origen,
                        dateArrival: migrante.fecha_llegada,
                        email: migrante.correo,
                        phoneNumber: migrante.numero_telefonico,
                        motive: migrante.motivo_migracion
                    }
                };
            }
            else {
                return {
                    status: 404,
                    message: 'Migrante no encontrado',
                    data: null
                };
            }
        }
        catch (error) {
            console.error("Error en obtenerMigrantePorDocumentoService:", error);
            return {
                status: 500,
                message: 'Error interno',
                data: null
            };
        }
    },
    async actualizarMigranteService(documento, data) {
        try {
            const result = await modles_1.Models.actualizarMigrante(documento, data);
            return {
                status: 200,
                message: result.message,
                data: null
            };
        }
        catch (error) {
            if (error.message === "not found") {
                return {
                    status: 404,
                    message: "data not found",
                    data: null
                };
            }
            else {
                return {
                    status: 500,
                    message: "internal server error",
                    data: null
                };
            }
        }
    },
    async eliminarMigranteService(documento) {
        try {
            const result = await modles_1.Models.eliminarMigrante(documento);
            return {
                status: 200,
                message: result.message,
                data: null
            };
        }
        catch (error) {
            if (error.message === "not found") {
                return {
                    status: 404,
                    message: "data not found",
                    data: null
                };
            }
            else {
                return {
                    status: 500,
                    message: "internal server error",
                    data: null
                };
            }
        }
    },
    async obtenerFamiliaresPorDocumentoService(documento) {
        try {
            const data = await modles_1.Models.obtenerFamiliaresPorDocumento(documento);
            if (!data || data.length === 0) {
                return { status: 404, message: "no family found", data: null };
            }
            return { status: 200, message: "success", data };
        }
        catch (error) {
            console.error("Error en obtenerFamiliaresPorDocumentoService:", error);
            return { status: 500, message: "internal server error", data: null };
        }
    },
    async obtenerAtencionesMigranteService(documento) {
        try {
            const data = await modles_1.Models.obtenerAtencionesPorDocumento(documento);
            if (!data || data.length === 0) {
                return { status: 404, message: "No se encontraron registros para este migrante", data: null };
            }
            return { status: 200, data };
        }
        catch (error) {
            console.error("Error en el service obtenerAtencionesMigranteService:", error);
            return { status: 500, message: "Internal server error", data: null };
        }
    },
    async insertarMigranteServicioService(documento, id_servicio, solicitudDate) {
        try {
            const result = await modles_1.Models.insertarMigranteServicio(documento, id_servicio, solicitudDate);
            if (result === 'success') {
                return {
                    status: 201,
                    message: 'Solicitud registrada',
                    data: null
                };
            }
            if (result === 'not_found') {
                return {
                    status: 404,
                    message: 'Migrante no encontrado',
                    data: null
                };
            }
            return {
                status: 500,
                message: 'Error interno',
                data: null
            };
        }
        catch (error) {
            return {
                status: 500,
                message: 'Error interno',
                data: null
            };
        }
    },
    async listarMigranteServicioService() {
        try {
            const lista = await modles_1.Models.listarMigranteServicio();
            return { status: 200, data: lista };
        }
        catch (error) {
            return { status: 500, message: 'Error interno', data: null };
        }
    },
    async obtenerMigranteServicioPorIdService(id) {
        try {
            const found = await modles_1.Models.obtenerMigranteServicioPorId(id);
            if (found)
                return { status: 200, data: found };
            return { status: 404, message: 'No encontrado', data: null };
        }
        catch (error) {
            return { status: 500, message: 'Error interno', data: null };
        }
    },
    async crearMigranteServicioService(data) {
        try {
            await modles_1.Models.crearMigranteServicio(data);
            return { status: 201, message: 'Creado', data: data };
        }
        catch (error) {
            return { status: 500, message: 'Error interno', data: null };
        }
    },
    async actualizarMigranteServicioService(id, data) {
        try {
            const result = await modles_1.Models.actualizarMigranteServicio(id, data);
            if (result)
                return { status: 200, message: 'Actualizado', data: null };
            return { status: 404, message: 'No encontrado', data: null };
        }
        catch (error) {
            return { status: 500, message: 'Error interno', data: null };
        }
    },
    async eliminarMigranteServicioService(id) {
        try {
            const result = await modles_1.Models.eliminarMigranteServicio(id);
            if (result)
                return { status: 200, message: 'Eliminado', data: null };
            return { status: 404, message: 'No encontrado', data: null };
        }
        catch (error) {
            return { status: 500, message: 'Error interno', data: null };
        }
    }
};
//# sourceMappingURL=services.js.map