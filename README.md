# Scaffold Angular 19 - GRUPO ASD

Un punto de partida robusto y bien estructurado para iniciar proyectos Angular (v19+) utilizando componentes standalone, TypeScript, SCSS, el Router de Angular, Karma/Jasmine para pruebas y Biome para formateo/linting. Sigue una arquitectura modular orientada a features.

## ✨ Características Principales

- 🧩 **Angular (v19+):** Framework moderno con arquitectura de componentes standalone.
- 🟦 **TypeScript:** Tipado estático para mejorar la mantenibilidad y reducir errores.
- 🎨 **SCSS:** Preprocesador CSS para estilos más potentes y organizados.
- 🧭 **Angular Router:** Enrutamiento declarativo y funcional para SPAs.
- 🧪 **Karma & Jasmine:** Framework y ejecutor de pruebas estándar en Angular para pruebas unitarias y de componentes.
- 🐶 **Biome:** Formateador y linter de código integrado y de alto rendimiento (configuración en `biome.json`).
- 📡 **Angular HttpClient:** Para realizar peticiones HTTP (se configura en `app.config.ts` con `provideHttpClient()`).
- 📂 **Arquitectura Modular:** Estructura de carpetas organizada por `core`, `features` y `shared`.

🔗 **Ver:** [`docs/02-technologies.md`](./_docs/02-technologies.md) para una explicación profunda de las herramientas.

## 📂 Estructura del Proyecto

La estructura principal del proyecto está diseñada para la escalabilidad y mantenibilidad:

```
├── _docs/                     # Documentación detallada del scaffold
├── coverage/                  # Reportes de cobertura de pruebas (generado por 'npm run test:ci')
├── node_modules/              # Dependencias del proyecto
├── public/                    # Archivos estáticos servidos directamente (ej. favicon.ico)
├── src/
│   ├── app/
│   │   ├── core/              # Servicios singleton, guards, interceptors globales
│   │   │   ├── guards/        # (Placeholder con .gitkeep)
│   │   │   ├── interceptors/  # (Placeholder con .gitkeep)
│   │   │   └── services/      # (Ej: LoggerService)
│   │   ├── features/          # Funcionalidades principales de la aplicación (lazy-loaded)
│   │   │   ├── dashboard/     # Ejemplo de una feature
│   │   │   └── tasks/         # Ejemplo de otra feature
│   │   ├── shared/            # Componentes, directivas, pipes (standalone) reutilizables
│   │   │   ├── components/    # (Ej: CustomButtonComponent)
│   │   │   ├── directives/    # (Placeholder con .gitkeep)
│   │   │   └── pipes/         # (Placeholder con .gitkeep)
│   │   ├── app.component.html # Plantilla HTML del componente raíz
│   │   ├── app.component.scss # Estilos del componente raíz
│   │   ├── app.component.spec.ts # Pruebas del componente raíz
│   │   ├── app.component.ts   # Lógica del componente raíz (standalone)
│   │   ├── app.config.ts      # Configuración principal de la aplicación (providers, router)
│   │   └── app.routes.ts      # Definición de rutas principales de la aplicación
│   ├── assets/                # Archivos estáticos (imágenes, fuentes, etc.)
│   │   ├── fonts/           # (Placeholder con .gitkeep)
│   │   └── images/          # (Placeholder con .gitkeep)
│   ├── environments/          # Archivos de configuración por entorno
│   │   ├── environment.prod.ts
│   │   └── environment.ts     # (o environment.development.ts)
│   ├── index.html             # Plantilla HTML raíz que carga la aplicación
│   ├── main.ts                # Punto de entrada de la aplicación (bootstrap)
│   └── styles.scss            # Estilos globales
├── .editorconfig              # Configuración de estilo para editores
├── .gitignore                 # Archivos y carpetas ignorados por Git
├── angular.json               # Configuración del workspace y proyecto Angular (CLI)
├── biome.json                 # Configuración de Biome (linter/formatter)
├── LICENSE                    # Licencia del proyecto (GRUPO ASD S.A.S.)
├── package-lock.json          # Lockfile de versiones exactas de dependencias
├── package.json               # Dependencias y scripts del proyecto
├── tsconfig.app.json          # Configuración de TypeScript para la aplicación
├── tsconfig.json              # Configuración base de TypeScript
└── tsconfig.spec.json         # Configuración de TypeScript para las pruebas
```

- **`src/app/core`**: Lógica y servicios transversales, de instancia única.
- **`src/app/features`**: Módulos autocontenidos por funcionalidad, cargados perezosamente.
- **`src/app/shared`**: Elementos standalone reutilizables (componentes, directivas, pipes).

🔗 **Ver:** [`docs/03-architecture.md`](./_docs/03-architecture.md) para una explicación más detallada de la estructura.

## 🚀 Guía de Inicio Rápido

**Prerrequisitos:**

| Tecnología  | Versión  |
| :---------- | :------- |
| Node.js     | v22.14.0 |
| npm         | 10.9.2   |
| Angular CLI | 19.2.10  |

**Pasos:**

