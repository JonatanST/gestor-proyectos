import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  proyectosOriginales: Project[] = [];
  proyectos$!: Observable<Project[]>;
  filtroEstado: string = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.projectService.getProyectos().subscribe((proyectos) => {
      this.proyectosOriginales = proyectos;
      this.filtrarProyectos();
    });
  }

  filtrarProyectos(): void {
    if (this.filtroEstado) {
      const filtrados = this.proyectosOriginales.filter(
        (p) => p.estado === this.filtroEstado
      );
      this.proyectos$ = of(filtrados);
    } else {
      this.proyectos$ = of(this.proyectosOriginales);
    }
  }

  eliminar(id: string): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar el proyecto?',
      text: 'No podrás revertir esta acción',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3ec4d3',
      cancelButtonColor: '#7595b3',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.eliminarProyecto(id).subscribe({
          next: () => {
            this.cargarProyectos();
            Swal.fire(
              '¡Eliminado!',
              'El proyecto ha sido eliminado.',
              'success'
            );
          },
          error: (error) => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el proyecto.',
              'error'
            );
          },
        });
      } else {
      }
    });
  }
}
