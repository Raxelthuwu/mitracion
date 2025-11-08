import db from "../config/database";

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

export const Models = { 



    //Verifica si existe un usuario con el correo y contraseña dados.
    async verificarUsuario(email: string, password: string): Promise<IUsuario | null> {
        try {
        const user = await db<IUsuario>("migracion.usuario")
            .where({ correo: email, contrasena: password })
            .first(); 
        return user || null;
        } catch (error) {
        console.error("Error al verificar usuario:", error);
        throw new Error("Error al consultar el usuario en la base de datos");
        }
    },


    // Inserta un nuevo migrante en la base de datos.
        async insertarMigrante(data: IMigrante): Promise<{ message: string }> {
            try {
            await db<IMigrante>("migracion.migrante").insert({
                nombre_completo: data.nombre_completo,
                documento: data.documento,
                edad: data.edad,
                genero: data.genero,
                nacionalidad: data.nacionalidad,
                pais_origen: data.pais_origen,
                fecha_llegada: data.fecha_llegada,
                correo: data.correo,
                numero_telefonico: data.numero_telefonico,
                motivo_migracion: data.motivo_migracion,
            });

            return { message: "success" };
            } catch (error) {
            console.error("Error al insertar migrante:", error);
            throw new Error("internal server error");
            }
        },




};
