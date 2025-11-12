import { Router } from "express";
import { Controllers } from "../controllers/controllers";

const router = Router();

// Verificar usuario (login funcionario)
router.post("/usuario/login", Controllers.verificarUsuarioController);

// Insertar migrante
router.post("/migrante", Controllers.insertarMigranteController);

// Actualizar datos de un migrante por documento
router.put("/migrante/:documento", Controllers.actualizarMigranteController);

// Eliminar migrante por documento
router.delete("/migrante/:documento", Controllers.eliminarMigranteController);

// Obtener migrante por documento (GET por parámetro en query o body)
router.get('/migrante/documento', Controllers.obtenerMigrantePorDocumentoController);

// Obtener familiares de un migrante por documento
router.get("/migrante/:documento/familiares", Controllers.obtenerFamiliaresPorDocumentoController);

// Obtener todas las atenciones y servicios de un migrante por su documento
router.get("/migrante/:documento/atenciones", Controllers.obtenerAtencionesMigranteController);

// Migrante Servicio endpoints con documento en vez de id

// Listar todos con JOIN
router.get('/migrante_servicio', Controllers.listarMigranteServicioController);

// Obtener migrante_servicio por DOCUMENTO (envía { documento: '...' } en el body)
router.get("/migrante_servicio/documento", Controllers.obtenerMigranteServicioPorDocumentoController);

// Crear migrante_servicio (igual que antes)
router.post('/migrante_servicio', Controllers.crearMigranteServicioController);

// Actualizar migrante_servicio por documento (usa PUT y query param)
router.put('/migrante_servicio/documento', Controllers.actualizarMigranteServicioPorDocumentoController);

// Eliminar migrante_servicio por documento (usa DELETE y query param)
router.delete('/migrante_servicio/documento', Controllers.eliminarMigranteServicioPorDocumentoController);


export default router;

