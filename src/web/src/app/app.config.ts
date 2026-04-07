// Angular
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
// Core UI
import {
  CORE_NOTIFICATION_DEFAULT_SETTINGS,
  CoreNotificationService,
} from './shared/components/popups/core-notification';
import { CoreDialogConfirmService } from './shared/components/popups/core-dialog-confirm';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    {
      provide: CORE_NOTIFICATION_DEFAULT_SETTINGS,
      useValue: {
        position: { vertical: 'bottom', horizontal: 'right' },
        successDuration: 3000,
        warningDuration: 5000,
        errorDuration: 5000,
      },
    },
    CoreNotificationService,
    CoreDialogConfirmService,
  ],
};
