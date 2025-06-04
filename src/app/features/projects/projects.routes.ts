import { Routes } from '@angular/router';
import { ProjectListComponent } from './pages/project-list/project-list/project-list.component';

export const PROJECTS_ROUTES: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    title: 'Listado de Proyectos',
  },
];
