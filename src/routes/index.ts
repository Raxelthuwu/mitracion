import { Router } from "express";
import { Controllers } from "../controllers/controllers";

const router = Router();

// Verificar usuario (login funcionario)
router.post("/usuario/login", Controllers.verificarUsuarioController);


//Insertar datos del migrante
router.post("/migrante", Controllers.insertarMigranteController);

//Andres Valencia

// 🔹 Nuevas rutas:
router.post("/migrante/familiar", Controllers.insertarMigranteFamiliarController);
router.post("/migrante/servicio", Controllers.insertarMigranteServicioController);

// === CRUD REGISTRO_ATENCION ===
router.post("/registro-atencion", Controllers.crearRegistroAtencionController);
router.get("/registro-atencion", Controllers.obtenerRegistrosAtencionController);
router.get("/registro-atencion/:id", Controllers.obtenerRegistroAtencionPorIdController);
router.put("/registro-atencion/:id", Controllers.actualizarRegistroAtencionController);
router.delete("/registro-atencion/:id", Controllers.eliminarRegistroAtencionController);

export default router;
