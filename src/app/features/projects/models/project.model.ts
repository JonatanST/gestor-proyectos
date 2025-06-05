export type EstadoProyecto = 'pendiente' | 'en progreso' | 'completado';

export interface Project {
  id?: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaEntrega: string;
  estado: string;
}
