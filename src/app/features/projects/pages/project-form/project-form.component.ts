import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import Swal from 'sweetalert2';

/**
 * @description Valida que la fecha de inicio no sea mayor que la de entrega.
 * @param {AbstractControl} form - El formulario a validar.
 * @returns {ValidationErrors | null} - Error si las fechas son inválidas, null si son válidas.
 */
function validarFechas(form: AbstractControl): ValidationErrors | null {
  const inicio = new Date(form.get('fechaInicio')?.value);
  const entrega = new Date(form.get('fechaEntrega')?.value);
  return inicio > entrega ? { fechasInvalidas: true } : null;
}

/**
 * @description Componente para crear o editar proyectos.
 */
@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  form!: FormGroup;
  editMode = false;
  projectId!: string;
  cargandoProyecto = false;
  errorCargandoProyecto = false;

  /**
   * @description Inicializa el formulario y carga el proyecto si está en modo edición.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarProyectoSiEsEdicion();
  }

  /**
   * @description Define estructura y validaciones del formulario.
   */
  private inicializarFormulario(): void {
    this.form = this.fb.group(
      {
        nombre: ['', Validators.required],
        descripcion: [''],
        fechaInicio: ['', Validators.required],
        fechaEntrega: ['', Validators.required],
        estado: ['', Validators.required],
      },
      { validators: validarFechas }
    );
  }

  /**
   * @description Si el formulario está en modo edición, carga los datos del proyecto.
   */
  private cargarProyectoSiEsEdicion(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;

      this.editMode = true;
      this.projectId = id;
      this.cargandoProyecto = true;

      this.projectService.getProyectoPorId(id).subscribe({
        next: (proyecto) => this.form.patchValue(proyecto),
        error: (err) => this.manejarErrorCargaProyecto(err),
        complete: () => (this.cargandoProyecto = false),
      });
    });
  }

  /**
   * @description Maneja el envío del formulario, ya sea para actualizar o crear.
   */
  onSubmit(): void {
    if (this.form.invalid) return;
    this.editMode ? this.actualizarProyecto() : this.crearProyecto();
  }

  /**
   * @description Crea un nuevo proyecto con un ID autogenerado.
   */
  private crearProyecto(): void {
    this.projectService.getProyectos().subscribe({
      next: (proyectos) => {
        const nuevoProyecto = this.buildNuevoProyecto(proyectos);
        this.projectService.agregarProyecto(nuevoProyecto).subscribe({
          next: () => this.mostrarAlertaExito('Proyecto creado'),
          error: (err) => this.mostrarError('crear', err),
        });
      },
      error: (err) =>
        this.mostrarError('verificar los proyectos existentes', err),
    });
  }

  /**
   * @description Actualiza un proyecto existente.
   */
  private actualizarProyecto(): void {
    const proyectoActualizado: Project = {
      id: this.projectId,
      ...this.form.value,
    };

    this.projectService.actualizarProyecto(proyectoActualizado).subscribe({
      next: () => this.mostrarAlertaExito('Proyecto actualizado'),
      error: (err) => this.mostrarError('actualizar', err),
    });
  }

  /**
   * @description Construye un nuevo proyecto con un ID generado.
   * @param proyectos - Lista de proyectos existentes.
   * @returns Un nuevo proyecto con ID único.
   */
  private buildNuevoProyecto(proyectos: Project[]): Project {
    const ids = proyectos.map((p) => +p.id!);
    const nuevoId = (ids.length > 0 ? Math.max(...ids) + 1 : 1).toString();
    return {
      id: nuevoId,
      ...this.form.value,
    };
  }

  /**
   * @description Muestra una alerta de éxito con SweetAlert y redirige.
   * @param mensaje - Mensaje del título.
   */
  private mostrarAlertaExito(mensaje: string): void {
    Swal.fire({
      icon: 'success',
      title: mensaje,
      text: `El proyecto fue ${mensaje.toLowerCase()} exitosamente.`,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3ec4d3',
    }).then(() => {
      this.router.navigate(['/projects']);
    });
  }

  /**
   * @description Muestra error en SweetAlert con mensaje según operación.
   * @param operacion - Nombre de la operación que falló.
   * @param err - Error recibido.
   */
  private mostrarError(operacion: string, err: any): void {
    Swal.fire({
      icon: 'error',
      title: `Error al ${operacion}`,
      text:
        err.status === 0
          ? 'No hay conexión con el servidor.'
          : `Hubo un problema al ${operacion} el proyecto.`,
      confirmButtonColor: '#3ec4d3',
      confirmButtonText: 'Aceptar',
    });
  }

  /**
   * @description Maneja errores al cargar un proyecto existente.
   * @param err - Error recibido desde el servicio.
   */
  private manejarErrorCargaProyecto(err: any): void {
    this.errorCargandoProyecto = true;
    Swal.fire({
      icon: 'error',
      title: 'Error al cargar',
      text:
        err.status === 0
          ? 'No hay conexión con el servidor.'
          : 'No se pudo cargar el proyecto.',
      confirmButtonColor: '#3ec4d3',
      confirmButtonText: 'Aceptar',
    });
  }

  /**
   * @description Cancela el formulario y redirige a la lista de proyectos.
   */
  cancelar(): void {
    this.router.navigate(['/projects']);
  }
}
