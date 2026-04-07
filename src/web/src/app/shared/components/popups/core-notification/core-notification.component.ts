import { Component, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'core-notification',
  templateUrl: './core-notification.component.html',
  styleUrl: './core-notification.component.scss',
  imports: [],
})
export class CoreNotificationComponent {
  // Signals
  public title: WritableSignal<string> = signal('');
  public message: WritableSignal<string> = signal('');
}
