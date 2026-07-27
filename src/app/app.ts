import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatusPopups } from './components/status-popups/status-popups';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,StatusPopups],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('log-analytics-frontend');
}
