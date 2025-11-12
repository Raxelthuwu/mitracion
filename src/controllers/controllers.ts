import { Request, Response } from "express";
import { services } from "../services/services";

export const Controllers = {
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

  async insertarMigranteController(req: Request, res: Response) {
    try {
      const data = req.body;

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

  async obtenerMigrantePorDocumentoController(req: Request, res: Response) {
    try {
      const { document } = req.body;
      if (!document) {
        return res.status(400).json({
          status: 400,
          message: 'Falta el documento',
          data: {}
        });
      }
      const result = await services.obtenerMigrantePorDocumentoService(document);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error interno',
        data: {}
      });
    }
  },

  async insertarMigranteServicioController(req: Request, res: Response) {
    try {
      const { document, service, solicitudDate } = req.body;
      if (!document || !service || !solicitudDate) {
        return res.status(400).json({
          status: 400,
          message: 'Faltan datos requeridos'
        });
      }
      const result = await services.insertarMigranteServicioService(document, service, solicitudDate);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: 'Error interno'
      });
    }
  },

  async listarMigranteServicioController(req: Request, res: Response) {
  console.log("Endpoint migrante_servicio recibido");
  const result = await services.listarMigranteServicioService();
  console.log("Resultado migrante_servicio:", result);
  res.status(result.status).json(result);
},

  

  async obtenerMigranteServicioPorIdController(req: Request, res: Response) {
    const { id } = req.params;
    const result = await services.obtenerMigranteServicioPorIdService(Number(id));
    res.status(result.status).json(result);
  },

  async crearMigranteServicioController(req: Request, res: Response) {
    const data = req.body;
    const result = await services.crearMigranteServicioService(data);
    res.status(result.status).json(result);
  },

  async actualizarMigranteServicioController(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    const result = await services.actualizarMigranteServicioService(Number(id), data);
    res.status(result.status).json(result);
  },

  async eliminarMigranteServicioController(req: Request, res: Response) {
    const { id } = req.params;
    const result = await services.eliminarMigranteServicioService(Number(id));
    res.status(result.status).json(result);
  }
};


