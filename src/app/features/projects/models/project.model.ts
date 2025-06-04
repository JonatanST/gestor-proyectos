export type EstadoProyecto = 'pendiente' | 'en progreso' | 'completado';

export interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string; // formato ISO: '2024-06-04'
  fechaEntrega: string;
  estado: EstadoProyecto;
}
