import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.proyectos$ = this.projectService.getProyectos();
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
