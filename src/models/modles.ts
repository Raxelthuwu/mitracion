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
