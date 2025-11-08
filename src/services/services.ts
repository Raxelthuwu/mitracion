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



};