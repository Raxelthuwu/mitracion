"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const services_1 = require("../services/services");
exports.Controllers = {
    async verificarUsuarioController(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "email and password are required",
                    data: null
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
                data: null
            });
        }
    },
    async insertarMigranteController(req, res) {
        try {
            const data = req.body;
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
                    data: null
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
                data: null
            });
        }
    },
    async obtenerMigrantePorDocumentoController(req, res) {
        try {
            const documento = Number(req.params.documento);
            if (!documento) {
                return res.status(400).json({
                    status: 400,
                    message: 'Falta el documento',
                    data: null
                });
            }
            const result = await services_1.services.obtenerMigrantePorDocumentoService(documento);
            res.status(result.status).json(result);
        }
        catch (error) {
            console.error("Error en obtenerMigrantePorDocumentoController:", error);
            res.status(500).json({
                status: 500,
                message: 'Error interno',
                data: null
            });
        }
    },
    async insertarMigranteServicioController(req, res) {
        try {
            const { document, service, solicitudDate } = req.body;
            const documento = Number(document);
            const id_servicio = Number(service);
            const fecha_solicitud = new Date(solicitudDate);
            if (!documento || !id_servicio || !fecha_solicitud) {
                return res.status(400).json({
                    status: 400,
                    message: 'Faltan datos requeridos',
                    data: null
                });
            }
            const result = await services_1.services.insertarMigranteServicioService(documento, id_servicio, fecha_solicitud);
            res.status(result.status).json(result);
        }
        catch (error) {
            console.error("Error en insertarMigranteServicioController:", error);
            res.status(500).json({
                status: 500,
                message: 'Error interno',
                data: null
            });
        }
    },
    async listarMigranteServicioController(req, res) {
        console.log("Endpoint migrante_servicio recibido");
        const result = await services_1.services.listarMigranteServicioService();
        console.log("Resultado migrante_servicio:", result);
        res.status(result.status).json(result);
    },
    async obtenerMigranteServicioPorIdController(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID inválido', data: null });
        }
        const result = await services_1.services.obtenerMigranteServicioPorIdService(id);
        res.status(result.status).json(result);
    },
    async crearMigranteServicioController(req, res) {
        const data = req.body;
        const result = await services_1.services.crearMigranteServicioService(data);
        res.status(result.status).json(result);
    },
    async actualizarMigranteServicioController(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID inválido', data: null });
        }
        const data = req.body;
        const result = await services_1.services.actualizarMigranteServicioService(id, data);
        res.status(result.status).json(result);
    },
    async eliminarMigranteServicioController(req, res) {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, message: 'ID inválido', data: null });
        }
        const result = await services_1.services.eliminarMigranteServicioService(id);
        res.status(result.status).json(result);
    },
    async actualizarMigranteController(req, res) {
        const documento = Number(req.params.documento);
        if (!documento) {
            return res.status(400).json({ status: 400, message: "Falta el documento", data: null });
        }
        const data = req.body;
        const result = await services_1.services.actualizarMigranteService(documento, data);
        res.status(result.status).json(result);
    },
    async eliminarMigranteController(req, res) {
        const documento = Number(req.params.documento);
        if (!documento) {
            return res.status(400).json({ status: 400, message: "Falta el documento", data: null });
        }
        const result = await services_1.services.eliminarMigranteService(documento);
        res.status(result.status).json(result);
    },
    async obtenerFamiliaresPorDocumentoController(req, res) {
        const documento = Number(req.params.documento);
        if (!documento) {
            return res.status(400).json({ status: 400, message: "Falta el documento", data: null });
        }
        const result = await services_1.services.obtenerFamiliaresPorDocumentoService(documento);
        res.status(result.status).json(result);
    },
    async obtenerAtencionesMigranteController(req, res) {
        const documento = Number(req.params.documento);
        if (!documento) {
            return res.status(400).json({ status: 400, message: "Falta el documento", data: null });
        }
        const result = await services_1.services.obtenerAtencionesMigranteService(documento);
        res.status(result.status).json(result);
    }
};
//# sourceMappingURL=controllers.js.map