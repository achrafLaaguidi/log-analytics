import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LoadingService } from '../../services/loading';

@Component({
  selector: 'app-status-popups',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './status-popups.html'
})
export class StatusPopups {

  constructor(public loadingService: LoadingService) {}

  retryConnection(): void {
    this.loadingService.setServerOffline(false);
    window.location.reload();
  }
}