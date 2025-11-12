export interface IMigrante {
  nombre_completo: string;
  documento: number;
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
  tipo_servicio: string;
}

export interface IRelacion {
  tipo_relacion: string;
}

export interface IPrograma {
  nombre_programa: string;
  descripcion: string;
}

export interface IInstitucion {
  nombre: string;
  id_servicio: number;
  contacto: string;
  id_programa_disponible: number;
}

export interface IUsuario {
  nombre: string;
  rol: string;
  correo: string;
  contrasena: string;
}

export interface IMigranteServicio {
  id_migrante: number;
  id_servicio: number;
  fecha_solicitud: Date;
}

export interface IMigranteFamiliar {
  id_migrante: number;
  id_familiar: number;
  id_relacion: number;
}

export interface IRegistroAtencion {
  fecha: Date;
  observaciones: string;
  id_funcionario: number;
  id_migrante_servicio: number;
  id_institucion: number;
}