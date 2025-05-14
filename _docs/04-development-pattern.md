# Guía de Desarrollo: Patrones Comunes

Este documento proporciona guías paso a paso de cómo añadir nuevas funcionalidades (features), componentes compartidos y servicios core.

## 1. Añadir una Nueva Funcionalidad (Feature) con Lazy Loading

Las funcionalidades de negocio principales de la aplicación se organizan en la carpeta `src/app/features/` y se cargan perezosamente (lazy loading) para mejorar el rendimiento inicial.

**Ejemplo: Creando una funcionalidad "Products"**

### Paso 1: Crear la Carpeta de la Feature

Crea el directorio para tu nueva feature:
```bash
mkdir src/app/features/products
mkdir src/app/features/products/pages
# Opcional, si prevés componentes internos para esta feature:
# mkdir src/app/features/products/components
```

### Paso 2: Generar el Componente Principal de la Página

Este componente actuará como la vista principal o punto de entrada para la feature `Products`. Gracias a la configuración en angular.json ("standalone": true para componentes), se generará como standalone por defecto.

```bash
ng generate component features/products/pages/product-list
```

Esto creará `product-list.component.ts` (y sus archivos asociados .html, .scss, .spec.ts) dentro de `src/app/features/products/pages/product-list/`.

En `product-list.component.html`, puedes poner algo simple para empezar:

```html
<p>¡Página de Lista de Productos Funciona!</p>
```

### Paso 3: Definir las Rutas Específicas de la Feature

Crea un archivo para las rutas de esta feature: `src/app/features/products/products.routes.ts`.

Define y exporta un array de `Routes`. La ruta `path: ''` será la ruta por defecto cuando se navegue a la base de esta feature (ej. `/products`).

```typescript
import { Routes } from '@angular/router';
import { ProductListPageComponent } from './pages/product-list/product-list.component'; // Ajusta si el nombre del componente es diferente

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '', // Ruta raíz para la feature '/products'
    component: ProductListPageComponent,
    title: 'Lista de Productos' // Título para la pestaña del navegador
  }
  // Aquí podrías añadir más sub-rutas específicas de "Products" en el futuro
  // ej: { path: 'nuevo', component: ProductFormComponent },
  // ej: { path: ':id', component: ProductDetailPageComponent }
];
```

### Paso 4: Conectar las Rutas de la Feature al Enrutador Principal (`app.routes.ts`)

```typescript
import { Routes } from '@angular/router';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component'; // Ejemplo existente

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },
  {
    path: 'tasks', // Ejemplo existente
    loadChildren: () => import('./features/tasks/tasks.routes').then(m => m.TASKS_ROUTES)
  },
  // --- NUEVA RUTA PARA LA FUNCIONALIDAD "PRODUCTS" ---
  {
    path: 'products', // URL base para acceder a la feature de productos
    loadChildren: () => import('./features/products/products.routes')
      .then(m => m.PRODUCTS_ROUTES) // 'm' es el módulo cargado, accedemos a la constante exportada
    // title: 'Productos' // Título base opcional para las rutas hijas
  }
  // --- FIN DE NUEVA RUTA ---
  // { path: '**', component: NotFoundPageComponent } // Ruta comodín
];
```

### Paso 5: Importar Dependencias Necesarias en Componentes Standalone

Recuerda que cada componente standalone (como `ProductListPageComponent`) debe importar explícitamente cualquier módulo, componente, directiva o pipe que necesite en su plantilla a través de su array `imports: []` en el decorador `@Component`.

Por ejemplo, si usas `*ngIf` o `*ngFor` en `product-list.component.html`, necesitarás:

```typescript
// product-list.component.ts
import { CommonModule } from '@angular/common';
// ...
@Component({
  // ...
  standalone: true,
  imports: [CommonModule, /* otros imports */],
  // ...
})
export class ProductListPageComponent { /* ... */ }
```

> **Nota:** Mantén organizados los imports y evita dependencias circulares entre features.

### Paso 6: Añadir Enlace de Navegación (Opcional, para probar)

En `src/app/app.component.html`, puedes añadir un enlace para navegar a la nueva feature:

```html
<a routerLink="/products">Productos</a>
```

---

## 2. Añadir un Componente Compartido (Shared) Standalone

Los componentes en `src/app/shared/components/` son reutilizables en múltiples features. Deben ser `standalone: true`.

Ejemplo: Usando el `CustomButtonComponent` que observamos en el ejemplo del scaffold.

### Paso 1: Generar (si no existe)

```bash
ng generate component shared/components/custom-button --standalone
```

### Paso 2: Implementar la Lógica del Componente

```typescript
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'], // corregido: styleUrls (array)
})
export class CustomButtonComponent {
  @Input() buttonText = 'Default Text';
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';
  @Input() isDisabled = false;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onButtonClicked(event: MouseEvent): void {
    if (!this.isDisabled) {
      this.buttonClick.emit(event);
    }
  }
}
```

### Paso 3: Usar el Componente Compartido en Otro Componente

Supongamos que queremos usar `CustomButtonComponent` dentro de `ProductListPageComponent`:

1. Importa el componente compartido en `product-list.component.ts`:

```typescript
// src/app/features/products/pages/product-list/product-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component'; // Ajusta la ruta

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [
    CommonModule,
    CustomButtonComponent // <-- Añadir aquí
  ],
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss'] // corregido: styleUrls (array)
})
export class ProductListPageComponent {
  onProductAction(event: MouseEvent) {
    // biome-ignore lint/suspicious/noConsole: es un ejemplo para ver el evento del mouse
    console.log('Acción de producto clickeada', event);
  }
}
```

2. Úsalo en la plantilla de `product-list-page.component.html`:

```html
<p>¡Página de Lista de Productos Funciona!</p>
<app-custom-button
  buttonText="Añadir Producto"
  (buttonClick)="onProductAction($event)"
></app-custom-button>
```

---

> **¿Quieres agregar pruebas?**  
> Consulta [`_docs/05-testing-strategy.md`](./05-testing-strategy.md) para ver cómo agregar y estructurar pruebas unitarias y de integración para tus nuevos componentes y features.

---