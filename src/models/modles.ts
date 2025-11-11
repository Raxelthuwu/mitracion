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
      const user = await db<IUsuario>("migracion.usuario")
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

  async obtenerMigrantePorDocumento(documento: string): Promise<any> {
    try {
      const migrante = await db<IMigrante>('migracion.migrante')
        .where('documento', documento)
        .first();
      return migrante ? migrante : null;
    } catch (error) {
      throw new Error('Error al consultar el migrante');
    }
  },

  async insertarMigranteServicio(documento: string, id_servicio: number, fecha_solicitud: string): Promise<string> {
    try {
      const migrante = await db<IMigrante>('migracion.migrante')
        .where('documento', documento)
        .first();
      if (!migrante) return 'not_found';
      await db('migracion.migrante_servicio').insert({
        id_migrante: migrante.id_migrante,
        id_servicio: id_servicio,
        fecha_solicitud: fecha_solicitud
      });
      return 'success';
    } catch (error) {
      throw new Error('Error al insertar migrante_servicio');
    }
  },

  async listarMigranteServicio(): Promise<any[]> {
    return await db<IMigranteServicio>('migracion.migrante_servicio');
  },

  async obtenerMigranteServicioPorId(id: number): Promise<IMigranteServicio | null> {
    return await db<IMigranteServicio>('migracion.migrante_servicio')
      .where('id_migrante_servicio', id)
      .first();
  },

  async crearMigranteServicio(data: IMigranteServicio): Promise<void> {
    await db<IMigranteServicio>('migracion.migrante_servicio').insert(data);
  },

  async actualizarMigranteServicio(id: number, data: Partial<IMigranteServicio>): Promise<number> {
    return await db<IMigranteServicio>('migracion.migrante_servicio')
      .where('id_migrante_servicio', id)
      .update(data);
  },

  async eliminarMigranteServicio(id: number): Promise<number> {
    return await db<IMigranteServicio>('migracion.migrante_servicio')
      .where('id_migrante_servicio', id)
      .del();
  }
};
