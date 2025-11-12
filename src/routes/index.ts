import { Router } from "express";
import { Controllers } from "../controllers/controllers";

const router = Router();

// Verificar usuario (login funcionario)
router.post("/usuario/login", Controllers.verificarUsuarioController);

//Insertar datos del migrante
router.post("/migrante", Controllers.insertarMigranteController);

// Obtener migrante por documento
router.get('/migrante/documento', Controllers.obtenerMigrantePorDocumentoController);
// Asociar migrante a servicio
router.post('/migrante/servicio', Controllers.insertarMigranteServicioController);
// Listar migrante-servicio
router.get('/migrante_servicio', Controllers.listarMigranteServicioController);
// Obtener migrante-servicio por ID
router.get('/migrante_servicio/:id', Controllers.obtenerMigranteServicioPorIdController);
// Crear nuevo migrante-servicio
router.post('/migrante_servicio', Controllers.crearMigranteServicioController);
// Actualizar migrante-servicio
router.put('/migrante_servicio/:id', Controllers.actualizarMigranteServicioController);
// Eliminar migrante-servicio
router.delete('/migrante_servicio/:id', Controllers.eliminarMigranteServicioController);

export default router;
