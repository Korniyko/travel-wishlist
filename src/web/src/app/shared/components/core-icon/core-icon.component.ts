// Angular
import { Component, input } from '@angular/core';
// Kendo UI
import { SVGIconModule } from '@progress/kendo-angular-icons';
// Classes
import { CoreIcon } from './core-icon.interfaces';
// Types
import { CoreIconColor, CoreIconSize } from './core-icon.types';

@Component({
  selector: 'core-icon',
  templateUrl: './core-icon.component.html',
  imports: [SVGIconModule],
})
export class CoreIconComponent {
  // [ Inputs ]

  public icon = input.required<CoreIcon>();
  public size = input<CoreIconSize>('medium');
  public color = input<CoreIconColor>('inherit');
}
