import { Router } from "express";
import { Controllers } from "../controllers/controllers";

const router = Router();

// Verificar usuario (login funcionario)
router.get("/usuario/login", Controllers.verificarUsuarioController);

// Insertar un nuevo migrante
router.post("/migrante", Controllers.insertarMigranteController);

// Actualizar datos de un migrante por documento
router.put("/migrante/:documento", Controllers.actualizarMigranteController);

//Eliminar migrante por documento
router.delete("/migrante/:documento", Controllers.eliminarMigranteController);

// Obtener familiares de un migrante por documento
router.get("/migrante/:documento/familiares", Controllers.obtenerFamiliaresPorDocumentoController);

// Obtener todas las atenciones y servicios de un migrante por su documento
router.get("/migrante/:documento/atenciones", Controllers.obtenerAtencionesMigranteController);

export default router;
