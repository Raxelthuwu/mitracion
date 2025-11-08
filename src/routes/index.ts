import { Router } from "express";
import { Controllers } from "../controllers/controllers"

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API " });
});






export default router;
