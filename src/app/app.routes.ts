import type { Routes } from '@angular/router';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  // --- Redirección por Defecto ---
  // Cuando un usuario visita la raíz (''), lo redirigimos a una ruta inicial.
  // se recomienda cambiar '/dashboard' por la ruta
  // principal de su aplicación (ej: '/home', '/login', etc.).
  {
    path: '',
    // Ruta inicial deseada (Ajustar según el proyecto)
    redirectTo: '/dashboard',
    // 'full' significa que solo coincide si la ruta está completamente vacía.
    pathMatch: 'full',
  },

  // Aquí es donde se conectarán las rutas de los diferentes módulos 'feature'.
  // Se usa 'loadChildren' para carga perezosa (mejora el rendimiento inicial).
  //(añadir las rutas de los módulos correspondientes aqui):

  {
    path: 'dashboard',
    component: DashboardPageComponent,
  },

  {
    // Esta será la URL base para acceder a la funcionalidad de tareas (ej: http://localhost:4200/tasks)
    path: 'tasks',
    // Apunta al archivo de rutas del feature
    // 'm' es el módulo cargado, accedemos a la constante TASKS_ROUTES exportada
    loadChildren: () => import('./features/tasks/tasks.routes').then((m) => m.TASKS_ROUTES),
    // título base para las rutas hijas de este feature
    title: 'Mis Tareas',
  },

  /*
    {
        // Ejemplo: para autenticación
        path: 'auth', 
        loadChildren: () => import('./features/auth/auth.routes')
                             .then(m => m.AUTH_ROUTES)
    },
    {
        // Ejemplo: para el panel principal
        path: 'dashboard', 
        // Ejemplo cargando solo un componente standalone
        loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page.component')
                              .then(m => m.DashboardPageComponent) 
    },
    */

  // --- Ruta Comodín (Wildcard) para 404 - Página no encontrada ---
  // Esta ruta debería ir al final del array.
  /*
    {
        path: '**', // El doble asterisco coincide con cualquier ruta no encontrada antes.
        loadComponent: () => import('./core/components/not-found/not-found.component')
                             .then(m => m.NotFoundComponent) // Crear este componente en core/ o shared/
    }
    */
];
