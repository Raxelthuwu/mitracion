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