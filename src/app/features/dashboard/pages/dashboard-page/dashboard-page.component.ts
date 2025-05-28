import { Component, type OnInit } from '@angular/core';
import { LoggerService } from '../../../../core/services/logger.service';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component'; // Ajusta la ruta relativa

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CustomButtonComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  // Angular ve que el constructor pide un LoggerService.
  // Como lo proveímos en app.config.ts, Angular le pasa la instancia singleton.
  constructor(private readonly logger: LoggerService) {}

  ngOnInit(): void {
    this.logger.log('DashboardPageComponent se ha inicializado.');
    this.logger.warn('Advertencia de ejemplo desde el dashboard.');
  }

  handleDashboardButtonClick(event: MouseEvent) {
    this.logger.log('¡Botón del Dashboard clickeado!');
    // biome-ignore lint/suspicious/noConsole: es un ejemplo para ver el evento del mouse
    console.log(event);
  }
}
