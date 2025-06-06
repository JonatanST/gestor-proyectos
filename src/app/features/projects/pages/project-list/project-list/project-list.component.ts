import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';
import { Observable, of, interval, Subscription } from 'rxjs';
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
  cargando: boolean = false;
  huboConexionExitosa = false;

  paginaActual = 1;
  proyectosPorPagina = 3;

  private retrySubscription: Subscription | null = null;

  constructor(private projectService: ProjectService) {}

  /**
   * @description Método de inicialización del componente. Carga los proyectos y maneja errores con SweetAlert.
   */
  ngOnInit(): void {
    this.cargarProyectos();
  }

  /**
   * @description Filtra los proyectos por estado y reinicia la paginación.
   */
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

  /**
   * @description Devuelve los proyectos a mostrar en la página actual.
   * @returns {Project[]} Proyectos paginados
   */
  get proyectosPaginados(): Project[] {
    const inicio = (this.paginaActual - 1) * this.proyectosPorPagina;
    return this.proyectosFiltrados.slice(
      inicio,
      inicio + this.proyectosPorPagina
    );
  }

  /**
   * @description Calcula el número total de páginas de la paginación.
   * @returns {number} Número total de páginas
   */
  get totalPaginas(): number {
    return Math.ceil(this.proyectosFiltrados.length / this.proyectosPorPagina);
  }

  /**
   * @description Cambia a una nueva página dentro del rango permitido.
   * @param {number} nuevaPagina - El número de la página a la que se quiere cambiar
   */
  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
    }
  }

  /**
   * @description Muestra confirmación con SweetAlert para eliminar un proyecto y recarga la lista si es exitoso.
   * @param {string} id - ID del proyecto a eliminar
   */
  eliminar(id: string): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar el proyecto?',
      text: 'No podrás revertir esta acción',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#54c59b',
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

  /**
   * @description Carga los proyectos desde el servicio y maneja errores y estado de carga.
   */
  private cargarProyectos(): void {
    this.cargando = true;
    this.proyectos$ = this.projectService.getProyectos();
    this.proyectos$.subscribe({
      next: (proyectos) => {
        this.cargando = false;
        this.huboConexionExitosa = true;
        this.proyectosOriginales = proyectos;
        this.filtrarProyectos();
        this.detenerReintento();
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error cargando proyectos:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error de conexión',
          text: 'No se pudieron cargar los proyectos. ¿Está corriendo el servidor json-server?',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#54c59b',
        });
        this.reintentarCargaPeriodica();
      },
    });
  }

  /**
   * @description Muestra un SweetAlert con cuenta regresiva y reintenta conexión cada 3 segundos.
   */
  private reintentarCargaPeriodica(): void {
    if (this.retrySubscription) return;

    let segundosRestantes = 30;
    let cuentaRegresivaInterval: any;

    const mostrarAlerta = () => {
      Swal.fire({
        icon: 'info',
        title: 'Sin conexión',
        html: `Valide que Json-server este corriendo en el puerto 3000. <b>${segundosRestantes}</b> segundos...`,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          const content = Swal.getHtmlContainer()?.querySelector('b');

          // Cuenta regresiva visual
          cuentaRegresivaInterval = setInterval(() => {
            segundosRestantes--;
            if (content) content.textContent = segundosRestantes.toString();
            if (segundosRestantes <= 0) {
              segundosRestantes = 30; // reinicia la cuenta regresiva
            }
          }, 1000);

          // Verifica conexión cada 10 segundos
          this.retrySubscription = interval(10000).subscribe(() => {
            this.projectService.getProyectos().subscribe({
              next: (proyectos) => {
                clearInterval(cuentaRegresivaInterval);
                Swal.close();
                this.huboConexionExitosa = true;
                this.detenerReintento();
                this.proyectosOriginales = proyectos;
                this.filtrarProyectos();
              },
              error: () => {},
            });
          });
        },
        willClose: () => {
          clearInterval(cuentaRegresivaInterval);
          this.detenerReintento();
        },
      });
    };
    mostrarAlerta();
  }

  /**
   * @description Detiene el reintento automático si estaba activo.
   */
  private detenerReintento(): void {
    if (this.retrySubscription) {
      this.retrySubscription.unsubscribe();
      this.retrySubscription = null;
    }
  }
}
