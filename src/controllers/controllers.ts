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
          data: null
        });
      }

      const result = await services.verificarUsuarioService(email, password);
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en verificarUsuarioController:", error);
      return res.status(500).json({
        status: 500,
        message: "internal server error",
        data: null
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
          data: null
        });
      }

      const result = await services.insertarMigranteService(data);
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en insertarMigranteController:", error);
      return res.status(500).json({
        status: 500,
        message: "internal server error",
        data: null
      });
    }
  },

  async obtenerMigrantePorDocumentoController(req: Request, res: Response) {
    try {
      const documento = Number(req.params.documento);
      if (!documento) {
        return res.status(400).json({
          status: 400,
          message: 'Falta el documento',
          data: null
        });
      }
      const result = await services.obtenerMigrantePorDocumentoService(documento);
      res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en obtenerMigrantePorDocumentoController:", error);
      res.status(500).json({
        status: 500,
        message: 'Error interno',
        data: null
      });
    }
  },

  async insertarMigranteServicioController(req: Request, res: Response) {
    try {
      const { document, service, solicitudDate } = req.body;
      const documento = Number(document);
      const id_servicio = Number(service);
      const fecha_solicitud = new Date(solicitudDate);

      if (!documento || !id_servicio || !fecha_solicitud) {
        return res.status(400).json({
          status: 400,
          message: 'Faltan datos requeridos',
          data: null
        });
      }

      const result = await services.insertarMigranteServicioService(documento, id_servicio, fecha_solicitud);
      res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en insertarMigranteServicioController:", error);
      res.status(500).json({
        status: 500,
        message: 'Error interno',
        data: null
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
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ status: 400, message: 'ID inválido', data: null });
    }
    const result = await services.obtenerMigranteServicioPorIdService(id);
    res.status(result.status).json(result);
  },

  async crearMigranteServicioController(req: Request, res: Response) {
    const data = req.body;
    const result = await services.crearMigranteServicioService(data);
    res.status(result.status).json(result);
  },

  async actualizarMigranteServicioController(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ status: 400, message: 'ID inválido', data: null });
    }
    const data = req.body;
    const result = await services.actualizarMigranteServicioService(id, data);
    res.status(result.status).json(result);
  },

  async eliminarMigranteServicioController(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ status: 400, message: 'ID inválido', data: null });
    }
    const result = await services.eliminarMigranteServicioService(id);
    res.status(result.status).json(result);
  },

  async actualizarMigranteController(req: Request, res: Response) {
    const documento = Number(req.params.documento);
    if (!documento) {
      return res.status(400).json({ status: 400, message: "Falta el documento", data: null });
    }
    const data = req.body;
    const result = await services.actualizarMigranteService(documento, data);
    res.status(result.status).json(result);
  },

  async eliminarMigranteController(req: Request, res: Response) {
    const documento = Number(req.params.documento);
    if (!documento) {
      return res.status(400).json({ status: 400, message: "Falta el documento", data: null });
    }
    const result = await services.eliminarMigranteService(documento);
    res.status(result.status).json(result);
  },

  async obtenerFamiliaresPorDocumentoController(req: Request, res: Response) {
    const documento = Number(req.params.documento);
    if (!documento) {
      return res.status(400).json({ status: 400, message: "Falta el documento", data: null });
    }
    const result = await services.obtenerFamiliaresPorDocumentoService(documento);
    res.status(result.status).json(result);
  },

  async obtenerAtencionesMigranteController(req: Request, res: Response) {
    const documento = Number(req.params.documento);
    if (!documento) {
      return res.status(400).json({ status: 400, message: "Falta el documento", data: null });
    }
    const result = await services.obtenerAtencionesMigranteService(documento);
    res.status(result.status).json(result);
  }
};
