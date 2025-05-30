import type { Routes } from '@angular/router';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component'; // Ajusta la ruta si es necesario

// Es una buena convención nombrar la constante de rutas en mayúsculas y relacionada con el feature.
export const TASKS_ROUTES: Routes = [
  {
    // Esta es la ruta raíz DENTRO de la funcionalidad 'tasks'.
    path: '',
    // Si navegamos a '/tasks', esta ruta coincidirá con '/tasks' (path vacío relativo al feature).
    component: TasksPageComponent,
    // Opcional: título para la pestaña del navegador
    title: 'Gestor de Tareas',
  },
  // Aquí se puede añadir más sub-rutas para la funcionalidad "Tareas"
  // Ejemplo:
  // {
  //   path: 'nueva',
  //   component: TaskFormComponent
  // },
  // {
  //   path: ':id/editar',
  //   component: TaskFormComponent
  // }
];
