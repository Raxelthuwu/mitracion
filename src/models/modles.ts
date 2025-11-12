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
        const user = await db<IUsuario>("mitracion.usuario")
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
            await db<IMigrante>("mitracion.migrante").insert({
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

//Andres Valencia

// 1. Inserta familiares del migrante
  async insertarMigranteFamiliar(data: any): Promise<{ message: string }> {
    try {
      await db("mitracion.migrante_familiar").insert({
        id_migrante: data.id_migrante,
        id_familiar: data.id_familiar,
        id_relacion: data.id_relacion,
      });

      return { message: "success" };
    } catch (error) {
      console.error("Error al insertar familiar:", error);
      throw new Error("internal server error");
    }
  },

  // 2. Inserta relación migrante-servicio
  async insertarMigranteServicio(data: IMigranteServicio): Promise<{ message: string }> {
    try {
      await db<IMigranteServicio>("mitracion.migrante_servicio").insert({
        id_migrante: data.id_migrante,
        id_servicio: data.id_servicio,
        fecha_solicitud: data.fecha_solicitud,
      });
      return { message: "servicio solicitado correctamente" };
    } catch (error) {
      console.error("Error al insertar migrante_servicio:", error);
      throw new Error("internal server error");
    }
  },

// === CRUD REGISTRO_ATENCION ===

  // Crear un nuevo registro de atención
  async crearRegistroAtencion(data: IRegistroAtencion): Promise<{ message: string }> {
    try {
      await db<IRegistroAtencion>("mitracion.registro_atencion").insert({
        fecha: data.fecha,
        observaciones: data.observaciones,
        id_funcionario: data.id_funcionario,
        id_migrante_servicio: data.id_migrante_servicio,
        id_institucion: data.id_institucion,
      });
      return { message: "registro creado correctamente" };
    } catch (error) {
      console.error("Error al crear registro de atención:", error);
      throw new Error("internal server error");
    }
  },

  // Obtener todos los registros con nombres descriptivos
  async obtenerRegistrosAtencion(): Promise<IRegistroAtencion[]> {
    try {
      const registros = await db("mitracion.registro_atencion as ra")
        .select(
          "ra.id_registro",
          "ra.fecha",
          "ra.observaciones",
          "u.nombre as funcionario",
          "m.nombre_completo as migrante",
          "s.tipo_servicio as servicio",
          "i.nombre as institucion"
        )
        .innerJoin("mitracion.usuario as u", "ra.id_funcionario", "u.id_usuario")
        .innerJoin("mitracion.migrante_servicio as ms", "ra.id_migrante_servicio", "ms.id_migrante_servicio")
        .innerJoin("mitracion.migrante as m", "ms.id_migrante", "m.id_migrante")
        .innerJoin("mitracion.servicio as s", "ms.id_servicio", "s.id_servicio")
        .innerJoin("mitracion.institucion as i", "ra.id_institucion", "i.id_institucion")
        .orderBy("ra.id_registro", "asc");

      return registros;
    } catch (error) {
      console.error("Error al obtener registros de atención:", error);
      throw new Error("internal server error");
    }
  },

  // Obtener un registro por ID con nombres descriptivos
  async obtenerRegistroAtencionPorId(id: number): Promise<IRegistroAtencion | null> {
    try {
      const registro = await db("mitracion.registro_atencion as ra")
        .select(
          "ra.id_registro",
          "ra.fecha",
          "ra.observaciones",
          "u.nombre as funcionario",
          "m.nombre_completo as migrante",
          "s.tipo_servicio as servicio",
          "i.nombre as institucion"
        )
        .innerJoin("mitracion.usuario as u", "ra.id_funcionario", "u.id_usuario")
        .innerJoin("mitracion.migrante_servicio as ms", "ra.id_migrante_servicio", "ms.id_migrante_servicio")
        .innerJoin("mitracion.migrante as m", "ms.id_migrante", "m.id_migrante")
        .innerJoin("mitracion.servicio as s", "ms.id_servicio", "s.id_servicio")
        .innerJoin("mitracion.institucion as i", "ra.id_institucion", "i.id_institucion")
        .where("ra.id_registro", id)
        .first();

      return registro || null;
    } catch (error) {
      console.error("Error al obtener registro de atención por ID:", error);
      throw new Error("internal server error");
    }
  },

  // Actualizar un registro de atención
  async actualizarRegistroAtencion(id: number, data: Partial<IRegistroAtencion>): Promise<{ message: string }> {
    try {
      await db("mitracion.registro_atencion")
        .where({ id_registro: id })
        .update(data);
      return { message: "registro actualizado correctamente" };
    } catch (error) {
      console.error("Error al actualizar registro de atención:", error);
      throw new Error("internal server error");
    }
  },

  // Eliminar un registro de atención
  async eliminarRegistroAtencion(id: number): Promise<{ message: string }> {
    try {
      await db("mitracion.registro_atencion")
        .where({ id_registro: id })
        .del();
      return { message: "registro eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar registro de atención:", error);
      throw new Error("internal server error");
    }
  },

};
