// Para usar *ngIf, *ngFor, etc. si fuera necesario
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  // El selector para usarlo en HTML
  selector: 'app-custom-button',
  standalone: true,
  imports: [
    // Ejemplo, no estrictamente necesario para este botón simple
    CommonModule,
  ],
  templateUrl: './custom-button.component.html',
  styleUrl: './custom-button.component.scss',
})
export class CustomButtonComponent {
  // Texto del botón, personalizable desde fuera
  @Input() buttonText = 'Default Text';
  // Tipo de botón HTML
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';
  // Para deshabilitar el botón
  @Input() isDisabled = false;

  // Evento que el botón puede emitir
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onButtonClicked(event: MouseEvent): void {
    if (!this.isDisabled) {
      this.buttonClick.emit(event);
    }
  }
}
