/**
 * Directorio de Route Guards
 *
 * @description
 * Este directorio está destinado a contener los Route Guards (guardianes de ruta) de la aplicación.
 * Los guards son funciones o clases que implementan lógica para permitir o denegar el acceso a ciertas rutas,
 * basándose en condiciones como la autenticación del usuario, roles, etc. (ej. CanActivateFn, CanMatchFn).
 *
 * @usageNotes
 * Los guards basados en clases deben proveerse (en app.config.ts o en los providers de las rutas),
 * mientras que los funcionales se aplican directamente en las definiciones de ruta.
 */
