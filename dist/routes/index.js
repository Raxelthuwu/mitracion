"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers/controllers");
const router = (0, express_1.Router)();
// Verificar usuario (login funcionario)
router.get("/usuario/login", controllers_1.Controllers.verificarUsuarioController);
//Insertar datos del migrante
router.post("/migrante", controllers_1.Controllers.insertarMigranteController);
exports.default = router;
//# sourceMappingURL=index.js.map