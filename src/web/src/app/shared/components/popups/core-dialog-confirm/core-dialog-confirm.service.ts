// Angular
import { Injectable, inject, signal } from '@angular/core';
// Kendo UI
import { DialogCloseResult, DialogService } from '@progress/kendo-angular-dialog';
// Classes
import { CoreDialogConfirmComponent } from './core-dialog-confirm.component';
import {
  CoreDialogConfirmOptions,
  _CoreDialogConfirmOptions,
} from './core-dialog-confirm.interfaces';
// Types
import { CoreDialogConfirmResult } from './core-dialog-confirm.types';

@Injectable()
export class CoreDialogConfirmService {
  // Dependencies
  private _kendoDialogService = inject(DialogService);

  public async open(options: CoreDialogConfirmOptions): Promise<CoreDialogConfirmResult> {
    return new Promise<CoreDialogConfirmResult>((resolve) => {
      // Create options
      const dialogOptions: _CoreDialogConfirmOptions = {
        message: signal(options.message),
        actionLabel: signal(options.actionLabel),
        actionColor: signal(options.actionColor ?? 'primary'),
        secondaryActionLabel: signal(options.secondaryActionLabel ?? null),
        secondaryActionColor: signal(options.secondaryActionColor ?? 'secondary'),
        cancelLabel: signal(options.cancelLabel ?? 'Cancel'),
        actionBusyLabel: signal(options.actionBusyLabel ?? 'Processing...'),
        secondaryActionBusyLabel: signal(options.secondaryActionBusyLabel ?? 'Processing...'),
        onAction: options.onAction,
        onSecondaryAction: options.onSecondaryAction,
      };
      // Open dialog
      const dialogRef = this._kendoDialogService.open({
        title: options.title,
        content: CoreDialogConfirmComponent,
        width: '100vw',
        maxWidth: options.width ?? '400px',
        preventAction: () => {
          const dialog = dialogRef.content.instance as CoreDialogConfirmComponent;
          return !!dialog.isBusy();
        },
      });
      // Set form
      const dialog = dialogRef.content.instance as CoreDialogConfirmComponent;
      dialog.options.set(dialogOptions);
      // Listen for close event
      dialogRef.result.subscribe((result: DialogCloseResult | CoreDialogConfirmResult) => {
        if (result instanceof DialogCloseResult) {
          resolve('cancel');
        } else {
          resolve(result);
        }
      });
    });
  }
}
