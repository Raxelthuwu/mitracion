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
          data: user
        };
      } else {
        return {
          status: 404,
          message: "data no found",
          data: null
        };
      }
    } catch (error: any) {
      console.error("Error en verificarUsuarioService:", error);
      return {
        status: 500,
        message: "internal server error",
        data: null
      };
    }
  },

  async insertarMigranteService(data: IMigrante) {
    try {
      const result = await Models.insertarMigrante(data);

      return {
        status: 201,
        message: result.message,
        data: data
      };
    } catch (error: any) {
      console.error("Error en insertarMigranteService:", error);
      return {
        status: 500,
        message: "internal server error",
        data: null
      };
    }
  },
  
  async obtenerMigrantePorDocumentoService(documento: number) {
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
            motive: migrante.motivo_migracion
          }
        };
      } else {
        return {
          status: 404,
          message: 'Migrante no encontrado',
          data: null
        };
      }
    } catch (error) {
      console.error("Error en obtenerMigrantePorDocumentoService:", error);
      return {
        status: 500,
        message: 'Error interno',
        data: null
      };
    }
  },

  async actualizarMigranteService(documento: number, data: Partial<IMigrante>) {
    try {
      const result = await Models.actualizarMigrante(documento, data);
      return {
        status: 200,
        message: result.message,
        data: null
      };
    } catch (error: any) {
      if (error.message === "not found") {
        return {
          status: 404,
          message: "data not found",
          data: null
        };
      } else {
        return {
          status: 500,
          message: "internal server error",
          data: null
        };
      }
    }
  },

  async eliminarMigranteService(documento: number) {
    try {
      const result = await Models.eliminarMigrante(documento);
      return {
        status: 200,
        message: result.message,
        data: null
      };
    } catch (error: any) {
      if (error.message === "not found") {
        return {
          status: 404,
          message: "data not found",
          data: null
        };
      } else {
        return {
          status: 500,
          message: "internal server error",
          data: null
        };
      }
    }
  },

  async obtenerFamiliaresPorDocumentoService(documento: number) {
    try {
      const data = await Models.obtenerFamiliaresPorDocumento(documento);
      if (!data || data.length === 0) {
        return { status: 404, message: "no family found", data: null };
      }
      return { status: 200, message: "success", data };
    } catch (error) {
      console.error("Error en obtenerFamiliaresPorDocumentoService:", error);
      return { status: 500, message: "internal server error", data: null };
    }
  },

  async obtenerAtencionesMigranteService(documento: number) {
      try {
        const data = await Models.obtenerAtencionesPorDocumento(documento);
        if (!data || data.length === 0) {
          return { status: 404, message: "No se encontraron registros para este migrante", data: null };
        }
        return { status: 200, data };
      } catch (error) {
        console.error("Error en el service obtenerAtencionesMigranteService:", error);
        return { status: 500, message: "Internal server error", data: null };
      }
    },

  async insertarMigranteServicioService(documento: number, id_servicio: number, solicitudDate: Date) {
    try {
      const result = await Models.insertarMigranteServicio(documento, id_servicio, solicitudDate);
      if (result === 'success') {
        return {
          status: 201,
          message: 'Solicitud registrada',
          data: null
        };
      }
      if (result === 'not_found') {
        return {
          status: 404,
          message: 'Migrante no encontrado',
          data: null
        };
      }
      return {
        status: 500,
        message: 'Error interno',
        data: null
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Error interno',
        data: null
      };
    }
  },

  async listarMigranteServicioService() {
    try {
      const lista = await Models.listarMigranteServicio();
      return { status: 200, data: lista };
    } catch (error) {
      return { status: 500, message: 'Error interno', data: null };
    }
  },

  async obtenerMigranteServicioPorIdService(id: number) {
    try {
      const found = await Models.obtenerMigranteServicioPorId(id);
      if (found) return { status: 200, data: found };
      return { status: 404, message: 'No encontrado', data: null };
    } catch (error) {
      return { status: 500, message: 'Error interno', data: null };
    }
  },

  async crearMigranteServicioService(data: IMigranteServicio) {
    try {
      await Models.crearMigranteServicio(data);
      return { status: 201, message: 'Creado', data: data };
    } catch (error) {
      return { status: 500, message: 'Error interno', data: null };
    }
  },

  async actualizarMigranteServicioService(id: number, data: Partial<IMigranteServicio>) {
    try {
      const result = await Models.actualizarMigranteServicio(id, data);
      if (result) return { status: 200, message: 'Actualizado', data: null };
      return { status: 404, message: 'No encontrado', data: null };
    } catch (error) {
      return { status: 500, message: 'Error interno', data: null };
    }
  },

  async eliminarMigranteServicioService(id: number) {
    try {
      const result = await Models.eliminarMigranteServicio(id);
      if (result) return { status: 200, message: 'Eliminado', data: null };
      return { status: 404, message: 'No encontrado', data: null };
    } catch (error) {
      return { status: 500, message: 'Error interno', data: null };
    }
  }
};
