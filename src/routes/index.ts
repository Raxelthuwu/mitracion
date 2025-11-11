import { Router } from "express";
import { Controllers } from "../controllers/controllers";

const router = Router();

// Verificar usuario (login funcionario)
router.post("/usuario/login", Controllers.verificarUsuarioController);

//Insertar datos del migrante
router.post("/migrante", Controllers.insertarMigranteController);

router.get('/migrante/documento', Controllers.obtenerMigrantePorDocumentoController);

router.post('/migrante/servicio', Controllers.insertarMigranteServicioController);

router.get('/migrante_servicio', Controllers.listarMigranteServicioController);

router.get('/migrante_servicio/:id', Controllers.obtenerMigranteServicioPorIdController);

router.post('/migrante_servicio', Controllers.crearMigranteServicioController);

router.put('/migrante_servicio/:id', Controllers.actualizarMigranteServicioController);

router.delete('/migrante_servicio/:id', Controllers.eliminarMigranteServicioController);

export default router;
