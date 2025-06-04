import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../projects/models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly API_URL = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<Project[]> {
    return this.http.get<Project[]>(this.API_URL);
  }

  getProyectoPorId(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.API_URL}/${id}`);
  }

  agregarProyecto(proyecto: Project): Observable<Project> {
    return this.http.post<Project>(this.API_URL, proyecto);
  }

  actualizarProyecto(proyecto: Project): Observable<Project> {
    return this.http.put<Project>(`${this.API_URL}/${proyecto.id}`, proyecto);
  }

  eliminarProyecto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
