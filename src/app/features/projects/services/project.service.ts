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
    return this.http.get<Project[]>(this.API_URL);
  }

  getProyectoPorId(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/${id}`);
  }

  agregarProyecto(proyecto: Project): Observable<Project> {
    return this.http.post<Project>(this.API_URL, proyecto);
  }

  eliminarProyecto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  actualizarProyecto(proyecto: Project): Observable<Project> {
    return this.http.put<Project>(`${this.API_URL}/${proyecto.id}`, proyecto);
  }
}
