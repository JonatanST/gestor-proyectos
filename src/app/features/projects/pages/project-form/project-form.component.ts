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

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  form!: FormGroup;
  editMode = false;
  projectId!: string;

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
        this.projectService.getProyectoPorId(id).subscribe((proyecto) => {
          this.form.patchValue(proyecto);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.editMode) {
      const proyectoActualizado: Project = {
        id: this.projectId,
        ...this.form.value,
      };
      this.projectService
        .actualizarProyecto(proyectoActualizado)
        .subscribe(() => {
          this.router.navigate(['/projects']);
        });
    } else {
      this.projectService.getProyectos().subscribe((proyectos) => {
        const ids = proyectos.map((p) => +p.id!);
        const nuevoId = (ids.length > 0 ? Math.max(...ids) + 1 : 1).toString();
        const nuevoProyecto: Project = {
          id: nuevoId,
          ...this.form.value,
        };
        this.projectService.agregarProyecto(nuevoProyecto).subscribe(() => {
          this.router.navigate(['/projects']);
        });
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/projects']);
  }
}
