// Angular
import { Component, computed, input } from '@angular/core';
// Kendo UI
import { ButtonsModule } from '@progress/kendo-angular-buttons';
// Helpers
import { KendoTypeConverter } from '../../helpers/kendo-type-converter';
// Types
import {
  CoreButtonColor,
  CoreButtonType,
  _CoreButtonColor,
  _CoreButtonType,
} from './core-button.types';
// Interfaces
import { CoreIcon } from '../core-icon';

@Component({
  selector: 'core-button',
  templateUrl: './core-button.component.html',
  styleUrl: './core-button.component.scss',
  host: {
    '(click)': 'onHostClick($event)',
    '(keydown.space)': 'onHostKeydown($event)',
    '[style.pointer-events]': 'pointerEvents()',
  },
  imports: [ButtonsModule],
})
export class CoreButtonComponent {
  // [ Inputs ]

  public label = input<string | null>(null);
  public type = input<CoreButtonType>('default');
  public color = input<CoreButtonColor>('default');
  public icon = input<CoreIcon | null>(null);
  public disabled = input<boolean>(false);
  public busy = input<boolean>(false);
  public ariaLabel = input<string | null>(null);

  // [ Computed ]

  public _type = computed<_CoreButtonType>(() =>
    KendoTypeConverter.getKendoButtonType(this.type()),
  );
  public _color = computed<_CoreButtonColor>(() =>
    KendoTypeConverter.getKendoButtonColor(this.color()),
  );
  public _tabIndex = computed<number>(() => (this.disabled() || this.busy() ? -1 : 0));
  public _svgIcon = computed<CoreIcon | null>(() =>
    this.icon() != null && !this.busy() ? this.icon() : null,
  );

  // [ Host bindings ]

  public pointerEvents = computed(() => (this.disabled() || this.busy() ? 'none' : 'auto'));

  public onHostClick(e: Event) {
    if (this.disabled() || this.busy()) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      (e.target as HTMLElement).blur(); // Unfocus the button
    }
  }

  public onHostKeydown(e: Event) {
    if (this.disabled() || this.busy()) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault(); // Prevent the default action of the space key
      (e.target as HTMLElement).blur(); // Unfocus the button
    }
  }
}
