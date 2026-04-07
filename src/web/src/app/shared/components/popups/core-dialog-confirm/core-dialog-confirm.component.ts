/* eslint-disable @typescript-eslint/no-unsafe-call */

// Angular
import { Component, computed, inject, signal } from '@angular/core';
// Kendo UI
import { DialogContentBase, DialogModule, DialogRef } from '@progress/kendo-angular-dialog';
// Classes
import { CoreButtonModule } from '../../core-button/core-button.module';
// Interfaces
import { _CoreDialogConfirmOptions } from './core-dialog-confirm.interfaces';

@Component({
  selector: 'core-dialog-confirm',
  templateUrl: './core-dialog-confirm.component.html',
  styleUrl: './core-dialog-confirm.component.scss',
  imports: [DialogModule, CoreButtonModule],
})
export class CoreDialogConfirmComponent extends DialogContentBase {
  // Signals
  public options = signal<_CoreDialogConfirmOptions | null>(null);
  public isBusy = signal<boolean>(false);
  public isSecondaryBusy = signal<boolean>(false);

  // Dependencies
  public _dialogRef = inject(DialogRef);

  // Computed
  public _actionLabel = computed(() =>
    this.isBusy() ? this.options()?.actionBusyLabel() : this.options()!.actionLabel(),
  );
  public _secondaryActionLabel = computed(() =>
    this.isSecondaryBusy()
      ? this.options()?.secondaryActionBusyLabel()
      : this.options()!.secondaryActionLabel(),
  );

  // Events
  public async onAction(): Promise<void> {
    // Ignore action click if busy
    if (this.isBusy()) {
      return;
    }

    if (this.options()!.onAction) {
      // Call action and wait for result
      this.isBusy.set(true);
      const success = await this.options()!.onAction!();
      this.isBusy.set(false);
      // If action failed, do not close dialog
      if (!success) {
        return;
      }
    }

    // Close dialog and return form value
    this._dialogRef.close('primary');
  }

  public async onSecondaryAction(): Promise<void> {
    // Ignore action click if busy
    if (this.isSecondaryBusy()) {
      return;
    }

    if (this.options()!.onSecondaryAction) {
      // Call action and wait for result
      this.isSecondaryBusy.set(true);
      const success = await this.options()!.onSecondaryAction!();
      this.isSecondaryBusy.set(false);
      // If action failed, do not close dialog
      if (!success) {
        return;
      }
    }

    // Close dialog and return form value
    this._dialogRef.close('secondary');
  }

  public onCancel(): void {
    // Ignore cancel click if busy
    if (this.isBusy()) {
      return;
    }

    // Close dialog without returning form value
    this._dialogRef.close('cancel');
  }
}
