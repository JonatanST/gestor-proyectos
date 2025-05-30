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
