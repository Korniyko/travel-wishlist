// Angular
import { Component, inject, input } from '@angular/core';
// Interfaces
import { Place } from '../../../main/views/places/places.interfaces';
// Core UI
import { CoreButtonModule } from '../core-button';
import { CoreNotificationService } from '../popups/core-notification';
import { CoreDialogConfirmService } from '../popups/core-dialog-confirm';
// Icons
import { starOutlineIcon, trashIcon } from '@progress/kendo-svg-icons';
// Services
import { FavoritesService } from '../../../main/views/favorites/favorites.service';

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
  public trashIcon = trashIcon;
  // Dependencies
  private _notify = inject(CoreNotificationService);
  private _favoritesService = inject(FavoritesService);
  private _confirmDialog = inject(CoreDialogConfirmService);

  // [ Events ]

  public onSave(place: Place): void {
    if (this.mode() === 'places') {
      this._favoritesService.addFavorite(place);
      this._notify.success(`${place.name} successfully added to favorites!`);
    } else {
      this.onRemoveFavorite(place);
    }
  }

  private async onRemoveFavorite(place: Place): Promise<void> {
    // Request user confirmation
    const res = await this._confirmDialog.open({
      title: 'Delete Favorite',
      message: `Are you sure you would like to remove "${place.name}" from favorites?`,
      actionLabel: 'Delete',
    });
    if (res !== 'primary') return;
    this._favoritesService.removeFavorite(place);
    this._notify.success(`${place.name} successfully removed from favorites!`);
  }
}
