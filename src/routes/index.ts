import { Router } from "express";
import { Controllers } from "../controllers/controllers";

const router = Router();

// Verificar usuario (login funcionario)
router.post("/usuario/login", Controllers.verificarUsuarioController);


//Insertar datos del migrante
router.post("/migrante", Controllers.insertarMigranteController);


export default router;
