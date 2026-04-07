import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'core-spinner',
  templateUrl: './core-spinner.component.html',
  styleUrl: './core-spinner.component.scss',
  host: { class: 'k-overlay' },
  imports: [CommonModule],
})
export class CoreSpinnerComponent {
  // Inputs
  public size = input<string>('64px');
  public message = input<string | null>(null);
}
