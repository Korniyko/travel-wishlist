// Angular
import { Injectable, inject } from '@angular/core';
// Kendo UI
import { NotificationService } from '@progress/kendo-angular-notification';
// Components
import { CoreNotificationComponent } from './core-notification.component';
// Interfaces
import {
  CoreNotificationOptions,
  _CoreNotificationDefaultSettings,
  _CoreNotificationOptions,
} from './core-notification.interfaces';
// Tokens
import { CORE_NOTIFICATION_DEFAULT_SETTINGS } from './core-notification.tokens';

@Injectable()
export class CoreNotificationService {
  private _kendoNotificationService = inject(NotificationService);
  private _globalDefaultSettings = inject(CORE_NOTIFICATION_DEFAULT_SETTINGS, {
    optional: true,
  });

  private _defaultSettings: _CoreNotificationDefaultSettings = {
    position: this._globalDefaultSettings?.position ?? {
      vertical: 'top',
      horizontal: 'right',
    },
    successDuration: this._globalDefaultSettings?.successDuration ?? 3000,
    warningDuration: this._globalDefaultSettings?.warningDuration ?? 5000,
    errorDuration: this._globalDefaultSettings?.errorDuration ?? 5000,
  };

  // [ Public methods ]

  public success(message: string, options?: CoreNotificationOptions): void {
    this.show({
      style: 'success',
      title: options?.title ?? 'Success',
      message,
      position: options?.position ?? this._defaultSettings.position,
      duration: options?.duration ?? this._defaultSettings.successDuration,
    });
  }

  public warning(message: string, options?: CoreNotificationOptions): void {
    this.show({
      style: 'warning',
      title: options?.title ?? 'Warning',
      message,
      position: options?.position ?? this._defaultSettings.position,
      duration: options?.duration ?? this._defaultSettings.warningDuration,
    });
  }

  public error(message: string, options?: CoreNotificationOptions): void {
    this.show({
      style: 'error',
      title: options?.title ?? 'Error',
      message,
      position: options?.position ?? this._defaultSettings.position,
      duration: options?.duration ?? this._defaultSettings.errorDuration,
    });
  }

  // [ Internal method ]

  private show(options: _CoreNotificationOptions): void {
    // Show the notification
    const notificationRef = this._kendoNotificationService.show({
      content: CoreNotificationComponent,
      type: { style: options.style, icon: true },
      hideAfter: options.duration,
      notificationLabel: options.message,
      position: options.position,
      closable: true,
    });
    // Set the title and message
    if (notificationRef.content) {
      (notificationRef.content.instance as CoreNotificationComponent).title.set(options.title);
      (notificationRef.content.instance as CoreNotificationComponent).message.set(options.message);
    }
    // Close the notification after the duration
    setTimeout(() => {
      notificationRef.hide();
    }, options.duration);
  }
}
