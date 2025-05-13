# Integración del IDE y Biome

Esta guía explica cómo configurar Visual Studio Code y el entorno de desarrollo para asegurar una experiencia consistente de linting y formateo usando **Biome** en todo el equipo.

---

## 1. Configurar VS Code para Usar Biome

Para una integración óptima y para asegurar que todo el equipo use la misma configuración base para este proyecto, recomendamos tener instalada la extensión **Biome** (`biomejs.biome`) en VS Code, como se menciona en la guía [`01-environment-setup.md`](01-environment-setup.md).

* **Crear/Abrir Archivo de Configuración del Workspace:**
    1.  Asegúrate de tener abierto el proyecto scaffold en VS Code.
    2.  En el explorador de archivos de VS Code (la barra lateral izquierda), busca en la **raíz de tu proyecto** si existe una carpeta llamada `.vscode`.
    3.  Si no existe, **créala** haciendo clic derecho en un espacio vacío del explorador y seleccionando "New Folder..." (o desde la terminal con `mkdir .vscode`). Asegúrate de que el nombre empiece con un punto.
    4.  Dentro de esa carpeta `.vscode`, busca o crea un archivo llamado exactamente `settings.json`.
    5.  **Abre este archivo `.vscode/settings.json`**. Aquí es donde pegaremos la configuración específica para este scaffold.

* **Añadir Configuración a `.vscode/settings.json`:**
    Pega el siguiente contenido JSON dentro del archivo `.vscode/settings.json` que acabas de abrir o crear:

    ```jsonc
    // .vscode/settings.json
    {
      // Establece Biome como formateador por defecto para TS y JS
      "[typescript]": {
        "editor.defaultFormatter": "biomejs.biome"
      },
      "[javascript]": {
        "editor.defaultFormatter": "biomejs.biome"
      },
      // Opcional: Para JSON también
      "[json]": {
        "editor.defaultFormatter": "biomejs.biome"
      },
      "[jsonc]": {
        // Para JSON con comentarios (como tsconfig a veces)
        "editor.defaultFormatter": "biomejs.biome"
      },
      // Formatear automáticamente al guardar
      "editor.formatOnSave": true
    }
    ```

* **Importancia del Archivo `.vscode/settings.json`:**
    * **Especificidad:** Esta configuración solo afectará a este proyecto cuando se abra en VS Code. No modificará la configuración global del usuario.
    * **Compartir con el Equipo:** Se puede (y generalmente se debe) añadir la carpeta `.vscode` con su `settings.json` al control de versiones (Git). De esta forma, cualquier miembro del equipo que clone el repositorio y lo abra en VS Code obtendrá automáticamente estas configuraciones recomendadas, promoviendo la consistencia. *(Asegúrate de que la carpeta `.vscode` no esté en el archivo `.gitignore`)*.

> **Nota:**  
> Si tu equipo usa Biome, **no es necesario instalar ni configurar Prettier ni ESLint**. Biome cubre ambas funcionalidades.

*(Nota: La configuración de Usuario global de VS Code (accesible vía `Archivo > Preferencias > Configuración` y luego el icono de "Abrir settings.json") se aplica a todos los proyectos y es donde podrás tener preferencias personales que no necesariamente quieres imponer al equipo).*

---

## 2. Linting Integrado

Con la extensión `biomejs.biome` instalada, Biome proporcionará diagnósticos (errores y advertencias de linting) directamente en el editor mientras escribes, basándose en las reglas definidas en `biome.json` del proyecto.

---

## 3. Comandos de Terminal (Scripts npm)

Además de la integración con el editor para formateo al guardar y linting en tiempo real, es importante poder ejecutar Biome para todo el proyecto desde la terminal. Para ello, se han definido los siguientes scripts en el archivo `package.json`:

```bash
npm run format
```
* Ejecuta: `biome format --write .`
* Propósito: Formatea todos los archivos del proyecto según las reglas de `biome.json`, escribiendo los cambios directamente.

```bash
npm run lint
```
* Ejecuta: `biome check .`
* Propósito: Revisa todos los archivos en busca de errores de formato y de linting según `biome.json`, pero **no modifica** los archivos. Solo reporta los problemas.

```bash
npm run lint:fix
```
* Ejecuta: `biome check --apply-unsafe .`
* Propósito: Revisa todos los archivos e intenta **arreglar automáticamente** tanto los problemas de formato como los de linting que sean "seguros" y los "potencialmente inseguros" (como la eliminación de constructores vacíos). Se recomienda revisar los cambios si se aplican arreglos "unsafe".

Estos scripts son muy útiles para:
* Asegurar la consistencia total del código base antes de realizar un commit.
* Integrar las verificaciones de calidad de código en pipelines de Integración Continua (CI/CD).
* Realizar limpiezas o verificaciones masivas del proyecto.

---

## 4. Recomendación: Hook de Pre-commit (Opcional)

Si el equipo utiliza herramientas como **Husky**, se recomienda agregar un hook de pre-commit para ejecutar `npm run lint` antes de cada commit, asegurando que no se suba código con errores de formato o linting.

---

## 5. Recursos Relacionados

- [Guía de Configuración de Entorno](./01-environment-setup.md)
- [Guía de Patrones de Desarrollo](./04-development-pattern.md)

---