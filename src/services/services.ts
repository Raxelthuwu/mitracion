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
            motive: migrante.motivo_migracion
          }
        };
      } else {
        return {
          status: 404,
          message: 'Migrante no encontrado',
          data: {}
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

  async insertarMigranteServicioService(document: string, service: number, solicitudDate: string) {
    try {
      const result = await Models.insertarMigranteServicio(document, service, solicitudDate);
      if (result === 'success') {
        return {
          status: 201,
          message: 'Solicitud registrada'
        };
      }
      if (result === 'not_found') {
        return {
          status: 404,
          message: 'Migrante no encontrado'
        };
      }
      return {
        status: 500,
        message: 'Error interno'
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Error interno'
      };
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

  async obtenerMigranteServicioPorIdService(id: number) {
    try {
      const found = await Models.obtenerMigranteServicioPorId(id);
      if (found) return { status: 200, data: found };
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

  async actualizarMigranteServicioService(id: number, data: Partial<IMigranteServicio>) {
    try {
      const result = await Models.actualizarMigranteServicio(id, data);
      if (result) return { status: 200, message: 'Actualizado' };
      return { status: 404, message: 'No encontrado' };
    } catch (error) {
      return { status: 500, message: 'Error interno' };
    }
  },

  async eliminarMigranteServicioService(id: number) {
    try {
      const result = await Models.eliminarMigranteServicio(id);
      if (result) return { status: 200, message: 'Eliminado' };
      return { status: 404, message: 'No encontrado' };
    } catch (error) {
      return { status: 500, message: 'Error interno' };
    }
  }
};
