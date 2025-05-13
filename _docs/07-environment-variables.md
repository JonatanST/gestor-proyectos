# Gestión de Variables de Entorno en Angular

Este documento explica cómo el scaffold y Angular CLI manejan las variables de configuración específicas para diferentes entornos (desarrollo, producción, etc.).

## Introducción

A menudo, las aplicaciones necesitan diferentes configuraciones según dónde se estén ejecutando. Por ejemplo:
* La URL de la API backend es diferente en desarrollo (`localhost`) y en producción (`https://api.dominio.com`).
* Las claves de servicios de terceros (como Google Analytics) pueden ser distintas.
* Puedes tener "feature flags" (interruptores de funcionalidad) activados en desarrollo pero desactivados en producción.

Angular CLI proporciona un mecanismo integrado para manejar esto a través de archivos de entorno.

## La Carpeta `src/environments/`

En la carpeta `src/environments/` de tu proyecto, encontrarás (o deberías tener) al menos dos archivos por defecto:

1.  **`environment.ts`** (o `environment.development.ts` en versiones más nuevas del CLI):
    * Este archivo contiene la configuración para el entorno de **desarrollo** (cuando ejecutas `ng serve` o `ng build` sin especificar una configuración de producción).
    * Ejemplo de contenido:
      ```typescript
      export const environment = {
        production: false,
        apiUrl: 'http://localhost:3000/api/v1', // URL de tu API de desarrollo
        featureFlags: {
          nuevaFuncionalidadX: true
        }
      };
      ```

2.  **`environment.prod.ts`**:
    * Este archivo contiene la configuración para el entorno de **producción** (cuando ejecutas `ng build` o `ng build --configuration production`).
    * Ejemplo de contenido:
      ```typescript
      export const environment = {
        production: true,
        apiUrl: 'https://api.sudominio.com/api/v1', // URL de tu API de producción
        featureFlags: {
          nuevaFuncionalidadX: false // Quizás aún no está lista para producción
        }
      };
      ```

**Crear Archivos para Otros Entornos (Ej. Staging, Q&A):**
Puedes crear más archivos en esta carpeta si necesitas otros entornos, por ejemplo: `environment.staging.ts`. La estructura interna sería la misma, solo cambiarían los valores.

## ¿Cómo Funciona? El Reemplazo de Archivos

Angular CLI utiliza una característica llamada **reemplazo de archivos (file replacements)** definida en `angular.json` para cambiar qué archivo de entorno se usa durante el proceso de compilación (`build`).

* Cuando ejecutas `ng build` (que por defecto usa la configuración de desarrollo si no se especifica otra) o `ng serve`, tu código importará y usará el contenido de `src/environments/environment.ts` (o `environment.development.ts`).
* Cuando ejecutas `ng build --configuration production`, el CLI, gracias a la configuración en `angular.json`, **reemplaza** el contenido de `environment.ts` con el contenido de `environment.prod.ts` antes de compilar.

Puedes ver esta configuración en tu archivo `angular.json`, dentro de `projects -> [tu-proyecto] -> architect -> build -> configurations -> production -> fileReplacements`:

```json
// angular.json (extracto)
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts", // o environment.development.ts
        "with": "src/environments/environment.prod.ts"
      }
    ],
    // ... otras configuraciones de producción
  },
  "development": { /* ... */ }
  // Si hubiera un entorno 'staging':
  // "staging": {
  //   "fileReplacements": [
  //     {
  //       "replace": "src/environments/environment.ts", // o environment.development.ts
  //       "with": "src/environments/environment.staging.ts"
  //     }
  //   ]
  // }
}
```

## ¿Cómo Usar las Variables de Entorno en tu Código?

Para acceder a las variables de entorno en tus servicios o componentes, importa el objeto `environment`:

```typescript
import { environment } from 'src/environments/environment';

console.log(environment.apiUrl);
```

## Buenas Prácticas

- **Nunca incluyas claves secretas o tokens reales** en los archivos de entorno. Estos archivos se incluyen en el bundle final y pueden ser accesibles desde el navegador.
- Usa los archivos de entorno solo para valores que cambian entre entornos, no para constantes de negocio.
- Si usas múltiples entornos como `staging`, asegúrate de configurar correctamente el reemplazo de archivos en `angular.json`.
- Considera usar `.env` y bibliotecas como `dotenv` solo si migras a soluciones más avanzadas con Node.js o server-side rendering (Angular Universal).

---