import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly API_URL = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<Project[]> {
    console.log('📥 Obteniendo proyectos...');
    return this.http.get<Project[]>(this.API_URL);
  }

  getProyectoPorId(id: string): Observable<Project> {
    console.log('🔍 Buscando proyecto con ID:', id);
    return this.http.get<Project>(`${this.API_URL}/${id}`);
  }

  agregarProyecto(proyecto: Project): Observable<Project> {
    console.log('📤 Enviando nuevo proyecto:', proyecto);
    return this.http.post<Project>(this.API_URL, proyecto);
  }

  eliminarProyecto(id: string): Observable<void> {
    console.log('🧨 Eliminando proyecto con ID:', id, typeof id);
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  actualizarProyecto(proyecto: Project): Observable<Project> {
    console.log('✏️ Enviando PUT con:', proyecto);
    return this.http.put<Project>(`${this.API_URL}/${proyecto.id}`, proyecto);
  }
}
