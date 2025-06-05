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
  proyectos$!: Observable<Project[]>;
  proyectosOriginales: Project[] = [];
  proyectosFiltrados: Project[] = [];

  filtroEstado: string = '';

  // Paginación
  paginaActual = 1;
  proyectosPorPagina = 3;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.proyectos$ = this.projectService.getProyectos();

    // Suscribimos para mantener la fuente original y operar filtrado/paginación
    this.proyectos$.subscribe((proyectos) => {
      this.proyectosOriginales = proyectos;
      this.filtrarProyectos();
    });
  }

  filtrarProyectos(): void {
    this.paginaActual = 1;
    if (this.filtroEstado) {
      this.proyectosFiltrados = this.proyectosOriginales.filter(
        (p) => p.estado === this.filtroEstado
      );
    } else {
      this.proyectosFiltrados = [...this.proyectosOriginales];
    }
  }

  get proyectosPaginados(): Project[] {
    const inicio = (this.paginaActual - 1) * this.proyectosPorPagina;
    return this.proyectosFiltrados.slice(
      inicio,
      inicio + this.proyectosPorPagina
    );
  }

  get totalPaginas(): number {
    return Math.ceil(this.proyectosFiltrados.length / this.proyectosPorPagina);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
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
          error: () => {
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el proyecto.',
              'error'
            );
          },
        });
      }
    });
  }

  private cargarProyectos(): void {
    this.proyectos$ = this.projectService.getProyectos();
    this.proyectos$.subscribe((proyectos) => {
      this.proyectosOriginales = proyectos;
      this.filtrarProyectos();
    });
  }
}