1.  **Clonar el repositorio (o usar como plantilla):**

    ```bash
    # git clone https://github.com/Grupo-ASD/NOMBRE_REPOSITORIO.git
    # cd NOMBRE_REPOSITORIO
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Ejecutar Servidor de Desarrollo:**

    ```bash
    npm start
    ```

    Abre tu navegador en `http://localhost:4200/`.

4.  **Comandos Útiles (Scripts de `package.json`):**
    - `npm start` o `ng serve`: Inicia el servidor de desarrollo.
    - `npm run build`: Compila la aplicación para producción.
    - `npm test`: Ejecuta las pruebas unitarias/componentes con Karma/Jasmine (abre un navegador).
    - `npm run test:ci`: Ejecuta pruebas para CI (headless, una sola ejecución, con cobertura).
    - `npm run format`: Formatea todo el código con Biome.
    - `npm run lint`: Revisa el código con Biome (sin aplicar cambios).
    - `npm run lint:fix`: Revisa y aplica arreglos automáticos con Biome.

## 🎨 Estilo y Convenciones de Código (Biome)

Este proyecto utiliza **Biome** para formateo y linting, asegurando un código limpio y consistente.

- La configuración se encuentra en `biome.json`.
- Se recomienda instalar la extensión "Biome" para tu editor (VS Code/Cursor) para formateo al guardar y feedback en tiempo real.
- Utiliza los scripts para aplicar y verificar las reglas desde la terminal.:

  ```bash
  npm run format
  ```

  ```bash
  npm run lint
  ```

🔗 **Ver:** [`docs/06-ide-integration.md`](./_docs/06-ide-integration.md) para detalles de la configuración y uso de Biome.

## 🛠️ Desarrollo de Funcionalidades y Componentes

### 1. Añadir una Nueva Funcionalidad (Feature)

**En la terminal ejecutar:**

```bash
ng generate component features/nombre-de-tu-feature/pages/nombre-de-tu-pagina
```

### 2. Añadir un Componente Compartido (Shared)

**En la terminal ejecutar:**

```bash
ng generate component shared/components/nombre-tu-componente --standalone
```

### 3. Añadir un Servicio Core (Singleton)

**En la terminal ejecutar:**

```bash
ng generate service core/services/nombre-tu-servicio
```

🔗 **Ver:** [`docs/04-development-pattern.md`](./_docs/04-development-pattern.md) para una explicación más detallada de la creacion de `features`, `Components`, `shared`, `core`, etc.

## 🧪 Pruebas

- **Frameworks:** Karma (ejecutor) y Jasmine (biblioteca de aserciones).
- **Utilidades:** `@angular/core/testing` (`TestBed`, `ComponentFixture`) para pruebas de componentes.
- **Ubicación:** Archivos `.spec.ts` co-localizados con el código que prueban.
- **Ejecucion de pruebas**

```Bash
npm run test:ci
```

🔗 **Ver:** [`docs/05-testing-strategy.md`](./_docs/05-testing-strategy.md) para ver más detallado el proceso de pruebas.

## ⚙️ Variables de Entorno

- Utiliza los archivos en `src/environments/` (`environment.ts`, `environment.prod.ts`).
- Angular CLI gestiona el reemplazo de archivos según la configuración de build.

🔗 **Ver:** [`docs/07-environment-variables.md`](./_docs/07-environment-variables.md)

## 📄 Licencia

Este proyecto se distribuye bajo los términos de la licencia corporativa de **GRUPO ASD S.A.S.**
Revisa el archivo `LICENSE` para más detalles.
Copyright (c) 2025, GRUPO ASD S.A.S. Todos los derechos reservados.

## 🧪 API Mock con `json-server`

Este proyecto puede funcionar sin un backend real gracias a [`json-server`](https://github.com/typicode/json-server), ideal para pruebas locales o desarrollo rápido.

### 📦 Instalación de `json-server`

Si no lo tienes instalado globalmente:

```bash
npm install -g json-server
```

O como dependencia local (opcional):

```bash
npm install json-server --save-dev
```

### 🗂 Estructura esperada del archivo `db.json`

Crea un archivo en la raíz del proyecto llamado `db.json` con el siguiente contenido:

```json
{
  "projects": [
    {
      "id": "1",
      "nombre": "Proyecto de ejemplo",
      "descripcion": "Este es un proyecto mock",
      "fechaInicio": "2023-01-01",
      "fechaEntrega": "2023-03-01",
      "estado": "en progreso"
    }
  ]
}
```

### 🚀 Ejecutar el servidor `json-server`

Desde la raíz del proyecto:

```bash
json-server --watch db.json --port 3000
```

Esto iniciará un servidor REST en:

```
http://localhost:3000/projects
```

### ⚙️ Configuración del Frontend

Asegúrate de que tu Angular consuma esta API modificando el `ProjectService` o equivalente, así:

```ts
private baseUrl = 'http://localhost:3000/projects';
```

Esto te permitirá hacer pruebas completas de creación, lectura, edición y eliminación de proyectos sin necesidad de un backend real.
