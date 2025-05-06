/**
 * @Licencia: 
 * @ Archivo: LICENSE
 * @ Fecha: 2025
 * @ Todos los derechos de propiedad intelectual e industrial sobre esta
 * @ aplicacion son de propiedad exclusiva del GRUPO ASD S.A.S.
 * @ Su uso, alteracion, reproduccion o modificacion sin el debido
 * @ consentimiento por escrito de GRUPO ASD S.A.S. quedan totalmente prohibidos.
 * @ 
 * @ Este programa se encuentra protegido por las disposiciones de la
 * @ Ley 23 de 1982 y demas normas concordantes sobre derechos de autor y
 * @ propiedad intelectual. Su uso no autorizado dara lugar a las sanciones
 * @ previstas en la Ley.
 * @ 
 */

import { Routes } from '@angular/router';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component'; // Ajusta la ruta si es necesario

// Es una buena convención nombrar la constante de rutas en mayúsculas y relacionada con el feature.
export const TASKS_ROUTES: Routes = [
  {
    // Esta es la ruta raíz DENTRO de la funcionalidad 'tasks'.
    path: '', 
    // Si navegamos a '/tasks', esta ruta coincidirá con '/tasks' (path vacío relativo al feature).
    component: TasksPageComponent,
    // Opcional: título para la pestaña del navegador
    title: 'Gestor de Tareas' 
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