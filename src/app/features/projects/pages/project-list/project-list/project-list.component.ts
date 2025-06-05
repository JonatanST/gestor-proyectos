import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  proyectos$!: Observable<Project[]>;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    console.log('📦 Cargando proyectos...');
    this.proyectos$ = this.projectService.getProyectos();
  }

  eliminar(id: string): void {
    console.log(
      '🧨 Solicitando eliminación de proyecto con ID:',
      id,
      typeof id
    );

    this.projectService.eliminarProyecto(id).subscribe({
      next: () => {
        console.log('✅ Proyecto eliminado');
        this.proyectos$ = this.projectService.getProyectos();
      },
      error: (error) => {
        console.error('❌ ERROR al eliminar:', error);
      },
    });
  }
}
