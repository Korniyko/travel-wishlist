import { _CoreNotificationType } from './core-notification.types';

export interface CoreNotificationPosition {
  horizontal: 'left' | 'center' | 'right';
  vertical: 'top' | 'bottom';
}

export interface CoreNotificationOptions {
  title?: string;
  position?: CoreNotificationPosition; // default is { vertical: 'top', horizontal: 'right' }
  duration?: number; // in milliseconds, default is 3000
}

export interface _CoreNotificationOptions {
  style: _CoreNotificationType;
  title: string;
  message: string;
  position: CoreNotificationPosition;
  duration: number; // in milliseconds
}

export interface CoreNotificationDefaultSettings {
  position?: CoreNotificationPosition; // default is { vertical: 'top', horizontal: 'right' }
  successDuration?: number; // in milliseconds, default is 3000
  warningDuration?: number; // in milliseconds, default is 5000
  errorDuration?: number; // in milliseconds, default is 5000
}

export interface _CoreNotificationDefaultSettings {
  position: CoreNotificationPosition;
  successDuration: number;
  warningDuration: number;
  errorDuration: number;
}
