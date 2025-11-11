import { Models } from "../models/modles";
import {
  IMigrante,
  IServicio,
  IRelacion,
  IPrograma,
  IInstitucion,
  IUsuario,
  IMigranteServicio,
  IMigranteFamiliar,
  IRegistroAtencion,
} from "../utils/utils";

export const services = {

    //Verifica si existe un usuario con el correo y contraseña dados.
    async verificarUsuarioService(email: string, password: string) {
    try {
      const user = await Models.verificarUsuario(email, password);

      if (user) {
        return {
          status: 200,
          message: "success",
        };
      } else {
        return {
          status: 400,
          message: "data no found",
        };
      }
    } catch (error: any) {
      console.error("Error en verificarUsuarioService:", error);
      return {
        status: 500,
        message: "internal server error",
      };
    }
  },
  
  // Inserta un nuevo migrante en la base de datos.
  async insertarMigranteService(data: IMigrante) {
    try {
      const result = await Models.insertarMigrante(data);

      return {
        status: 201,
        message: result.message,
      };
    } catch (error: any) {
      console.error("Error en insertarMigranteService:", error);
      return {
        status: 500,
        message: "internal server error",
      };
    }
  },

  //Actualiza los datos de un migrante existente
  async actualizarMigranteService(documento: number, data: Partial<IMigrante>) {
    try {
      const result = await Models.actualizarMigrante(documento, data);
      return {
        status: 200,
        message: result.message,
      };
    } catch (error: any) {
      if (error.message === "not found") {
        return {
          status: 404,
          message: "data not found",
        };
      } else {
        return {
          status: 500,
          message: "internal server error",
        };
      }
    }
  },

  //Elimina un migrante de la base de datos
  async eliminarMigranteService(documento: number) {
    try {
      const result = await Models.eliminarMigrante(documento);
      return {
        status: 200,
        message: result.message,
      };
    } catch (error: any) {
      if (error.message === "not found") {
        return {
          status: 404,
          message: "data not found",
        };
      } else {
        return {
          status: 500,
          message: "internal server error",
        };
      }
    }
  },

  //Obtener familiares de un migrante por documento
  async obtenerFamiliaresPorDocumentoService(documento: number) {
    try {
      const data = await Models.obtenerFamiliaresPorDocumento(documento);
      if (!data || data.length === 0) {
        return { status: 404, message: "no family found" };
      }
      return { status: 200, message: "success", data };
    } catch (error) {
      console.error("Error en obtenerFamiliaresPorDocumentoService:", error);
      return { status: 500, message: "internal server error" };
    }
  },

  async obtenerAtencionesMigranteService(documento: number) {
      try {
        const data = await Models.obtenerAtencionesPorDocumento(documento);
        if (!data || data.length === 0) {
          return { status: 404, message: "No se encontraron registros para este migrante" };
        }
        return { status: 200, data };
      } catch (error) {
        console.error("Error en el service obtenerAtencionesMigranteService:", error);
        return { status: 500, message: "Internal server error" };
      }
    },













};