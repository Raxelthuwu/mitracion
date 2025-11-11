import { Request, Response } from "express";
import { services } from "../services/services";
import { IMigrante } from "../utils/utils";

export const Controllers = {

  //Verificar usuario por correo y contraseña
  async verificarUsuarioController(req: Request, res: Response) {
    try {
      const { correo, contrasena } = req.body;

      if (!correo || !contrasena) {
        return res.status(400).json({ message: "Missing email or password" });
      }

      const response = await services.verificarUsuarioService(correo, contrasena);
      return res.status(response.status).json({ message: response.message });
    } catch (error) {
      console.error("Error en verificarUsuarioController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  //Insertar migrante
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

      const response = await services.insertarMigranteService(data);
      res.status(response.status).json({ message: response.message });
    } catch (error) {
      console.error("Error en insertarMigranteController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  //Actualizar migrante
  async actualizarMigranteController(req: Request, res: Response) {
    try {
      const documento = parseInt(req.params.documento);
      const data: Partial<IMigrante> = req.body;

      if (isNaN(documento)) {
        return res.status(400).json({ message: "Invalid documento" });
      }

      const response = await services.actualizarMigranteService(documento, data);
      res.status(response.status).json({ message: response.message });
    } catch (error) {
      console.error("Error en actualizarMigranteController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  //Eliminar migrante
  async eliminarMigranteController(req: Request, res: Response) {
    try {
      const documento = parseInt(req.params.documento);

      if (isNaN(documento)) {
        return res.status(400).json({ message: "Invalid documento" });
      }

      const response = await services.eliminarMigranteService(documento);
      res.status(response.status).json({ message: response.message });
    } catch (error) {
      console.error("Error en eliminarMigranteController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },


    // Obtener familiares de un migrante por documento
    async obtenerFamiliaresPorDocumentoController(req: Request, res: Response) {
    try {
        const documento = parseInt(req.params.documento);
        const response = await services.obtenerFamiliaresPorDocumentoService(documento);
        res.status(response.status).json(response);
    } catch (error) {
        console.error("Error en obtenerFamiliaresPorDocumentoController:", error);
        res.status(500).json({ message: "internal server error" });
    }
    },

  async obtenerAtencionesMigranteController(req: Request, res: Response) {
    try {
      const documento = parseInt(req.params.documento);
      const response = await services.obtenerAtencionesMigranteService(documento);
      res.status(response.status).json(response);
    } catch (error) {
      console.error("Error en obtenerAtencionesMigranteController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },











};
