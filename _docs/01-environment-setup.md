# Guía de Configuración del Entorno de Desarrollo

Esta guía describe las herramientas y configuraciones necesarias para trabajar con este scaffold de Angular.

## Prerrequisitos Esenciales

Necesitarás tener instaladas las siguientes herramientas en tu sistema:

### 1. Node.js y npm

* **Node.js:** Es el entorno de ejecución de JavaScript que usaremos. Este scaffold ha sido probado y se recomienda usar una versión específica para asegurar la consistencia, especialmente en entornos de CI/CD.
    * **Versión Recomendada:** `v22.14.0`
    * **Instalación:** Descarga desde [nodejs.org](https://nodejs.org/) o, preferiblemente, usa un gestor de versiones como [nvm](https://github.com/nvm-sh/nvm) (Linux/macOS) o [nvm-windows](https://github.com/coreybutler/nvm-windows) para instalar y cambiar fácilmente entre versiones de Node.js.
        * Con `nvm` instalado, puedes usar: `nvm install 22.14.0` y luego `nvm use 22.14.0`.
* **npm (Node Package Manager):** Viene incluido con Node.js. Es el gestor de paquetes que usamos para instalar las dependencias del proyecto.
    * **Versión Recomendada:** La versión de npm que viene con Node.js v22.14.0 (probablemente `v10.9.2` o similar - puedes verificar con `npm -v`).


## Editor de Código (IDE) Recomendado

Recomendamos usar **Visual Studio Code (VS Code)** por su excelente soporte para TypeScript, Angular y su gran ecosistema de extensiones.

### Extensiones de VS Code Recomendadas:

* **Biome (`biomejs.biome`):** Proporciona integración directa con el formateador y linter Biome configurado en el proyecto [`Instalar`](https://marketplace.visualstudio.com/items?itemName=biomejs.biome). 

*(Instrucciones más detalladas sobre cómo configurar Biome como formateador por defecto en VS Code (settings.json, format on save) se encuentran en [`docs/07-ide-integration.md`](./07-ide-integration.md))*.
* **Angular Language Service (`Angular.ng-template`):** Proporciona autocompletado, navegación y errores para plantillas HTML de Angular y código TypeScript dentro de los componentes. [`Instalar`](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).

* **ESLint (`dbaeumer.vscode-eslint`):** *(Solo si decides usar ESLint además o en lugar de Biome)*.
* **Prettier - Code formatter (`esbenp.prettier-vscode`):** *(Solo si decides usar Prettier además o en lugar de Biome)*.


## Navegador Web

* Necesitarás un navegador web moderno para visualizar la aplicación durante el desarrollo (Google Chrome, Mozilla Firefox, Microsoft Edge).


Con estas herramientas instaladas y configuradas, estarás listo para clonar el repositorio, instalar las dependencias (`npm install`) y empezar a desarrollar (`npm start`).