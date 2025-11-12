"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.Models = {
    //Verifica si existe un usuario con el correo y contraseña dados.
    async verificarUsuario(email, password) {
        try {
            const user = await (0, database_1.default)("mitracion.usuario")
                .where({ correo: email, contrasena: password })
                .first();
            return user || null;
        }
        catch (error) {
            console.error("Error al verificar usuario:", error);
            throw new Error("Error al consultar el usuario en la base de datos");
        }
    },
    // Inserta un nuevo migrante en la base de datos.
    async insertarMigrante(data) {
        try {
            await (0, database_1.default)("mitracion.migrante").insert({
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
        }
        catch (error) {
            console.error("Error al insertar migrante:", error);
            throw new Error("internal server error");
        }
    },
    // Actualiza los datos de un migrante existente
    async actualizarMigrante(documento, data) {
        try {
            const result = await (0, database_1.default)("mitracion.migrante")
                .where({ documento })
                .update(data);
            if (result === 0)
                throw new Error("not found");
            return { message: "updated successfully" };
        }
        catch (error) {
            throw new Error("internal server error");
        }
    },
    // Elimina un migrante de la base de datos
    async eliminarMigrante(documento) {
        try {
            const result = await (0, database_1.default)("mitracion.migrante")
                .where({ documento })
                .del();
            if (result === 0)
                throw new Error("not found");
            return { message: "deleted successfully" };
        }
        catch (error) {
            console.error("Error al eliminar migrante:", error);
            throw new Error("internal server error");
        }
    },
    //Obtener los familiares de un migrante por documento
    async obtenerFamiliaresPorDocumento(documento) {
        try {
            const familiares = await (0, database_1.default)("mitracion.migrante")
                .join("mitracion.migrante_familiar", "mitracion.migrante.id_migrante", "mitracion.migrante_familiar.id_migrante")
                .join("mitracion.migrante as familiar", "mitracion.migrante_familiar.id_familiar", "familiar.id_migrante")
                .join("mitracion.relacion", "mitracion.migrante_familiar.id_relacion", "mitracion.relacion.id_relacion")
                .select("familiar.nombre_completo", "familiar.documento", "familiar.edad", "familiar.genero", "familiar.nacionalidad", "familiar.pais_origen", "mitracion.relacion.tipo_relacion")
                .where("mitracion.migrante.documento", documento);
            return familiares;
        }
        catch (error) {
            console.error("Error al obtener familiares:", error);
            throw new Error("internal server error");
        }
    },
    async obtenerAtencionesPorDocumento(documento) {
        try {
            const resultados = await (0, database_1.default)("mitracion.registro_atencion")
                .rightJoin("mitracion.migrante_servicio", "mitracion.registro_atencion.id_migrante_servicio", "mitracion.migrante_servicio.id_migrante_servicio")
                .leftJoin("mitracion.servicio", "mitracion.migrante_servicio.id_servicio", "mitracion.servicio.id_servicio")
                .leftJoin("mitracion.migrante", "mitracion.migrante_servicio.id_migrante", "mitracion.migrante.id_migrante")
                .leftJoin("mitracion.institucion", "mitracion.registro_atencion.id_institucion", "mitracion.institucion.id_institucion")
                .leftJoin("mitracion.usuario", "mitracion.registro_atencion.id_funcionario", "mitracion.usuario.id_usuario")
                .select("mitracion.migrante.id_migrante", "mitracion.migrante.nombre_completo", "mitracion.migrante.documento", "mitracion.servicio.tipo_servicio", "mitracion.migrante_servicio.fecha_solicitud", "mitracion.registro_atencion.id_registro", "mitracion.registro_atencion.fecha", "mitracion.registro_atencion.observaciones", "mitracion.institucion.nombre", "mitracion.usuario.nombre")
                .where("mitracion.migrante.documento", documento);
            return resultados;
        }
        catch (error) {
            console.error("Error al obtener atenciones del migrante:", error);
            throw new Error("internal server error");
        }
    },
};
//# sourceMappingURL=modles.js.map