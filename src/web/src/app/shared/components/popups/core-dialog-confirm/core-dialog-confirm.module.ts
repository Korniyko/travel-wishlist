// Angular
import { NgModule } from '@angular/core';
import { CoreDialogConfirmComponent } from './core-dialog-confirm.component';
// Kendo UI
import { DialogModule } from '@progress/kendo-angular-dialog';
// Services
import { CoreDialogConfirmService } from './core-dialog-confirm.service';

@NgModule({
  imports: [CoreDialogConfirmComponent, DialogModule],
  providers: [CoreDialogConfirmService],
  exports: [CoreDialogConfirmComponent],
})
export class CoreDialogConfirmModule {}
