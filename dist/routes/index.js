"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers/controllers");
const router = (0, express_1.Router)();
// Verificar usuario (login funcionario)
router.post("/usuario/login", controllers_1.Controllers.verificarUsuarioController);
//Insertar datos del migrante
router.post("/migrante", controllers_1.Controllers.insertarMigranteController);
// Rutas de migrante por documento
router.get("/migrante/:documento/familiares", controllers_1.Controllers.obtenerFamiliaresPorDocumentoController);
router.get("/migrante/:documento/atenciones", controllers_1.Controllers.obtenerAtencionesMigranteController);
router.get("/migrante/:documento", controllers_1.Controllers.obtenerMigrantePorDocumentoController);
router.put("/migrante/:documento", controllers_1.Controllers.actualizarMigranteController);
router.delete("/migrante/:documento", controllers_1.Controllers.eliminarMigranteController);
// Migrante-servicio
router.get('/migrante-servicio', controllers_1.Controllers.listarMigranteServicioController);
router.get('/migrante-servicio/:id', controllers_1.Controllers.obtenerMigranteServicioPorIdController);
router.post('/migrante-servicio', controllers_1.Controllers.crearMigranteServicioController);
router.put('/migrante-servicio/:id', controllers_1.Controllers.actualizarMigranteServicioController);
router.delete('/migrante-servicio/:id', controllers_1.Controllers.eliminarMigranteServicioController);
// Asociar migrante a servicio (si se mantiene separado)
router.post('/migrante/servicio', controllers_1.Controllers.insertarMigranteServicioController);
exports.default = router;
//# sourceMappingURL=index.js.map