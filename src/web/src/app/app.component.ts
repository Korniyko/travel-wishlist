import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Kendo UI
import { KENDO_DIALOGS } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-root',
  template: ` <router-outlet />
    <div kendoDialogContainer></div>
    <div kendoWindowContainer></div>`,
  imports: [RouterOutlet, KENDO_DIALOGS],
})
export class AppComponent {}
