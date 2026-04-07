import { InjectionToken } from '@angular/core';
import { CoreNotificationDefaultSettings } from './core-notification.interfaces';

export const CORE_NOTIFICATION_DEFAULT_SETTINGS =
  new InjectionToken<CoreNotificationDefaultSettings>('core.notification.default.settings');
