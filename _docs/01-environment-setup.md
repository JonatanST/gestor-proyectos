# Guía de Configuración del Entorno de Desarrollo

Esta guía describe las herramientas y configuraciones necesarias para trabajar con este scaffold de Angular.

## Prerrequisitos Esenciales

Necesitarás tener instaladas las siguientes herramientas en tu sistema:

### 1. Node.js y npm

- **Node.js:** Es el entorno de ejecución de JavaScript que usaremos. Este scaffold ha sido probado y se recomienda usar una versión específica para asegurar la consistencia, especialmente en entornos de CI/CD.
  - **Versión Recomendada:** `v22.14.0`
  - **Instalación:** Descarga desde [nodejs.org](https://nodejs.org/) o, preferiblemente, usa un gestor de versiones:
    - [nvm (Linux/macOS)](https://github.com/nvm-sh/nvm)
    - [nvm-windows (Windows)](https://github.com/coreybutler/nvm-windows)
  - Con `nvm` instalado:
    ```bash
    nvm install 22.14.0
    nvm use 22.14.0
    ```
  - **npm (Node Package Manager):** Viene incluido con Node.js.
    - **Versión Recomendada:** La que viene con Node.js v22.14.0 (verifica con `npm -v`).

  **Verifica las versiones instaladas:**
  ```bash
  node -v
  npm -v
  ```

## Editor de Código (IDE) Recomendado

Recomendamos usar **Visual Studio Code (VS Code)** por su excelente soporte para TypeScript, Angular y su gran ecosistema de extensiones.

### Extensiones de VS Code Recomendadas

- **Biome (`biomejs.biome`):** Proporciona integración directa con el formateador y linter Biome configurado en el proyecto. [Instalar](https://marketplace.visualstudio.com/items?itemName=biomejs.biome).
  - *No es necesario instalar ESLint ni Prettier si usas Biome.*
  - Instrucciones detalladas para configurar Biome como formateador por defecto en [`_docs/07-ide-integration.md`](./07-ide-integration.md).
- **Angular Language Service (`Angular.ng-template`):** Proporciona autocompletado, navegación y errores para plantillas HTML de Angular y código TypeScript dentro de los componentes. [Instalar](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).

## Navegador Web

Necesitarás un navegador web moderno para visualizar la aplicación durante el desarrollo (Google Chrome, Mozilla Firefox, Microsoft Edge).

## Primeros pasos

Con estas herramientas instaladas y configuradas, estarás listo para clonar el repositorio, instalar las dependencias y empezar a desarrollar:

```bash
git clone <url-del-repo>
cd <carpeta-del-proyecto>
npm install
npm start
```