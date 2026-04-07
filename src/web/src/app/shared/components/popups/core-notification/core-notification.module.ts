// Angular
import { NgModule } from '@angular/core';
// Kendo UI
import { NotificationModule } from '@progress/kendo-angular-notification';
// Components
import { CoreNotificationComponent } from './core-notification.component';
// Services
import { CoreNotificationService } from './core-notification.service';

@NgModule({
  imports: [NotificationModule, CoreNotificationComponent],
  providers: [CoreNotificationService],
})
export class CoreNotificationModule {}
