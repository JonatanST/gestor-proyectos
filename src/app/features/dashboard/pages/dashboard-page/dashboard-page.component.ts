/*
 Licencia: 
  * Archivo: LICENSE
  * Fecha: 2025
  * Todos los derechos de propiedad intelectual e industrial sobre esta
  * aplicacion son de propiedad exclusiva del GRUPO ASD S.A.S.
  * Su uso, alteracion, reproduccion o modificacion sin el debido
  * consentimiento por escrito de GRUPO ASD S.A.S. quedan totalmente prohibidos.
  *
  * Este programa se encuentra protegido por las disposiciones de la
  * Ley 23 de 1982 y demas normas concordantes sobre derechos de autor y
  * propiedad intelectual. Su uso no autorizado dara lugar a las sanciones
  * previstas en la Ley.
  * @FilePath: 
 */

import { Component, type OnInit } from '@angular/core';
import { LoggerService } from '../../../../core/services/logger.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [],
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
}
