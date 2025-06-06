import { Component, type OnInit } from '@angular/core';
import { LoggerService } from '../../../../core/services/logger.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  constructor(private readonly logger: LoggerService) {}

  ngOnInit(): void {}
}
