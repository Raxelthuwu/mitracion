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

  async obtenerMigrantePorDocumentoService(documento: string) {
    try {
      const migrante = await Models.obtenerMigrantePorDocumento(documento);
      if (migrante) {
        return {
          status: 200,
          data: {
            fullname: migrante.nombre_completo,
            document: migrante.documento,
            age: migrante.edad,
            gender: migrante.genero,
            nacionality: migrante.nacionalidad,
            originCountry: migrante.pais_origen,
            dateArrival: migrante.fecha_llegada,
            email: migrante.correo,
            phoneNumber: migrante.numero_telefonico,
            motive: migrante.motivo_migracion,
          }
        };
      } else {
        return {
          status: 404,
          message: 'Migrante no encontrado',
          data: {},
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: 'Error interno',
        data: {}
      };
    }
  },

  // Actualiza los datos de un migrante existente
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

  // Elimina un migrante de la base de datos
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

  // Obtener familiares de un migrante por documento
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

  async listarMigranteServicioService() {
    try {
      const lista = await Models.listarMigranteServicio();
      return { status: 200, data: lista };
    } catch (error) {
      return { status: 500, message: 'Error interno' };
    }
  },

  // Obtención por documento: recibe { documento } y retorna info join
  async obtenerMigranteServicioPorDocumentoService(documento: string) {
    try {
      const found = await Models.obtenerMigranteServicioPorDocumento(documento);
      if (found && found.length > 0) return { status: 200, data: found };
      return { status: 404, message: 'No encontrado' };
    } catch (error) {
      return { status: 500, message: 'Error interno' };
    }
  },

  async crearMigranteServicioService(data: IMigranteServicio) {
    try {
      await Models.crearMigranteServicio(data);
      return { status: 201, message: 'Creado' };
    } catch (error) {
      return { status: 500, message: 'Error interno' };
    }
  },

  // Actualizar por documento
  async actualizarMigranteServicioPorDocumentoService(documento: string, data: Partial<IMigranteServicio>) {
    try {
      const result = await Models.actualizarMigranteServicioPorDocumento(documento, data);
      if (result) return { status: 200, message: 'Actualizado' };
      return { status: 404, message: 'No encontrado' };
    } catch (error) {
      return { status: 500, message: 'Error interno' };
    }
  },

  // Eliminar por documento
  async eliminarMigranteServicioPorDocumentoService(documento: string) {
    try {
      const result = await Models.eliminarMigranteServicioPorDocumento(documento);
      if (result) return { status: 200, message: 'Eliminado' };
      return { status: 404, message: 'No encontrado' };
    } catch (error) {
      return { status: 500, message: 'Error interno' };
    }
  },

//Andres Valencia

// 1. Servicio para insertar familiar del migrante
  async insertarMigranteFamiliarService(data: IMigranteFamiliar) {
    try {
      const result = await Models.insertarMigranteFamiliar(data);
      return {
        status: 201,
        message: result.message,
      };
    } catch (error: any) {
      console.error("Error en insertarMigranteFamiliarService:", error);
      return {
        status: 500,
        message: "internal server error",
      };
    }
  },

  // 2. Servicio para insertar migrante_servicio
  async insertarMigranteServicioService(data: IMigranteServicio) {
    try {
      const result = await Models.insertarMigranteServicio(data);
      return {
        status: 201,
        message: result.message,
      };
    } catch (error: any) {
      console.error("Error en insertarMigranteServicioService:", error);
      return {
        status: 500,
        message: "internal server error",
      };
    }
  },

// === CRUD REGISTRO_ATENCION ===

  async crearRegistroAtencionService(data: IRegistroAtencion) {
    try {
      const result = await Models.crearRegistroAtencion(data);
      return { status: 201, message: result.message };
    } catch (error: any) {
      console.error("Error en crearRegistroAtencionService:", error);
      return { status: 500, message: "internal server error" };
    }
  },

  async obtenerRegistrosAtencionService() {
    try {
      const registros = await Models.obtenerRegistrosAtencion();
      return { status: 200, data: registros };
    } catch (error: any) {
      console.error("Error en obtenerRegistrosAtencionService:", error);
      return { status: 500, message: "internal server error" };
    }
  },

  async obtenerRegistroAtencionPorIdService(id: number) {
    try {
      const registro = await Models.obtenerRegistroAtencionPorId(id);
      if (registro) {
        return { status: 200, data: registro };
      } else {
        return { status: 404, message: "registro no encontrado" };
      }
    } catch (error: any) {
      console.error("Error en obtenerRegistroAtencionPorIdService:", error);
      return { status: 500, message: "internal server error" };
    }
  },

  async actualizarRegistroAtencionService(id: number, data: Partial<IRegistroAtencion>) {
    try {
      const result = await Models.actualizarRegistroAtencion(id, data);
      return { status: 200, message: result.message };
    } catch (error: any) {
      console.error("Error en actualizarRegistroAtencionService:", error);
      return { status: 500, message: "internal server error" };
    }
  },

  async eliminarRegistroAtencionService(id: number) {
    try {
      const result = await Models.eliminarRegistroAtencion(id);
      return { status: 200, message: result.message };
    } catch (error: any) {
      console.error("Error en eliminarRegistroAtencionService:", error);
      return { status: 500, message: "internal server error" };
    }
  },

};