import { Signal } from '@angular/core';
import { CoreButtonColor } from '../../core-button';

export interface CoreDialogConfirmOptions {
  title: string;
  message: string;
  width?: string; // Default: '400px'
  actionLabel: string;
  actionBusyLabel?: string; // Default: 'Processing...'
  actionColor?: CoreButtonColor; // Default: 'primary'
  secondaryActionLabel?: string;
  secondaryActionBusyLabel?: string; // Default: 'Processing...'
  secondaryActionColor?: CoreButtonColor; // Default: 'secondary'
  cancelLabel?: string;
  onAction?: () => Promise<boolean>;
  onSecondaryAction?: () => Promise<boolean>;
}

export interface _CoreDialogConfirmOptions {
  message: Signal<string>;
  actionLabel: Signal<string>;
  actionColor: Signal<CoreButtonColor>;
  actionBusyLabel: Signal<string>;
  secondaryActionLabel: Signal<string | null>;
  secondaryActionBusyLabel: Signal<string>;
  secondaryActionColor: Signal<CoreButtonColor>;
  cancelLabel: Signal<string>;
  onAction?: () => Promise<boolean>;
  onSecondaryAction?: () => Promise<boolean>;
}
