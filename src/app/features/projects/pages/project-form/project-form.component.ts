import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import Swal from 'sweetalert2';

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

  // NUEVOS ESTADOS
  cargandoProyecto = false;
  errorCargandoProyecto = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      fechaInicio: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.projectId = id;
        this.cargandoProyecto = true;

        this.projectService.getProyectoPorId(id).subscribe({
          next: (proyecto) => {
            this.form.patchValue(proyecto);
            this.cargandoProyecto = false;
          },
          error: (err) => {
            console.error('❌ Error al cargar proyecto:', err);
            this.errorCargandoProyecto = true;
            this.cargandoProyecto = false;
          },
        });
      }
    });
  }

  // onSubmit(): void {
  //   if (this.form.invalid) return;

  //   if (this.editMode) {
  //     const proyectoActualizado: Project = {
  //       id: this.projectId,
  //       ...this.form.value,
  //     };
  //     this.projectService
  //       .actualizarProyecto(proyectoActualizado)
  //       .subscribe(() => {
  //         this.router.navigate(['/projects']);
  //       });
  //   } else {
  //     this.projectService.getProyectos().subscribe((proyectos) => {
  //       const ids = proyectos.map((p) => +p.id!);
  //       const nuevoId = (ids.length > 0 ? Math.max(...ids) + 1 : 1).toString();
  //       const nuevoProyecto: Project = {
  //         id: nuevoId,
  //         ...this.form.value,
  //       };
  //       this.projectService.agregarProyecto(nuevoProyecto).subscribe(() => {
  //         this.router.navigate(['/projects']);
  //       });
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.editMode) {
      const proyectoActualizado: Project = {
        id: this.projectId,
        ...this.form.value,
      };

      this.projectService.actualizarProyecto(proyectoActualizado).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Proyecto actualizado',
            text: 'El proyecto fue actualizado exitosamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3ec4d3',
          }).then(() => {
            this.router.navigate(['/projects']);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al actualizar el proyecto.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3ec4d3',
          });
          console.error(err);
        },
      });
    } else {
      this.projectService.getProyectos().subscribe((proyectos) => {
        const ids = proyectos.map((p) => +p.id!);
        const nuevoId = (ids.length > 0 ? Math.max(...ids) + 1 : 1).toString();
        const nuevoProyecto: Project = {
          id: nuevoId,
          ...this.form.value,
        };

        this.projectService.agregarProyecto(nuevoProyecto).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Proyecto creado',
              text: 'El proyecto fue creado exitosamente.',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3ec4d3',
            }).then(() => {
              this.router.navigate(['/projects']);
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al crear el proyecto.',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3ec4d3',
            });
            console.error(err);
          },
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/projects']);
  }
}
