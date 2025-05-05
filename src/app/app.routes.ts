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
        pathMatch: 'full'         
    },

    // --- Platzhalter para Rutas de Funcionalidades (Lazy Loading) ---
    // Aquí es donde se conectarán las rutas de los diferentes módulos 'feature'.
    // Se usa 'loadChildren' para carga perezosa (mejora el rendimiento inicial).
    // Ejemplo comentado (el desarrollador añadirá las suyas aquí):
    /*
    {
        path: 'auth', // Ejemplo: para autenticación
        loadChildren: () => import('./features/auth/auth.routes')
                             .then(m => m.AUTH_ROUTES) // Asegúrate que el archivo exporte las rutas con este nombre
    },
    {
        path: 'dashboard', // Ejemplo: para el panel principal
        loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard-page.component')
                              .then(m => m.DashboardPageComponent) // Ejemplo cargando solo un componente standalone
    },
    */

    // --- Ruta Comodín (Wildcard) para 404 - Página no encontrada ---
    // Es una buena práctica tener una ruta que capture cualquier URL no definida.
    // Esta ruta debería ir al final del array.
    // Ejemplo comentado (requiere crear un componente NotFoundComponent):
    /*
    {
        path: '**', // El doble asterisco coincide con cualquier ruta no encontrada antes.
        loadComponent: () => import('./core/components/not-found/not-found.component')
                             .then(m => m.NotFoundComponent) // Crear este componente en core/ o shared/
    }
    */
];