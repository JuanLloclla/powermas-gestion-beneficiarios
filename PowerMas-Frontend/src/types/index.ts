export interface DocumentoIdentidad {
  id: number;
  nombre: string;
  abreviatura: string;
  pais: string;
  longitud: number;
  soloNumeros: boolean;
  activo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface Beneficiario {
  id: number;
  nombres: string;
  apellidos: string;
  documentoIdentidadId: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: "M" | "F";
  fechaCreacion: string;
  fechaActualizacion: string;
  documentoIdentidad: DocumentoIdentidad;
}

export interface CreateBeneficiarioDto {
  nombres: string;
  apellidos: string;
  documentoIdentidadId: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: "M" | "F";
}

export interface UpdateBeneficiarioDto {
  id: number;
  nombres: string;
  apellidos: string;
  documentoIdentidadId: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  sexo: 'M' | 'F';
}

export interface EliminarBeneficiarioDto {
  id: number;
  nombres: string;
  apellidos: string;
}