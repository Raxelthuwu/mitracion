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

  async obtenerMigrantePorDocumento(documento: number): Promise<IMigrante | null> {
    try {
      const migrante = await db<IMigrante>('mitracion.migrante')
        .where('documento', documento)
        .first();
      return migrante || null;
    } catch (error) {
      throw new Error('Error al consultar el migrante');
    }
  },

  async insertarMigranteServicio(documento: number, id_servicio: number, solicitudDate: Date) {
    const migrante = await db<IMigrante>('mitracion.migrante')
      .where({ documento })
      .select('id_migrante')
      .first();
    if (!migrante || !migrante.id_migrante) return 'not_found';
    await db('mitracion.migrante_servicio').insert({
      id_migrante: migrante.id_migrante,
      id_servicio,
      fecha_solicitud: solicitudDate
    });
    return 'success';
  },

  async listarMigranteServicio(): Promise<IMigranteServicio[]> {
    try {
      const data = await db<IMigranteServicio>('mitracion.migrante_servicio');
      console.log("Resultado listarMigranteServicio:", data);
      return data;
    } catch (error) {
      console.error("Error en listarMigranteServicio:", error);
      throw error;
    }
  },

  async obtenerMigranteServicioPorId(id: number): Promise<IMigranteServicio | null> {
    const result = await db<IMigranteServicio>('mitracion.migrante_servicio')
      .where('id_migrante_servicio', id)
      .first();
    return result || null;
  },

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

  async crearMigranteServicio(data: IMigranteServicio): Promise<void> {
    try {
      await db<IMigranteServicio>('mitracion.migrante_servicio').insert(data);
    } catch (error) {
      console.error("Error al crear migrante_servicio:", error);
      throw new Error("internal server error");
    }
  },

  async actualizarMigranteServicio(id: number, data: Partial<IMigranteServicio>): Promise<number> {
    return await db<IMigranteServicio>('mitracion.migrante_servicio')
      .where('id_migrante_servicio', id)
      .update(data);
  },

  async eliminarMigranteServicio(id: number): Promise<number> {
    return await db<IMigranteServicio>('mitracion.migrante_servicio')
      .where('id_migrante_servicio', id)
      .del();
  }
};
