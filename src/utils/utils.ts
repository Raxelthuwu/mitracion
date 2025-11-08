export interface IMigrante {
  id_migrante?: number;
  nombre_completo: string;
  documento: string;
  edad: number;
  genero: string;
  nacionalidad: string;
  pais_origen: string;
  fecha_llegada: Date;
  correo: string;
  numero_telefonico: string;
  motivo_migracion: string;
}

export interface IServicio {
  id_servicio?: number;
  tipo_servicio: string;
}

export interface IRelacion {
  id_relacion?: number;
  tipo_relacion: string;
}

export interface IPrograma {
  id_programa?: number;
  nombre_programa: string;
  descripcion: string;
}

export interface IInstitucion {
  id_institucion?: number;
  nombre: string;
  id_servicio: number;
  contacto: string;
  id_programa_disponible: number;
}

export interface IUsuario {
  id_usuario?: number;
  nombre: string;
  rol: string;
  correo: string;
  contrasena: string;
}

export interface IMigranteServicio {
  id_migrante_servicio?: number;
  id_migrante: number;
  id_servicio: number;
  fecha_solicitud: Date;
}

export interface IMigranteFamiliar {
  id_migrante_familiar?: number;
  id_migrante: number;
  id_familiar: number;
  id_relacion: number;
}

export interface IRegistroAtencion {
  id_registro?: number;
  fecha: Date;
  observaciones: string;
  id_funcionario: number;
  id_migrante_servicio: number;
  id_institucion: number;
}