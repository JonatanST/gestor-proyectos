/*
 Licencia: 
  * Archivo: LICENSE
  * Fecha: 2025
  * Todos los derechos de propiedad intelectual e industrial sobre esta
  * aplicacion son de propiedad exclusiva del GRUPO ASD S.A.S.
  * Su uso, alteracion, reproduccion o modificacion sin el debido
  * consentimiento por escrito de GRUPO ASD S.A.S. quedan totalmente prohibidos.
  *
  * Este programa se encuentra protegido por las disposiciones de la
  * Ley 23 de 1982 y demas normas concordantes sobre derechos de autor y
  * propiedad intelectual. Su uso no autorizado dara lugar a las sanciones
  * previstas en la Ley.
  * @FilePath: 
 */
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
// Ejemplo de cómo podrías probar la ESTRUCTURA de TASKS_ROUTES
// (esto no prueba si el enrutamiento FUNCIONA, solo si la constante está bien definida)
import { TASKS_ROUTES } from './tasks.routes';

describe('Tasks Routes Configuration', () => {
  it('should define a default route for the tasks feature', () => {
    const defaultTaskRoute = TASKS_ROUTES.find((route) => route.path === '');
    expect(defaultTaskRoute).toBeDefined();
    if (defaultTaskRoute) {
      // Para asegurar que no sea undefined
      expect(defaultTaskRoute.component).toBe(TasksPageComponent);
      expect(defaultTaskRoute.title).toBe('Gestor de Tareas');
    }
  });
});
