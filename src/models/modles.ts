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
  // Verifica si existe un usuario con el correo y contraseña dados.
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

  // Obtener migrante por documento
  async obtenerMigrantePorDocumento(documento: string): Promise<any> {
    try {
      const migrante = await db<IMigrante>('mitracion.migrante')
        .where('documento', documento)
        .first();
      return migrante ? migrante : null;
    } catch (error) {
      throw new Error('Error al consultar el migrante');
    }
  },

  // Actualiza los datos de un migrante existente
  async actualizarMigrante(documento: number, data: Partial<IMigrante>): Promise<{ message: string }> {
    try {
      const result = await db<IMigrante>("mitracion.migrante")
        .where({ documento })
        .update(data);
      if (result === 0) throw new Error("not found");
      return { message: "updated successfully" };
    } catch (error) {
      throw new Error("internal server error");
    }
  },

  // Elimina un migrante de la base de datos
  async eliminarMigrante(documento: number): Promise<{ message: string }> {
    try {
      const result = await db<IMigrante>("mitracion.migrante")
        .where({ documento })
        .del();
      if (result === 0) throw new Error("not found");
      return { message: "deleted successfully" };
    } catch (error) {
      console.error("Error al eliminar migrante:", error);
      throw new Error("internal server error");
    }
  },

  // Obtener los familiares de un migrante por documento
  async obtenerFamiliaresPorDocumento(documento: number) {
    try {
      const familiares = await db("mitracion.migrante")
        .join("mitracion.migrante_familiar", "mitracion.migrante.id_migrante", "mitracion.migrante_familiar.id_migrante")
        .join("mitracion.migrante as familiar", "mitracion.migrante_familiar.id_familiar", "familiar.id_migrante")
        .join("mitracion.relacion", "mitracion.migrante_familiar.id_relacion", "mitracion.relacion.id_relacion")
        .select(
          "familiar.nombre_completo",
          "familiar.documento",
          "familiar.edad",
          "familiar.genero",
          "familiar.nacionalidad",
          "familiar.pais_origen",
          "mitracion.relacion.tipo_relacion"
        )
        .where("mitracion.migrante.documento", documento);

      return familiares;
    } catch (error) {
      console.error("Error al obtener familiares:", error);
      throw new Error("internal server error");
    }
  },

  // Obtener atenciones por documento de migrante
  async obtenerAtencionesPorDocumento(documento: number) {
    try {
      const resultados = await db("mitracion.registro_atencion")
        .rightJoin(
          "mitracion.migrante_servicio",
          "mitracion.registro_atencion.id_migrante_servicio",
          "mitracion.migrante_servicio.id_migrante_servicio"
        )
        .leftJoin(
          "mitracion.servicio",
          "mitracion.migrante_servicio.id_servicio",
          "mitracion.servicio.id_servicio"
        )
        .leftJoin(
          "mitracion.migrante",
          "mitracion.migrante_servicio.id_migrante",
          "mitracion.migrante.id_migrante"
        )
        .leftJoin(
          "mitracion.institucion",
          "mitracion.registro_atencion.id_institucion",
          "mitracion.institucion.id_institucion"
        )
        .leftJoin(
          "mitracion.usuario",
          "mitracion.registro_atencion.id_funcionario",
          "mitracion.usuario.id_usuario"
        )
        .select(
          "mitracion.migrante.id_migrante",
          "mitracion.migrante.nombre_completo",
          "mitracion.migrante.documento",
          "mitracion.servicio.tipo_servicio",
          "mitracion.migrante_servicio.fecha_solicitud",
          "mitracion.registro_atencion.id_registro",
          "mitracion.registro_atencion.fecha",
          "mitracion.registro_atencion.observaciones",
          "mitracion.institucion.nombre",
          "mitracion.usuario.nombre"
        )
        .where("mitracion.migrante.documento", documento);

      return resultados;
    } catch (error) {
      console.error("Error al obtener atenciones del migrante:", error);
      throw new Error("internal server error");
    }
  },

  
  async listarMigranteServicio(): Promise<any[]> {
  try {
    const data = await db("mitracion.migrante_servicio")
      .join("mitracion.migrante", "mitracion.migrante_servicio.id_migrante", "mitracion.migrante.id_migrante")
      .join("mitracion.servicio", "mitracion.migrante_servicio.id_servicio", "mitracion.servicio.id_servicio")
      .select(
        "mitracion.migrante_servicio.id_migrante_servicio",
        "mitracion.migrante.nombre_completo as migrante_nombre",
        "mitracion.migrante.documento as migrante_documento",
        "mitracion.servicio.tipo_servicio",
        "mitracion.migrante_servicio.fecha_solicitud"
      );
    return data;
  } catch (error) {
    console.error("Error en listarMigranteServicio:", error);
    throw error;
  }
},

  async obtenerMigranteServicioPorDocumento(documento: string): Promise<any[]> {
  try {
    const data = await db("mitracion.migrante_servicio")
      .join("mitracion.migrante", "mitracion.migrante_servicio.id_migrante", "mitracion.migrante.id_migrante")
      .join("mitracion.servicio", "mitracion.migrante_servicio.id_servicio", "mitracion.servicio.id_servicio")
      .select(
        "mitracion.migrante_servicio.id_migrante_servicio",
        "mitracion.migrante.nombre_completo as migrante_nombre",
        "mitracion.migrante.documento as migrante_documento",
        "mitracion.servicio.tipo_servicio",
        "mitracion.migrante_servicio.fecha_solicitud"
      )
      .where("mitracion.migrante.documento", documento);

    return data;
  } catch (error) {
    console.error("Error en obtenerMigranteServicioPorDocumento:", error);
    throw error;
  }
},


  async crearMigranteServicio(data: IMigranteServicio): Promise<void> {
    await db<IMigranteServicio>('mitracion.migrante_servicio').insert(data);
  },

  async actualizarMigranteServicioPorDocumento(documento: string, data: Partial<IMigranteServicio>): Promise<number> {
  const migrante = await db("mitracion.migrante").where("documento", documento).first();
  if (!migrante || !migrante.id_migrante) return 0;

  return await db("mitracion.migrante_servicio")
    .where("id_migrante", migrante.id_migrante)
    .update(data);
},

async eliminarMigranteServicioPorDocumento(documento: string): Promise<number> {
  console.log("Intentando eliminar migrante_servicio para documento:", documento);

  const migrante = await db("mitracion.migrante").where({ documento }).first();
  console.log("Resultado búsqueda migrante:", migrante);

  if (!migrante || !migrante.id_migrante) {
    console.log("No se encontró migrante con ese documento");
    return 0;
  }

  const result = await db("mitracion.migrante_servicio")
    .where("id_migrante", migrante.id_migrante)
    .del();

  console.log("Resultado eliminación migrante_servicio:", result);
  return result;
}



};
