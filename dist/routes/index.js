"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers/controllers");
const router = (0, express_1.Router)();
// Verificar usuario (login funcionario)
router.post("/usuario/login", controllers_1.Controllers.verificarUsuarioController);
// Insertar un nuevo migrante
router.post("/migrante", controllers_1.Controllers.insertarMigranteController);
// Actualizar datos de un migrante por documento
router.put("/migrante/:documento", controllers_1.Controllers.actualizarMigranteController);
//Eliminar migrante por documento
router.delete("/migrante/:documento", controllers_1.Controllers.eliminarMigranteController);
// Obtener familiares de un migrante por documento
router.get("/migrante/:documento/familiares", controllers_1.Controllers.obtenerFamiliaresPorDocumentoController);
// Obtener todas las atenciones y servicios de un migrante por su documento
router.get("/migrante/:documento/atenciones", controllers_1.Controllers.obtenerAtencionesMigranteController);
exports.default = router;
//# sourceMappingURL=index.js.map