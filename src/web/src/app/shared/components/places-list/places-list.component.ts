// Angular
import { Component, inject, input } from '@angular/core';
// Interfaces
import { Place } from '../../../main/views/places/places.interfaces';
// Core UI
import { CoreButtonModule } from '../core-button';
import { CoreNotificationService } from '../popups/core-notification';
// Icons
import { starIcon, starOutlineIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrl: './places-list.component.scss',
  imports: [CoreButtonModule],
})
export class PlacesListComponent {
  public places = input.required<Place[]>();
  public mode = input.required<'places' | 'favorites'>();
  /// Icons
  public starOutlineIcon = starOutlineIcon;
  public starIcon = starIcon;
  private _notify = inject(CoreNotificationService);

  // [ Events ]

  public onSave(place: Place): void {
    this._notify.success(`Saved ${place.name} to favorites!`);
  }
}
