import { Request, Response } from "express";
import { services } from "../services/services";
import { IMigrante } from "../utils/utils";
import { Models } from "../models/modles";

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

  // Insertar migrante
  async insertarMigranteController(req: Request, res: Response) {
    try {
      const data: IMigrante = req.body;
      if (
        !data.nombre_completo ||
        !data.documento ||
        !data.edad ||
        !data.genero ||
        !data.nacionalidad ||
        !data.pais_origen ||
        !data.fecha_llegada ||
        !data.correo ||
        !data.numero_telefonico ||
        !data.motivo_migracion
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const result = await services.insertarMigranteService(data);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error("Error en insertarMigranteController:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Actualizar migrante
  async actualizarMigranteController(req: Request, res: Response) {
    try {
      const documento = parseInt(req.params.documento);
      const data: Partial<IMigrante> = req.body;
      if (isNaN(documento)) {
        return res.status(400).json({ message: "Invalid documento" });
      }
      const result = await services.actualizarMigranteService(documento, data);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error("Error en actualizarMigranteController:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Eliminar migrante
  async eliminarMigranteController(req: Request, res: Response) {
    try {
      const documento = parseInt(req.params.documento);
      if (isNaN(documento)) {
        return res.status(400).json({ message: "Invalid documento" });
      }
      const result = await services.eliminarMigranteService(documento);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error("Error en eliminarMigranteController:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Obtener familiares de un migrante por documento
  async obtenerFamiliaresPorDocumentoController(req: Request, res: Response) {
    try {
      const documento = parseInt(req.params.documento);
      const result = await services.obtenerFamiliaresPorDocumentoService(documento);
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en obtenerFamiliaresPorDocumentoController:", error);
      return res.status(500).json({ message: "internal server error" });
    }
  },

  // Obtener atenciones de un migrante
  async obtenerAtencionesMigranteController(req: Request, res: Response) {
    try {
      const documento = parseInt(req.params.documento);
      const result = await services.obtenerAtencionesMigranteService(documento);
      return res.status(result.status).json(result);
    } catch (error) {
      console.error("Error en obtenerAtencionesMigranteController:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Obtener migrante por documento
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
      return res.status(result.status).json(result);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: 'Error interno',
        data: {}
      });
    }
  },


  // Listar Migrante Servicio con campos JOINeados
async listarMigranteServicioController(req: Request, res: Response) {
  try {
    const result = await services.listarMigranteServicioService();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error interno'
    });
  }
},

// Obtener migrante_servicio por DOCUMENTO (no id)
async obtenerMigranteServicioPorDocumentoController(req: Request, res: Response) {
  try {
    const documento = req.query.documento as string;
    if (!documento) {
      return res.status(400).json({ status: 400, message: 'Falta el documento' });
    }
    const result = await services.obtenerMigranteServicioPorDocumentoService(documento);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error interno' });
  }
},



// Crear migrante_servicio (igual que antes)
async crearMigranteServicioController(req: Request, res: Response) {
  try {
    const data = req.body;
    const result = await services.crearMigranteServicioService(data);
    return res.status(result.status).json(result);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error interno'
    });
  }
},

// Actualizar migrante_servicio por DOCUMENTO
async actualizarMigranteServicioPorDocumentoController(req: Request, res: Response) {
  try {
    const { documento } = req.body;
    const data = req.body.data || {};
    if (!documento) {
      return res.status(400).json({ status: 400, message: 'Falta el documento' });
    }
    const result = await services.actualizarMigranteServicioPorDocumentoService(documento, data);
    return res.status(200).json({ status: 200, result });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Error interno' });
  }
},

// Eliminar migrante_servicio por DOCUMENTO
async eliminarMigranteServicioPorDocumentoController(req: Request, res: Response) {
  try {
    const documento = req.query.documento as string;
    console.log("Recibido en controller:", documento);

    if (!documento) {
      console.log("Falta el documento en la query param");
      return res.status(400).json({ status: 400, message: 'Falta el documento' });
    }

    const eliminado = await Models.eliminarMigranteServicioPorDocumento(documento);
    if (eliminado > 0) {
      console.log("Eliminación exitosa");
      return res.status(200).json({ status: 200, message: 'Eliminado' });
    }

    console.log("No encontrado o nada para eliminar");
    return res.status(404).json({ status: 404, message: 'No encontrado o nada para eliminar' });
  } catch (error) {
    console.error("Error en catch eliminar:", error);
    return res.status(500).json({ status: 500, message: 'Error interno' });
  }
}
};

