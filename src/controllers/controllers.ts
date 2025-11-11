import { Request, Response } from "express";
import { services } from "../services/services";

export const Controllers = {
    //1. Verificación de usuario
    async verificarUsuarioController(req: Request, res: Response) {
        try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
            status: 400,
            message: "email and password are required",
            });
        }

        const result = await services.verificarUsuarioService(email, password);
        return res.status(result.status).json(result);
        } catch (error) {
        console.error("Error en verificarUsuarioController:", error);
        return res.status(500).json({
            status: 500,
            message: "internal server error",
        });
        }
    },
    
    //2. Inserción de nuevo migrante
    async insertarMigranteController(req: Request, res: Response) {
        try {
        const data = req.body;

        // Validación básica
        const requiredFields = [
            "nombre_completo",
            "documento",
            "edad",
            "genero",
            "nacionalidad",
            "pais_origen",
            "fecha_llegada",
            "correo",
            "numero_telefonico",
            "motivo_migracion",
        ];

        const missing = requiredFields.filter((f) => !data[f]);
        if (missing.length > 0) {
            return res.status(400).json({
            status: 400,
            message: `missing fields: ${missing.join(", ")}`,
            });
        }

        const result = await services.insertarMigranteService(data);
        return res.status(result.status).json(result);
        } catch (error) {
        console.error("Error en insertarMigranteController:", error);
        return res.status(500).json({
            status: 500,
            message: "internal server error",
        });
        }
    },

//Andres Valencia

// 1. Controlador para insertar familiares del migrante
  async insertarMigranteFamiliarController(req: Request, res: Response) {
    try {
      const data = req.body;

      const requiredFields = ["id_migrante", "id_familiar", "id_relacion"];
      const missing = requiredFields.filter((f) => !data[f]);
      if (missing.length > 0) {
        return res.status(400).json({
          status: 400,
          message: `missing fields: ${missing.join(", ")}`,
        });
      }

      const result = await services.insertarMigranteFamiliarService(data);
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en insertarMigranteFamiliarController:", error);
      return res.status(500).json({
        status: 500,
        message: "internal server error",
      });
    }
  },

  // 2. Controlador para insertar migrante_servicio
  async insertarMigranteServicioController(req: Request, res: Response) {
    try {
      const data = req.body;

      const requiredFields = ["id_migrante", "id_servicio", "fecha_solicitud"];
      const missing = requiredFields.filter((f) => !data[f]);
      if (missing.length > 0) {
        return res.status(400).json({
          status: 400,
          message: `missing fields: ${missing.join(", ")}`,
        });
      }

      const result = await services.insertarMigranteServicioService(data);
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en insertarMigranteServicioController:", error);
      return res.status(500).json({
        status: 500,
        message: "internal server error",
      });
    }
  },

// === CRUD REGISTRO_ATENCION ===

  async crearRegistroAtencionController(req: Request, res: Response) {
    try {
      const data = req.body;
      const required = ["fecha", "observaciones", "id_funcionario", "id_migrante_servicio", "id_institucion"];
      const missing = required.filter((f) => !data[f]);
      if (missing.length > 0)
        return res.status(400).json({ status: 400, message: `missing fields: ${missing.join(", ")}` });

      const result = await services.crearRegistroAtencionService(data);
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en crearRegistroAtencionController:", error);
      return res.status(500).json({ status: 500, message: "internal server error" });
    }
  },

  async obtenerRegistrosAtencionController(req: Request, res: Response) {
    try {
      const result = await services.obtenerRegistrosAtencionService();
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en obtenerRegistrosAtencionController:", error);
      return res.status(500).json({ status: 500, message: "internal server error" });
    }
  },

  async obtenerRegistroAtencionPorIdController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await services.obtenerRegistroAtencionPorIdService(Number(id));
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en obtenerRegistroAtencionPorIdController:", error);
      return res.status(500).json({ status: 500, message: "internal server error" });
    }
  },

  async actualizarRegistroAtencionController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await services.actualizarRegistroAtencionService(Number(id), data);
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en actualizarRegistroAtencionController:", error);
      return res.status(500).json({ status: 500, message: "internal server error" });
    }
  },

  async eliminarRegistroAtencionController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await services.eliminarRegistroAtencionService(Number(id));
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en eliminarRegistroAtencionController:", error);
      return res.status(500).json({ status: 500, message: "internal server error" });
    }
  },

};
