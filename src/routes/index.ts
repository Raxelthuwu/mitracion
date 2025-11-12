import { Router } from "express";
import { Controllers } from "../controllers/controllers";

const router = Router();

// Verificar usuario (login funcionario)
router.post("/usuario/login", Controllers.verificarUsuarioController);

//Insertar datos del migrante
router.post("/migrante", Controllers.insertarMigranteController);

// Rutas de migrante por documento
router.get("/migrante/:documento/familiares", Controllers.obtenerFamiliaresPorDocumentoController);
router.get("/migrante/:documento/atenciones", Controllers.obtenerAtencionesMigranteController);
router.get("/migrante/:documento", Controllers.obtenerMigrantePorDocumentoController);
router.put("/migrante/:documento", Controllers.actualizarMigranteController);
router.delete("/migrante/:documento", Controllers.eliminarMigranteController);

// Migrante-servicio
router.get('/migrante-servicio', Controllers.listarMigranteServicioController);
router.get('/migrante-servicio/:id', Controllers.obtenerMigranteServicioPorIdController);
router.post('/migrante-servicio', Controllers.crearMigranteServicioController);
router.put('/migrante-servicio/:id', Controllers.actualizarMigranteServicioController);
router.delete('/migrante-servicio/:id', Controllers.eliminarMigranteServicioController);

// Asociar migrante a servicio (si se mantiene separado)
router.post('/migrante/servicio', Controllers.insertarMigranteServicioController);

export default router;
