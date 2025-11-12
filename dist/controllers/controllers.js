"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const services_1 = require("../services/services");
exports.Controllers = {
    //Verificar usuario por correo y contraseña
    async verificarUsuarioController(req, res) {
        try {
            const { correo, contrasena } = req.body;
            if (!correo || !contrasena) {
                return res.status(400).json({ message: "Missing email or password" });
            }
            const response = await services_1.services.verificarUsuarioService(correo, contrasena);
            return res.status(response.status).json({ message: response.message });
        }
        catch (error) {
            console.error("Error en verificarUsuarioController:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    //Insertar migrante
    async insertarMigranteController(req, res) {
        try {
            const data = req.body;
            if (!data.nombre_completo ||
                !data.documento ||
                !data.edad ||
                !data.genero ||
                !data.nacionalidad ||
                !data.pais_origen ||
                !data.fecha_llegada ||
                !data.correo ||
                !data.numero_telefonico ||
                !data.motivo_migracion) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const response = await services_1.services.insertarMigranteService(data);
            res.status(response.status).json({ message: response.message });
        }
        catch (error) {
            console.error("Error en insertarMigranteController:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    //Actualizar migrante
    async actualizarMigranteController(req, res) {
        try {
            const documento = parseInt(req.params.documento);
            const data = req.body;
            if (isNaN(documento)) {
                return res.status(400).json({ message: "Invalid documento" });
            }
            const response = await services_1.services.actualizarMigranteService(documento, data);
            res.status(response.status).json({ message: response.message });
        }
        catch (error) {
            console.error("Error en actualizarMigranteController:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    //Eliminar migrante
    async eliminarMigranteController(req, res) {
        try {
            const documento = parseInt(req.params.documento);
            if (isNaN(documento)) {
                return res.status(400).json({ message: "Invalid documento" });
            }
            const response = await services_1.services.eliminarMigranteService(documento);
            res.status(response.status).json({ message: response.message });
        }
        catch (error) {
            console.error("Error en eliminarMigranteController:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    // Obtener familiares de un migrante por documento
    async obtenerFamiliaresPorDocumentoController(req, res) {
        try {
            const documento = parseInt(req.params.documento);
            const response = await services_1.services.obtenerFamiliaresPorDocumentoService(documento);
            res.status(response.status).json(response);
        }
        catch (error) {
            console.error("Error en obtenerFamiliaresPorDocumentoController:", error);
            res.status(500).json({ message: "internal server error" });
        }
    },
    async obtenerAtencionesMigranteController(req, res) {
        try {
            const documento = parseInt(req.params.documento);
            const response = await services_1.services.obtenerAtencionesMigranteService(documento);
            res.status(response.status).json(response);
        }
        catch (error) {
            console.error("Error en obtenerAtencionesMigranteController:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
};
//# sourceMappingURL=controllers.js.map